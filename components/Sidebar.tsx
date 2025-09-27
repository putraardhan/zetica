"use client";

import { useChatStore } from "@/components/chat/ChatProvider";

type ChatMsg = { role: "user" | "assistant"; content: unknown };

function cn(...xs: Array<string | undefined | null | false>) {
  return xs.filter(Boolean).join(" ");
}
function deriveTitle(s: { title: string; messages: ChatMsg[] }) {
  if (s.title && s.title !== "New chat") return s.title;
  const firstUser = s.messages?.find((m) => m.role === "user");
  const raw = firstUser?.content;
  const t = typeof raw === "string" ? raw.trim().replace(/\s+/g, " ") : "";
  return t.length > 40 ? t.slice(0, 37) + "…" : t || "New chat";
}

export default function Sidebar({
  className = "",
  onNavigate,
  forceVisible = false,
}: {
  className?: string;
  onNavigate?: () => void;
  forceVisible?: boolean;
}) {
  const {
    sessions,
    activeId,
    setActive,
    createSession,
    deleteSession,
  } = useChatStore();

  return (
    <aside
      className={cn(
        forceVisible ? "flex" : "hidden md:flex",
        "h-full w-80 border-r bg-white flex-col",
        className
      )}
    >
      {/* Header */}
      <div className="p-3 flex items-center justify-between">
        <div className="font-semibold">Chat history</div>
        <button
          onClick={() => {
            createSession();
            onNavigate?.();
          }}
          className="text-sm rounded border px-2 py-1 hover:bg-neutral-50"
        >
          New chat
        </button>
      </div>

      {/* List chat */}
      <div className="flex-1 overflow-auto px-2">
        {sessions.map((s) => (
          <div
            key={s.id}
            className={cn(
              "group flex items-center justify-between gap-2 px-3 py-2 rounded cursor-pointer",
              s.id === activeId ? "bg-neutral-100" : "hover:bg-neutral-50"
            )}
            onClick={() => {
              setActive(s.id);
              onNavigate?.();
            }}
            title={new Date(s.updatedAt).toLocaleString()}
          >
            <div className="truncate text-sm">{deriveTitle(s)}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteSession(s.id);
              }}
              className="opacity-0 group-hover:opacity-100 text-xs text-red-600"
              aria-label="Delete"
            >
              ×
            </button>
          </div>
        ))}
        {!sessions.length && (
          <div className="text-sm text-neutral-500 px-3 py-2">
            No chats yet
          </div>
        )}
      </div>

      {/* Social links */}
      <div className="px-3 pt-3 pb-3 border-t">
        <div className="grid grid-cols-2 gap-2">
          <a
            href="https://discord.com/invite/zenchain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
          >
            Discord
          </a>
          <a
            href="https://x.com/zen_chain"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
          >
            X/Twitter
          </a>
        </div>
      </div>
    </aside>
  );
}

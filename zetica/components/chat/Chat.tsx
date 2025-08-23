"use client";

import { useEffect, useRef, useState } from "react";
import { Message, useChatStore } from "./ChatProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ACCENT = "#DB3975";

function BotMarkdown({ text }: { text: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      linkTarget="_blank"
      className="text-[15px] leading-relaxed break-words"
      components={{
        a: (props) => (
          <a {...props} rel="noopener noreferrer" className="underline" />
        ),
        code: ({ inline, ...props }) =>
          inline ? (
            <code {...props} className="px-1 py-0.5 rounded bg-neutral-200/60 dark:bg-neutral-700/60" />
          ) : (
            <pre className="p-3 rounded bg-neutral-200/60 dark:bg-neutral-700/60 overflow-x-auto">
              <code {...props} />
            </pre>
          ),
        li: ({ children, ...props }) => (
          <li {...props} className="ml-5 list-disc">{children}</li>
        ),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

export function Chat() {
  const { activeId, activeSession, addMessage, updateSessionTitle } = useChatStore();
  const [input, setInput] = useState("");
  const listRef = useRef<HTMLDivElement | null>(null);

  // NEW: states for loading + typewriter
  const [isWaiting, setIsWaiting] = useState(false);
  const [typingText, setTypingText] = useState("");

  function isNearBottom(el: HTMLElement, px = 80) {
    return el.scrollHeight - el.scrollTop - el.clientHeight < px;
  }
  function scrollToBottom(smooth = true) {
    const el = listRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }

  useEffect(() => {
    const el = listRef.current;
    if (el && isNearBottom(el)) scrollToBottom(true);
  }, [activeSession?.messages]);

  useEffect(() => {
    scrollToBottom(false);
  }, []);

  // auto-scroll while typing
  useEffect(() => {
    if (typingText || isWaiting) scrollToBottom(true);
  }, [typingText, isWaiting]);

  async function typeOut(full: string) {
    setTypingText("");
    // Kecepatan ketik (ms/char). Naikkan kalau mau lebih cepat.
    const speed = 12;
    for (let i = 1; i <= full.length; i++) {
      setTypingText(full.slice(0, i));
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, speed));
    }
    // Commit final message ke store, kosongkan ephemeral
    const botMsg: Message = {
      id: crypto.randomUUID(),
      role: "assistant",
      content: full,
      ts: Date.now(),
    };
    addMessage(activeId!, botMsg);
    setTypingText("");
  }

  async function sendMessage() {
    const text = input.trim();
    if (!text || !activeId) return;

    const firstOfSession = !activeSession?.messages?.length;
    if (firstOfSession) {
      window.dispatchEvent(new CustomEvent("seiva:first-message"));
      const title = text.length > 40 ? text.slice(0, 37) + "…" : text;
      updateSessionTitle(activeId, title || "New chat");
    }

    const userMsg: Message = { id: crypto.randomUUID(), role: "user", content: text, ts: Date.now() };
    addMessage(activeId, userMsg);
    setInput("");

    try {
      setIsWaiting(true);
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, sessionId: activeId }),
      });

      const data = (await res.json()) as { reply?: string; error?: string };
      const reply = data?.reply || data?.error || "Sorry, something went wrong. Please try again.";

      setIsWaiting(false);
      await typeOut(reply);
    } catch {
      setIsWaiting(false);
      const botMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        ts: Date.now(),
      };
      addMessage(activeId, botMsg);
    }
  }

  return (
    <div className="relative flex h-full flex-col">
      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto space-y-4 sm:space-y-6 pt-2 pb-40">
        {!activeSession?.messages?.length && (
          <div className="rounded-2xl border bg-white p-4 text-center text-sm text-neutral-500">
            Start a conversation about Zenchain anytime.
          </div>
        )}

        {activeSession?.messages?.map((m) => {
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[90%] sm:max-w-[80%] rounded-2xl border px-4 py-3 shadow-sm ${
                  isUser ? "" : "bg-white"
                }`}
                style={
                  isUser
                    ? { backgroundColor: "white", borderColor: "#e5e7eb" }
                    : {}
                }
              >
                <div className="mb-1 text-xs font-medium text-neutral-500">
                  {isUser ? "You" : "Zetica"}
                </div>

                {/* User: plain text; Assistant: Markdown */}
                {isUser ? (
                  <div className="whitespace-pre-wrap text-[15px] leading-relaxed break-words">
                    {m.content}
                  </div>
                ) : (
                  <BotMarkdown text={m.content} />
                )}
              </div>
            </div>
          );
        })}

        {/* Ephemeral loader / typing bubble */}
        {(isWaiting || typingText) && (
          <div className="flex justify-start">
            <div className="max-w-[90%] sm:max-w-[80%] rounded-2xl border px-4 py-3 shadow-sm bg-white">
              <div className="mb-1 text-xs font-medium text-neutral-500">Zetica</div>

              {isWaiting ? (
                // Loader tiga titik
                <div className="flex items-center gap-1 py-1">
                  <span className="inline-block h-2 w-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.2s]" />
                  <span className="inline-block h-2 w-2 rounded-full bg-neutral-400 animate-bounce [animation-delay:-0.1s]" />
                  <span className="inline-block h-2 w-2 rounded-full bg-neutral-400 animate-bounce" />
                </div>
              ) : (
                // Ketikan bertahap (markdown)
                <BotMarkdown text={typingText} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="sticky bottom-4 z-10 mx-auto w-full max-w-3xl px-3 sm:px-4">
        <div className="rounded-2xl border bg-white/95 backdrop-blur p-2 shadow-xl">
          <div className="flex items-end gap-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask anything about Zenchain"
              rows={1}
              className="min-h-[48px] w-full resize-none rounded-xl border px-3 py-3 text-sm outline-none focus:ring-2"
            />
            <button
              onClick={sendMessage}
              className="h-[48px] shrink-0 rounded-xl border px-4 text-sm font-medium hover:bg-neutral-50"
              style={{ borderColor: `${ACCENT}33` }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

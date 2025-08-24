"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Chat } from "@/components/chat/Chat";

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // (opsional) kalau kamu pakai event first-message di Chat
  useEffect(() => {
    const onFirst = () => {};
    window.addEventListener("seiva:first-message", onFirst as EventListener);
    return () => window.removeEventListener("seiva:first-message", onFirst as EventListener);
  }, []);

  return (
    <>
      {/* Sidebar desktop (fixed) */}
      <div className="fixed left-0 top-0 z-10 hidden h-screen md:block">
        <Sidebar />
      </div>

      {/* Drawer mobile */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-80 bg-white shadow-xl">
            <Sidebar forceVisible onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main (geser karena sidebar lebar 80) */}
      <main className="min-h-screen md:ml-80">
        {/* Header: logo kiri, Feedback kanan */}
        <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
            {/* kiri: burger (mobile) + logo */}
            <div className="flex items-center gap-3">
              <button
                className="md:hidden -ml-2 mr-1 inline-flex h-9 w-9 items-center justify-center rounded hover:bg-neutral-100"
                aria-label="Open sidebar"
                onClick={() => setMobileOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

              <div className="flex items-center gap-2">
                <Image
                  src="/logo-seiva.png"
                  alt="Zetica"
                  width={24}
                  height={24}
                  className="rounded-full"
                  priority
                />
                <span className="font-semibold tracking-wide">Zetica</span>
              </div>
            </div>

            {/* kanan: Feedback */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDhsTc4qDIlChxm3E_E_K_SdnYApu3B3dycw8VI7YisX_gaA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm rounded border px-3 py-1 hover:bg-neutral-50"
            >
              Feedback
            </a>
          </div>
        </header>

        {/* Konten chat */}
        <div className="mx-auto max-w-6xl p-4">
          <Chat />
        </div>
      </main>
    </>
  );
}

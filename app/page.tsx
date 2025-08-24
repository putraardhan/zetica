"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Chat } from "@/components/chat/Chat";

export default function HomePage() {
  const [hasChatted, setHasChatted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onFirst = () => setHasChatted(true);
    window.addEventListener("seiva:first-message", onFirst as EventListener);
    return () => window.removeEventListener("seiva:first-message", onFirst as EventListener);
  }, []);

  return (
    <>
      {/* Sidebar DESKTOP (fixed). Hidden <md */}
      <div className="fixed left-0 top-0 z-10 hidden h-screen md:block">
        <Sidebar />
      </div>

      {/* Drawer MOBILE */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[85vw] max-w-xs bg-white shadow-xl">
            <Sidebar forceVisible onNavigate={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <main className="relative z-0 md:ml-80 h-dvh flex flex-col overflow-y-auto bg-[url('/bg-chat.png')] bg-cover bg-center">
        {/* Overlay putih tipis supaya teks/chat tetap kebaca */}
        <div className="pointer-events-none absolute inset-0 bg-white/30 backdrop-blur-sm" />

        {/* Header */}
        <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 justify-between">
            {/* kiri: menu (mobile) + logo */}
            <div className="flex items-center gap-2">
              <button
                className="md:hidden -ml-2 mr-1 inline-flex h-9 w-9 items-center justify-center rounded hover:bg-neutral-100"
                aria-label="Open sidebar"
                onClick={() => setMobileOpen(true)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>

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

        {/* Hero */}
        {!hasChatted && (
          <section className="relative mx-auto w-full max-w-6xl px-4 py-8 sm:py-10">
            <h1 className="font-heading text-center text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              ZETICA, <span className="text-[#000000]">ZENCHAIN AI ASSISTANT</span>
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-neutral-600">
              Navigate Zenchain with an On-Chain AI
            </p>
          </section>
        )}

        {/* Chat */}
        <div className="relative mx-auto w-full max-w-3xl flex-1 px-3 sm:px-4 pb-6">
          <Chat />
        </div>
      </main>
    </>
  );
}

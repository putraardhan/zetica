"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import { Chat } from "@/components/chat/Chat";

export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

      {/* Main area (geser karena sidebar width=80) */}
      <main className="relative min-h-screen md:ml-80">
        {/* === Background hanya untuk area main (bukan sidebar) === */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          {/* blob kanan-atas */}
          <div className="absolute -top-8 right-0 h-72 w-72 rounded-full bg-green-300/30 blur-[20px]" />
          {/* blob tengah-atas */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-lime-300/25 blur-[20px]" />
          {/* blob kiri-bawah */}
          <div className="absolute -bottom-10 -left-8 h-80 w-80 rounded-full bg-emerald-300/25 blur-[20px]" />
          {/* pola dot lembut */}
          <div className="absolute inset-x-0 bottom-24 h-60 bg-[radial-gradient(circle,_rgba(0,0,0,0.08)_1px,_transparent_1px)] [background-size:14px_14px] opacity-20" />
        </div>

        {/* Header: logo kiri, Feedback kanan */}
        <header className="sticky top-0 z-20 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="relative mx-auto flex h-14 max-w-6xl items-center gap-3 px-4">
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

            {/* kanan: Feedback (dipaku di kanan & center vertikal) */}
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfDhsTc4qDIlChxm3E_E_K_SdnYApu3B3dycw8VI7YisX_gaA/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm rounded border px-3 py-1 hover:bg-neutral-50"
            >
              Feedback
            </a>
          </div>
        </header>

        {/* Hero: judul + tagline */}
        <section className="mx-auto max-w-4xl px-4 pt-8 text-center sm:pt-12">
          <h1 className="font-[var(--font-heading)] text-3xl font-extrabold tracking-widest sm:text-5xl">
            ZETICA, ZENCHAIN AI ASSISTANT
          </h1>
          <p className="mt-3 text-sm text-neutral-600 sm:text-base">
            Navigate Zenchain with an On-Chain AI
          </p>
        </section>

        {/* Chat content */}
        <div className="mx-auto max-w-6xl p-4">
          <Chat />
        </div>
      </main>
    </>
  );
}

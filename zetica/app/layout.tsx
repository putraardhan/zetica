import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata, Viewport } from "next";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { Inter, Space_Mono } from "next/font/google";

// Font setup → simpan ke CSS variables biar gampang dipakai di Tailwind
const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const headingFont = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Zetica - Zenchain AI Asisstant",
  description: "Your onchain guide for Zenchain. Ask anything about Zenchain.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${headingFont.variable}`}
    >
      <body className="min-h-screen bg-white text-black antialiased font-sans">
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          {/* Header global dengan tombol Feedback */}
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="mx-auto max-w-screen-2xl h-12 px-4 flex items-center justify-end">
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

          {/* App content */}
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

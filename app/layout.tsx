import "./globals.css";
import { ThemeProvider } from "next-themes";
import type { Metadata, Viewport } from "next";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { Inter, Space_Mono } from "next/font/google";

const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const headingFont = Space_Mono({ subsets: ["latin"], weight: ["400","700"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Zetica - Zenchain AI Assistant",
  description: "Your onchain guide for Zenchain. Ask anything about Zenchain.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning className={`${bodyFont.variable} ${headingFont.variable}`}>
      <body className="min-h-screen bg-white text-black antialiased font-sans">
        <ThemeProvider attribute="class" forcedTheme="light" enableSystem={false}>
          <ChatProvider>{children}</ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

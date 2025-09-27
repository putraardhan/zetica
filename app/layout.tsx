"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isNotFound = pathname === "/_not-found";

  return (
    <html lang="en">
      <body className={inter.className}>
        {isNotFound ? (
          <main className="flex-1">{children}</main>
        ) : (
          <ChatProvider>
            <div className="flex h-screen">
              <Sidebar className="hidden md:flex" />
              <main className="flex-1">{children}</main>
            </div>
          </ChatProvider>
        )}
      </body>
    </html>
  );
}

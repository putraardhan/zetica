import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import ThemeToggle from "@/components/ThemeToggle";
import ConnectWalletButton from "@/components/ConnectWalletButton";
import FeedbackButton from "@/components/FeedbackButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zetica",
  description: "AI-powered assistant for ZenChain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 relative">
            {/* Top right connect wallet */}
            <ConnectWalletButton />

            {/* Bottom left feedback */}
            <FeedbackButton />

            {/* Page content */}
            <main className="p-6">{children}</main>

            {/* Bottom right theme toggle */}
            <div className="fixed bottom-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

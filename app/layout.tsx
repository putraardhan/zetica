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
            {/* Connect Wallet button - pojok kanan atas */}
            <ConnectWalletButton />

            {/* Feedback button - pojok kiri bawah */}
            <button
              className="fixed bottom-4 left-4 z-40 rounded-lg bg-white/90 px-4 py-2 text-sm shadow hover:bg-white"
              onClick={() => {
                // TODO: ganti dengan fungsi feedback modal/redirect kamu
                alert("Open Feedback");
              }}
            >
              Feedback
            </button>

            {/* Page content */}
            <main className="p-6">{children}</main>

            {/* Theme toggle, kalau memang mau tetap di kanan bawah */}
            <div className="fixed bottom-4 right-4">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

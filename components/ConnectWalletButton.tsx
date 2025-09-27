// components/ConnectWalletButton.tsx
import React, { useState } from "react";
import ConnectWalletModal from "./ConnectWalletModal";

export default function ConnectWalletButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-black/80 px-4 py-2 text-white shadow-lg hover:bg-black"
        aria-label="Connect Wallet"
      >
        {/* simple wallet icon */}
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
          <path d="M3 7h18v10H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="18" cy="12" r="1.5" fill="currentColor"/>
        </svg>
        Connect Wallet
      </button>

      <ConnectWalletModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

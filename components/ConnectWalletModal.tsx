// components/ConnectWalletModal.tsx
import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
};

const wallets = [
  { id: "walletconnect", name: "WalletConnect", tag: "QR CODE" },
  { id: "metamask", name: "MetaMask", installed: true },
  { id: "phantom", name: "Phantom", installed: true },
  { id: "backpack", name: "Backpack", installed: true },
  { id: "okx", name: "OKX Wallet" },
  { id: "bitget", name: "Bitget Wallet" },
];

export default function ConnectWalletModal({ open, onClose }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-12">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative z-10 w-full max-w-sm rounded-2xl bg-white p-4 shadow-2xl">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-lg font-semibold">Connect Wallet</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-600 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="mt-3 space-y-2">
          {wallets.map((w) => (
            <button
              key={w.id}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-3 text-left hover:shadow-sm"
              onClick={() => {
                // hook to actual connect flow (placeholder)
                console.log("connect", w.id);
              }}
            >
              <div className="flex items-center gap-3">
                {/* Placeholder icon circle */}
                <div className="h-10 w-10 flex-shrink-0 rounded-lg bg-gray-50" />
                <div>
                  <div className="text-sm font-medium">{w.name}</div>
                  {w.tag ? (
                    <div className="text-xs text-gray-400">{w.tag}</div>
                  ) : null}
                </div>
              </div>

              <div className="ml-auto">
                {w.installed ? (
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                    INSTALLED
                  </span>
                ) : w.id === "walletconnect" ? (
                  <span className="rounded-full bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700">
                    QR
                  </span>
                ) : (
                  <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none">
                    <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => {
              // open wallet modal 'all wallets' or external link
            }}
            className="w-full rounded-lg border border-gray-100 px-4 py-2 text-sm font-medium"
          >
            All Wallets
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

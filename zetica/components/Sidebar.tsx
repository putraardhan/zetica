{/* Bottom (pinned to bottom) */}
<div className="mt-auto border-t">
  {/* Wallet */}
  <div className="px-3 py-2 space-y-2">
    <div className="text-xs font-medium text-neutral-600">Login with wallet</div>
    {walletAddr ? (
      <div className="text-sm">
        Connected: <span className="font-mono">{short(walletAddr)}</span>
      </div>
    ) : (
      <div className="flex gap-2">
        <button onClick={connectMetaMask} className="text-xs rounded border px-2 py-1 hover:bg-neutral-50">
          MetaMask
        </button>
        <button onClick={connectKeplr} className="text-xs rounded border px-2 py-1 hover:bg-neutral-50">
          Keplr
        </button>
      </div>
    )}
  </div>

  {/* Sosmed (tanpa Feedback) */}
  <div className="px-3 pt-3 pb-3">
    <div className="grid grid-cols-2 gap-2">
      <a
        href="https://discord.com/invite/zenchain" target="_blank" rel="noopener noreferrer"
        className="text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
      >
        Discord
      </a>
      <a
        href="https://x.com/zen_chain" target="_blank" rel="noopener noreferrer"
        className="text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
      >
        X/Twitter
      </a>
    </div>
  </div>
</div>

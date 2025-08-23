      {/* Bottom section (pinned to bottom) */}
      <div className="mt-auto">
        {/* Wallet */}
        <div className="px-3 py-2 border-t space-y-2">
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

        {/* Sosmed */}
        <div className="px-3 py-3 border-t flex gap-2">
          <a
            href="https://discord.com/invite/zenchain" target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
          >
            Discord
          </a>
          <a
            href="https://x.com/zen_chain" target="_blank" rel="noopener noreferrer"
            className="flex-1 text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
          >
            X/Twitter
          </a>
        </div>

        {/* Feedback (full width) */}
        <div className="px-3 py-3 border-t">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfDhsTc4qDIlChxm3E_E_K_SdnYApu3B3dycw8VI7YisX_gaA/viewform?usp=header"
            target="_blank" rel="noopener noreferrer"
            className="block w-full text-center text-sm rounded border px-3 py-2 hover:bg-neutral-50"
          >
            Feedback
          </a>
        </div>
      </div>

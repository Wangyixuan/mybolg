'use client';

import { ConnectButton} from '@rainbow-me/rainbowkit';
import TransferComponent from './TransferComponent';
import { useState } from 'react';

export default function CustomConnectButton() {
  const [showTransferModal, setShowTransferModal] = useState(false);

  const openTransferModal = () => {
    setShowTransferModal(true);
  };

  const closeTransferModal = () => {
    setShowTransferModal(false);
  };

  return (
    <>
      {/* 全屏模态框 */}
      {showTransferModal && (
        <div 
          style={{ 
            position: 'fixed', 
            inset: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            zIndex: 50, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            transition: 'opacity 300ms'
          }}
        >
          <div className="w-full h-full max-w-screen-md mx-auto p-4 flex items-center justify-center">
            <div className="w-full bg-white rounded-lg shadow-xl overflow-hidden">
              <TransferComponent onClose={closeTransferModal} />
            </div>
          </div>
        </div>
      )}

      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      type="button"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
                    >
                      连接钱包
                    </button>
                  );
                }

                return (
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={openChainModal}
                      className="flex items-center justify-center gap-1 border border-gray-300 hover:bg-gray-300 py-2 px-3 rounded-lg transition-all w-full h-12"
                    >
                      {chain.hasIcon && (
                        <div
                          style={{
                            background: chain.iconBackground,
                            width: 20,
                            height: 20,
                            borderRadius: 999,
                            overflow: 'hidden',
                          }}
                        >
                          {chain.iconUrl && (
                            <img
                              alt={chain.name ?? 'Chain icon'}
                              src={chain.iconUrl}
                              style={{ width: 20, height: 20 }}
                            />
                          )}
                        </div>
                      )}
                      <span className="text-m font-medium">{chain.name}</span>
                    </button>

                    <button
                      onClick={openAccountModal}
                      className="flex flex-col items-center justify-center border border-gray-300 hover:bg-gray-300 font-bold py-2 px-4 rounded-lg transition-all duration-200 w-full h-auto"
                    >
                      <span>{account.displayName}</span>
                      {account.displayBalance && (
                        <span className="text-xs mt-1">{account.displayBalance}</span>
                      )}
                    </button>
                    <button
                      onClick={openTransferModal}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                    >
                      打赏
                    </button>
                  </div>
                );
              })()}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </>
  );
}
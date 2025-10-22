'use client';

import { useState } from 'react';
import { parseEther } from 'viem';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';


export default function TransferComponent( { onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const { data: hash, sendTransaction, isPending, isError, error } = useSendTransaction();
  
  const { isLoading: isConfirming, isSuccess: isConfirmed } = 
    useWaitForTransactionReceipt({
      hash,
    });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;
    
    try {
      sendTransaction({
        to: '0x070C8A9eB0DE40e626A55EE33783DbdF2B51622d',
        value: parseEther(amount),
      });
    } catch (e) {
      console.error('发送交易失败:', e);
    }
  };

  return (
    <div 
      className={`p-4 bg-white rounded-lg shadow-md relative transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">赏赐作者</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onClose()}
            className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200"
          >
            我再想想
          </button>
          <button
            type="submit"
            disabled={isPending || isConfirming}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isPending ? '交易处理中...' : isConfirming ? '确认中...' : '拿着'}
          </button>
        </div>
        
      </form>
      
      {isError && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          错误: {error?.message || '交易失败'}
        </div>
      )}
      
      {isConfirmed && (
        <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md">
          交易成功! 交易哈希: {hash}
        </div>
      )}
    </div>
  );
}
import React from 'react';
import { createPortal } from 'react-dom';

// -----------------------------------------------------------------------------
// ConfirmDeleteModal: 削除確認用モーダル
// -----------------------------------------------------------------------------
export const ConfirmDeleteModal = ({ itemType, itemName, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">{itemType}の削除の確認</h2>
        </header>

        <main className="p-6 text-center">
          <p className="text-sm text-slate-700">
            {itemType}「<span className="font-bold text-red-600">{itemName}</span>」を本当に削除しますか？
          </p>
          <p className="text-xs text-slate-500 mt-2">この操作は元に戻せません。</p>
        </main>
        
        <footer className="p-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-lg">
          <button onClick={onCancel} className="px-4 py-2 text-sm bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
            キャンセル
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            削除する
          </button>
        </footer>
      </div>
    </div>
  );
};

// -----------------------------------------------------------------------------
// ConfirmationModal: 汎用的な確認モーダル (Portal使用)
// -----------------------------------------------------------------------------
export const ConfirmationModal = ({ title, message, onConfirm, onCancel }) => {
  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onCancel}>
      <div className="bg-white rounded-lg shadow-xl w-full max-w-sm flex flex-col" onClick={(e) => e.stopPropagation()}>
        <header className="p-5 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
        </header>
        <main className="p-6">
          <p className="text-sm text-slate-700 whitespace-pre-wrap">{message}</p>
        </main>
        <footer className="p-4 border-t border-slate-200 flex justify-end gap-3 bg-slate-50 rounded-b-lg">
          <button onClick={onCancel} className="px-4 py-2 text-sm bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400">
            いいえ
          </button>
          <button onClick={onConfirm} className="px-4 py-2 text-sm bg-[#F4B896] text-white rounded-md hover:bg-[#E8A680] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4B896]">
            はい
          </button>
        </footer>
      </div>
    </div>,
    document.body
  );
};

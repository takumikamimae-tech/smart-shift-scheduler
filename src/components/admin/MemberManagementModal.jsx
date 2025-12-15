import React, { useState } from 'react';

const MemberManagementModal = ({ staff, onClose, onSave }) => {
  // Propsで受け取ったstaffデータを初期値としてコピー
  const [editedStaff, setEditedStaff] = useState(() => JSON.parse(JSON.stringify(staff)));

  const handlePinChange = (staffId, newPin) => {
    // 数字4桁までのみ許可
    if (/^\d{0,4}$/.test(newPin)) {
      setEditedStaff(prevStaff =>
        prevStaff.map(s => (s.id === staffId ? { ...s, pin: newPin } : s))
      );
    }
  };

  const handleChatUserIdChange = (staffId, newId) => {
    setEditedStaff(prevStaff =>
      prevStaff.map(s => (s.id === staffId ? { ...s, chatUserId: newId } : s))
    );
  };
  
  const handleSave = () => {
    // PINコードの長さチェック
    const allPinsValid = editedStaff.every(s => s.pin.length === 4);
    if (!allPinsValid) {
        alert('すべてのメンバーのPINコードを4桁に設定してください。');
        return;
    }
    onSave(editedStaff);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">メンバー管理</h2>
          <p className="text-sm text-slate-500">メンバーの情報を確認・編集します。PINコードは4桁の数字で設定してください。</p>
        </header>

        <main className="p-4 overflow-y-auto flex-grow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">名前</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">社員番号</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">役職</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">PINコード</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Chat User ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {editedStaff.map(member => (
                <tr key={member.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-900">{member.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{member.employeeId}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{member.role}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">
                    <input
                      type="text"
                      value={member.pin}
                      onChange={(e) => handlePinChange(member.id, e.target.value)}
                      maxLength={4}
                      className={`w-20 px-2 py-1 border rounded-md text-sm ${member.pin.length !== 4 ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]`}
                      placeholder="4桁"
                    />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">
                    <input
                      type="text"
                      value={member.chatUserId || ''}
                      onChange={(e) => handleChatUserIdChange(member.id, e.target.value)}
                      className="w-40 px-2 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]"
                      placeholder="User ID (任意)"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
        
        <footer className="p-4 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 rounded-b-lg">
          <button onClick={onClose} className="px-4 py-2 text-sm bg-slate-200 text-slate-800 rounded-md hover:bg-slate-300">
            キャンセル
          </button>
          <button onClick={handleSave} className="px-4 py-2 text-sm bg-[#F4B896] text-white rounded-md hover:bg-[#E8A680]">
            保存して閉じる
          </button>
        </footer>
      </div>
    </div>
  );
};

export default MemberManagementModal;

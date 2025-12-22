import React, { useState } from 'react';

const MemberManagementModal = ({ staff, onClose, onSave }) => {
  // Propsで受け取ったstaffデータを初期値としてコピー
  const [editedStaff, setEditedStaff] = useState(() => JSON.parse(JSON.stringify(staff)));

  const handleChatUserIdChange = (staffId, newId) => {
    setEditedStaff(prevStaff =>
      prevStaff.map(s => (s.id === staffId ? { ...s, chatUserId: newId } : s))
    );
  };

  // メールアドレス変更用の関数
  const handleEmailChange = (staffId, newEmail) => {
    setEditedStaff(prevStaff =>
      prevStaff.map(s => (s.id === staffId ? { ...s, email: newEmail } : s))
    );
  };
  
  const handleSave = () => {
    // PINコードのバリデーションを削除しました
    onSave(editedStaff);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <header className="p-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">メンバー管理</h2>
          <p className="text-sm text-slate-500">メンバーの情報を確認・編集します。</p>
        </header>

        <main className="p-4 overflow-y-auto flex-grow">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">名前</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">メールアドレス</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">社員番号</th>
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">役職</th>
                {/* PINコードのヘッダーを削除しました */}
                <th className="px-4 py-2 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Chat User ID</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {editedStaff.map(member => (
                <tr key={member.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-slate-900">{member.name}</td>
                  
                  {/* メールアドレス入力欄 */}
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">
                    <input
                      type="email"
                      value={member.email || ''}
                      onChange={(e) => handleEmailChange(member.id, e.target.value)}
                      className="w-48 px-2 py-1 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]"
                      placeholder="email@example.com"
                    />
                  </td>

                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{member.employeeId}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-600">{member.role}</td>
                  
                  {/* PINコードの入力欄セルを削除しました */}

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

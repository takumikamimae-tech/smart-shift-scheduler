import React, { useState } from 'react';

const Login = ({ onLoginSuccess, staffList }) => {
  const [loginType, setLoginType] = useState('member');
  // staffListが空の場合のエラーハンドリングとしてオプショナルチェーンを使用
  const [selectedStaffId, setSelectedStaffId] = useState(staffList?.[0]?.id || '');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // 実際の運用では環境変数等で管理することを推奨しますが、元のコードに従います
  const ADMIN_PASSWORD = 'digsy-shift-2025';

  const handleMemberLogin = () => {
    const staffMember = staffList.find(s => s.id === selectedStaffId);
    if (staffMember && staffMember.pin === pin) {
      onLoginSuccess(staffMember);
    } else {
      setError('PINコードが正しくありません。');
    }
  };

  const handleAdminLogin = () => {
    if (password === ADMIN_PASSWORD) {
      onLoginSuccess({ id: 'admin', name: '管理者' });
    } else {
      setError('パスワードが正しくありません。');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (loginType === 'member') {
      handleMemberLogin();
    } else {
      handleAdminLogin();
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] flex items-center justify-center p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-2xl shadow-xl border border-slate-200">
        <div className="p-8">
          <h1 className="text-2xl font-bold text-center text-slate-800 mb-2 mt-8">ログイン</h1>
          <p className="text-sm text-slate-500 text-center mb-6">シフト管理システムへようこそ</p>

          <div className="flex justify-center mb-6 border border-slate-200 rounded-lg p-1 bg-slate-50">
            <button
              onClick={() => { setLoginType('member'); setError(''); }}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${loginType === 'member' ? 'bg-[#F4B896] text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              メンバー
            </button>
            <button
              onClick={() => { setLoginType('admin'); setError(''); }}
              className={`w-1/2 py-2 text-sm font-semibold rounded-md transition-colors ${loginType === 'admin' ? 'bg-[#F4B896] text-white shadow' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              管理者
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {loginType === 'member' ? (
              <>
                <div>
                  <label htmlFor="staff-select" className="block text-sm font-medium text-slate-700">名前</label>
                  <select
                    id="staff-select"
                    value={selectedStaffId}
                    onChange={(e) => setSelectedStaffId(e.target.value)}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]"
                  >
                    {staffList.map(staff => (
                      <option key={staff.id} value={staff.id}>{staff.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="pin" className="block text-sm font-medium text-slate-700">PINコード (4桁)</label>
                  <input
                    type="password"
                    id="pin"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    maxLength={4}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]"
                    autoComplete="off"
                  />
                </div>
              </>
            ) : (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">管理者パスワード</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-[#F4B896] focus:ring-1 focus:ring-[#F4B896]"
                  autoComplete="current-password"
                />
              </div>
            )}
            
            {error && <p className="text-sm text-red-600 text-center">{error}</p>}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F4B896] hover:bg-[#E8A680] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F4B896]"
              >
                ログイン
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

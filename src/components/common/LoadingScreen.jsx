import React from 'react';

const LoadingScreen = ({ message = "データを読み込んでいます..." }) => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-[100]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#F4B896]"></div>
            <p className="mt-4 text-lg font-semibold text-slate-700">{message}</p>
        </div>
    );
};

export default LoadingScreen;

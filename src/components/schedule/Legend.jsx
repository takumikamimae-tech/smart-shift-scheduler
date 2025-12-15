import React from 'react';

const Legend = () => {
    const LegendItem = ({ colorClass, label }) => (
        <div className="flex items-center space-x-2">
            <div className={`w-4 h-4 rounded-sm ${colorClass}`}></div>
            <span className="font-medium text-white text-xs">{label}</span>
        </div>
    );

    return (
        <div className="flex items-center flex-wrap gap-x-4 gap-y-1">
            <LegendItem colorClass="bg-green-200" label="稼働" />
            <LegendItem colorClass="bg-yellow-200" label="有/半日有給" />
            <LegendItem colorClass="bg-blue-200" label="通/半日通" />
            <LegendItem colorClass="bg-slate-300" label="休/午前休" />
            <LegendItem colorClass="bg-red-200" label="欠" />
            <LegendItem colorClass="bg-orange-200" label="遅" />
            <LegendItem colorClass="bg-purple-200" label="早" />
        </div>
    );
};

export default Legend;

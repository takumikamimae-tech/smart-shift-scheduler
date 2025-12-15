import React, { useState, useEffect, useRef } from 'react';
import { LockIcon } from './Icons';
import { formatValue } from '../../utils/dateUtils';

// -----------------------------------------------------------------------------
// EditableCell: シフト表のメインセル（時間入力・プルダウン選択）
// -----------------------------------------------------------------------------
export const EditableCell = ({ value, onUpdate, borderClass, disabled = false, isAdmin = false }) => {
  const [mode, setMode] = useState('view');
  const [inputValue, setInputValue] = useState('');
  const [editingSpecialShift, setEditingSpecialShift] = useState(null);
  const cellRef = useRef(null);
  const inputRef = useRef(null);

  const isLocked = typeof value === 'object' && value !== null && 'locked' in value && value.locked;
  const isEffectivelyDisabled = disabled || (isLocked && !isAdmin);

  useEffect(() => {
    if (mode === 'input' && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [mode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mode !== 'view' && cellRef.current && !cellRef.current.contains(event.target)) {
        setMode('view');
        setEditingSpecialShift(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mode]);

  const handleUpdate = (newValue) => {
    if (JSON.stringify(newValue) !== JSON.stringify(value)) {
      onUpdate(newValue);
    }
    setMode('view');
    setEditingSpecialShift(null);
  };
  
  const handleSelectChange = (e) => {
    const selected = e.target.value;
    const specialShiftOptions = ['遅', '早', '午前有', '午後有', '午前休', '午後休', '午前通', '午後通'];
    const TIME_INPUT_OPTION = '稼働時間入力';

    if (specialShiftOptions.includes(selected)) {
        const type = selected;
        const currentHours = (typeof value === 'object' && value?.type === type) ? value.hours : 4.0;
        setEditingSpecialShift(type);
        setInputValue(String(currentHours));
        setMode('input');
        return;
    }

    if (selected === TIME_INPUT_OPTION) {
        const currentHours = typeof value === 'number' ? value : 8.0;
        setEditingSpecialShift(null);
        setInputValue(String(currentHours));
        setMode('input');
    } else {
        handleUpdate(selected);
    }
  };

  const handleInputBlur = () => {
    const hours = parseFloat(inputValue);
    if (isNaN(hours) || hours < 0) {
        setMode('view');
        setEditingSpecialShift(null);
        return;
    }
    if (editingSpecialShift) {
        handleUpdate({ type: editingSpecialShift, hours });
    } else {
        handleUpdate(hours);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    } else if (e.key === 'Escape') {
        setMode('view');
        setEditingSpecialShift(null);
    }
  };

  const getBackgroundColor = () => {
    const hoverClass = isEffectivelyDisabled ? '' : 'hover:bg-opacity-80';
    if (typeof value === 'number' && value > 0) return `bg-green-200 ${hoverClass}`;
    
    if (typeof value === 'object' && value !== null && 'type' in value) {
        switch (value.type) {
            case '休': return `bg-slate-300 ${hoverClass}`;
            case '遅': return `bg-orange-200 ${hoverClass}`;
            case '早': return `bg-purple-200 ${hoverClass}`;
            case '午前有':
            case '午後有': return `bg-yellow-200 ${hoverClass}`;
            case '午前休': return `bg-slate-300 ${hoverClass}`;
            case '午後休':
            case '午前通':
            case '午後通': return `bg-blue-200 ${hoverClass}`;
            default: break;
        }
    }

    switch(value) {
      case '有': return `bg-yellow-200 ${hoverClass}`;
      case '通': return `bg-blue-200 ${hoverClass}`;
      case '休': return `bg-slate-300 ${hoverClass}`;
      case '欠': return `bg-red-200 ${hoverClass}`;
      default: return `bg-white ${isEffectivelyDisabled ? '' : 'hover:bg-slate-50'}`;
    }
  };
  
  const handleClick = () => {
      if (isEffectivelyDisabled) return;
      setMode('select');
  }
  
  const baseClasses = `border-b border-r ${borderClass} text-center text-xs h-9 flex items-center justify-center min-w-0`;

  if (mode === 'view') {
    return (
      <div
        onClick={handleClick}
        className={`relative ${baseClasses} transition-colors duration-150 ${getBackgroundColor()} ${isEffectivelyDisabled ? 'cursor-not-allowed text-slate-500' : 'cursor-pointer'}`}
      >
        {isLocked && <div className="absolute top-0.5 right-0.5 pointer-events-none"><LockIcon /></div>}
        {formatValue(value)}
      </div>
    );
  }

  if (mode === 'select') {
    const statusOptions = ['有', '休', '通', '欠'];
    const specialShiftOptions = ['遅', '早', '午前有', '午後有', '午前休', '午後休', '午前通', '午後通'];
    const TIME_INPUT_OPTION = '稼働時間入力';
    return (
         <div ref={cellRef} className={`${baseClasses} bg-white`}>
            <select
                onChange={handleSelectChange}
                autoFocus
                onBlur={() => setMode('view')}
                className="w-full h-full bg-transparent text-center outline-none focus:outline-sky-500 focus:-outline-offset-2 text-xs appearance-none"
                defaultValue=""
            >
                <option value="" disabled>選択...</option>
                <option value={TIME_INPUT_OPTION}>{TIME_INPUT_OPTION}</option>
                <optgroup label="ステータス">
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </optgroup>
                <optgroup label="時間単位">
                    {specialShiftOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </optgroup>
                 <option value="">(クリア)</option>
            </select>
        </div>
    )
  }

  // mode === 'input'
  return (
    <div ref={cellRef} className={`${baseClasses} bg-white w-full max-w-full overflow-hidden relative`}>
      {editingSpecialShift && <span className="absolute left-1 top-1/2 -translate-y-1/2 text-xs text-slate-600 z-10 pointer-events-none">{editingSpecialShift}:</span>}
      <input
        ref={inputRef}
        type="number"
        step="0.5"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 w-full h-full p-0 m-0 bg-transparent text-center text-xs outline-none focus:outline-sky-500 focus:-outline-offset-2 min-w-0 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        style={{ paddingLeft: editingSpecialShift ? '2.5rem' : '0' }}
      />
    </div>
  );
};


// -----------------------------------------------------------------------------
// EditableStaffInfoCell: スタッフ情報（名前、役職など）編集セル
// -----------------------------------------------------------------------------
export const EditableStaffInfoCell = ({ value, onUpdate, className, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleBlur = () => {
    if (currentValue.trim() !== value) {
      onUpdate(currentValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };
  
  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  }
  
  const wrapperClass = `h-9 text-xs border-b border-r border-slate-300 flex items-center px-2 bg-slate-50 ${className}`;

  if (isEditing) {
    return (
      <div className={wrapperClass}>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setCurrentValue(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full h-full bg-transparent outline-none"
        />
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`${wrapperClass} transition-colors ${disabled ? 'cursor-not-allowed text-slate-500' : 'cursor-pointer hover:bg-slate-100'}`}
    >
        <div className="font-semibold truncate w-full">{value}</div>
    </div>
  );
};


// -----------------------------------------------------------------------------
// EditableTaskName: 業務名編集セル
// -----------------------------------------------------------------------------
export const EditableTaskName = ({ value, onUpdate, disabled = false }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing && !disabled) {
      inputRef.current?.focus();
    }
  }, [isEditing]);

  const handleBlur = () => {
    if (currentValue.trim() !== value && currentValue.trim() !== '') {
      onUpdate(currentValue.trim());
    } else {
        // Revert if the name is empty or unchanged
        setCurrentValue(value);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleBlur();
    } else if (e.key === 'Escape') {
      setCurrentValue(value);
      setIsEditing(false);
    }
  };

  const handleClick = () => {
    if (!disabled) {
      setIsEditing(true);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="text-xs font-semibold text-slate-600 bg-white border border-sky-500 rounded p-1 w-full"
      />
    );
  }

  return (
    <div
      onClick={handleClick}
      className={`text-xs font-semibold text-slate-600 p-1 rounded ${disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-slate-200'}`}
      title={disabled ? '' : "クリックして編集"}
    >
      {value}
    </div>
  );
};

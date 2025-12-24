import React from 'react';
import { EditableCell, EditableStaffInfoCell } from '../common/EditableCells';
import ShiftPatternEditor from './ShiftPatternEditor';
import { DeleteIcon, SetHolidayIcon, UnlockIcon } from '../common/Icons';
import { summarizePattern } from '../../utils/scheduleUtils';

const ShiftSchedule = ({ 
    currentUser, isAdmin, // ★変更: isAdminを受け取るように修正
    schedule, staff, days, holidays, shiftPatterns, year, month,
    onUpdateSchedule, onDeleteStaff, onUpdateStaffInfo, onApplyStaffPattern, 
    onToggleShiftSubmitted, onToggleShiftApproved, onToggleShiftRemanded, 
    onSetDayAsHolidayForAll 
}) => {
  // 列の幅設定
  const staffInfoWidth = "60px 100px 120px 150px 60px 60px 60px 40px";
  
  // ★削除: ここでisAdminを独自定義していたのを削除
  // const isAdmin = currentUser.id === 'admin'; 
  
  const patternSummary = (staffMember) => {
      return summarizePattern(staffMember.defaultShift.pattern, shiftPatterns);
  }

  const getDayHeaderClass = (dayOfWeek, isHoliday) => {
      let baseClasses = "sticky top-0 z-10 p-2 text-xs font-semibold text-center border-b-2 border-r whitespace-nowrap";
      if (dayOfWeek === '土') {
          return `${baseClasses} bg-sky-100 text-sky-800 border-sky-200`;
      }
      if (dayOfWeek === '日' || isHoliday) {
          return `${baseClasses} bg-pink-100 text-pink-800 border-pink-200`;
      }
      return `${baseClasses} bg-slate-100 text-slate-900 border-slate-300`;
  };

  const getCellBorderClass = (dayOfWeek, isHoliday) => {
      if (dayOfWeek === '土') return 'border-sky-200';
      if (dayOfWeek === '日' || isHoliday) return 'border-pink-200';
      return 'border-slate-300';
  }

  const stickyHeaderCellClass = "sticky top-0 z-30 bg-slate-200 p-2 border-b-2 border-r border-slate-300 font-semibold text-xs text-center";

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md ring-1 ring-black ring-opacity-5" style={{maxHeight: '70vh'}}>
      <div className="min-w-max">
        <div className="grid" style={{ gridTemplateColumns: `${staffInfoWidth} repeat(${days.length}, minmax(70px, 1fr))`}}>
          
          {/* --- ヘッダー行 --- */}
          <div className={`${stickyHeaderCellClass} left-0`}>役職</div>
          <div className={`${stickyHeaderCellClass} left-[60px]`}>社員番号</div>
          <div className={`${stickyHeaderCellClass} left-[160px]`}>稼働名前</div>
          <div className={`${stickyHeaderCellClass} left-[280px]`}>基本シフト設定</div>
          <div className={`${stickyHeaderCellClass} left-[430px]`}>提出☑</div>
          <div className={`${stickyHeaderCellClass} left-[490px]`}>差戻☑</div>
          <div className={`${stickyHeaderCellClass} left-[550px]`}>承認☑</div>
          <div className={`${stickyHeaderCellClass} left-[610px] border-r-2 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)]`}>削除</div>

          {days.map(({ day, dayOfWeek }) => {
            const isHoliday = holidays.includes(day);
            const dayHeaderClasses = getDayHeaderClass(dayOfWeek, isHoliday);
            const isDayFullyLocked = staff.length > 0 && staff.every(s => {
                const entry = schedule[s.id]?.[day];
                return typeof entry === 'object' && entry !== null && 'type' in entry && entry.type === '休' && 'locked' in entry && entry.locked;
            });
            
            return (
                <div key={day} className={dayHeaderClasses}>
                  <div>{day}</div>
                  <div>{dayOfWeek}</div>
                  {isAdmin && (
                    <button
                        onClick={() => onSetDayAsHolidayForAll(day)}
                        className="group absolute bottom-1 right-1 p-0.5 bg-white/50 rounded-full hover:bg-sky-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-sky-500"
                        aria-label={isDayFullyLocked ? `${day}日の休日設定を解除` : `${day}日を全員の休日に設定`}
                    >
                        {isDayFullyLocked ? <UnlockIcon /> : <SetHolidayIcon />}
                    </button>
                  )}
                </div>
            )
          })}

          {/* --- データ行 --- */}
          {staff.map((staffMember) => {
            // ★変更: 管理者か、自分の行なら編集可能
            const isEditable = isAdmin || currentUser.id === staffMember.id;
            
            return (
              <React.Fragment key={staffMember.id}>
                <EditableStaffInfoCell value={staffMember.role} onUpdate={(val) => onUpdateStaffInfo(staffMember.id, 'role', val)} className="sticky left-0 z-20 bg-slate-50 border-r" disabled={!isEditable} />
                <EditableStaffInfoCell value={staffMember.employeeId} onUpdate={(val) => onUpdateStaffInfo(staffMember.id, 'employeeId', val)} className="sticky left-[60px] z-20 bg-slate-50 border-r" disabled={!isEditable} />
                <EditableStaffInfoCell value={staffMember.name} onUpdate={(val) => onUpdateStaffInfo(staffMember.id, 'name', val)} className="sticky left-[160px] z-20 bg-slate-50 border-r" disabled={!isEditable} />
                
                <div className="sticky left-[280px] bg-slate-50 border-b border-r border-slate-300 text-xs z-20 h-9 flex items-center px-1">
                    <ShiftPatternEditor
                      pattern={staffMember.defaultShift.pattern}
                      patterns={shiftPatterns}
                      onApply={(newPattern) => onApplyStaffPattern(staffMember.id, newPattern)}
                      summary={patternSummary(staffMember)}
                      disabled={!isEditable}
                    />
                </div>

                <div className="sticky left-[430px] bg-slate-50 border-b border-r border-slate-300 flex items-center justify-center z-20 h-9">
                  <input
                    type="checkbox"
                    checked={staffMember.shiftSubmitted?.[`${year}-${month}`] || false}
                    onChange={() => onToggleShiftSubmitted(staffMember.id)}
                    className="h-5 w-5 rounded border-slate-400 text-sky-600 focus:ring-sky-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
                    disabled={!isEditable}
                  />
                </div>

                <div className="sticky left-[490px] bg-slate-50 border-b border-r border-slate-300 flex items-center justify-center z-20 h-9">
                  <input
                    type="checkbox"
                    checked={staffMember.shiftRemanded?.[`${year}-${month}`] || false}
                    onChange={() => onToggleShiftRemanded(staffMember.id)}
                    className="h-5 w-5 rounded border-slate-400 text-red-600 focus:ring-red-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
                    disabled={!isAdmin}
                  />
                </div>

                <div className="sticky left-[550px] bg-slate-50 border-b border-r border-slate-300 flex items-center justify-center z-20 h-9">
                  <input
                    type="checkbox"
                    checked={staffMember.shiftApproved?.[`${year}-${month}`] || false}
                    onChange={() => onToggleShiftApproved(staffMember.id)}
                    className="h-5 w-5 rounded border-slate-400 text-green-600 focus:ring-green-500 cursor-pointer disabled:cursor-not-allowed disabled:bg-slate-200"
                    disabled={!isAdmin}
                  />
                </div>

                <div className="sticky left-[610px] bg-slate-50 border-b border-r-2 border-slate-300 flex items-center justify-center z-20 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.1)] h-9">
                  {isAdmin && (
                    <button
                      type="button"
                      onMouseDown={() => onDeleteStaff(staffMember.id)}
                      className="group p-1 rounded-full hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 flex items-center justify-center"
                      aria-label={`${staffMember.name}さんを削除`}
                      style={{ width: '28px', height: '28px' }}
                    >
                      <DeleteIcon />
                    </button>
                  )}
                </div>

                {/* カレンダーセル */}
                {days.map(({ day, dayOfWeek }) => {
                  const isHoliday = holidays.includes(day);
                  return (
                      <EditableCell 
                        key={`${staffMember.id}-${day}`}
                        value={isHoliday ? '休' : (schedule[staffMember.id]?.[day] ?? '')}
                        onUpdate={(value) => onUpdateSchedule(staffMember.id, day, value)}
                        borderClass={`${getCellBorderClass(dayOfWeek, isHoliday)}`}
                        disabled={!isEditable}
                        isAdmin={isAdmin}
                      />
                  )
                })}
              </React.Fragment>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default ShiftSchedule;

export const getJapaneseHolidays = (year, month) => {
    const holidays = [];

    // 固定祝日
    const fixedHolidays = [
        { m: 1, d: 1 },   // 元日
        { m: 2, d: 11 },  // 建国記念の日
        { m: 2, d: 23 },  // 天皇誕生日
        { m: 4, d: 29 },  // 昭和の日
        { m: 5, d: 3 },   // 憲法記念日
        { m: 5, d: 4 },   // みどりの日
        { m: 5, d: 5 },   // こどもの日
        { m: 8, d: 11 },  // 山の日
        { m: 11, d: 3 },  // 文化の日
        { m: 11, d: 23 }, // 勤労感謝の日
    ];

    fixedHolidays.forEach(h => {
        if (h.m === month) holidays.push(h.d);
    });

    // ハッピーマンデー (成人の日, 海の日, 敬老の日, スポーツの日)
    // 指定された月の第n月曜日を返す関数（ループ版）
    const getNthMonday = (y, m, n) => {
        let count = 0;
        // 月の1日から順にループして探す
        for (let d = 1; d <= 31; d++) {
            const date = new Date(y, m - 1, d);
            // 月が変わったら終了
            if (date.getMonth() !== m - 1) break;
            
            if (date.getDay() === 1) { // 1: Monday
                count++;
                if (count === n) {
                    return d;
                }
            }
        }
        return null;
    };

    if (month === 1) {
        const d = getNthMonday(year, 1, 2); // 成人の日
        if (d) holidays.push(d);
    }
    if (month === 7) {
        const d = getNthMonday(year, 7, 3); // 海の日
        if (d) holidays.push(d);
    }
    if (month === 9) {
        const d = getNthMonday(year, 9, 3); // 敬老の日
        if (d) holidays.push(d);
    }
    if (month === 10) {
        const d = getNthMonday(year, 10, 2); // スポーツの日
        if (d) holidays.push(d);
    }

    // 春分の日・秋分の日 (簡易計算)
    if (month === 3) {
        const vernalEquinoxDay = Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
        holidays.push(vernalEquinoxDay);
    }
    if (month === 9) {
        const autumnalEquinoxDay = Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4));
        holidays.push(autumnalEquinoxDay);
    }

    // 振替休日
    // 祝日が日曜日の場合、その翌日以降の平日を休日とする
    const sortedHolidays = [...new Set(holidays)].sort((a, b) => a - b);
    const observedHolidays = [];

    sortedHolidays.forEach(d => {
        const date = new Date(year, month - 1, d);
        if (date.getDay() === 0) { // Sunday
            let nextDay = d + 1;
            // 既存の祝日や既に決定した振替休日と重なる場合はさらに翌日へ
            while (sortedHolidays.includes(nextDay) || observedHolidays.includes(nextDay)) {
                nextDay++;
            }
            const daysInMonth = new Date(year, month, 0).getDate();
            if (nextDay <= daysInMonth) {
                observedHolidays.push(nextDay);
            }
        }
    });
    
    // 国民の休日 (祝日と祝日に挟まれた平日)
    let allHolidays = [...sortedHolidays, ...observedHolidays].sort((a, b) => a - b);
    
    // 国民の休日の判定には、本来翌月なども考慮が必要だが、簡易的に同月内のみ判定
    // (例: 敬老の日と秋分の日の間)
    for (let i = 0; i < allHolidays.length - 1; i++) {
        const d1 = allHolidays[i];
        const d2 = allHolidays[i+1];
        if (d2 - d1 === 2) {
             const middleDay = d1 + 1;
             const middleDate = new Date(year, month - 1, middleDay);
             if (middleDate.getDay() !== 0 && !allHolidays.includes(middleDay)) {
                 allHolidays.push(middleDay);
             }
        }
    }

    return [...new Set(allHolidays)].sort((a, b) => a - b);
};

export const formatValue = (value) => {
    if (typeof value === 'number') {
        return value % 1 === 0 ? Math.floor(value) : value;
    }
    if (typeof value === 'string') {
        return value;
    }
    if (value && typeof value === 'object' && 'type' in value) {
        if ('locked' in value) { // Handle LockedHoliday
            return value.type;
        }
      return `${value.type}(${value.hours})`;
    }
    return '';
};

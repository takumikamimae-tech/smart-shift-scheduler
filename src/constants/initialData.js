// 他の export (initialShiftPatterns など) はそのまま残し、initialStaffData だけ変更します

export const initialStaffData = [];

// 以下、initialAdminConfig や initialTasks もそのまま残します
export const initialAdminConfig = {
  submissionNotificationIds: "103447655031837803879, 104076674700109610671"
};

export const initialTasks = [
  { id: 't1', name: '早番電話', requiredPersonnel: 3 },
  { id: 't2', name: '遅番電話', requiredPersonnel: 3 },
  { id: 't3', name: 'メール対応', requiredPersonnel: 2 },
  { id: 't4', name: 'チャット対応', requiredPersonnel: 2 },
];
// ... (initialShiftPatternsがあればそれも残す)

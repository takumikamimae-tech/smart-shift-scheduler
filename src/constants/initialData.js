export const initialShiftPatterns = [
  { id: 'A', name: 'A', startTime: '9:00', endTime: '18:00', breakHours: 1.0, workHours: 8.0, displayTime: '9:00 - 18:00' },
  { id: 'B', name: 'B', startTime: '9:00', endTime: '17:30', breakHours: 1.0, workHours: 7.5, displayTime: '9:00 - 17:30' },
  { id: 'C', name: 'C', startTime: '9:00', endTime: '17:00', breakHours: 1.0, workHours: 7.0, displayTime: '9:00 - 17:00' },
  { id: 'D', name: 'D', startTime: '9:00', endTime: '16:30', breakHours: 1.0, workHours: 6.5, displayTime: '9:00 - 16:30' },
  { id: 'E', name: 'E', startTime: '9:00', endTime: '16:00', breakHours: 1.0, workHours: 6.0, displayTime: '9:00 - 16:00' },
  { id: 'F', name: 'F', startTime: '9:00', endTime: '15:30', breakHours: 1.0, workHours: 5.5, displayTime: '9:00 - 15:30' },
  { id: 'G', name: 'G', startTime: '9:00', endTime: '15:00', breakHours: 1.0, workHours: 5.0, displayTime: '9:00 - 15:00' },
  { id: 'H', name: 'H', startTime: '9:00', endTime: '13:00', breakHours: 0.0, workHours: 4.0, displayTime: '9:00 - 13:00' },
  { id: 'I', name: 'I', startTime: '9:30', endTime: '18:30', breakHours: 1.0, workHours: 8.0, displayTime: '9:30 - 18:30' },
  { id: 'J', name: 'J', startTime: '9:30', endTime: '18:00', breakHours: 1.0, workHours: 7.5, displayTime: '9:30 - 18:00' },
  { id: 'K', name: 'K', startTime: '9:30', endTime: '17:30', breakHours: 1.0, workHours: 7.0, displayTime: '9:30 - 17:30' },
  { id: 'L', name: 'L', startTime: '9:30', endTime: '17:00', breakHours: 1.0, workHours: 6.5, displayTime: '9:30 - 17:00' },
  { id: 'M', name: 'M', startTime: '9:30', endTime: '16:30', breakHours: 1.0, workHours: 6.0, displayTime: '9:30 - 16:30' },
  { id: 'N', name: 'N', startTime: '9:30', endTime: '16:00', breakHours: 1.0, workHours: 5.5, displayTime: '9:30 - 16:00' },
  { id: 'O', name: 'O', startTime: '9:30', endTime: '15:30', breakHours: 1.0, workHours: 5.0, displayTime: '9:30 - 15:30' },
  { id: 'P', name: 'P', startTime: '10:00', endTime: '18:30', breakHours: 1.0, workHours: 7.5, displayTime: '10:00 - 18:30' },
  { id: 'Q', name: 'Q', startTime: '10:00', endTime: '18:00', breakHours: 1.0, workHours: 7.0, displayTime: '10:00 - 18:00' },
  { id: 'R', name: 'R', startTime: '10:00', endTime: '17:00', breakHours: 1.0, workHours: 6.0, displayTime: '10:00 - 17:00' },
  { id: 'S', name: 'S', startTime: '10:00', endTime: '16:00', breakHours: 1.0, workHours: 5.0, displayTime: '10:00 - 16:00' },
  { id: 'T', name: 'T', startTime: '11:00', endTime: '20:00', breakHours: 1.0, workHours: 8.0, displayTime: '11:00 - 20:00' },
  { id: 'U', name: 'U', startTime: '13:00', endTime: '20:00', breakHours: 1.0, workHours: 6.0, displayTime: '13:00 - 20:00' },
  { id: 'V', name: 'V', startTime: '12:00', endTime: '20:00', breakHours: 1.0, workHours: 7.0, displayTime: '12:00 - 20:00' },
  { id: 'W', name: 'W', startTime: '13:30', endTime: '18:00', breakHours: 0.0, workHours: 4.5, displayTime: '13:30 - 18:00' },
  { id: 'X', name: 'X', startTime: '10:00', endTime: '14:00', breakHours: 0.0, workHours: 4.0, displayTime: '10:00 - 14:00' },
  { id: 'Y', name: 'Y', startTime: '10:00', endTime: '13:00', breakHours: 0.0, workHours: 3.0, displayTime: '10:00 - 13:00' },
  { id: 'Z', name: 'Z', startTime: '14:00', endTime: '20:00', breakHours: 1.0, workHours: 5.0, displayTime: '14:00 - 20:00' },
  { id: '@', name: '@', startTime: '14:30', endTime: '20:00', breakHours: 1.0, workHours: 4.5, displayTime: '14:30 - 20:00' },
];

export const initialStaffData = [];

export const initialAdminConfig = {
  submissionNotificationIds: "103447655031837803879, 104076674700109610671"
};

export const initialTasks = [
  { id: 't1', name: '早番電話', requiredPersonnel: 3 },
  { id: 't2', name: '遅番電話', requiredPersonnel: 3 },
  { id: 't3', name: 'メール対応', requiredPersonnel: 2 },
  { id: 't4', name: 'チャット対応', requiredPersonnel: 2 },
];

export function getTimeDifferenceText(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const diffMs = endDate.getTime() - startDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));

  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  let result = '';
  if (hours > 0) result += `${hours}시간 `;
  if (minutes > 0) result += `${minutes}분`;
  if (result === '') result = '0분';

  return result.trim();
}

export function formatToHourMinute(dateString: string): string {
  const date = new Date(dateString);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

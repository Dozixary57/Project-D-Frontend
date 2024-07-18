function padZero(value: number): string {
  return value.toString().padStart(2, '0');
}

function getDateComponents(timestamp: string): { date: Date, hours: string, minutes: string, day: string, month: string, year: number } {
  const date = new Date(Number(timestamp));
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1);
  const year = date.getFullYear();

  return { date, hours, minutes, day, month, year };
}

export function DateTimeFormatter(timestamp: string): string {
  const { hours, minutes, day, month, year } = getDateComponents(timestamp);
  return `${hours}:${minutes} ${month}/${day}/${year}`;
}

export function DateFormatter(timestamp: string): string {
  const { day, month, year } = getDateComponents(timestamp);
  return `${month}/${day}/${year}`;
}

export function TimeFormatter(timestamp: string): string {
  const { hours, minutes } = getDateComponents(timestamp);
  return `${hours}:${minutes}`;
}

export function TimestampToInputValue(timestamp: string): string {
  const { year, month, day } = getDateComponents(timestamp);
  return `${year}-${month}-${day}`;
}

export function InputValueToTimestamp(inputValue: string): string {
  const date = new Date(inputValue);
  const timestamp = date.getTime();
  return String(timestamp);
}

export function FileSizeFormatter(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

  const base = 1024;

  if (bytes < 1) return '0 B';

  const index = Math.floor(Math.log(bytes) / Math.log(base));

  const size = (bytes / Math.pow(base, index)).toFixed(2);

  const roundedSize = Math.ceil(parseFloat(size) * 100) / 100;

  return `${roundedSize} ${units[index]}`;
}

export function FileExtensionFormatter(mimeType: string): string {
  const [mainType] = mimeType.split('/');
  return mainType;
}
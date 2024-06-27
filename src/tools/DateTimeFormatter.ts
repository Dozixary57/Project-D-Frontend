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
 
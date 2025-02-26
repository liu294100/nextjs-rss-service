// src/utils/timezone.ts

export default function timezone(date: Date, offset: number): Date {
    if (isNaN(offset)) {
      return date;
    }
    const utc = date.getTime() + (date.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * offset));
}
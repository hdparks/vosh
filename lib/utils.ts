import { type ClassValue, clsx } from 'clsx'
import { formatISOWithOptions, formatWithOptions } from 'date-fns/fp';
import { twMerge } from 'tailwind-merge'
import { addMinutes } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AcceptableValue = string | number | boolean | Record<string, any>;
export type ArrayOrWrapped<T> = T extends any[] ? T : Array<T>;
export const toNiceDate = formatWithOptions({},"M/d")
export const toIsoDate = formatISOWithOptions({representation: 'date'})

export function fixDumbDrizzleDateIssues(date:Date): Date {
  const result = addMinutes(date,date.getTimezoneOffset())
  return result
}

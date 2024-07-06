import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AcceptableValue = string | number | boolean | Record<string, any>;
export type ArrayOrWrapped<T> = T extends any[] ? T : Array<T>;

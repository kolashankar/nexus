/**
 * Utility functions
 */
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num){
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

export function formatDate(date){
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year,
    month,
    day,
  });
}

export function formatDateTime(date){
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-US', {
    year,
    month,
    day,
    hour,
    minute,
  });
}

export function clamp(value, min, max){
  return Math.min(Math.max(value, min), max);
}

export function percentage(value, max){
  return clamp((value / max) * 100, 0, 100);
}

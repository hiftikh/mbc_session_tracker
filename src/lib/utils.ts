import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function orderByAlphabetically(a: number, b: number) {
  return a > b ? 1 : a < b ? -1 : 0;
}

export const colorVariantsTag: any = {
  blue: "bg-blue-700",
  red: "bg-red-700",
  yellow: "bg-yellow-600",
  green: "bg-green-600",
};

export const colorVariantsIcon: any = {
  blue: "#1d4ed8",
  red: "#b91c1c",
  yellow: "#ca8a04",
  green: "#16a34a",
};

import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function optimizeImageUrl(url: string, width: number, height?: number): string {
  if (!url || typeof url !== "string") return url;
  
  if (url.includes("res.cloudinary.com")) {
    if (url.includes("w_") && url.includes("h_")) return url;
    const transformString = `f_auto,q_auto,w_${width}${height ? `,h_${height},c_fill` : ""}`;
    if (url.includes("/upload/f_auto,q_auto/")) {
      return url.replace("/upload/f_auto,q_auto/", `/upload/${transformString}/`);
    } else if (url.includes("/upload/")) {
      return url.replace("/upload/", `/upload/${transformString}/`);
    }
  }
  
  if (url.includes("images.unsplash.com")) {
    if (url.includes("w=")) {
      return url.replace(/w=\d+/, `w=${width}`);
    }
    return `${url}&w=${width}`;
  }
  
  return url;
}

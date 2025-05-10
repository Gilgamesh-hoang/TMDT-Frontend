import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import imageCompression, { Options } from "browser-image-compression";

dayjs.extend(relativeTime);
export const compressImageToWebP = async (file: File): Promise<File> => {
  const options: Options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1024,
    useWebWorker: true,
    fileType: "image/webp",
  };
  return await imageCompression(file, options);
};
export const toMb = (bytes: number): string => {
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + "Kb";
  return (bytes / (1024 * 1024)).toFixed(1) + "Mb";
};

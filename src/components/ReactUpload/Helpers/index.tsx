import { FileStatus, ReactUploadFile } from "../types/types";
import { v4 as uuidv4 } from "uuid";

export const createNewReactUploadFile = (
  file: File,
  status: FileStatus = FileStatus.ADDED
): ReactUploadFile => {
  const uuid = uuidv4();

  return {
    originalFile: file,
    uuid,
    filename: file.name,
    uuidFileName: `${uuid}.${file.name.split(".").pop()}`,
    size: file.size,
    type: file.type,
    status: status,
    upload: {
      bytesSent: 0,
      progress: 0,
    },
  };
};

export const getFriendlySize = (bytes: number, dp = 1) => {
  const thresh = 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return `${bytes.toFixed(dp)} ${units[u]}`;
};

export const generateThumbnail = (
  file: File,
  callback: (fileResult: string | ArrayBuffer | null) => void
) => {
  let reader = new FileReader();

  reader.onloadend = () => {
    callback(reader.result);
  };

  reader.readAsDataURL(file);
};

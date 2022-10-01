export enum FileStatus {
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  UPLOADING = "UPLOADING",
  QUEUED = "QUEUED",
  ADDED = "ADDED",
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
}

export interface ReactUploadProps {
  minWidth?: string;
  minHeight?: string;
}

export interface ReactUploadFileInfo {
  uuid: string;
  filename: string;
  uuidFileName: string;
  size: number;
  type: string;
  status: FileStatus;
}

export interface ReactUploadFileUpload {
  bytesSent: number;
  progress: number;
}

export interface ReactUploadFile extends ReactUploadFileInfo {
  originalFile: File;
  upload: ReactUploadFileUpload;
}

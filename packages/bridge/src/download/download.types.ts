import { BridgeMethod } from "../types";
import { BridgeRequest } from "../messaging/messaging.types";

export type DownloadRequest = BridgeRequest<
  BridgeMethod.DOWNLOAD,
  {
    fileName: string;
    fileType: string;
    url?: string;
    dataUrl?: string;
  }
>;

export type DownloadResult = boolean;

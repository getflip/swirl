import { v4 as uuidv4 } from "uuid";
import { makeRequest } from "../messaging";
import { BridgeMethod } from "../types";
import { DownloadRequest, DownloadResult } from "./download.types";

export function download(
  fileName: string,
  fileType: string,
  url?: string,
  dataUrl?: string
) {
  const request: DownloadRequest = {
    id: uuidv4(),
    method: BridgeMethod.DOWNLOAD,
    params: {
      fileName,
      fileType,
      url,
      dataUrl,
    },
  };

  return makeRequest<DownloadResult>(request);
}

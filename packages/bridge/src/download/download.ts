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
    id: crypto.randomUUID(),
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

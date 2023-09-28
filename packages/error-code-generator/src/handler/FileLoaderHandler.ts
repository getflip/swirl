import { Handler, Request } from "..";
import fs from "fs";
import path from "path";

export class FileLoaderHandler implements Handler {
  private next: Handler | null = null;

  setNext(handler: Handler): Handler {
    this.next = handler;
    return handler;
  }

  handle(request: Request): void {
    const { folderPath } = request;

    const resolvedFolderPath = path.resolve(__dirname, request.folderPath);
    const specpaths = fs.readdirSync(resolvedFolderPath).map((filename) => {
      return path.resolve(__dirname, `${folderPath}`, filename);
    });

    request.specpaths = specpaths;

    if (this.next) {
      this.next.handle(request);
    }
  }
}

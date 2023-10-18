import fs from "fs";
import path from "path";

export class FileSystemHandler {
  writeToFile(filePath: string, data: string) {
    console.log("Writing to file: ", filePath);

    if (!fs.existsSync(filePath)) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    console.log("Writing to file: ", filePath);

    fs.writeFileSync(filePath, data, "utf8");
  }

  checkAndCreateDir(dirPath: string) {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }
}

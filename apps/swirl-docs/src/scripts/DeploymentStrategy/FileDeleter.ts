import path from "path";
import fs from "fs";
import { DeploymentStrategy } from ".";

export class FileDeleter {
  private globalSpecs = ["shared.yml", "problem.yml"];

  constructor(private strategy: DeploymentStrategy["strategy"]) {}

  moveAndDeleteSpecs() {
    console.log("Cleaning global specs...");
    this.deleteGlobalSpecs();
    console.log("Moving global specs...");
    this.moveGlobalSpecs();
    console.log("Deleting api directory...");

    if (this.strategy === "production") {
      this.deleteAllInDirectory("./src/documents/api");
    }
  }

  private moveGlobalSpecs() {
    this.globalSpecs.forEach((spec) => this.moveSpec(spec));
  }

  private moveSpec(spec: string) {
    const sourcePath = path.join("specs", `${spec}`);
    const destinationPath = path.join(".", `${spec}`);

    if (fs.existsSync(sourcePath)) {
      fs.rename(sourcePath, destinationPath, (err) => {
        if (err) {
          console.error(`Error: Unable to rename ${spec}`, err);
          return;
        }
        console.log(`Moved global spec ${spec} to root for oasBuilder`);
      });
    } else {
      console.log(`Spec ${spec} does not exist. Moving on...`);
    }
  }

  private deleteGlobalSpecs() {
    this.deleteSpec("version-info.yml");
    this.deleteSpec("merged.yml");
  }

  private deleteSpec(spec: string) {
    const specPath = path.join("specs", `${spec}`);

    if (fs.existsSync(specPath)) {
      fs.unlink(specPath, (err) => {
        if (err) {
          console.error(`Error: Unable to delete ${spec}`, err);
          return;
        }
        console.log(`Deleted spec ${spec}`);
      });
    } else {
      console.log(`Spec ${spec} does not exist. Moving on...`);
    }
  }

  private deleteAllInDirectory(directory: string): void {
    if (fs.existsSync(directory)) {
      const files = fs.readdirSync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
          this.deleteAllInDirectory(filePath); // Recursive call for subdirectory
          fs.rmdirSync(filePath); // Remove the now-empty directory
        } else if (stat.isFile()) {
          fs.unlinkSync(filePath); // Remove the file
        }
      }
    } else {
      console.log(`Directory ${directory} does not exist.`);
    }
  }
}

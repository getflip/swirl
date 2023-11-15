import { DeploymentStrategy } from ".";
import fs from "fs";
import path from "path";
import { promisify } from "util";

const renameAsync = promisify(fs.rename);
const unlinkAsync = promisify(fs.unlink);
const readdirAsync = promisify(fs.readdir);
const copyFileAsync = promisify(fs.copyFile);

export class FileOperator {
  private globalSpecs = ["shared.yml", "problem.yml"];
  private crossReferencedSpecs = [
    "usergroups.yml",
    "users.yml",
    "channels.yml",
  ];

  constructor(private strategy: DeploymentStrategy["strategy"]) {}

  async moveAndDeleteSpecs() {
    console.log("Cleaning global specs...");
    await this.deleteGlobalSpecs();

    console.log("Moving global specs...");
    await this.moveGlobalSpecs();

    console.log("Copying cross-referenced specs..."); // Added this
    await this.copyCrossReferencedSpecs();

    if (this.strategy === "production") {
      console.log("Deleting api directory...");
      this.deleteAllInDirectory("./src/documents/api");
    }
  }

  private async moveGlobalSpecs() {
    for (const spec of this.globalSpecs) {
      await this.moveSpec(spec);
    }
  }

  private async moveSpec(spec: string) {
    const sourcePath = path.join("specs", `${spec}`);
    const destinationPath = path.join(".", `${spec}`);

    if (fs.existsSync(sourcePath)) {
      try {
        await renameAsync(sourcePath, destinationPath);
        console.log(`Moved global spec ${spec} to root for oasBuilder`);
      } catch (err) {
        console.error(`Error: Unable to rename ${spec}`, err);
      }
    } else {
      console.log(`Spec ${spec} does not exist. Moving on...`);
    }
  }

  private async deleteGlobalSpecs() {
    await this.deleteSpec("version-info.yml");
    await this.deleteSpec("merged.yml");

    // for preview
    await this.deleteSpec("branding.yml");
    await this.deleteSpec("files.yml");
    await this.deleteSpec("organisations.yml");
    await this.deleteSpec("posts.yml");
    await this.deleteSpec("sharepoint-pages.yml");
    // await this.deleteSpec("usergroups.yml");
    // await this.deleteSpec("users.yml");
  }

  private async deleteSpec(spec: string) {
    const specPath = path.join("specs", `${spec}`);

    if (fs.existsSync(specPath)) {
      try {
        await unlinkAsync(specPath);
        console.log(`Deleted spec ${spec}`);
      } catch (err) {
        console.error(`Error: Unable to delete ${spec}`, err);
      }
    } else {
      console.log(`Spec ${spec} does not exist. Moving on...`);
    }
  }

  private async copyCrossReferencedSpecs() {
    // New function for copying specs
    for (const spec of this.crossReferencedSpecs) {
      await this.copySpec(spec);
    }
  }

  private async copySpec(spec: string) {
    // New function to copy individual spec
    const sourcePath = path.join("specs", `${spec}`);
    const destinationPath = path.join(".", `${spec}`);

    if (fs.existsSync(sourcePath)) {
      try {
        await copyFileAsync(sourcePath, destinationPath);
        console.log(
          `Copied cross-referenced spec ${spec} to root for oasBuilder`
        );
      } catch (err) {
        console.error(`Error: Unable to copy ${spec}`, err);
      }
    } else {
      console.log(`Spec ${spec} does not exist. Moving on...`);
    }
  }

  private async deleteAllInDirectory(directory: string) {
    if (fs.existsSync(directory)) {
      const files = await readdirAsync(directory);

      for (const file of files) {
        const filePath = path.join(directory, file);
        const stat = fs.lstatSync(filePath);

        if (stat.isDirectory()) {
          await this.deleteAllInDirectory(filePath); // Recursive call for subdirectory
          fs.rmdirSync(filePath); // Remove the now-empty directory
        } else if (stat.isFile()) {
          await unlinkAsync(filePath); // Remove the file
        }
      }
    } else {
      console.log(`Directory ${directory} does not exist.`);
    }
  }
}

import * as fs from "fs";

export default function createDirectoryIfNeeded(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

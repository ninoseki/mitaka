import fs from "fs";
import path from "path";
import Archiver from "archiver";

import packageJson from "../package.json";

interface ExtensionData {
  name: string;
  version: string;
}

const DEST_DIR = path.join(__dirname, "../dist");
const DEST_ZIP_DIR = path.join(__dirname, "../dist-zip");

const extractExtensionData = (): ExtensionData => {
  return {
    name: packageJson.name,
    version: packageJson.version,
  };
};

const makeDestZipDirIfNotExists = (): void => {
  if (!fs.existsSync(DEST_ZIP_DIR)) {
    fs.mkdirSync(DEST_ZIP_DIR);
  }
};

const buildZip = (
  src: string,
  dist: string,
  zipFilename: string
): Promise<void> => {
  console.info(`Building ${zipFilename}...`);

  const archive = Archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(path.join(dist, zipFilename));

  return new Promise((resolve, reject) => {
    archive
      .directory(src, false)
      .on("error", (err) => reject(err))
      .pipe(stream);

    stream.on("close", () => resolve());
    archive.finalize();
  });
};

const main = (): void => {
  const extData = extractExtensionData();
  const zipFilename = `${extData.name}-v${extData.version}.zip`;

  makeDestZipDirIfNotExists();

  buildZip(DEST_DIR, DEST_ZIP_DIR, zipFilename)
    .then(() => console.info("OK"))
    .catch(console.error);
};

main();

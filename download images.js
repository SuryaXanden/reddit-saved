const got = require("got");
const fs = require("fs");
const crypto = require("crypto");

const { createWriteStream } = require("fs");
const stream = require("stream");
const { promisify } = require("util");
const pipeline = promisify(stream.pipeline);

const links = require("./links.json").filter((i) => i.endsWith(".jpg"));

const fileNameGenerator = (fileName) => {
  const md5sum = crypto.createHash("md5");
  md5sum.update(fileName);
  return md5sum.digest("hex");
};

const download = async () => {
  for (url of links) {
    try {
      const fileName = fileNameGenerator(url);
      const fileNameWithPath = `./images/${fileName}.png`;
      if (fs.existsSync(fileNameWithPath)) {
        console.log(`Link ${url} already exists as file ${fileNameWithPath}`);
      } else {
        const downloadStream = got.stream(url);
        const fileWriterStream = createWriteStream(fileNameWithPath);

        await pipeline(downloadStream, fileWriterStream);
        console.log(`${url} downloaded as ${fileNameWithPath}`);
      }
    } catch (error) {
      console.error(
        `Something went wrong while downloading ${url}. ${error.message}`
      );
    }
  }
};

download();

"use strict";

const fs = require("node:fs");
const glossary = require("./glossary.json");

const CONTENT_PATH_PREFIX = "./src/content";
const LOG_KEY = {
  ERROR: "ERROR",
  GLOSSARY: "GLOSSARY",
};
const docExtensions = ["md", "mdx"];

const log = (cmd, msg) => {
  const color = ((cmd) => {
    switch (cmd) {
      case LOG_KEY.ERROR:
        return 31;
      case LOG_KEY.GLOSSARY:
        return 34;
      default:
        return 33;
    }
  })(cmd);
  const data = `\u001B[${color}m[${cmd}]\u001B[0m ${msg}`;
  console.info(data);
};

const getTargetPaths = (cmd) =>
  docExtensions.map(
    (extension) => `${CONTENT_PATH_PREFIX}/${cmd}.${extension}`,
  );

const getSplitLineData = (targetPath) => {
  const fileData = fs.readFileSync(targetPath, "utf8");
  const splitLines = fileData.toString().split("\n");
  return splitLines;
};

const checkLine = (line, index) => {
  try {
    const tokens = line.split(" ").filter(Boolean);
    for (const token of tokens) {
      if (!glossary[token] || token === glossary[token]) continue;
      log(LOG_KEY.GLOSSARY, `${index + 1}: ${token} -> ${glossary[token]}`);
    }
  } catch (err) {
    log(LOG_KEY.ERROR, err.toString());
  }
};

for (const [index, cmd] of process.argv.entries()) {
  if (index < 2) continue;
  log("CMD", cmd);

  const targetPaths = getTargetPaths(cmd);

  // Parallel start
  for (const targetPath of targetPaths) {
    log("READ START", targetPath);

    try {
      const splitLines = getSplitLineData(targetPath);
      for (const [index, line] of splitLines.entries()) {
        checkLine(line, index);
      }
    } catch (err) {
      log(LOG_KEY.ERROR, "File not exist");
      throw err;
    }
  }
}

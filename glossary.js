const fs = require('fs');
const glossary = require('./glossary.json');

const CONTENT_PATH_PREFIX = './src/content';
const LOG_KEY = {
  ERROR: 'ERROR',
  GLOSSARY: 'GLOSSARY',
};
const docExtensions = ['md', 'mdx'];

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
  const data = `\x1b[${color}m[${cmd}]\x1b[0m ${msg}`;
  console.info(data);
};

const getTargetPaths = (cmd) => {
  return docExtensions.map((extension) => {
    return `${CONTENT_PATH_PREFIX}/${cmd}.${extension}`;
  });
};

const getSplitLineData = (targetPath) => {
  const fileData = fs.readFileSync(targetPath, 'utf-8');
  const splitLines = fileData.toString().split('\n');
  return splitLines;
};

const checkLine = (line, index) => {
  try {
    const tokens = line.split(' ').filter((text) => text);
    tokens.forEach((token) => {
      if (!glossary[token] || token === glossary[token]) return;
      log(LOG_KEY.GLOSSARY, `${index + 1}: ${token} -> ${glossary[token]}`);
    });
  } catch (e) {
    log(LOG_KEY.ERROR, e.toString());
  }
};

process.argv.forEach((cmd, index) => {
  if (index < 2) return;
  log('CMD', cmd);

  const targetPaths = getTargetPaths(cmd);

  // Parallel start
  targetPaths.forEach((targetPath) => {
    log('READ START', targetPath);

    try {
      const splitLines = getSplitLineData(targetPath);
      splitLines.forEach(checkLine);
    } catch (e) {
      log(LOG_KEY.ERROR, 'File not exist');
    }
  });
});

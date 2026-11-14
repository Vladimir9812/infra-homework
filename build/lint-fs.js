import { readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* Чтение файлов */
const readFiles = async () => {
  const filesPath = path.join(__dirname, '..', 'src', 'components');

  return readdir(filesPath, {
    recursive: true,
    withFileTypes: true
  });
};

/* Парсинг файлов */
const parseFiles = (files) => {
  const sourceMap = new Map();

  files.forEach((source) => {
    if (source.isDirectory() && !sourceMap.has(source.name)) {
      sourceMap.set(source.name, []);
    }

    if (source.isFile()) {
      const parentDir = path.basename(source.parentPath);

      if (!sourceMap.has(parentDir)) {
        sourceMap.set(parentDir, []);
      }

      sourceMap.get(parentDir).push(source.name);
    }
  });

  return sourceMap;
};

/* Проверка файлов */
const checkFiles = (filesMap) => {
  const messageBuilder = (component, file) => `Structure of component ${component} is broken! Missing ${file}`;

  const messages = [];

  for (const [dir, files] of filesMap.entries()) {
    const hasIndexFile = files.indexOf('index.js') > -1;
    const hasComponentFile = files.indexOf(`${dir}.js`) > -1;

    if (!hasIndexFile) {
      messages.push(messageBuilder(dir, 'index.js'));
    }

    if (!hasComponentFile) {
      messages.push(messageBuilder(dir, `${dir}.js`));
    }
  }

  return messages;
};

const startCheck = async () => {
  try {
    const files = await readFiles();
    const parsedMap = parseFiles(files);
    const validations = checkFiles(parsedMap);

    console.log(validations.join('\n'));
    process.exit(validations.length > 0 ? 1 : 0)
  } catch (e) {
    console.error(e.toString());
    process.exit(1);
  }
}

startCheck();

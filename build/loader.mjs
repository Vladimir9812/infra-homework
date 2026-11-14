import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs/promises';

export async function load(url, context, nextLoad) {
  if (path.extname(url) === '.yml') {
    try {
      const source = await fs.readFile(new URL(url), 'utf-8'); // utf-8 тк по умолчанию при чтении возвращается buffer

      return {
        format: 'json',
        shortCircuit: true,
        source: JSON.stringify(yaml.parse(source)),
      };
    } catch (err) {
      err.message = `[${url}] ${err.message}`;
      throw err;
    }
  }

  return nextLoad(url, context);
}

import yaml from 'yaml';
import path from 'node:path';
import fs from 'node:fs/promises';

export async function load(url, context, nextLoad) {
  if (path.extname(url) === '.yml') {
    try {
      const source = await fs.readFile(new URL(url), 'utf-8');
      const parsed = yaml.parse(source);
      const result = `export default ${JSON.stringify(parsed)};`;

      return {
        format: 'module',
        shortCircuit: true,
        source: result,
      };
    } catch (err) {
      err.message = `[${url}] ${err.message}`;
      throw err;
    }
  }

  return nextLoad(url, context);
}

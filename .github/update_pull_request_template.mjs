// @ts-check
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve, dirname } from 'path';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

const execAsync = promisify(exec)

async function DoWork() {
  const { stderr, stdout } = await execAsync('git rev-parse --abbrev-ref HEAD');
  const error = stderr?.trim();
  const output = stdout?.trim();

  // @ts-ignore - module is fine.
  const __filename = fileURLToPath(import.meta.url);
  const __dirName = dirname(__filename);
  const basePath = resolve(__dirName, 'BASE_PULL_REQUEST_TEMPLATE.md');
  const destPath = resolve(__dirName, 'PULL_REQUEST_TEMPLATE.md');

  // Get the template itself.
  const templateContents = readFileSync(basePath, { encoding: 'utf-8'});

  const updated = templateContents.replace('BRANCH_NAME_REPLACE_ME', output.trim());

  // Write the file back out.
  writeFileSync(destPath, updated);
}
DoWork();

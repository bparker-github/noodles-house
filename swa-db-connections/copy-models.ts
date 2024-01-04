import { copyFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

// Define async function.
async function copyModels() {
  // Get all pertinent directories
  const sourcePath = join(__dirname, 'models');
  const apiDestPath = resolve(join(__dirname, '..', 'api', 'src', 'database', 'models'));
  const uiDestPath = resolve(join(__dirname, '..', 'ui', 'src', 'repos', 'models'));

  // Print root level things of parent folder.
  const thisDirFiles = await readdir(__dirname);
  console.log('Found following files in thisDir:', __dirname);
  thisDirFiles.forEach((fileName) => console.log('\t' + fileName));

  const parentDir = resolve(join(__dirname, '..'));
  const parentFiles = await readdir(parentDir);
  console.log('Found following files in parentDir:', parentDir);
  parentFiles.forEach((fileName) => console.log('\t' + fileName));

  // Look up files to copy
  const foundFileNames = await readdir(sourcePath);
  console.log('Found the following Models to copy from', sourcePath);
  foundFileNames.forEach((fileName) => console.log('\t' + fileName));
  console.log('...to the following destinations:');
  [apiDestPath, uiDestPath].forEach((dest) => console.log('\t', dest));

  // Copy the files to all directories
  for (const fileName of foundFileNames) {
    const sourceFilePath = join(sourcePath, fileName);
    await copyFile(sourceFilePath, join(apiDestPath, fileName));
    await copyFile(sourceFilePath, join(uiDestPath, fileName));
  }

  console.log('Successfully copied files');
}

// Execute.
copyModels();

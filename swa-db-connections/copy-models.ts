import { copyFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

// Define async function.
async function copyModels() {
  // Get all pertinent directories
  const sourcePath = join(__dirname, 'models');
  const apiDestPath = join(__dirname, '..', 'api', 'src', 'database', 'models');
  const uiDestPath = join(__dirname, '..', 'ui', 'src', 'repos', 'models');

  // Print root level things of parent folder.
  const parentFiles = await readdir(__dirname, { withFileTypes: true });
  console.log('Found following files in', __dirname);
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

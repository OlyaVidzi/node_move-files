/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');

function moveFile() {
  const params = process.argv.slice(2);
  const source = params[0];
  const destination = params[1];

  if (!source || !destination) {
    console.error('Please provide a source file and a destination file.');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error('File does not exist.');

    return;
  }

  const isExistDirectory = fs.existsSync(destination);

  if (isExistDirectory) {
    const destStat = fs.statSync(destination);

    const newDestPath = destStat.isDirectory()
      ? path.join(destination, path.basename(source))
      : destination;

    fs.rename(source, newDestPath, (err) => {
      if (err) {
        console.error(err);
      }
    });

    return;
  }

  fs.rename(source, destination, (err) => {
    if (err) {
      console.error(err);
    }
  });
}

moveFile();

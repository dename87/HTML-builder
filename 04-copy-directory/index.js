const fs = require('fs');
const path = require('path');
const pathToFolder = path.resolve(__dirname, 'files');
const pathToNewFolder = path.resolve(__dirname, 'files-copy');

fs.access(pathToNewFolder, (err) => {
  if (err) {
    createFolder();
  } else {
    cleanFolder();
  }
});

function createFolder() {
  fs.mkdir(pathToNewFolder, { recursive: true }, (err) => {
    if (err) {
      console.log(`Ошибка при создании папки: ${err.message}`);
      return;
    }
    copyFolder();
  }); 
}

function cleanFolder() {
  fs.readdir(pathToNewFolder , (err, files) => {
    if (err) {
      console.log(`Ошибка при чтении папки: ${err.message}`);
      return;
    }
    files.forEach(file => {
      const pathToFile = path.resolve(pathToNewFolder, file);
      fs.unlink(pathToFile, (err) => {
        if (err) {
          console.log(`Ошибка при удалении файла: ${err.message}`);
        }
      });
    });
    copyFolder();
  });
}

function copyFolder() {
  fs.readdir(pathToFolder , (err, files) => {
    if (err) {
      console.log(`Ошибка при чтении папки: ${err.message}`);
      return;
    }
    files.forEach(file => {
      const pathToFile = path.resolve(pathToFolder, file);
      const pathToNewFile = path.resolve(pathToNewFolder, file);
      fs.copyFile(pathToFile, pathToNewFile, (err) => {
        if (err) {
          console.log(`Ошибка при копировании файла: ${err.message}`);
        }
      });
    });
    console.log('Копирование завершено');
  });
}

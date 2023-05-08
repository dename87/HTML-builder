const fs = require('fs');
const path = require('path');
const pathToStyles = path.resolve(__dirname, 'styles');
fs.mkdir(path.resolve(__dirname, 'project-dist'), { recursive: true }, (err) => {
  if (err) {
    console.log(`Ошибка при создании папки: ${err.message}`);
    return;
  }
  console.log('Папка создана');
});
const pathToResultFile = path.resolve(__dirname, 'project-dist/bundle.css');
const output = fs.createWriteStream(pathToResultFile);

fs.readdir(pathToStyles, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      const pathToFile = path.resolve(pathToStyles, file);
      const fileExt = path.extname(pathToFile);
      if (fileExt === '.css') {
        const stream = fs.createReadStream(pathToFile);
        let data = '';
        stream.on('data', chunk => data += chunk);
        stream.on('end', () => output.write(data));  
      }  
    });
    console.log('Файл создан');
    output.end();
  }
});

const pathToFolder = path.resolve(__dirname, 'assets');
const pathToNewFolder = path.resolve(__dirname, 'project-dist/assets');

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

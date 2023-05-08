const fs = require('fs');
const path = require('path');
const pathToStyles = path.resolve(__dirname, 'styles');
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
  }
});
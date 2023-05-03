const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');
fs.readdir(dirPath, 
  { withFileTypes: true },
  (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        fs.stat(path.join(dirPath, file.name), (err, stats) => {
          if (stats.isFile()) {
            console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size / 1024} ${'kb'}`);
          }
        });
      });
    }
  });

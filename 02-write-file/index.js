const fs = require('fs');
const path = require('path');
const { stdout, stdin } = require('process');
const out = fs.createWriteStream(path.join(__dirname, 'text.txt'));
stdout.write('Пожалуйста введите текст, который хотите сохранить:');

stdin.on('data', data => {
  if(data.toString().trim() === 'exit') {
    process.exit();
  } 
  out.write(data);
});

process.on('exit', () => stdout.write('Текст записан в файл: text.txt'));
process.on('SIGINT', () => process.exit());

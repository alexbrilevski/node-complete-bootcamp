const fs = require('fs');

// Blocking, synchronous way
const textInput = fs.readFileSync('./txt/input.txt', 'utf-8');
console.log(textInput);

const textOutput = `This is what we know about avocado: ${textInput}.\nCreated on ${new Date().toLocaleDateString()}`;
fs.writeFileSync('./txt/output.txt', textOutput);
console.log('Text output file written.');

// Non-blocking, asynchronous way
fs.readFile('./txt/start.txt', 'utf-8', (error, fileName) => {
  if (error) {
    console.log('Error! An error occured when reading file.');
    return;
  }

  fs.readFile(`./txt/${fileName}.txt`, 'utf-8', (error, text) => {
    console.log(text);

    fs.readFile('./txt/append.txt', 'utf-8', (error, append) => {
      console.log(append);

      fs.writeFile('./txt/final.txt', `${text}\n${append}`, error => {
        console.log('The final file has been written successfully.');
      });
    });
  });
});
console.log('Will read file asynchronously');

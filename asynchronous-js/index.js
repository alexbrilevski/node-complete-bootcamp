const fs = require('fs');
const superagent = require('superagent');

const readFilePromise = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (error, data) => {
      if (error) reject(error);
      resolve(data);
    });
  });
};

const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, error => {
      if (error) reject(error.message);
      resolve('Random dog image saved to file');
    });
  });
};

const getDogImage = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Dog breed: ${data}`);

    const response = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    console.log(response.body);

    const successMessage = await writeFilePromise('dog-img.txt', response.body.message);
    console.log(successMessage);
  } catch (error) {
    console.log(error.message);
  }
};

getDogImage();

// readFilePromise(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Dog breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(response => {
//     console.log(response.body);

//     return writeFilePromise('dog-img.txt', response.body.message);
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.log(error.message);
//   });

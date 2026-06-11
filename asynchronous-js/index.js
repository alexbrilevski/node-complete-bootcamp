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

readFilePromise(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Dog breed: ${data}`);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then(response => {
    console.log(response.body);

    return writeFilePromise('dog-img.txt', response.body.message);
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.log(error.message);
  });

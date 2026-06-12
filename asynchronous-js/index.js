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

    const response1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const response2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const response3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const images = (await Promise.all([response1, response2, response3])).map(el => el.body.message);
    console.log(images);

    const successMessage = await writeFilePromise('dog-img.txt', images.join('\n'));
    console.log(successMessage);
  } catch (error) {
    console.log(error.message);
    throw error;
  }

  return '2: Dog image is ready';
};

(async () => {
  try {
    console.log('1: Will get a dog image');
    const result = await getDogImage();
    console.log(result);
    console.log('3: Done getting a dog image');
  } catch (error) {
    console.log(`An error occurred: ${error.message}`);
  }
})();

/*
console.log('1: Will get a dog image');
getDogImage()
  .then(result => {
    console.log(result);
    console.log('3: Done getting a dog image');
  }).catch(error => {
    console.log(`An error occurred: ${error.message}`);
  });
*/

/*
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
 */

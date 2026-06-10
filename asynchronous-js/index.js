const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (error, data) => {
  if (error) {
    console.log(error.message);
    return;
  }

  console.log(`Dog breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .end((error, response) => {
      if (error) {
        console.log(error.message);
        return;
      }

      console.log(response.body);

      fs.writeFile('dog-img.txt', response.body.message, error => {
        if (error) {
          console.log(error.message);
          return;
        }

        console.log('random dog image saved to file');
      });
    });
});

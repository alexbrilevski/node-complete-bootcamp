const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplateVariables = require('./modules/replaceTemplateVariables');

const cardTemplate = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const productTemplate = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const overviewTemplate = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);
const productData = dataObj.map(el => ({ ...el, slug: slugify(el.productName, { lower: true }) }));

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);
  const pathSegments = pathname.split('/').filter(el => el !== '');

  if (pathname === '/' || pathname === '/overview') {
    const cardsHtml = productData.map(el => replaceTemplateVariables(cardTemplate, el)).join('');
    const output = overviewTemplate.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(output);
  } else if (pathSegments[0] === 'product' && pathSegments[1]) {
    const product = productData.find(el => el.slug === pathSegments[1]);
    let output = '';

    if (product) {
      output = replaceTemplateVariables(productTemplate, product);
    } else {
      output = '<h1>Product not found</h1>';
    }

    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(output);
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    });
    res.end(data);
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen(8000, 'localhost', () => {
  console.log('Listening of requests on localhost, port 8000');
});

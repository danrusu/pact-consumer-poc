const express = require('express');
const app = express();

const path = require('path');

const serveFileFromRoot = relativePath => (_req, res) =>
  res.sendFile(path.join(`${__dirname}/${relativePath}`));

// routes
app
  .get('/health', (req, res) => {
    res
      .status(200)
      .send(`Server running on: ${req.protocol}://${req.get('Host')}`);
  })
  .get('/', serveFileFromRoot('index.html'))
  .get('/ProductService', serveFileFromRoot('ProductService.js'))
  .get('/main', serveFileFromRoot('main.js'));

const port = process.env.PORT || 1112;
app.listen(port, () => console.log(`Server listening on port: ${port}`));

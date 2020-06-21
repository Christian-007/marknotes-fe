/**
 * This server file is used for serving
 * 'ng build --prod' so that it can be benchmarked
 */

const express = require('express');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 8080;
const APP_PUBLIC_DIR = '/dist/marknotes-fe';

app.use(compression()); // apply on-the-fly compression

app.use(express.static(__dirname + APP_PUBLIC_DIR));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname + APP_PUBLIC_DIR + '/index.html'));
});

// Start the app by listening on the default
app.listen(PORT, () => {
  console.log(`Starting server on localhost at port ${PORT}`);
});

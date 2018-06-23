const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/notes-routes.js'));
app.use(express.static(__dirname + '/public'));

const hostname = '127.0.0.1';
const port = 3000;
app.listen(port, hostname, () => {  console.log('Server running at http://127.0.0.1:3000'); });

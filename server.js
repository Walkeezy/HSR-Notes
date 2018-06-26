const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require('./routes/notes-routes.js'));
app.use(express.static(__dirname + '/public'));

const hostname = 'localhost';
const port = 5000;
app.listen(port, hostname, () => {  console.log('Server running at http://localhost:5000'); });

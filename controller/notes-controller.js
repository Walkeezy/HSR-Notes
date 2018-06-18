const store = require('../services/notes-storage.js');
const path = require('path');

module.exports.showIndex = function(req, res) {
  res.sendFile(path.resolve('./public/index.html'));
};

module.exports.createNote = function(req, res) {
  store.add(req.body, function(){
    res.json('Notiz gespeichert');
  });
};

module.exports.getNotes = function(req, res) {
  store.all(function(data) {
    res.json(data);
  });
};

const store = require('../services/notes-storage.js');
const path = require('path');
const moment = require('moment');
moment.locale('de');

module.exports.showIndex = function(req, res) {
  res.sendFile(path.resolve('./public/index.html'));
};

module.exports.getNotes = function(req, res) {
  const order = req.query.order;
  const status = req.query.status;
  store.all(function(notes) {
    if(status){
      notes = notes.filter(note => note.status === status);
    };
    if(order == 'duedate'){
      notes.sort(function(a, b){
        return moment(a.date_due).isAfter(moment(b.date_due));
      });
    } else if(order == 'importance'){
      notes.sort(function(a, b){
        return a.importance < b.importance;
      });
    } else if(order == 'date'){
      notes.sort(function(a, b){
        return moment(a.date).isAfter(moment(b.date));
      });
    };
    res.json(notes);
  });
};

module.exports.createNote = function(req, res) {
  store.add(req.body, function(){
    res.json('Notiz gespeichert');
  });
};

module.exports.getNote = function(req, res) {
  store.get(req.params.id, function(note){
    res.json(note);
  });
};

module.exports.updateNote = function(req, res) {
  store.update(req.params.id, req.body, function(note){
    res.json(note);
  });
};

module.exports.archiveNote = function(req, res) {
  store.archive(req.params.id, function(){
    res.json('Notiz aktualisiert');
  });
};

module.exports.unarchiveNote = function(req, res) {
  store.unarchive(req.params.id, function(){
    res.json('Notiz aktualisiert');
  });
};

module.exports.deleteNote = function(req, res) {
  store.delete(req.params.id, function(){
    res.json('Notiz gelöscht');
  });
};

const store = require('../services/notes-storage.js');
const path = require('path');
const moment = require('moment');

module.exports.showIndex = function(req, res) {
  res.sendFile(path.resolve('./public/index.html'));
};

module.exports.createNote = function(req, res) {
  store.add(req.body, function(){
    res.json('Notiz gespeichert');
  });
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

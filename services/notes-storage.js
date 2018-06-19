const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(noteData) {
  this.status = 'active';
  this.title = noteData.title;
  this.content = noteData.content;
  this.importance = noteData.importance;
  this.date_due = noteData.date_due;
  this.date = new Date().toISOString();
}

function addNote(noteData) {
  let note = new Note(noteData);
  db.insert(note);
}

function getNote(id, callback) {
  db.findOne({ _id: id }, function(err, note) {
    callback(note);
  });
}

function updateNote(id) {
  console.log(id);
}

function getNotes(callback) {
  db.find({}, function(err, notes) {
    callback(notes);
  });
}

module.exports = {add : addNote, get : getNote, update : updateNote, all : getNotes};

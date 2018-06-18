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

function getNotes(callback) {
  db.find({}, function(err, docs) {
    callback(docs);
  });
}

module.exports = {add : addNote, all : getNotes};

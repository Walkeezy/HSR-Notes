const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(noteData) {
  this.title = noteData.title;
  this.content = noteData.content;
  this.importance = noteData.importance;
  this.date_due = noteData.date_due;
}

function publicAddNote(noteData) {
  let note = new Note(noteData);
  db.insert(note);
}

module.exports = {add : publicAddNote};

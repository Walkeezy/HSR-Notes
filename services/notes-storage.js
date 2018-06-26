const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

class Note {
  constructor(noteData) {
    this.status = 'active';
    this.title = noteData.title;
    this.content = noteData.content;
    this.importance = noteData.importance;
    this.date_due = noteData.date_due;
    this.date = new Date().toISOString();
  }
}

function getNotes(callback) {
  db.find({}, function(err, notes) {
    callback(notes);
  });
};

function addNote(noteData) {
  let note = new Note(noteData);
  db.insert(note);
};

function getNote(noteid, callback) {
  db.findOne({ _id: noteid }, function(err, note) {
    callback(note);
  });
};

function updateNote(noteid, noteData) {
  db.update({ _id: noteid }, { $set: {
    title: noteData.title,
    content: noteData.content,
    importance: noteData.importance,
    date_due: noteData.date_due
  } }, { multi: true });
};

function archiveNote(noteid) {
  db.update({ _id: noteid }, { $set: { status: 'archived' } }, { multi: false });
};

function unarchiveNote(noteid) {
  db.update({ _id: noteid }, { $set: { status: 'active' } }, { multi: false });
};

function deleteNote(noteid) {
  db.remove({ _id: noteid }, {});
};

module.exports = {
  all : getNotes,
  add : addNote,
  get : getNote,
  update : updateNote,
  archive : archiveNote,
  unarchive : unarchiveNote,
  delete : deleteNote
};

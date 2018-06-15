const Datastore = require('nedb');
const db = new Datastore({ filename: './data/notes.db', autoload: true });

function Note(noteData) {
  this.title = 'test';
}

function publicAddNote(noteData, callback) {
  let note = new Note(noteData);
  db.insert(note, function(err, newDoc){
    if(callback){
      callback(err, newDoc);
    }
  });
}

module.exports = {add : publicAddNote};

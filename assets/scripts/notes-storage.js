'use strict';

//  NotesStorage.js: Modul, welches alle Funktionalitäten beinhaltet, welche benötigt werden um die Notes zu verwalten z.B. folgende Funktionen
// GetNotes(orderBy, filterBy)
// AddNote(note)
// UpdateNote(note)
// GetNoteById(id)
// Wichtig: Der Store darf kein Zugriff auf den DOM haben.
// Hinweis: Dieses Modul ist das M von MVC

// SAVE / UPDATE
//----------------------------------------------------------

function getNotes(order = 'duedate', status = 'active') {
  let notes = JSON.parse(localStorage.getItem('notes'));
  if(!notes){
    notes = [];
  };
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
  return notes;
};

function saveNote(formdata) {
  let notesStorage = JSON.parse(localStorage.getItem('notes'));
  if(!notesStorage){
    notesStorage = [];
  };
  if(formdata['id'] == ''){
    noteid = createID();
  } else {
    noteid = formdata['id'];
  };
  const note = {
    id = noteid,
    status = 'active',
    title = formdata['title'],
    content = formdata['content'],
    importance = formdata['importance'],
    date_due = formdata['date_due'],
    date = moment().toISOString(true),
  };
  notesStorage.push(note);
  localStorage.setItem('notes', JSON.stringify(notesStorage));
};

function getNoteByID(id) {
  let notes = JSON.parse(localStorage.getItem('notes'));
  return notes.filter(note => note.id === id);
}

// HELPERS
//----------------------------------------------------------

function createID() {
  return Math.random().toString(36).substr(2, 6);
};

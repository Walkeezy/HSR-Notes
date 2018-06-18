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

  console.log('getNotes, hier bin ich!');

  $.getJSON('/notes').done(function(notes) {
    console.log('getJson, hier bin ich!');
    console.log(notes);
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
  })

};

function addNote(formdata) {
  $.ajax({
    method: "POST",
    url: "/note",
    data: formdata,
  });
};

function getNoteByID(id) {
  let notes = JSON.parse(localStorage.getItem('notes'));
  return notes.filter(note => note.id === id);
}

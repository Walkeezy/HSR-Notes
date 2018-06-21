'use strict';

// GET NOTES
//----------------------------------------------------------

async function getNotes(order = 'duedate', status = 'active') {
  const notes = await $.ajax({
    url: '/notes?order=' + order + '&status=' + status + '',
    type: 'GET'
  });
  return notes;
};

// ADD NEW NOTE
//----------------------------------------------------------

async function addNote(formdata) {
  $.ajax({
    method: 'POST',
    url: '/note',
    data: formdata,
  });
};

// UPDATE NOTE
//----------------------------------------------------------

async function updateNote(noteid, formdata) {
  $.ajax({
    method: 'PUT',
    url: '/notes/' + noteid,
    data: formdata,
  });
};

// ARCHIVE NOTE
//----------------------------------------------------------

async function archiveNote(noteid) {
  $.ajax({
    method: 'POST',
    url: '/notes/' + noteid + '/archive',
  });
};

// GET NOTE BY ID
//----------------------------------------------------------

async function getNote(noteid) {
  const note = await $.ajax({
    url: '/notes/' + noteid,
    type: 'GET'
  });
  return note;
};

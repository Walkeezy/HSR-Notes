'use strict';

// GET NOTES
//----------------------------------------------------------

async function getNotes(order = 'duedate', status = 'active') {
  let result;
  try {
    result = await $.ajax({
      url: '/notes?order=' + order + '&status=' + status + '',
      type: 'GET'
    });
    return result;
  } catch (error) {
    console.error(error);
  };
};

// ADD NEW NOTE
//----------------------------------------------------------

function addNote(formdata) {
  $.ajax({
    method: 'POST',
    url: '/note',
    data: formdata,
  });
};

// UPDATE NOTE
//----------------------------------------------------------

function updateStatus(noteid) {
  console.log(noteid);
  $.ajax({
    method: 'PUT',
    url: '/notes/' + noteid,
  });
};

// GET NOTE BY ID
//----------------------------------------------------------

function getNoteByID(id) {
  let notes = JSON.parse(localStorage.getItem('notes'));
  return notes.filter(note => note.id === id);
};

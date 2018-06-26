'use strict';

// GET NOTES
//----------------------------------------------------------

async function getNotes(order = 'duedate', status = 'active') {
  let notes;
  try {
    notes = await $.ajax({
      method: 'GET',
      url: '/notes?order=' + order + '&status=' + status + ''
    });
    return notes;
  } catch (error) {
    console.error(error);
  };
};

// ADD NEW NOTE
//----------------------------------------------------------

async function addNote(formdata) {
  try {
    $.ajax({
      method: 'POST',
      url: '/note',
      data: formdata
    });
  } catch (error) {
    console.error(error);
  };
};

// UPDATE NOTE
//----------------------------------------------------------

async function updateNote(noteid, formdata) {
  try {
    $.ajax({
      method: 'PUT',
      url: '/notes/' + noteid,
      data: formdata
    });
  } catch (error) {
    console.error(error);
  };
};

// ARCHIVE NOTE
//----------------------------------------------------------

async function archiveNote(noteid) {
  try {
    $.ajax({
      method: 'POST',
      url: '/notes/' + noteid + '/archive'
    });
  } catch (error) {
    console.error(error);
  };
};

// UNARCHIVE NOTE
//----------------------------------------------------------

async function unarchiveNote(noteid) {
  try {
    $.ajax({
      method: 'POST',
      url: '/notes/' + noteid + '/unarchive'
    });
  } catch (error) {
    console.error(error);
  };
};

// UNARCHIVE NOTE
//----------------------------------------------------------

async function deleteNote(noteid) {
  try {
    $.ajax({
      method: 'DELETE',
      url: '/notes/' + noteid
    });
  } catch (error) {
    console.error(error);
  };
};

// GET NOTE BY ID
//----------------------------------------------------------

async function getNote(noteid) {
  let note;
  try {
    note = await $.ajax({
      method: 'GET',
      url: '/notes/' + noteid
    });
    return note;
  } catch (error) {
    console.error(error);
  };
};

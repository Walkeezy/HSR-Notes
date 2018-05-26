jQuery(function ($) {

  $('.edit-note__form').submit(function(event) {
    const title = $('#title').val();
    saveNote(title);
    event.preventDefault();
  });

  function saveNote(title, description, importance, date) {
    const note = {};
    note[title] = title;
    note[description] = description;
    note[importance] = importance;
    note[date] = date;
    console.log(note);
    localStorage.setItem('notes', note);
  }

});

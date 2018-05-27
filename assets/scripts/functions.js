jQuery(function ($) {

  // On form submit
  $('.edit-note__form').submit(function(event) {
    event.preventDefault();
    const formdataArray = $(this).serializeArray();
    const formdataObj = {};
    $(formdataArray).each(function(i, field){
      formdataObj[field.name] = field.value;
    });
    saveNote(formdataObj);
  });

  // Save new note or update existing one
  function saveNote(formdata) {
    let notes = [];
    const noteid = createID();
    const note = {
      id = noteid,
      title = formdata['title'],
      description = formdata['description'],
      importance = formdata['importance'],
      duedate = formdata['duedate'],
      date = moment().toISOString(true),
      date_updated = moment().toISOString(true)
    };
    notes.push(note);

    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if(savedNotes){
      savedNotes.push(note);
      localStorage.setItem('notes', JSON.stringify(savedNotes));
    } else {
      localStorage.setItem('notes', JSON.stringify(notes));
    };

  };

  // Create random ID
  function createID() {
    return Math.random().toString(36).substr(2, 9);
  };

});

jQuery(function($) {

  // EVENT LISTENERS
  //----------------------------------------------------------

  $('.open-edit').on('click', function(event) {
    $('.edit-note').addClass('open');
    $('.dimmer').addClass('active');
  });

  $('.cancel-note').on('click', function(event) {
    $('.edit-note').removeClass('open');
    $('.dimmer').removeClass('active');
  });

  $('.edit-note__form').submit(function(event) {
    event.preventDefault();
    const formdataArray = $(this).serializeArray();
    const formdataObj = {};
    $(formdataArray).each(function(i, field){
      formdataObj[field.name] = field.value;
    });
    saveNote(formdataObj);
  });

  // SAVE / UPDATE NOTE
  //----------------------------------------------------------
  function saveNote(formdata) {
    if(formdata['note-id'] == ''){
      noteid = createID();
    } else {
      noteid = formdata['note-id'];
    };
    let notes = [];
    const note = {
      id = noteid,
      title = formdata['title'],
      description = formdata['description'],
      importance = formdata['importance'],
      duedate = formdata['due-date'],
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

  // HELPER FUNCTIONS
  //----------------------------------------------------------
  function createID() {
    return Math.random().toString(36).substr(2, 6);
  };

});

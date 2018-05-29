jQuery(function($) {

  // LOAD NOTES
  //---------------------------------------------------------
  function renderNotes() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    const noteTemplate = $('#noteTemplate').html();
    const renderedNotes = Handlebars.compile(noteTemplate);
    $('.notes__list').html(renderedNotes(notes));
  };

  renderNotes();

  // EVENT LISTENERS
  //----------------------------------------------------------

  $('.open-edit').on('click', function(event) {
    openEdit();
  });

  $('.cancel-note').on('click', function(event) {
    closeEdit();
  });

  $('.edit-note__form').submit(function(event) {
    event.preventDefault();
    const formdataArray = $(this).serializeArray();
    const formdataObj = {};
    $(formdataArray).each(function(i, field){
      formdataObj[field.name] = field.value;
    });
    saveNote(formdataObj);
    renderNotes();
    closeEdit();
    this.reset();
  });

  // SAVE / UPDATE NOTE
  //----------------------------------------------------------
  function saveNote(formdata) {
    if(formdata['note_id'] == ''){
      noteid = createID();
    } else {
      noteid = formdata['note_id'];
    };
    let notes = { notes: [] };
    const note = {
      id = noteid,
      title = formdata['title'],
      description = formdata['description'],
      importance = formdata['importance'],
      date_due = formdata['date_due'],
      date = moment().toISOString(true),
    };
    notes['notes'].push(note);

    const savedNotes = JSON.parse(localStorage.getItem('notes'));

    if(savedNotes){
      savedNotes['notes'].push(note);
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

  function openEdit() {
    $('.edit-note').addClass('open');
    $('.dimmer').addClass('active');
  };

  function closeEdit() {
    $('.edit-note').removeClass('open');
    $('.dimmer').removeClass('active');
  };

});

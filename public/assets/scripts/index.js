;(function() {
  'use strict';

  jQuery(function($) {

    // INITIALIZE PAGE
    //----------------------------------------------------------

    async function init() {
      if(localStorage.getItem('style') == 'light'){
        $('body').addClass('style--light');
        $('.switch-style').html('zum dunkeln Modus wechseln');
      };
      renderNotes(await getNotes());
    };

    init();

    // EVENT HANDLERS
    //----------------------------------------------------------

    // Open new note form
    $('.open-new').on('click', function(event) {
      $('.edit-note__title').html('Neue Notiz hinzufügen');
      $('.edit-note__form').removeData('update');
      $('.edit-note__form')[0].reset();
      openEdit();
    });

    // Close form
    $('.cancel-note').on('click', function(event) {
      closeEdit();
    });

    // Sort notes
    $('.sort-notes').on('click', async function(event) {
      $('.sort-notes').removeClass('sort-notes--active');
      $(this).addClass('sort-notes--active');
      renderNotes(await getNotes($(this).data('sort'), undefined));
    });

    // Switch between active and archived
    $('.switch-status').on('click', async function(event) {
      $('.switch-status').removeClass('switch-status--active');
      $(this).addClass('switch-status--active');
      renderNotes(await getNotes(undefined, $(this).data('status')));
    });

    // Archive note
    $(document).on('click', '.archive-note', async function(event) {
      archiveNote($(this).data('note'));
      renderNotes(await getNotes());
    });

    // Load form to edit note
    $(document).on('click', '.load-edit', async function(event) {
      const note = await getNote($(this).data('note'));
      $('.edit-note__form').data('update', note._id);
      $('[name=title]').val(note.title);
      $('[name=content]').val(note.content);
      $('[name=importance][value=' + note.importance + ']').attr('checked', 'checked');
      $('[name=date_due]').val(note.date_due);
      $('.edit-note__title').html('Notiz bearbeiten');
      openEdit();
    });

    // Submit note
    $('.edit-note__form').submit(async function(event) {
      event.preventDefault();
      if ($(this).data('update')){
        await updateNote($(this).data('update'), $(this).serializeArray());
      } else {
        await addNote($(this).serializeArray());
      }
      renderNotes(await getNotes());
      closeEdit();
      this.reset();
    });

    // Switch style
    $('.switch-style').on('click', function(event) {
      $(this).html(function(){
        return ($('body').hasClass('style--light') ? 'zum hellen Modus wechseln' : 'zum dunkeln Modus wechseln');
      });
      $('body').toggleClass('style--light');
      localStorage.getItem('style') == 'light' ? localStorage.setItem('style', 'dark') : localStorage.setItem('style', 'light');
    });

    // RENDER NOTES
    //---------------------------------------------------------

    function renderNotes(notes) {
      notes.forEach(function(note) {
        note.date_formatted = moment(note.date).format('DD.MM.YYYY');
        note.time_formatted = moment(note.date).format('HH:mm');
        note.date_due_formatted = moment(note.date_due).fromNow();
      });
      const noteTemplate = $('#noteTemplate').html();
      const renderedNotes = Handlebars.compile(noteTemplate);
      $('.notes__list').html(renderedNotes(notes));
    };

    // HELPERS
    //----------------------------------------------------------

    moment.locale('de');

    Handlebars.registerHelper('ifEquals', function(x, y, options) {
      return (x == y) ? options.fn(this) : options.inverse(this);
    });

    Handlebars.registerHelper('breaklines', function(text) {
      text = Handlebars.Utils.escapeExpression(text);
      text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
      return new Handlebars.SafeString(text);
    });

    function openEdit() {
      $('.edit-note').addClass('open');
      $('.dimmer').addClass('active');
    };

    function closeEdit() {
      $('.edit-note').removeClass('open');
      $('.dimmer').removeClass('active');
    };

  });

}());

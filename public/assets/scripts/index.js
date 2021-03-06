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
    $('.open-new').on('click', async function(event) {
      $('.edit-note__title').html('Neue Notiz hinzufügen');
      $('.edit-note__form').removeData('update');
      $('.edit-note__form')[0].reset();
      await openEdit();
    });

    // Close form
    $('.cancel-note').on('click', async function(event) {
      await closeEdit();
    });

    // Sort notes
    $('.sort-notes').on('click', async function(event) {
      $('.sort-notes').removeClass('sort-notes--active');
      $(this).addClass('sort-notes--active');
      renderNotes(await getNotes($(this).data('sort'), await getActiveFilter()));
    });

    // Switch between active and archived
    $('.switch-status').on('click', async function(event) {
      $('.switch-status').removeClass('switch-status--active');
      $(this).addClass('switch-status--active');
      renderNotes(await getNotes(await getActiveSort(), $(this).data('status')));
    });

    // Archive note
    $(document).on('click', '.archive-note', async function(event) {
      archiveNote($(this).data('note'));
      renderNotes(await getNotes(await getActiveSort(), await getActiveFilter()));
    });

    // Unarchive note
    $(document).on('click', '.unarchive-note', async function(event) {
      unarchiveNote($(this).data('note'));
      renderNotes(await getNotes(await getActiveSort(), 'archived'));
    });

    // Delete note
    $(document).on('click', '.delete-note', async function(event) {
      deleteNote($(this).data('note'));
      renderNotes(await getNotes(await getActiveSort(), 'archived'));
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
      await openEdit();
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
      await closeEdit();
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
      if(notes.length > 0){
        notes.forEach(function(note) {
          note.date_formatted = moment(note.date).format('DD.MM.YYYY');
          note.time_formatted = moment(note.date).format('HH:mm');
          note.date_due_formatted = moment(note.date_due).fromNow();
          switch (note.importance) {
            case '1':
              note.importance_in_words = 'gering';
              break;
            case '2':
              note.importance_in_words = 'normal';
              break;
            case '3':
              note.importance_in_words = 'hoch';
          };
        });
        const noteTemplate = $('#noteTemplate').html();
        const renderedNotes = Handlebars.compile(noteTemplate);
        $('.notes__list').html(renderedNotes(notes));
      } else {
        const emptyTemplate = $('#emptyTemplate').html();
        $('.notes__list').html(emptyTemplate);
      };
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

    async function openEdit() {
      $('.edit-note').addClass('open');
      $('.dimmer').addClass('active');
    };

    async function closeEdit() {
      $('.edit-note').removeClass('open');
      $('.dimmer').removeClass('active');
    };

    async function getActiveSort() {
      const active_sort = $('.sort-notes--active').data('sort');
      return active_sort;
    };

    async function getActiveFilter() {
      const active_filter = $('.switch-status--active').data('status');
      return active_filter;
    };

  });

}());

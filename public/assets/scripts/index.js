;(function() {
  'use strict';

  jQuery(function($) {

    // INITIALIZE PAGE
    //----------------------------------------------------------

    async function init() {
      const style = localStorage.getItem('style');
      if(style == 'light'){
        $('body').addClass('style--light');
        $('.switch-style').html('zum dunkeln Modus wechseln');
      };
      const notes = await getNotes();
      renderNotes(notes);
    };

    init();

    // EVENT HANDLERS
    //----------------------------------------------------------

    // Open edit form
    $('.open-edit').on('click', function(event) {
      openEdit();
    });

    // Close edit form
    $('.cancel-note').on('click', function(event) {
      closeEdit();
    });

    // Sort notes
    $('.sort-notes').on('click', async function(event) {
      $('.sort-notes').removeClass('sort-notes--active');
      $(this).addClass('sort-notes--active');
      const notes = await getNotes($(this).data('sort'), undefined);
      renderNotes(notes);
    });

    // Switch between active and archived
    $('.switch-status').on('click', async function(event) {
      const notes = await getNotes(undefined, $(this).data('status'));
      renderNotes(notes);
    });

    // Archive note
    $(document).on('click', '.archive-note', function(event) {
      archiveNote($(this).data('note'));
      renderNotes(notes);
    });

    // Load form to edit note
    $(document).on('click', '.load-edit', async function(event) {
      const note = await getNote($(this).data('note'));
      $('.edit-note__form').data('update', note._id);
      $('[name=title]').val(note.title);
      $('[name=content]').val(note.content);
      $('[name=importance][value=' + note.importance + ']').attr('checked', 'checked');
      $('[name=date_due]').val(note.date_due);
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
      const notes = await getNotes();
      renderNotes(notes);
      closeEdit();
      this.reset();
    });

    // Switch style
    $('.switch-style').on('click', function(event) {
      $(this).html(function(){
        return ($('body').hasClass('style--light') ? 'zum hellen Modus wechseln' : 'zum dunkeln Modus wechseln');
      });
      $('body').toggleClass('style--light');
      const style = localStorage.getItem('style');
      style == 'light' ? localStorage.setItem('style', 'dark') : localStorage.setItem('style', 'light');
    });

    // RENDER NOTES
    //---------------------------------------------------------

    function renderNotes(notes) {
      const noteTemplate = $('#noteTemplate').html();
      const renderedNotes = Handlebars.compile(noteTemplate);
      $('.notes__list').html(renderedNotes(notes));
    };

    // HELPERS
    //----------------------------------------------------------

    Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
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

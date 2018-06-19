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

    $('.open-edit').on('click', function(event) {
      openEdit();
    });

    $('.cancel-note').on('click', function(event) {
      closeEdit();
    });

    $('.sort-notes').on('click', async function(event) {
      $('.sort-notes').removeClass('sort-notes--active');
      $(this).addClass('sort-notes--active');
      const notes = await getNotes($(this).data('sort'), undefined);
      renderNotes(notes);
    });

    $('.switch-status').on('click', async function(event) {
      const notes = await getNotes(undefined, $(this).data('status'));
      renderNotes(notes);
    });

    $('.mark-archived').on('click', function(event) {
      archiveNote($(this).data('note'));
    });

    $('.load-edit').on('click', function(event) {
      const note = getNoteByID($(this).data('note'));
      $('[name=id]').val(note[0]['id']);
      $('[name=title]').val(note[0]['title']);
      $('[name=content]').val(note[0]['content']);
      $('[name=importance][value=' + note[0]['importance'] + ']').attr('checked', 'checked');
      $('[name=date_due]').val(note[0]['date_due']);
      openEdit();
    });

    $('.edit-note__form').submit(async function(event) {
      event.preventDefault();
      addNote($(this).serializeArray());
      const notes = await getNotes();
      renderNotes(notes);
      closeEdit();
      this.reset();
    });

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

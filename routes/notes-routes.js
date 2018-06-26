const express = require('express');
const router = express.Router();
const notes = require('../controller/notes-controller.js');

router.get('/', notes.showIndex);
router.get('/notes', notes.getNotes);
router.post('/note', notes.createNote);
router.get('/notes/:id/', notes.getNote);
router.put('/notes/:id/', notes.updateNote);
router.post('/notes/:id/archive', notes.archiveNote);
router.post('/notes/:id/unarchive', notes.unarchiveNote);
router.delete('/notes/:id/', notes.deleteNote);
// router.delete('/notes/:id/', notes.showIndex);

module.exports = router;

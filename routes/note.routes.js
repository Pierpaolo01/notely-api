const {Router} = require('express');
const {getAllNotes, getNote, createNote, updateNote, softDeleteNote} = require('../controllers/note.controller');

const router = Router();

router.get('/notes', getAllNotes);
router.get('/note/:id', getNote);
router.post('/create-note', createNote);
router.put('/edit-note/:id', updateNote);
router.delete('/note/:id', softDeleteNote);

module.exports = router;

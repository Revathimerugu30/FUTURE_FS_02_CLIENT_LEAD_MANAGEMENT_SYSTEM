const express = require('express');
const router = express.Router();
const {
  getLeads, getLead, createLead, updateLead, deleteLead,
  updateStatus, addNote, deleteNote, getAnalytics,
} = require('../controllers/leadController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get('/analytics', getAnalytics);
router.route('/').get(getLeads).post(createLead);
router.route('/:id').get(getLead).put(updateLead).delete(deleteLead);
router.patch('/status/:id', updateStatus);
router.post('/:id/notes', addNote);
router.delete('/:id/notes/:noteId', deleteNote);

module.exports = router;

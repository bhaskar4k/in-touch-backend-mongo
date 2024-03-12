const express = require('express');
const { get_all_post, add_post, delete_post } = require('../controllers/PostController');
const router = express.Router();

router.post('/add_post', add_post)
router.post('/delete_post', delete_post)
router.get('/get_all_post/:username', get_all_post)

module.exports = router;
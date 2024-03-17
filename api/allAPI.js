const express = require('express');
const { get_post_count, get_all_post, add_post, delete_post } = require('../controllers/PostController');
const router = express.Router();

router.post('/add_post', add_post)
router.post('/delete_post', delete_post)
router.get('/get_all_post/:username/:offset', get_all_post)
router.get('/get_post_count/:username', get_post_count)

module.exports = router;
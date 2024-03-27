const express = require('express');
const { get_post_count, get_all_post, add_post, delete_post, like_control, is_liked, do_comment, get_comment } = require('../controllers/PostController');
const router = express.Router();

router.post('/add_post', add_post)
router.post('/delete_post', delete_post)
router.get('/get_all_post/:username/:offset', get_all_post)
router.get('/get_post_count/:username', get_post_count)
router.post('/like_control', like_control)
router.get('/is_liked/:post_id/:username', is_liked)
router.post('/do_comment', do_comment);
router.get('/get_comment/:post_id/:offset', get_comment)

module.exports = router;
const PostModel = require('../models/PostModel');

async function get_all_post(req, res) {
    const { username } = req.params;

    try {
        const post = await PostModel.find({ username }).sort({ createdAt: -1 });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function add_post(req, res) {
    try {
        const { post_id, username, post_description, post_image, tag, upload_date, upload_time } = req.body;

        let post = await PostModel.create({ post_id, username, post_description, post_image, tag, upload_date, upload_time });
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function delete_post(req, res) {
    try {
        const { post_id } = req.body;
        console.log(post_id)

        const result = await PostModel.deleteOne({ post_id: post_id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { get_all_post, add_post, delete_post }
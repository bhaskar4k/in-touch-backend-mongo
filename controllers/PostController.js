const PostModel = require('../models/PostModel');
const LikeModel = require('../models/LikeModel');
const CommentModel = require('../models/CommentModel');


async function get_post_count(req, res) {
    const { username } = req.params;

    try {
        const count = await PostModel.countDocuments({ username: username });
        res.status(200).json({ count: count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function get_all_post(req, res) {
    const { username, offset } = req.params;

    try {
        const post = await PostModel.find({ username }).sort({ createdAt: -1 }).skip(offset).limit(10);
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

        const result = await PostModel.deleteOne({ post_id: post_id });
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function like_control(req, res) {
    const { post_id, username } = req.body;

    try {
        const existingLike = await LikeModel.findOne({ post_id, username });

        if (existingLike) {
            await LikeModel.deleteOne({ post_id, username });
            res.status(200).json({ message: "Post unliked successfully" });
        } else {
            let newLike = await LikeModel.create({ post_id, username });
            res.status(200).json(newLike);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function is_liked(req, res) {
    const { username, post_id } = req.params;
    try {
        const existingLike = await LikeModel.findOne({ post_id, username });

        if (existingLike) {
            res.status(200).json({ message: "true" });
        } else {
            res.status(200).json({ message: "false" });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function do_comment(req, res) {
    try {
        const { comment_id, post_id, username, comment_description, upload_date, upload_time } = req.body;

        let comment = await CommentModel.create({ comment_id, post_id, username, comment_description, upload_date, upload_time });
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function get_comment(req, res) {
    const { post_id, offset } = req.params;

    try {
        const comment = await CommentModel.find({ post_id }).sort({ createdAt: -1 }).skip(offset).limit(10);
        res.status(200).json(comment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { get_all_post, add_post, delete_post, get_post_count, like_control, is_liked, do_comment, get_comment }
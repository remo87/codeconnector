const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//models
const Post = require('../../models/Post');

//validators
const ValidatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc test post route
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: 'posts works'
    })
});

// @route   POST api/post
// @desc    Create Post
// @access  private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log(req.body.text);
    const { errors, isValid } = ValidatePostInput(req.body);

    if (!isValid) {
        return res.status(400).json({ errors });
    }

    const newPost = new Post({
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id,
    });
    newPost.save()
        .then(newPost => {
            res.json(newPost);
        })
});

module.exports = router;
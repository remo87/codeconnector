const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

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

// @route   GET api/post
// @desc    Get posts
// @access  public
router.get('/', (req, res) => {
    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => res.status(404).json({ nopostfound: 'No posts found.' }));
});

// @route   GET api/post/:id
// @desc    Get post by id
// @access  public
router.get('/:id', (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (!post) {
                return res.status(404).json({postnotfound: 'No post found with that id.'})
            }
            return res.json(post)})
        .catch(err => res.status(404).json({ nopostfound: 'No post found with that id.' }));
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

// @route   DELETE api/post
// @desc    Delete a Post
// @access  private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post.user.toString() !== req.user.id) {
                return res.status(401).json({
                    notauthorized: 'The user is not authorized.'
                });
            }

            post.remove().then(()=> res.json({success: true}));
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found.'}));
});


module.exports = router;
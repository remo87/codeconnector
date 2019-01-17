const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//load modules
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route GET api/profiles/test
// @desc test profile route
// @access public
router.get('/test', (req, res) => {
    res.json({
        msg: 'profiles works'
    })
});

// @route GET api/profiles
// @desc gets current user profile
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {

    const errors = {}

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'There is no profile for this user'
                return res.status(404).json(errors);
            }
            return res.json(profile);
        })
        .catch(err => res.status(404).json(err));
});


module.exports = router;
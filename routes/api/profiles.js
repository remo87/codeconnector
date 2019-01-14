const express = require('express');
const router = express.Router();

// @route GET api/profiles/test
// @desc test profile route
// @access public
router.get('/test', (req, res) => {res.json({
    msg: 'profiles works'
})});

module.exports = router;
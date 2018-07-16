'use strict';

const express = require('express');

const router = express.Router();

router.get('/logout', (req, res) => {

  return req.session.destroy((err) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/home');
		}
	});
});

module.exports = router;

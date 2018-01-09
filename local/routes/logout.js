"use strict";

const express = require('express');

const router = express.Router();

router.get('/logout', function (req, res) {
  // TODO Log time and req
  const NOW = new Date().getTime();

  return req.session.destroy(function (err) {
		if (err)
			console.log(err);
		else
			res.redirect('/home');
	});
});

module.exports = router;

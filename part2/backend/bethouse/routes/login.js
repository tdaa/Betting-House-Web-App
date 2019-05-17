var express = require('express');
var passport = require('passport')
var router = express.Router();

router.post('/processLogin', (req, res, next) => {
    passport.authenticate('local', (err, utilizador, info) => {
        if (err) {
            return next(err);
        }

        if (!utilizador) {
            return res.status(400).send([utilizador, 'Cannot log in', info]);
        }

        req.login(utilizador, (err) => {
            res.send(utilizador);
        })
    })(req, res, next);
});

module.exports = router;

var express = require('express');
var passport = require('passport')
var router = express.Router();

router.get('/session', (req, res, next) => {
    console.log(req.user);
    res.send(req.user);
});

router.post('/processLogin', (req, res, next) => {
    console.log(req.body);

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

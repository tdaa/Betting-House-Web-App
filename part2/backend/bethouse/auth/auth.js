var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var md5 = require('md5');
var models = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    models.Utilizador
        .findOne({ where: { Email: username } })
        .then(utilizador => {
            if (utilizador) {
                let stored = utilizador.dataValues.Password;
                let submitted = md5(password);

                if (stored == submitted) {
                    done(null, utilizador);
                } else {
                    done(null, false, { message: 'Incorrect username or password' });
                }
            } else {
                done(null, false, { message: 'Incorrect username or password' });
            }
        });
}));

passport.serializeUser((utilizador, done) => {
    done(null, utilizador.id);
});

passport.deserializeUser((_id, done) => {
    models.Utilizador
        .findOne({ where: { id: _id } })
        .then(utilizador => {
            done(null, utilizador);
        });
})
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, (username, password, done) => {
    models.Utilizador
        .findOne({ where: { Email: username, Password: password } })
        .then(utilizador => {
            if (utilizador) {
                done(null, utilizador);
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
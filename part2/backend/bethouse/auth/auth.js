var passport = require('passport');
var bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local').Strategy;
var models = require('../models');


async function hash(password) {
    let hash_pass = await bcrypt.hash(password, 10);
    return hash_pass;
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, /*async*/ (username, password, done) => {
    //const pass = await hash(password);

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
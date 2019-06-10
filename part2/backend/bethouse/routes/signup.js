var 
    express = require('express'),
    Utilizadores = require('../controllers/utilizadores'),
    router = express.Router();


router.post('/', (req, res, next) => {
    var response = {
        status: 1
    };

    Utilizadores.registerUser(req.body)
        .then(dados => {
            res.jsonp(response);
        })
        .catch(err => {
            response.status = 0;

            if (err.original.code == 'ER_DUP_ENTRY') {
                response.status = -1;
            }

            res.jsonp(response);
        });
});

module.exports = router;

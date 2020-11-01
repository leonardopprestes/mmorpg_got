module.exports = function (application) {
    application.get('/jogo', function (req, res) {
        if (req.session.autorizado) {
            application.app.controllers.jogo.jogo(application, req, res);
        } else {
            res.redirect('/');
        }
        
    });
}
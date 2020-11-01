module.exports.cadastro = function (application, req, res) {
    res.render('cadastro', { validation : '', dadosForm : '', cadastro : '' });
}

module.exports.cadastrar = function (application, req, res) {
    var dadosForm = req.body;

    req.assert('ds_nome', 'O campo nome não pode ser vazio!').notEmpty();
    req.assert('ds_usuario', 'O campo usuário não pode ser vazio!').notEmpty();
    req.assert('ds_senha', 'O campo senha não pode vazio!').notEmpty();
    req.assert('ds_casa', 'A casa não pode ser vazio!').notEmpty();
    
    var error = req.validationErrors();
    
    if (error) {
        res.render('cadastro', {validation : error, dadosForm : dadosForm, cadastro : ''} );
        return;
    }

    var connection = application.config.dbconnection();
    var usuarioModel = new application.app.models.usuarioDAO(connection);

    usuarioModel.cadastrarUsuario(req.body, function (error, result) {
        res.render('cadastro', { validation : '', dadosForm : '', cadastro : 'Cadastrado com sucesso!'} );
    });

}
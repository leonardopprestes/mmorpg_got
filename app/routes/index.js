module.exports = function(application){
	application.get('/', function(req, res){
		application.app.controllers.index.home(application, req, res);
	});

	application.get('/sair', function (req, res) {
		req.session.destroy( function (err) {
			res.render('index', { validation : error, autentication : '' } );
		});
	});

	application.post('/autenticar', function (req, res) {
		req.assert('usuario', 'O campo usuário é obrigatório!').notEmpty();
		req.assert('senha', 'O campo senha é obrigatório').notEmpty();

		error = req.validationErrors();

		if (error) {
			res.render('index', { validation : error, autentication : '' } );
			return;
		}

		var connection = application.config.dbconnection();
		var usuarioModel = new application.app.models.usuarioDAO(connection);

		usuarioModel.autenticar(req.body, function (error, result) {	
			if (result.length > 1) {
				req.session.autorizado = true;
				req.session.usuario = result[0].ds_usuario;
				req.session.senha = result[0].ds_senha;

				res.redirect('jogo');
				return;
			} else {
				res.render('index', { validation : error, autentication : 'N' } );
			}
		});
	});
}
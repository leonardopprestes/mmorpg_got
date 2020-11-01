const { query } = require("express");

function UsuarioDAO(connection) {
    this._conn = connection;
}

UsuarioDAO.prototype.cadastrarUsuario = function (dados, callback) {
    this._conn.query('insert into usuario set ?', dados, callback);
}

UsuarioDAO.prototype.autenticar = function (dados, callback) {
    this._conn.query('select * from usuario where ds_usuario = ' + "'" + dados.usuario + "'" + ' and ds_senha = ' + "'" + dados.senha + "'", callback );
}

module.exports = function () {
    return UsuarioDAO;
}
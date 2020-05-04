const debug = require('debug')('app:index');
const express = require('express');
const server = require('./server/server');

// running db
require('./database');

const app = server(express()); // En server se realiza la configuración del servidor.

app.listen(app.get('port'), () => {
  debug(`Server on http://localhost:${app.get('port')}`);
});

const path = require('path');
const exphbs = require('express-handlebars');
const errorHandler = require('errorhandler');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes');

// Configuración complet del servidor.
const server = app => {

  // Settings
  app.set('port', process.env.PORT || 3000);
  app.set('views', path.join(__dirname, '../views')); // Se le indica a express donde estaran las vistas
  app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    partialsDir: path.join(app.get('views'), 'partials'),
    layoutsDir: path.join(app.get('views'), 'layouts'),
    extname: '.hbs',
    helpers: require('./helpers')
  })); // Configuración de plantillas que se utilizaran en las views

  app.set('view engine', '.hbs');

  // middlewares
  app.use(morgan('dev'));
  // a travez de multer cuando llegue una imagen la guadara en el destino (dest), solo recibira un archivo von el nombre image 
  app.use(multer({
    dest: path.join(__dirname, '../public/upload/temp')
  }).single('image'));
  
  app.use(express.urlencoded({
    extended: false
  }));
  app.use(express.json());
  
  // routes
  routes(app);
  
  // static
  app.use('/public', express.static(path.join(__dirname, '../public')));

  // error handlers
  if(app.get('env') === 'development') {
    app.use(errorHandler);
  }
  
  return app;
}

module.exports = server;

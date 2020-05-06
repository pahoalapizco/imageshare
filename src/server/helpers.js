// Helpers que seran utilizados en los handlebars!!
// Funciones que se pueden utilizar desde las vistas.
const moment = require('moment');
const helpers = {};

helpers.timeago = timestamp => moment(timestamp).startOf('minute').fromNow();

module.exports = helpers;

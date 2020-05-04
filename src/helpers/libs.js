const helpers = {};
const LONGITUD_MAXIMA = 20;
const EXTENCIONES_VALIDAS = ['.png', '.jpg', '.jpeg', '.gif'];

helpers.randomName = () => {
  const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let nombre = "";
  for (let i = 0; i < LONGITUD_MAXIMA; i++) {
    nombre += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }

  return nombre;
}

helpers.validExtension = (ext) => EXTENCIONES_VALIDAS.indexOf(ext);

module.exports = helpers;

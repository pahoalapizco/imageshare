const { Image } = require('../models');

// Imagenes mas populares.
const popular = async () => {
  const images = await Image.find().limit(5).sort({ lieks: -1 });
  return images;
}

module.exports = {
  popular
};

const { Image } = require('../models');

// Imagenes mas populares.
const popular = async () => {
  const images = await Image.find().limit(3).sort({ likes: -1 });
  return images;
}

module.exports = {
  popular
};

const { Image, Comment } = require('../models');

// Contador de imagenes subidas
const imagesCounter = async () => {
  const totalImages = await Image.countDocuments();
  return totalImages;
};

// Contator de vistas 
const imagesTotalViewscounter = async ()  => {
  const result = await Image.aggregate([
      {
        $group: {
          _id: '1',
          totalViews: { $sum: '$views'}
        }
      }
    ]);
    // resultado: [{ _id: '1', totalViews: 10 }]
    return result[0].totalViews;
};

// Contador de likes
const imagesTotalLikesCounter = async () => {
  const result = await Image.aggregate([
    {
      $group: {
        _id: '1',
        totalLikes: { $sum: '$likes' }
      }
    }
  ]);
  // resultado: [{ _id: '1', totalLikes: 10 }]
  return result[0].totalLikes;
};

// Contador de comentarios
const commentsCounter = async () => {
  const totalComments = await Image.countDocuments();
  return totalComments;
};

const stats = async () => {
  // Ejecuta en paralelo las funciónes anteriores.
  const result = await Promise.all([
    imagesCounter(),
    commentsCounter(),
    imagesTotalViewscounter(),
    imagesTotalLikesCounter()
  ]);

  return {
    images: result[0],
    comments: result[1],
    views: result[2],
    likes: result[3]
  };
}

module.exports = stats;


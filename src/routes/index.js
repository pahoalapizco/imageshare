const { Router } = require('express');
const home = require('../controllers/home');
const image = require('../controllers/image');

const router = Router();
const routes = app => {
  app.use(router);
  
  router.get('/', home.index);
  router.get('/images/:imageId', image.index);
  router.post('/images', image.create);
  router.post('/images/:imageId/like', image.like);
  router.post('/images/:imageId/comment', image.comment);
  router.delete('/images/:imageId', image.remove);
}

module.exports = routes;

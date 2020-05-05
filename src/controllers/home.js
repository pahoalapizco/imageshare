const debug = require('debug')('app:controllers:home');
const { Image } = require('../models');

const controller = {};

controller.index = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  debug(images)
  res.render('index', { images });
}

module.exports = controller;

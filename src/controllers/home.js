const debug = require('debug')('app:controllers:home');
const { Image } = require('../models');
const sidebar = require('../helpers/sidebar');

const controller = {};

controller.index = async (req, res) => {
  const images = await Image.find().sort({ createdAt: -1 });
  const viewModel = { images: [] };
  viewModel.images = images;
  await sidebar(viewModel);
  res.render('index', viewModel);
}

module.exports = controller;

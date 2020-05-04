const debug = require('debug')('app:controllers:image');
const path = require('path');
const fs = require('fs-extra');
const { randomName, validExtension } = require('../helpers/libs');

const controller = {};

controller.index = (req, res) => {
  
};

controller.create = async (req, res) => {
  const { originalname, path: filePath } = req.file;
  const imgName = randomName();
  const ext = path.extname(originalname).toLocaleLowerCase();
  const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`);

  if(validExtension(ext) >= 0) {
    await fs.rename(filePath, targetPath);
  } else {
    return res.send(`${originalname} no es un archivo valido.`);
  }

  debug('targetPath: ', targetPath);
  res.send('funciono!!');
};

controller.like = (req, res) => {

};

controller.comment = (req, res) => {

};
controller.remove = (req, res) => {

};

module.exports = controller;
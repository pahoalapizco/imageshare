const debug = require('debug')('app:controllers:image');
const path = require('path');
const fs = require('fs-extra');
const { randomName, validExtension } = require('../helpers/libs');
const {  Image } = require('../models');

const controller = {};

controller.index = async (req, res) => {
  const { imageId } = req.params;
  const image = await Image.findOne({ filename: { $regex: imageId } });

  res.render('image', { image });
};

controller.create = (req, res) => {
  const saveImage = async () => {
    const { originalname, path: filePath } = req.file;
    const { title, description } = req.body;
    const imgName = randomName();
    const ext = path.extname(originalname).toLocaleLowerCase();  

    const images = await Image.find({ filename: `${imgName}${ext}` });
    debug(images.shift());

    // Cuando el nombre del archivo ya fue almacenado, se genera una recursividad
    // para obtener un nuevo nombre random!
    if(images.length > 0) {
      saveImage();
    } else {
      if(validExtension(ext) >= 0) {
        const targetPath = path.resolve(`src/public/upload/${imgName}${ext}`);
        await fs.rename(filePath, targetPath);
        const newImage = new Image({
          title,
          description,
          filename: imgName +  ext
        });
        const imageSaved = await newImage.save();
        res.redirect(`/images/${imgName}`);
      } else {
        await fs.unlink(filePath);
        return res.send(`${originalname} no es un archivo valido.`);
      }    
    }

  }

  saveImage();
};

controller.like = (req, res) => {

};

controller.comment = (req, res) => {

};
controller.remove = (req, res) => {

};

module.exports = controller;
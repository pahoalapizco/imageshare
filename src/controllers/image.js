const debug = require('debug')('app:controllers:image');
const path = require('path');
const fs = require('fs-extra');
const md5 = require('md5');

const { randomName, validExtension } = require('../helpers/libs');
const {  Image, Comment } = require('../models');

const controller = {};

controller.index = async (req, res) => {
  const { imageId } = req.params;
  const image = await Image.findOne({ filename: { $regex: imageId } });
  if(image){
    image.views++;
    image.save();
    const comments = await Comment.find({ imageId: image._id });
    res.render('image', { image, comments });
  } else {
    res.redirect('/');
  }

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

controller.comment = async (req, res) => {
  const { name, email, comment } = req.body;
  const { imageId } = req.params;
  const image = await Image.findOne({ filename: { $regex: imageId } });

  if(image) {
    const newComment = new Comment({ name, email, comment });
    newComment.gravatar = md5(newComment.email);
    newComment.imageId = image._id
    await newComment.save();
    res.redirect(`/images/${image.uniqueId}`);
  }
  res.redirect('/');
};
controller.remove = (req, res) => {

};

module.exports = controller;
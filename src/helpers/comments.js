const { Comment } = require("../models");

// Utimos comentarios registrados
const newest = async () => {
  const comments = await Comment.find().limit(5).sort({ createdAt: -1 });

  for (const comment of comments) {
    const image = await Image.findOne({ _id: comment.imageId });
    comment.image = image;
  }
  return comments;
};

module.exports = {
  newest,
};

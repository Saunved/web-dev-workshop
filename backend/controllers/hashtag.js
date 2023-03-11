const Hashtag = require("./../models/Hashtag");
const Joi = require("joi");

module.exports.createHashtag = async (req, res) => {
  const schema = Joi.object({
    tag: Joi.string().min(4).max(100).pattern(/^#.*$/).required()
  });
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json(error.details);
  }
  try {
    const tag = req.body.tag;
    const hashtag = await Hashtag.create({ tag });

    return res.status(201).json({
      data: { hashtag: { id: hashtag.id } },
      message: "Hashtag created."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while creating hashtag."
    });
  }
};

module.exports.getAllHashtags = async (req, res) => {
  try {
    const hashtags = await Hashtag.findAll({});

    return res.status(200).json({
      data: { hashtags: hashtags }
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error while fetching hashtags."
    });
  }
};

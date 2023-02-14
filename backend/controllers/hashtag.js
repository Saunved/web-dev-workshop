const Hashtag = require("./../models/Hashtag");

module.exports.createHashtag = async (req, res) => {
  try {
    // Add tag to Hashtag model
    const hashtag = await Hashtag.create(req.body);

    return res.status(200).json({
      data: { hashtag: { id: hashtag.id } },
      message: "Hashtag created.",
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while creating Hashtag.",
    });
  }
};

module.exports.getHashtag = async (req, res) => {
  try {
    const hashtag = await Hashtag.findOne({ where: { id: req.query.id } });

    return res.status(200).json({
      data: { hashtag: hashtag },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while fetching hashtag.",
    });
  }
};

module.exports.getAllHashtags = async (req, res) => {
  try {
    const hashtag = await Hashtag.findAll({});

    return res.status(200).json({
      date: { hashtags: hashtag },
    });
  } catch (err) {
    return res.status(400).json({
      message: "Error while fetching hashtags.",
    });
  }
};

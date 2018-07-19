const mongoose = require('mongoose');

const Isp = mongoose.model('Isp');
const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if (isPhoto) {
      next(null, true);
    } else {
      next(
        {
          message: "That filetype isn't allowed!",
        },
        false
      );
    }
  },
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};

exports.addIsp = (req, res) => {
  res.render('editIsp', {
    title: 'Add Your ISP',
  });
};

exports.createIsp = async (req, res) => {
  const isp = await new Isp(req.body).save();
  res.json(isp);
};

exports.getIsps = async (req, res) => {
  // Query the db for list of all isps
  const isps = await Isp.find();
  res.json(isps);
};

exports.editIsp = async (req, res) => {
  // Find the isp given the id
  const isp = await Isp.findOne({
    _id: req.params.id,
  });
  // Confirm that they are the owner

  // Render form
  res.render('editIsp', {
    title: `Edit ${isp.name}`,
    isp,
  });
};

exports.updateIsp = async (req, res) => {
  // find and update the isp
  const isp = await Isp.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true, // return the new isp instead of the old one
      runValidators: true,
    }
  ).exec();
  res.json(isp);
};

exports.getIspBySlug = async (req, res, next) => {
  const isp = await Isp.findOne({
    slug: req.params.slug,
  });

  if (!isp) return next();

  res.json(isp);
};

exports.getIspsByTag = async (req, res) => {
  const tagQuery = req.params.tag || {
    $exists: true,
    $ne: [],
  };

  const tagsPromise = Isp.getTagsList();
  const ispsPromise = Isp.find({
    tags: tagQuery,
  });
  const [tags, isps] = await Promise.all([tagsPromise, ispsPromise]);

  res.json(tags);
};

exports.getIspsByTagName = async (req, res) => {
  const tagQuery = req.params.tag || {
    $exists: true,
    $ne: [],
  };

  const tagsPromise = Isp.getTagsList();
  const ispsPromise = Isp.find({
    tags: tagQuery,
  });
  const [tags, isps] = await Promise.all([tagsPromise, ispsPromise]);

  res.json(isps);
};

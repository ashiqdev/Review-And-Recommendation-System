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

exports.addStore = (req, res) => {
  res.render('editIsp', {
    title: 'Add Your ISP',
  });
};

exports.createStore = async (req, res) => {
  const store = await new Isp(req.body).save();
  res.json(store);
};

exports.getStores = async (req, res) => {
  // Query the db for list of all stores
  const stores = await Isp.find();
  res.json(stores);
};

exports.editStore = async (req, res) => {
  // Find the store given the id
  const store = await Isp.findOne({
    _id: req.params.id,
  });
  // Confirm that they are the owner

  // Render form
  res.render('editIsp', {
    title: `Edit ${store.name}`,
    store,
  });
};

exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Isp.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true, // return the new store instead of the old one
      runValidators: true,
    }
  ).exec();
  res.json(store);
};

const mongoose = require('mongoose');

const Store = mongoose.model('Store');
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
  res.render('editStore', {
    title: 'Add Store',
  });
};

exports.createStore = async (req, res) => {
  const store = await new Store(req.body).save();
  res.json(store);
};

// exports.getStores = async (req, res) => {
//   // Query the db for list of all stores
//   const stores = await Store.find();
//   res.json(stores);
// };

exports.editStore = async (req, res) => {
  // Find the store given the id
  const store = await Store.findOne({
    _id: req.params.id,
  });
  // Confirm that they are the owner

  // Render form
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // find and update the store
  const store = await Store.findOneAndUpdate(
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
  // req.flash(
  //   'success',
  //   `Successfully updated <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store →</a>`
  // );
  // res.redirect(`/stores/${store._id}/edit`);
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({
    slug: req.params.slug,
  });

  if (!store) return next();

  res.json(store);
};

exports.getStoresByTag = async (req, res) => {
  const tagQuery = req.params.tag || {
    $exists: true,
    $ne: [],
  };

  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({
    tags: tagQuery,
  });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  res.json(tags);
};

exports.getStoresByTagName = async (req, res) => {
  const tagQuery = req.params.tag || {
    $exists: true,
    $ne: [],
  };

  const tagsPromise = Store.getTagsList();
  const storesPromise = Store.find({
    tags: tagQuery,
  });
  const [tags, stores] = await Promise.all([tagsPromise, storesPromise]);

  res.json(stores);
};

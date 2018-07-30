const mongoose = require('mongoose');

const Store = mongoose.model('Store');



exports.getStores = async (req, res) => {
  // Query the db for list of all stores
  const stores = await Store.find();
  res.json(stores);
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

const mongoose = require('mongoose');

const Store = mongoose.model('Store');



exports.getStores = async (req, res) => {
  // Query the db for list of all stores
  const stores = await Store.find();
  res.json(stores);
};
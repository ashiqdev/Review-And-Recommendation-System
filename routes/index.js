const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const storeController = require('../controllers/storeController');
const ispController = require('../controllers/ispController');

// router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/isps', catchErrors(ispController.getStores));

// শুধু স্টোর মালিক দের জন্য
router.get('/add', storeController.addStore);
// শুধু স্টোর মালিক দের জন্য
router.get('/isps/add', ispController.addStore);

// ইনিশিয়ালি আমরা(ডেভেলপার) স্টোর সাবমিট এর জন্য ব্যবহার করব।
router.post(
  '/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
// ইনিশিয়ালি আমরা(ডেভেলপার) স্টোর সাবমিট এর জন্য ব্যবহার করব।
router.post(
  '/isps/add',
  ispController.upload,
  catchErrors(ispController.resize),
  catchErrors(ispController.createStore)
);

// শুধু স্টোর মালিক দের জন্য
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/isps/:id/edit', catchErrors(ispController.editStore));

// শুধু স্টোর মালিক দের জন্য
router.post(
  '/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

// শুধু স্টোর মালিক দের জন্য
router.post(
  '/isps/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(ispController.updateStore)
);

module.exports = router;

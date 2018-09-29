const express = require('express');

const router = express.Router();

const { catchErrors } = require('../handlers/errorHandlers');

const storeController = require('../controllers/storeController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
// const ispController = require('../controllers/ispController');

// router.get('/', catchErrors(storeController.getStores));
// router.get('/stores', catchErrors(storeController.getStores));
// router.get('/isps', catchErrors(ispController.getIsps));

// শুধু স্টোর মালিক দের জন্য
router.get('/stores/add', storeController.addStore);
// শুধু স্টোর মালিক দের জন্য
// router.get('/isps/add', ispController.addIsp);

// ইনিশিয়ালি আমরা(ডেভেলপার) স্টোর সাবমিট এর জন্য ব্যবহার করব।
router.post(
  '/stores/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);
// ইনিশিয়ালি আমরা(ডেভেলপার) স্টোর সাবমিট এর জন্য ব্যবহার করব।
// router.post('/isps/add', ispController.upload, catchErrors(ispController.resize), catchErrors(ispController.createIsp));

// শুধু স্টোর মালিক দের জন্য
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
// router.get('/isps/:id/edit', catchErrors(ispController.editIsp));

// শুধু স্টোর মালিক দের জন্য update route
router.post(
  '/stores/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

// শুধু স্টোর মালিক দের জন্য
// router.post(
//   '/isps/add/:id',
//   storeController.upload,
//   catchErrors(storeController.resize),
//   catchErrors(ispController.updateIsp)
// );

// get store by their slug
// router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));
// // router.get('/isp/:slug', catchErrors(ispController.getIspBySlug));

// // get stores by their tag
// router.get('/stores/tags', catchErrors(storeController.getStoresByTag));
// router.get('/stores/tags/:tag', catchErrors(storeController.getStoresByTagName));
// router.get('/isps/tags', catchErrors(ispController.getIspsByTag));
// router.get('/isps/tags/:tag', catchErrors(ispController.getIspsByTagName));


// auth and authorization Route 

router.post('/register',
  catchErrors(userController.validateRegister),
  catchErrors(userController.register)
);

router.post('/login',catchErrors(authController.login));

module.exports = router;

const mongoose = require("mongoose"); 
const express = require("express"); 
const router = express.Router(); 


const { catchErrors } = require('../handlers/errorHandlers');
const storeController = require("../apiControllers/storeControllers"); 



router.get("/", catchErrors(storeController.getStores)); 


router.get('/:slug', catchErrors(storeController.getStoreBySlug));

// get stores by their tag
router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTagName));


module.exports = router; 



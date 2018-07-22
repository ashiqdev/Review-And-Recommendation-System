const mongoose = require("mongoose"); 
const express = require("express"); 
const router = express.Router(); 


const { catchErrors } = require('../handlers/errorHandlers');
const storeController = require("../apiControllers/storeControllers"); 



router.get("/", catchErrors(storeController.getStores)); 


module.exports = router; 



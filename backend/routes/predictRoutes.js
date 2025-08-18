const express = require("express");
const { predictText, 
        getHistory ,
        getStats ,
        getExampleComment , 
        getDashboardStats} = require("../controller/predictController");

const router = express.Router();
router.get("/dashboard-stats", getDashboardStats);
router.post("/", predictText);
router.get("/history", getHistory);
router.get("/stats", getStats);
router.get("/example", getExampleComment);


module.exports = router;

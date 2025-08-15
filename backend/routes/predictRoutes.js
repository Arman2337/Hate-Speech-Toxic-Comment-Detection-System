const express = require("express");
const { predictText, getHistory ,getStats} = require("../controller/predictController");

const router = express.Router();

router.post("/", predictText);
router.get("/history/:userId", getHistory);
router.get("/stats", getStats);

module.exports = router;

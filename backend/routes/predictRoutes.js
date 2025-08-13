const express = require("express");
const { predictText, getHistory } = require("../controllers/predictController");

const router = express.Router();

router.post("/", predictText);
router.get("/history/:userId", getHistory);

module.exports = router;

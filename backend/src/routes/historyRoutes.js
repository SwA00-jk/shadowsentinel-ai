const express = require("express");
const router = express.Router();

const {
    getHistory
} = require("../controllers/historyControllers");

router.get("/history", getHistory);

module.exports = router;
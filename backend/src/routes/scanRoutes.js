const express = require("express");
const router = express.Router();

const { scanUrl } = require("../controllers/scanController");

router.post("/scan-url", scanUrl);

module.exports = router;
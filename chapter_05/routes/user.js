const express = require("express");

const router = express.Router();

// GET /user 라우터
router.get("/:id", (req, res) => {
  // GET /user/가 된다
  res.send(`Hello ${req.params.id}`);
});

module.exports = router;

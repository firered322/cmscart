const express = require("express");

const router = express.Router();

/*
 * GET pages index
 */
router.get("/pages", (req, res) => {
  res.send("Admin");
});

/*
 * GET add page
 */
router.get("/add-page", (req, res) => {
  const title = "";
  const slug = "";
  const content = "";

  res.render("admin/add_page", {
    title,
    slug,
    content,
  });
});

//exports
module.exports = router;

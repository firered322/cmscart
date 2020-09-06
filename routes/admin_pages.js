const express = require("express");
const { check, validationResult } = require("express-validator");

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

/*
 * POST add page
 */
router.post(
  "/add-page",
  [
    check("title", "Please enter a title").not().isEmpty(),
    check("content", "Please enter some content").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({
      //   errors: errors.array(),
      // });
      return res.render("admin/add_page", {
        errors: errors.array(),
      });
    }

    let { title, slug, content } = req.body;

    // handling slug
    if (slug) {
      slug = slug.replace(/\s+/g, "-").toLowerCase();
    } else {
      slug = title.replace(/\s+/g, "-").toLowerCase();
    }

    res.render("admin/add_page", {
      title,
      slug,
      content,
    });
  }
);

//exports
module.exports = router;

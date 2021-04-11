//here we are going to setup all our routes for index of our application.
const express = require("express");
const router = express.Router();
const Author = require("../models/author");

// all authors route
router.get("/", async (req, res) => {
  let searchOptions = {};
  if(req.query.name != null && req.query.name !== ''){
      searchOptions.name= new RegExp(req.query.name, 'i')
  }
  try {
    const authors = await Author.find(searchOptions);
    res.render("authors/index", { authors: authors, searchOptions: req.query});
  } catch {
    res.redirect("/");
  }
}); // after this there will no changes in our as we didnt import this in server.js

// new author route i.e to to just display the form
router.get("/new", (req, res) => {
  res.render("authors/new", { author: new Author() }); //here dict element create an Author on which we can perform crud operations
});

//this router actually creates the author
router.post("/", async (req, res) => {
  const author = new Author({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch {
    res.render("authors/new", {
      author: author,
      errorMessage: "Error creating Author",
    });
  }
  //author.save((err, newAuthor) => {
  //  if (err) {
  //    res.render("authors/new", {
  //      author: author,
  //      errorMessage: "Error creating Author",
  //    });
  //  } else {
  //    //res.redirect(`authors/${newAuthor.id}`)
  //    res.redirect(`authors`);
  //  }
  //});
});

module.exports = router;

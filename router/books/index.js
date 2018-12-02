const express = require("express");
const router = express.Router();

const booksCtrl = require("./book.ctrl");
router.get("/", booksCtrl.readBooks);
router.get("/:id", booksCtrl.readBooksById);
router.get("/title/:title", booksCtrl.readBooksByTitle);
router.get("/isRent", booksCtrl.readBooksbyIsRent);
router.post("/", booksCtrl.insertBook);
router.put("/:id", booksCtrl.UpdateBook);
router.delete("/:id", booksCtrl.DeleteBook);

module.exports = router;

const express = require("express");
const router = express.Router();
const { authentication, authAdmin } = require("../middleware/auth");

const { uploadImage } = require("../middleware/uploadImage");
const { uploadFile, uploadAddBook } = require("../middleware/uploadFile");

const {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserBook,
} = require("../controllers/user");

const { Register, Login, checkAuth } = require("../controllers/auth");

const {
  getLibrary,
  addLibrary,
  deleteLibrary,
} = require("../controllers/library");

const {
  getBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook,
  getApprovedBooks,
  getApprovedBooksCategory,
} = require("../controllers/book");

const {
  getAllCategory,
  getCategory,
  addCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category");

// REGISTER & LOGIN ROUTE
router.post("/register", Register);
router.post("/login", Login);
router.get("/auth", authentication, checkAuth);

// USER ROUTE
router.get("/user", authentication, getUsers);
router.get("/user/:id", authentication, getUser);
router.patch("/user/:id", authentication, uploadImage("picture"), updateUser);
router.delete("/user/:id", authentication, authAdmin, deleteUser);

// CATEGORY ROUTE
router.get("/category", getAllCategory);
router.get("/category/:id", getCategory);
router.post("/category", authentication, addCategory);
router.patch("/category/:id", authentication, updateCategory);
router.delete("/category/:id", authentication, authAdmin, deleteCategory);

// BOOK ROUTE
router.get("/books", authentication, getBooks);
router.get("/book/:id", authentication, getBook);
router.post("/book", authentication, uploadFile("file"), addBook);
// router.post("/book", authentication, uploadAddBook(), addBook);
router.get("/user-book/:id", authentication, getUserBook);
router.get("/book-approved", getApprovedBooks);
router.get("/book-approved/:id", getApprovedBooksCategory);
router.patch("/book/:id", authentication, updateBook);
router.delete("/book/:id", authentication, deleteBook);

// LIBRARY ROUTE
router.get("/library/:id", authentication, getLibrary);
router.post("/library/", authentication, addLibrary);
router.delete("/library/:id", authentication, deleteLibrary);

module.exports = router;

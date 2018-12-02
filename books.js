const express = require("express");
const router = express.Router();

const mysql_db = require("./database")();
const pool = mysql_db.init();

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.get("/api/books", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const sql = conn.format("SELECT * FROM `books`", []);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

router.get("/api/books/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { id } = req.params;
      const sql = conn.format("SELECT * FROM `books` WHERE id = ?", [id]);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

router.get("/api/books/title/:title", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { title } = req.params;
      const sql = conn.format("SELECT * FROM `books` WHERE title = ?", [title]);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

router.get("/api/books/isRent", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const sql = conn.format("SELECT * FROM `books` WHERE isRent = 1", []);
      const [result] = await conn.query(sql);
      conn.release();
      res.json(result);
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

router.post("/api/books", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { title, author, publish, comment } = req.body;
      const sql = conn.format(
        "INSERT INTO `books` (title, author, publish, comment) VALUES (?,?,?,?)",
        [title, author, publish, comment]
      );
      await conn.query(sql);
      conn.release();
      res.send("Successfully uploaded!");
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

//UPDATE `books` SET semester = 1 WHERE name = "배민근"
router.put("/api/books/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { title, author, publish, isRent, comment } = req.body;
      const { id } = req.params;
      const sql = conn.format(
        "UPDATE `books` SET title = ?, author=?, publish=?, isRent=? ,comment=?  WHERE id = ?",
        [title, author, publish, isRent, comment, id]
      );
      await conn.query(sql);
      conn.release();
      res.send("Successfully changed!");
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

//DELETE FROM `kweb` WHERE name = "배민근"
router.delete("/api/books/:id", async (req, res) => {
  try {
    const conn = await pool.getConnection();
    try {
      const { id } = req.params;
      const sql = conn.format("DELETE FROM `kweb` WHERE id = ?", [id]);
      await conn.query(sql);
      conn.release();
      res.send("Successfully deleted!");
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
});

module.exports = router;

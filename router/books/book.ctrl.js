const mysql_db = require("../../database/db.config")();
const pool = mysql_db.init();

async function processQuery(query, data) {
  try {
    const conn = await pool.getConnection();
    try {
      const sql = conn.format(query, data);
      const [result] = await conn.query(sql);
      conn.release();
      return result;
    } catch (e) {
      conn.release();
      throw e;
    }
  } catch (e) {
    throw e;
  }
}
exports.readBooks = async (req, res) => {
  try {
    const result = await processQuery("SELECT * FROM `books`", []);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.readBooksById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await processQuery("SELECT * FROM `books` WHERE id = ?", [
      id
    ]);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.readBooksByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await processQuery("SELECT * FROM `books` WHERE title = ?", [
      title
    ]);
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.readBooksbyIsRent = async (req, res) => {
  try {
    const result = await processQuery(
      "SELECT * FROM `books` WHERE isRent = 1",
      []
    );
    res.json(result);
  } catch (e) {
    throw e;
  }
};

exports.insertBook = async (req, res) => {
  try {
    const { title, author, publish, comment } = req.body;
    await processQuery(
      "INSERT INTO `books` (title, author, publish, comment) VALUES (?,?,?,?)",
      [title, author, publish, comment]
    );
    res.send("Successfully uploaded!");
  } catch (e) {
    throw e;
  }
};

exports.UpdateBook = async (req, res) => {
  try {
    const { title, author, publish, isRent, comment } = req.body;
    const { id } = req.params;
    await processQuery(
      "UPDATE `books` SET title = ?, author=?, publish=?, isRent=? ,comment=?  WHERE id = ?",
      [title, author, publish, isRent, comment, id]
    );
    res.send("Successfully changed!");
  } catch (e) {
    throw e;
  }
};

exports.DeleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await processQuery("DELETE FROM `books` WHERE id = ?", [id]);
    res.send("Successfully Deleted!");
  } catch (e) {
    throw e;
  }
};

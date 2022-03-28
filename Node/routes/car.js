var express = require("express");
var router = express.Router();
const connector = require("../poolconnect");
router.get("/createtable", function (req, res) {
  const sql =
    "CREATE TABLE car(id INT, carname VARCHAR(200), price INT, color ENUM('Black','Blue','Grey'),in_stock BOOLEAN, PRIMARY KEY(id))";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.get("/", (req, res) => {
  const sql = "SELECT * FROM car";
  connector.query(sql, (err, results, fields) => {
    res.json({ results });
  });
});
router.post("/", (req, res) => {
  const { id, carname, price, color, in_stock } = req.body;
  const sql = `INSERT INTO car VALUES(?,?,?,?,?)`;
  connector.query(
    sql,
    [id, carname, price, color, in_stock],
    (err, results, fields) => {
      res.json({ err, results, fields });
    }
  );
});
router.delete("/:id", (req, res) => {
  const sql = `DELETE FROM car WHERE id="${req.params.id}"`;
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
router.put("/:id", (req, res) => {
  const { carname, price, color, in_stock } = req.body;
  const sql = `UPDATE car SET carname=?, price=?, color=?, in_stock=? WHERE id=${req.params.id}`;
  connector.query(
    sql,
    [carname, price, color, in_stock],
    (err, results, fields) => {
      res.json({ err, results, fields });
    }
  );
});
router.get("/deleteall", (req, res) => {
  const sql = "DELETE FROM car";
  connector.query(sql, (err, results, fields) => {
    res.json({ err, results, fields });
  });
});
module.exports = router;

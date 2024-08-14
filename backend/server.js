const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  user: "sa",
  password: "12345678",
  server: "MSI\\SQLEXPRESS",
  database: "MyDb",
};

const poolPromise = new sql.ConnectionPool(dbConfig)
  .connect()
  .then((pool) => {
    console.log("coonected to msqql databse");
    return pool;
  })
  .catch((err) => {
    console.error("Database connection failed", err);
  });

app.post("/api/receive", async (req, res) => {
  try {
    const { productName, quantity } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("productName", sql.VarChar, productName)
      .input("quantity", sql.Int, quantity)
      .query(
        "INSERT INTO ReceiveMaterial (productName,quantity) VALUES(@productName,@quantity)"
      );
    res.status(200).send("received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error receiving material");
  }
});

app.get("/api/receive_items", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM ReceiveMaterial ");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching");
  }
});

app.post("/api/issue", async (req, res) => {
  try {
    const { productName, quantity } = req.body;
    const pool = await poolPromise;
    await pool
      .request()
      .input("productName", sql.VarChar, productName)
      .input("quantity", sql.Int, quantity)
      .query(
        "INSERT INTO IssueMaterial (productName,quantity) VALUES(@productName,@quantity)"
      );
    res.status(200).send("received");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error receiving material");
  }
});

app.get("/api/issued_items", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM IssueMaterial ");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(500).send("error fetching");
  }
});

// app.get("/api/getinventory", async (req, res) => {
//   try {
//     const pool = await poolPromise;
//     const result = await pool.request().query(` SELECT
//   r.productName,
//   ISNULL(SUM(r.quantity),0) AS receivedQuantity,
//   ISNULL((SELECT SUM(i.quantity) FROM IssueMaterial i WHERE i.productName = r.productName),0) AS issuedQuantity,
//   ISNULL(SUM(r.quantity),0) - ISNULL((SELECT SUM(i.quantity) FROM IssueMaterial i WHERE i.productName = r.productName),0) AS remainingQuantity FROM ReceiveMaterial r GROUP BY r.productName
//   `);
//   res.status(200).send(result.recordset);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error fetching inventory data");
//   }
// });

app.get("/api/getinventory", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(` SELECT
  r.productName,
  ISNULL(SUM(r.quantity),0) AS receivedQuantity,
  ISNULL((SELECT SUM(i.quantity) FROM IssueMaterial i WHERE i.productName = r.productName),0) AS issuedQuantity,
  ISNULL(SUM(r.quantity),0) - ISNULL((SELECT SUM(i.quantity) FROM IssueMaterial i WHERE i.productName = r.productName),0) AS remainingQuantity,
  CASE 
  WHEN ISNULL((SELECT SUM(i.quantity)FROM IssueMaterial i WHERE i.productName = r.productName ),0) >= ISNULL (SUM(r.quantity),0) THEN 'YES' ELSE 'NO' END AS status
  FROM ReceiveMaterial r GROUP BY r.productName
  `);
    res.status(200).send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching inventory data");
  }
});








app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

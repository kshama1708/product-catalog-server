const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const productRoutes = require("./routes/productroutes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/products", productRoutes);


app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database Connected Successfully!",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database Connection Failed" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
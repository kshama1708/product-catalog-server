const pool = require("../config/db");

const getProducts = async (req, res) => {
  try {
    const { category, cursor } = req.query;

    let query = `
      SELECT *
      FROM products
    `;

    let values = [];
    let conditions = [];

    // Category filter
    if (category) {
      conditions.push(`category = $${values.length + 1}`);
      values.push(category);
    }

    // Cursor pagination
 
if (cursor) {
  const [updatedAt, id] = cursor.split(",");

  conditions.push(
    `(updated_at, id) < ($${values.length + 1}, $${values.length + 2})`
  );

  values.push(updatedAt, id);
}

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

   query += `
  ORDER BY updated_at DESC, id DESC
  LIMIT 20
`;

    const result = await pool.query(query, values);

    let nextCursor = null;

    if (result.rows.length > 0) {
      const last = result.rows[result.rows.length - 1];
     nextCursor = `${last.updated_at.toISOString()},${last.id}`;
    }

    res.json({
      products: result.rows,
      nextCursor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getProducts };
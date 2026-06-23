const pool = require("../config/db");
const { faker } = require("@faker-js/faker");
const { v4: uuidv4 } = require("uuid");

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Sports",
  "Books",
  "Toys",
  "Beauty",
  "Automotive",
  "Garden",
  "Office",
];

const TOTAL_PRODUCTS = 200000;
const BATCH_SIZE = 1000;

async function seedProducts() {
  try {
    console.log("Seeding started...");

    for (let i = 0; i < TOTAL_PRODUCTS; i += BATCH_SIZE) {
      const values = [];
      const placeholders = [];

      for (let j = 0; j < BATCH_SIZE && i + j < TOTAL_PRODUCTS; j++) {
        const id = uuidv4();
        const name = faker.commerce.productName();
        const category =
          categories[Math.floor(Math.random() * categories.length)];
        const price = faker.commerce.price({ min: 100, max: 10000 });
        const createdAt = faker.date.past();
        const updatedAt = faker.date.between({
          from: createdAt,
          to: new Date(),
        });

        const index = j * 6;

        placeholders.push(
          `($${index + 1}, $${index + 2}, $${index + 3}, $${index + 4}, $${index + 5}, $${index + 6})`
        );

        values.push(
          id,
          name,
          category,
          price,
          createdAt,
          updatedAt
        );
      }

      await pool.query(
        `
        INSERT INTO products
        (id, name, category, price, created_at, updated_at)
        VALUES ${placeholders.join(",")}
      `,
        values
      );

      console.log(
        `Inserted ${Math.min(i + BATCH_SIZE, TOTAL_PRODUCTS)} products`
      );
    }

    console.log("✅ 200000 Products Inserted Successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedProducts();
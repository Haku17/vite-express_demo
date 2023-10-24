import express, { Request, Response, query } from "express";
import ViteExpress from "vite-express";
import pool from "./db.config";
require("dotenv").config();

//const PORT = process.env.PORT || 3000;

const app = express();

app.get("/products", getProducts);
app.use(express.json());

function getProducts(req: Request, res: Response) {
  pool.query("SELECT * FROM products", (error: Error, products: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(products.rows);
  });
}

async function addProduct(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText =
      "INSERT INTO products (name, price, description) VALUES($1, $2, $3)";
    await client.query(queryText, [
      req.body.name,
      req.body.price,
      req.body.description,
    ]);
    await client.query("COMMIT");
    res.json(req.body);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

app.post("/products", addProduct);

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

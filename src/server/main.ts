import express, { Request, Response, query } from "express";
import ViteExpress from "vite-express";
import pool from "./db.config";
require("dotenv").config();

//const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// Get all products
function getProducts(req: Request, res: Response) {
  pool.query("SELECT * FROM products", (error: Error, products: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(products.rows);
  });
}

// Add a single product to DB
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

async function deleteProduct(req: Request, res: Response) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const queryText = "DELETE FROM products WHERE ID=$1";
    await client.query(queryText, [req.body.id]);
    await client.query("COMMIT");
    res.json(req.body);
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}

app.get("/products", getProducts);
app.post("/products", addProduct);
app.delete("/products", deleteProduct);

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

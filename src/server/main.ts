import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import pool from "./db.config";
require("dotenv").config();

//const PORT = process.env.PORT || 3000;

const app = express();

app.use("/products", getProducts);
app.use(express.json());

function getProducts(req: Request, res: Response) {
  pool.query("SELECT * FROM products", (error: Error, products: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(products.rows);
  });
}

app.post("/post", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

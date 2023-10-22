import express, { Request, Response } from "express";
import ViteExpress from "vite-express";
import pool from "./db.config";
require("dotenv").config();

//const PORT = process.env.PORT || 3000;

const app = express();

function getProducts(req: Request, res: Response) {
  pool.query("SELECT * FROM products", (error: Error, products: any) => {
    if (error) {
      throw error;
    }
    res.status(200).json(products.rows);
  });
}

app.get("/hello", (_, res) => {
  res.send("Hello Vite + React + TypeScript!");
});

app.use("/products", getProducts);

ViteExpress.listen(app, 3000, () =>
  console.log(`Server is listening on port 3000...`)
);

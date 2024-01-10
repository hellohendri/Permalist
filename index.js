import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE,
});

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items = [
  { id: 1, title: "Buy milk" },
  { id: 2, title: "Finish homework" },
];

app.get("/", async (req, res) => {
  await getAllItems();

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  await addNewItems(item);

  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const { body } = req;

  await updateItem(body.updatedItemId, body.updatedItemTitle);
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const { body } = req;

  await deleteItem(body.deleteItemId);
  res.redirect("/");
});

async function getAllItems() {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("SELECT * FROM items");

    items = result.rows;
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function addNewItems(item) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("INSERT INTO items (title) VALUES ($1)", [item]);

    console.log(`Inserted new item ${item}. Rows affected: ${result.rowCount}`);
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function deleteItem(item) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("DELETE FROM items WHERE id = ($1)", [item]);

    console.log(`Succesfully deleted item with id of ${item}. Rows affected: ${result.rowCount}`);
  } catch (error) {
    console.error("Error executing query:", error);
  } finally {
    if (client) {
      client.release();
    }
  }
}

async function updateItem(updatedItemId, updatedItemTitle) {
  let client;

  try {
    client = await pool.connect();
    const result = await client.query("UPDATE items SET title = $1 WHERE id = $2", [updatedItemTitle, updatedItemId]);

    console.log(`Succesfully updated item with id of ${updatedItemId}. Rows affected: ${result.rowCount}`);
  } catch (err) {
    console.error('Error updating item:', err);
    throw err;
  } finally {
    if (client) {
      client.release();
    }
  }
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
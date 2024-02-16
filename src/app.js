import PocketBase from "pocketbase";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

// Create a new PocketBase instance with the provided database URL
const db = new PocketBase("http://localhost:8090/api/collections/books/records");

const app = express();

app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎🌍🌏✨🌈🦄",
  });
});

// Endpoint to get all books
app.get("/books", (req, res) => {
  // Use PocketBase to execute SQL query to get all books
  db.query("SELECT * FROM books", (err, rows) => {
    if (err) {
      console.log("Error running SQL query: " + err);

      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    } else {
      res.json({
        message: "All books",
        data: rows,
      });
    }
  });
});

// Endpoint to add a new book
app.post("/books", (req, res) => {
  const { title, author, year } = req.body;

  // Use PocketBase to execute SQL query to insert a new book
  db.query("INSERT INTO books (title, author, year) VALUES (?, ?, ?)", [title, author, year], (err, result) => {
    if (err) {
      console.log("Error running SQL query: " + err);

      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    } else {
      res.json({
        message: `Book added with ID ${result.insertId}`,
      });
    }
  });
});

// Endpoint to delete a book
app.delete("/books/:id", (req, res) => {
  const { id } = req.params;

  // Use PocketBase to execute SQL query to delete a book by ID
  db.query("DELETE FROM books WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log("Error running SQL query: " + err);

      res.status(500);
      res.json({
        message: "Internal Server Error",
      });
    } else {
      res.json({
        message: `Book with ID ${id} deleted`,
      });
    }
  });
});

// Start the server
const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});

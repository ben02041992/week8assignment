require("dotenv").config();
const express = require("express");

const Book = require("./books/model");
const Author = require("./author/model");
const Genre = require("./genres/model");

const port = process.env.PORT || 5001;

const app = express();

app.use(express.json());

const bookRoutes = require("./books/routes");
const authorRoutes = require("./authors/routes");
const genreRoutes = require("./genres/routes");

app.use("/books", bookRoutes);
app.use("/authors", authorRoutes);
app.use("/genres", genreRoutes);

const syncTables = async () => {
  Book.belongsTo(Genre);
  Book.belongsTo(Author);

  Book.hasOne(Genre);
  Book.hasOne(Author);

  Genre.sync();
  Author.sync();
  Book.sync();
};

app.get("/health", (req, res) => {
  res.send({ message: "API is healthy" });
});

app.listen(port, async () => {
  console.log(`Server is running on ${port}.`);
  await syncTables();
  console.log(syncTables());
});

const routes = require("./src/routes");
const express = require("express");
const { connectToDatabase } = require("./src/database");
const { errorHandler } = require("./src/handler");
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
});


app.use(routes);
app.use(errorHandler);

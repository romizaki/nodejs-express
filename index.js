const routes = require('./src/routes');
const express = require('express');
const { connectToDatabase } = require('./src/database');

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  });

app.use(routes);

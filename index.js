const express = require('express');

const startServer = async () => {
  const app = express();

  await require('./src/loaders')(app);

  app.listen(process.env.PORT, err => {
    if (err) {
      process.exit(1);
    }
    console.log("Port opened at " + process.env.PORT);
  });
}

startServer();

const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', error => {
  console.log('Uncaught exception. Shutting down..');
  console.log(error.name, error.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database connection successful');
  });

// Start server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App is running on local host, port ${port}`);
});

process.on('unhandledRejection', error => {
  console.log('Unhandled Rejection. Shutting down..');
  console.log(error.name, error.message);
  server.close(() => {
    process.exit(1);
  });
});

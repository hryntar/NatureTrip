const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('----------------------------');
  console.log('UNCAUGHT EXCEPTION, SHUTTING DOWN...');
  console.error(err);
  process.exit(1);
});

dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PWD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Connected to DB'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('----------------------------');
  console.log('UNHANDLED REJECTION, SHUTTING DOWN...');
  console.error(err);
  server.close(() => {
    process.exit(1);
  });
});

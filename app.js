const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World', app: 'NatureTrip' });
});

const port = 3000;
app.listen(3000, () => {
  console.log(`App running on port ${port}`);
});

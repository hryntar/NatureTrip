const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './.env' });

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PWD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => console.log('Connected to DB'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  }
})

const Tour = mongoose.model('Tour', tourSchema);

const testTour = new Tour({
  name: "Forest Hiker",
  rating: 4.7,
  price: 497
})

testTour.save().then(doc => {
  console.log(doc);
}).catch(err => {
  console.log("ERROR ===========> ", err)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

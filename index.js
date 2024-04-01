require('dotenv').config()
const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

// Create a Schema object
const userSchema = new mongoose.Schema({
    name: String,
    studentId: String
});

// Create a Mongoose model for the user schema
const User = mongoose.model('User', userSchema);

// Create a Schema object

// This Activitry creates the collection called activitimodels

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});



app.post('/', async (req, res) => {
  try {
     // get the data from the form
      const url = req.body.myuri;

      await mongoose.connect(url, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      });
    // connect to the database and log the connection
      const db = mongoose.connection;
      db.once('open', () => {
          console.log('Connected to MongoDB');
      });

  
      const newUser = new User({
          name: "Smart Egbuchulem",
          studentId: "300333966"
      });

      // add the data to the database
      await newUser.save();

      // send a response to the user
      res.send(`<h1>Document Added</h1>`);
  } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      res.status(500).send('Error connecting to MongoDB');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

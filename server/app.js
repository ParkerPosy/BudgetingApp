const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create our MongoDB Connection
const uri = 'mongodb+srv://parkerconn:CIT382-01@cluster0.mgd3xv8.mongodb.net/?retryWrites=true&w=majority';

const Expense = mongoose.model('expense', new mongoose.Schema({
  cost: Number,
  type: String,
}));

// Options are to supress deprecation warnings
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to Mongo');
});

mongoose.connection.on('error', (error) => {
  console.error('Error:', error);
});


// Create our server
const app = express();
// Add a request handler
app.use(bodyParser.json());

// Create a GET request route path
app.get('/all-expenses', (_, response) => {
  Expense.find({})
    .then(data => {
      response.send(data);
    }).catch(error => {
      console.error(error);
    });
});

// Create a POST request route path
app.post('/send-expense', (request, response) => {
  const expense = new Expense({
    cost: request.body.cost,
    type: request.body.type,
  });
  expense.save()
    .then(data => {
      console.log('Success Sending');
      // console.log(data);
      response.send('Success Sending');
    }).catch(error => {
      console.error('Error sending: ', error);
    });
});

// Create a DELETE request route path
app.delete('/delete-expense', (request, response) => {
  Expense.findByIdAndRemove(request.body.id)
    .then(data => {
      console.log('Deleted Expense');
      // console.log(data);
      response.send('Deleted Expense');
    }).catch(error => {
      console.error('Error deleting: ', error);
    });
});

// Create a PUT request route path
app.put('/update-expense', (request, response) => {
  Expense.findByIdAndUpdate(request.body.id, {
    cost: request.body.cost,
    type: request.body.type,
  }).then(data => {
    console.log('Updated Expense');
    // console.log(data);
    response.send('Updated Expense');
  }).catch(error => {
    console.error('Error Updating: ', error);
  });
});

// Run the app on port 3000
app.listen(3000, () => {
  console.log('Server Running');
});
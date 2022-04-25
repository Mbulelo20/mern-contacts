const express = require('express'); 
const bodyParser = require('body-parser');
const cors = require('cors'); // cors enables ajax requests to remote hosts
const mongoose = require('mongoose'); //mongoose allows connection to mongoDB database
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// after setting up middlewares,
// initialize mongo uri
// connect to the uri
// once mongoose connection (mongoose.connection.once) is ('open') console log a message

const URI = process.env.MONGO_URI;
mongoose.connect(URI).then(
    mongoose.connection.once('open', () => {
        console.log('MongoDB running')
    })
)

app.use('/api/contacts', require('./routes/contactsRoutes'));
app.use('/api/users', require('./routes/userRoutes'))

// serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'))
  }
app.listen(port, () => {
    console.log('listening on port:', port)
})
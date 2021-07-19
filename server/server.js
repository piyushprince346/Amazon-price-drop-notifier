const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const user = require('./routes/user');
const product = require('./routes/product');
const mongoose = require('mongoose');

const app = express();

// connect to mongo DB
const dbURI = 'mongodb+srv://mongodbuser:Amazon2021@amazon-price-drop-exten.xqrpz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log('Database is connected');
    })
    .catch((error) => {
        console.log(error);
    })


app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
    res.send('<h1>Hello world..!</h1>');
})

// app.post('/products', (req, res) => {
//     console.log('A user signed up with the below info: ');
//     console.log(req.body);
//     res.send('Post operation Completed Successfully')
// })

app.use("/user", user);
app.use("/product", product);

app.listen(3000, () => {
    console.log('Server started on port 3000....!');
});
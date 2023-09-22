const {getConnection} = require('./db/db-connect-mongo.js');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

getConnection();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use('/category', require('./routes/category.js'));
app.use('/brand', require('./routes/brand.js'));
app.use('/role', require('./routes/role.js'));
app.use('/seller', require('./routes/seller.js'));
app.use('/user', require('./routes/user.js'));
app.use('/product', require('./routes/product.js'));
app.use('/auth', require('./routes/auth.js'));

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
})
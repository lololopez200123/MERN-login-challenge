require('dotenv').config()
require('./mongo')

const express = require('express');
const cors = require('cors')
const path = require('path')

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users/', require(path.join(__dirname,'routes','index')))


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});

module.exports = {app}

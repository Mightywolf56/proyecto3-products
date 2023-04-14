const express = require("express")
const cors = require('cors')
const { PORT } = require('../config')
require('dotenv').config()

const productsRouter = require('./products/products.router')
const initModels = require('./models/initModels')
const app = express()
const db = require('./utils/database')

db.authenticate()
    .then(() => console.log('Database Authenticated!'))
    .catch(err => console.log(err));

db.sync()
    .then(() => console.log('Database Synced!'))
    .catch(err => console.log(err));
initModels();


app.use(express.json());
app.use(cors());



app.use('/', productsRouter)



app.listen(PORT, () => {
    console.log(`Server started at port ${PORT}`)
})
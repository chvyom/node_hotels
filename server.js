const express= require('express');
const app = express();
const db= require('./db');
require('dotenv').config()
const PORT=process.env.PORT || 3000


const bodyParser=require('body-parser')
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('welcome to our hotel')
})

const personRoutes=require('./routes/personRoutes')
app.use('/person',personRoutes)

const menuRoutes=require('./routes/menuRoutes')
app.use('/menu',menuRoutes)

app.listen(3000, () => {
  console.log('Server is running')
})
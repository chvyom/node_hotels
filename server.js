const express= require('express');
const app = express();
const db= require('./db');
require('dotenv').config()
const PORT=process.env.PORT || 3000
const passport=require('./auth')

//Middleware Function
const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`)
    next();//Move to next phase
}

app.use(logRequest)

app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',function(req,res){
  res.send('Welcome to our Hotel')
})

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


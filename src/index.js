const express = require('express');
const { registerRoute } = require('./routes/register');
const { loginRoute } = require('./routes/login');
const session = require('express-session');
const app = express();
require('dotenv').config();


app.use(session({
    secret:'apple',
}))

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.get('/add',(req,res)=>{
    res.render('add-user')
})
app.get('/login',(req,res)=>{
    res.render('login-user')
})
app.get('/',(req,res)=>{
    res.render('Home',{user: req.session.user})
})

app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});


app.use(express.json())
app.use('/api',registerRoute)
app.use('/api',loginRoute)

const PORT = process.env.PORT || 3000 
app.listen(PORT,()=>{
    console.log(`The server is running on port number is :${PORT}`)
})
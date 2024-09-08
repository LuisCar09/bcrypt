const express = require('express')
const dotenv = require('dotenv');
const routes = require('./routes/users')
const session = require('express-session')
const hashed = require('./crypto/config')

const app = express()
dotenv.config()
const PORT = process.env.PORT || 4000



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: hashed,
    resave : 'false',
    saveUninitialized : true,
    cookie : {secure:false}
}))

app.use(routes)

app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
    
})


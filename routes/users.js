const express = require('express')
const {generatorToken,verifToken} = require('../middlewares/authMiddleware')
const users = require("../data/users")
const router = express.Router()


router.get('/', (req, res) => {
    
  if (req.session.token) {
    res.redirect('/dashboard')
  }else{
    const loginForm = `
    <form action="/login" method="post">
    <label for="username">Usuario:</label>
    <input type="text" id="username" name="username" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>

        <button type="submit">Iniciar sesión</button>
        </form>
        <a href="/dashboard">dashboard</a>

    `;

    res.send(loginForm);
  }
})

router.post('/login',(req,res) => {
    const {username,password } = req.body
    
    const findUser = users.find(user => user.username === username && user.password === password)
    
    if (!findUser) {
        res.status(401).redirect('/');
        
    }else{
        const token = generatorToken(findUser)
        req.session.token = token
        res.redirect('/dashboard')
        
        
    }
    
    
})

router.get('/dashboard',verifToken,(req,res) =>{
    const tokenId = req.user
    const user = users.find(user => user.id === tokenId)
    const template = `<p>ID:${user.id}</p> <p>${user.name}</p> <p>${user.username}</p> <a href="/logout"><button>Logout </button> </a> ` 
    res.send(template)
})

router.get('/logout',verifToken,(req,res) =>{
    req.session.destroy((error) => {
        if (error) {
            res.status(500).json({Message:'Error closing session' })
        }
        res.redirect("/")
    }) 
    
})



router.use((req, res) =>
    res.send('<h1>Page not found</h1>')
)


module.exports = router


  
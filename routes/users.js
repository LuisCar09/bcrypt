const express = require('express')
const {generatorToken,verifToken} = require('../middlewares/authMiddleware')
const router = express.Router()

router.get('/', (req, res) => {
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

const users = [
    {
      id: 1,
      username: 'luis',
      password: 'bravo',
      name: 'Luis Carlos'
    },
    {
      id: 2,
      username: 'user2',
      password: 'password456',
      name: 'Jane Smith'
    },
    {
      id: 3,
      username: 'user3',
      password: 'password789',
      name: 'Michael Johnson'
    },
    {
      id: 4,
      username: 'user4',
      password: 'password101',
      name: 'Emily Brown'
    },
    {
      id: 5,
      username: 'user5',
      password: 'password202',
      name: 'David Williams'
    }
  ];
  
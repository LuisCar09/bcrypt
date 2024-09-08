const bcrypt = require('bcrypt')
const dotenv = require('dotenv');

dotenv.config()

const secret = process.env.SECRET
const hashedSecret = bcrypt.hashSync(secret, 10);



module.exports = hashedSecret
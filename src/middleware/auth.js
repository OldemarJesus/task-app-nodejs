const jwt = require('jsonwebtoken')
const User = require('../models/user')

require('dotenv').config()

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = await jwt.verify(token, process.env.JWT_TOKEN)

        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ message: 'Please authenticate.' })
    }
}

module.exports = auth
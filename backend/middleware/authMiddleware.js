const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async(req, res, next) => {
    let token 

    if (req.headers.authorisation && req.headers.authorisation.startsWith('Bearer')) {
        try {
            // get token from header
            token = req.headers.authorisation.split(' ')[1]

            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRETE)

            // GET USER FROM TOKEN
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorised')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorised, no token')
    }
})

module.exports = { protect }

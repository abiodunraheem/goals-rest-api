const express = require('express');
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()

app.listen(port, (req, res) => {
    console.log(`server started on port ${port}`)
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(errorHandler)

app.use('/api/goals', require('./routes/goalRoutes'))

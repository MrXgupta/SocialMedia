const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const getUserDetails =  require('./routes/userDetailsRoutes')
const handlePost =  require('./routes/postRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())


connectDB()


app.use('/api/auth', authRoutes)
app.use('/api/user', getUserDetails)
app.use('/api/post' , handlePost)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

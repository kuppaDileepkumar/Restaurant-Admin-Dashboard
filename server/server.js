const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const cors = require('cors')  // ✅ Import cors
const path = require('path')

dotenv.config()
connectDB()

const app = express()
app.use(express.json())

app.use('/images', express.static('images'));
// Enable CORS for all routes
app.use(cors())

// Optional: restrict to your frontend only
app.use(cors({ origin: 'http://localhost:3000' }))

// Routes
app.use('/api/menu', require('./routes/menuRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))


const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
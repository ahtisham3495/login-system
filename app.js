const mongoose = require("mongoose")
const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const http = require("http");
require("dotenv").config();
const app = express()

const server = http.createServer(app);

// DB Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("DB CONNECTED")
}).catch(() => {
    console.log("UNABLE to connect to DB")
})

// Use parsing middleware
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// Import the routes
const userRoutes = require("./routes/user");



// Using routes
app.use('/api', userRoutes)

const port = process.env.PORT || 5000

// Starting a server
server.listen(port, () => {
    console.log(`App is running at ${port}`)
})
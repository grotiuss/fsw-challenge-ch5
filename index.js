const express = require('express')
const app = express()
let users = require('./db/users.json')
const port = 9000

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.get('/',(req, res) => {
    res.send("Hello World")
})

const game = require('./routers/game')
app.use(game)


app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`)
})
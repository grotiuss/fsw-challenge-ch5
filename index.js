const express = require('express')
const app = express()
const port = 9000

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(__dirname + '/public'));

app.get('/',(req, res) => {
    res.render('pages/index')
})

app.get('/login', (req,res) => {
    res.render('pages/login')
})

const game = require('./routers/game')
app.use(game)


app.listen(port, () => {
    console.log(__dirname)
    console.log(`Server berjalan di http://localhost:${port}`)
})
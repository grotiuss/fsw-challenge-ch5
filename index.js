const express = require('express')
const app = express()
const fs = require('fs')
const port = process.env.PORT || 9000

let accounts = require('./db/accounts.json')

let user = {
    id: undefined,
    username: undefined
}

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    fs.readFile('db/accounts.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        var content = JSON.parse(data)
        accounts = content
    })
    console.log('Daftar akun pada halaman utama')
    console.log(accounts)
    next()
})


app.get('/login', (req,res) => {
    res.render('pages/login', user)
})

app.get('/logout', (req, res) => {
    user.id = undefined
    user.username = undefined
    res.redirect('/')
})

app.get('/register', (req, res) => {
    res.send('Halaman register')
})

app.get('/',(req, res) => {
    res.render('pages/index', user)
})

app.post('/login', (req,res) => {
    var input = {
        username: req.body.username,
        password: req.body.password
    }

    var result = accounts.filter(account => ((account.username === input.username) && (account.password === input.password)))

    if(result.length>0){
        console.log('Login succesfully! :D')
        user.id = result[0].id
        user.username = result[0].username
        res.redirect('/')
    } else{
        console.log('Login failed! :(')
        res.send('Login gagal')
    }
    res.redirect('/')
})

let game = require('./routers/game')
game.params = user
app.use(game)


app.listen(port, () => {
    console.log(__dirname)
    console.log(`Server berjalan di http://localhost:${port}`)
})
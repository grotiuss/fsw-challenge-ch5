var fs = require('fs')
const express = require('express')
const router = express.Router()

let accounts = undefined
let user = {}
let login = {
    status: '',
}

router.use((req, res, next) => {
    user = router.params
    fs.readFile('db/accounts.json', 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        var content = JSON.parse(data)
        accounts = content
    })
    next()
})

router.get('/game/login', (req, res) => {
    res.render('game/login',login)
})

router.get('/game/logout', (req, res) => {
    user.id = undefined
    user.username = undefined
    router.params = {
        id: undefined,
        username: undefined
    }
    login.status = ''
    res.redirect('/game')
})


//Register account
router.get('/game/register', (req, res) => {
    // res.send('Halaman register')
    res.render('game/register')
})

router.post('/game/register', (req, res) => {
    var input = {
        username: req.body.username,
        password: req.body.password
    }
    //Checking data
    var result = accounts.filter(account => account.username === input.username)
    if (result.length > 0) {
        res.render('game/register')
    } else {
        var temp = {
            id: accounts.length + 1,
            username: input.username,
            password: input.password
        }

        //Push to JSON
        fs.readFile('db/accounts.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
            }
            var content = JSON.parse(data)
            content.push(temp)
            accounts = content
            var json = JSON.stringify(content, undefined, 1)
            fs.writeFile('db/accounts.json', json, 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                } else {
                    console.log('Register succesfully')
                }
            });
        })
        login.status = 'Register successfully!'
        res.redirect('/game/login')
    }
})

//Login
router.post('/game', (req, res) => {
    var input = {
        username: req.body.username,
        password: req.body.password
    }
    var result = accounts.filter(account => ((account.username === input.username) && (account.password === input.password)))
    if (result.length > 0) {
        user.id = result[0].id
        user.username = result[0].username
        login.status = ''
        res.redirect('/game')
    } else {
        console.log('Login failed!! :(')
        login.status = 'Login failed. Check your username and password!'
        res.redirect('/game/login')
    }
})

//Middleware
router.use((req, res, next, ) => {
    if (user.id) {
        next()
    } else {
        res.redirect('/game/login')
        next()
    }
})

router.get('/game', (req, res) => {
    res.render('game/game', user)
})



router.get('/game/accounts', (req, res) => {
    res.status(200).json(accounts)
})



module.exports = router
const express = require('express')
const router = express.Router()
const accounts = require('../db/accounts.json')
const def_account = {
    id: undefined,
    username: 'PlayerUsername',
    password: 'PlayerPassword'
}
let user = def_account

router.get('/game/login', (req, res) => {
    res.render('game/login')
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
    if(result.length>0){
        res.render('game/register')
    } else{
        var temp = {
            id: accounts.length + 1,
            username: input.username,
            password: input.password
        }
        console.log(temp)
        accounts.push(temp)
        console.log(accounts)
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
    if(result.length>0){
        user.id = result[0].id
        user.username = result[0].username 
        console.log(accounts)
        res.redirect('/game')
    } else{
        console.log('Login failed!! :(')
        res.redirect('/game/login')
    }
})

//Middleware
router.use((req, res, next, ) => {
    if (user.id) {
        console.log(user)
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
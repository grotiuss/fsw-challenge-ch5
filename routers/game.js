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

router.get('/game/register', (req, res) => {
    res.send('Halaman register')
})

router.post('/game', (req, res) => {
    var input = {
        username: req.body.username,
        password: req.body.password
    }
    var result = accounts.filter(account => ((account.username === input.username) && (account.password === input.password)))
    if(result.length>0){
        user.id = result[0].id
        console.log('Login success!!! :D')
        res.redirect('/game')
    } else{
        console.log('Login fail!! :(')
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
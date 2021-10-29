const express = require('express')
const router = express.Router()

//Middleware

router.get('/game', (req, res) => {
    res.send('Ini halaman game')
})

module.exports = router
const { Router } = require('express')
const router = Router()
const axios = require('axios')
const { getTypes } = require('../controllers/types')
const { Type } = require('../db')

router.get('/', async (req,res) => {
    try {
        const types = await getTypes()
        if(types)
        res.status(200).send(types)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
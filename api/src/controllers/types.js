const axios = require('axios')
const { Type } = require('../db')

const getTypes = async () => {
    try {
        const res = await axios('https://pokeapi.co/api/v2/type')
        
        res.data.results.map((type) =>{
            Type.findOrCreate({
                where: {name: type.name}
            })
        })
        return await Type.findAll()
    } catch (error) {
        console.log(error)
    }
}

// const getTypesFromDB = (req, res) => {
    
// }

// const getAllTypes = async () => {
//     const api = getTypes()
//     const db = getTypesFromDB()

//     const [apiData, dbData] = await Promise.all([api, db])
//     return [...apiData, ...dbData]
// }

module.exports = {
    getTypes
}

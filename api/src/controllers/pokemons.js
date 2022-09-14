const axios = require('axios');
const { Pokemon, Type } = require('../db')


const getPokesApi = async () => {
    try {
        const res = await axios('https://pokeapi.co/api/v2/pokemon')
        const next = await axios(res.data.next)

        const allPokes = res.data.results.concat(next.data.results);

        const Pokemons = await Promise.all(allPokes.map(async e=>{
            const poke = await axios(e.url)
            return{
                id: poke.data.id,
                image: poke.data.sprites.versions['generation-v']['black-white'].animated.front_default,
                name: poke.data.name,
                health: poke.data.stats[0].base_stat ,
                attack: poke.data.stats[1].base_stat,
                defense: poke.data.stats[2].base_stat,
                speed: poke.data.stats[5].base_stat,
                types : poke.data.types.map(e=>{return e.type}),
            }
        }))
        return Pokemons
    } catch (error) {
        console.log(error)
    }
}

const getPokesDb = async () => {
    try {
        const dbPoke = await Pokemon.findAll({
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                }
            }
        })
        return dbPoke
    } catch (error) {
        console.log(error)
    }
}

const getAllPokes = async () => {
    const apiPoke = getPokesApi();
    const dbPoke = getPokesDb();

    const [dbData, apiData] = await Promise.all([apiPoke, dbPoke]);
    return [...dbData, ...apiData];
}

const findByIdApi = async (id) => {
    try {
        const res = await axios(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = res.data
        return {
            id: data.id,
            name: data.name,
            image: data.sprites.other.home.front_default,
            health: data.stats[0].base_stat ,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
            types : data.types.map(e=>{return e.type.name})
        }
    } catch (error) {
        console.log(error)
    }
}

const findByIdDB = async (id) => {
    try {
        const db = await Pokemon.findByPk(id, {
            include: {
                model: Type,
                attributes: ['name'],
                through: {
                    attributes: []
                },
            }
        })
        return {
            id: id,
            name: db.name,
            image: db.image,
            health: db.health,
            attack: db.attack,
            defense: db.defense,
            speed: db.speed,
            height: db.height,
            weight: db.weight,
            types: db.types
        }
    } catch (error) {
        console.log(error)
    }
}

const foundId = async(id) => {
    try {
        if(id.includes('-')){
            const db = await findByIdDB(id);
            return db;
        }
        const api = await findByIdApi(id);
        return api    
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    getAllPokes,
    foundId
}
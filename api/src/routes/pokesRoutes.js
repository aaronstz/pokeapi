const { Router } = require('express');
const router = Router();
const { getAllPokes, foundId } = require('../controllers/pokemons');
const { Pokemon, Type } = require('../db')

router.get('/', async (req,res)=>{
    const { name } = req.query
    try {
        const pokes = await getAllPokes()
        if(name){
            const foundPoke = pokes.filter(e => e.name?.toLowerCase().includes(name.toString().toLowerCase()))
            if(foundPoke.length){
                return res.status(200).send(foundPoke)
        }
        else return res.status(404).send({msg: 'No pokemons here :/'})
        }
        else{
            res.status(200).send(pokes)
        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        const poke = await foundId(id)
        if(poke) return res.status(200).send(poke)
        else return res.status(404).send('Pokemon not found :/')
    } catch (error) {
        console.log(error)
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const { id } = req.params
        await Pokemon.destroy({where: {id}})
        res.send({msg: 'Pokemon deleted'})

    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/', async (req, res)=>{
    try {
        const { name, image, health, attack, defense, speed, height, weight, types } = req.body
        const newPoke = await Pokemon.create({
            name,
            image,
            health,
            attack,
            defense,
            speed,
            height,
            weight
        })
        let typesDb = await Type.findAll({
            where: { name: types },
          });
        
          const typeMap = typesDb.map((e) => e.dataValues.id);
          newPoke.addType(typeMap)
        res.status(200).send(newPoke)
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
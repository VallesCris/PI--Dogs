const { Router } = require('express');
const { getAllInfo } = require('../controllers/ApiData');
const axios = require('axios')
const {YOUR_API_KEY} = process.env
const { Temperament, Dog }=require("../db");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const api = `https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`;

router.get("/dogs", async(req, res) => {
    try {
        const {name} = req.query;
        const dogs = await getAllInfo();
        if(name){
            const nameQuery = dogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(nameQuery.length > 0){
                res.status(200).json(nameQuery)
            }
        } else {
            res.send(dogs)
        }
    } catch (error) {
        console.log(error)
        
    }
});

router.get("/dogs/:id", async(req, res, next) =>{
    try {
        const {id} = req.params;
        const dogId = await getAllInfo();
        if(id){
            const dog = dogId.find(e => e.id.toString() === id.toString());
            if(dog) res.status(200).send(dog)
            else res.status(404).json('There are no dogs with that id')
        }
    } catch (error) {
        next(error)
    }
});

router.post('/dogs', async(req, res, next)=>{
    try {
        const {name, minheight, maxheight, minweight, maxweight, minlife_span, maxlife_span, image, temperament, createdInDb} = req.body
        //console.log(req.body)
        let id = Math.floor(Math.random()*12345)
        if(name && minheight && maxheight && minweight && maxweight && maxlife_span && minlife_span && temperament && image  ){
        const dogCreated = await Dog.create({
            id,
            name,
            image,
            height: maxheight - minheight,
            weight: maxweight - minweight,
            lifeSpan: maxlife_span - minlife_span,
            createdInDb,
        })
        if(dogCreated){
            temperament.forEach(async (e) => {
            const tempCreate = await Temperament.findOne({
                    where: {
                        name: e
                    }
                })
                if(tempCreate){
                    await dogCreated.addTemperament(tempCreate)
                }
            });
        return res.status(200).send('Perro creado con exito')
        } else return res.status(400).send('No se creo el perro')
    }
      else {
         return res.status(400).send('Faltan Datos')
        }
    } catch (error) {
        next(error)
    }
});


router.get("/temperaments", async(req,res)=>{
const tempApi = await axios.get(api)
    const tempDB = tempApi.data
        .map((e) => e.temperament) 
        .toString()
        .split(",")
        .map((e) => e.trim())
        .filter((e) => e.length > 1)
    const filtro = tempDB.filter((e) => e); 
    let tempFilt = [...new Set(filtro)];

    tempFilt.forEach((e) => {
        Temperament.findOrCreate({ 
            where: { name: e },
        });
    });
    const totalTemp = await Temperament.findAll(); 
    res.json(totalTemp);
})


module.exports = router;

const {Dog, Temperament} = require('../db')
const axios = require('axios')
const YOUR_API_KEY = "bd1ca6e0-1676-4c05-bf42-954d2d3e0730"


const getApi = async ()=>{
    try{
        const infoApi = await axios.get(`https://api.thedogapi.com/v1/breeds?apiKey=${YOUR_API_KEY}`)
        const apiData = infoApi.data.map(e =>{
            return{
                id: e.id,
                name: e.name,
                temperament: e.temperament? e.temperament : 'Perro sin temperamento',
                weight: e.weight,
                height: e.height,
                lifeSpan: e.life_span,
                image : e.image.url,
            }
        })
        return apiData
    } catch(err){
        console.log(err)
    }
}

const getDbInfo = async()=>{
    const dogsO = await Dog.findAll({
        include:{
            model: Temperament,
            attributes: ["name"],
            through:{
                attributes: []
            }   
        },
    })
    //console.log('dogs', dogsO)
    return dogsO.map(e =>{
        return{
            id: e.id,
            name: e.name,
            temperament: e.temperaments ? e.temperaments.map(x => x.name).join(', ') : 'Perro sin temperamento',
            weight: {metric: e.weight},
            height: {metric: e.height},
            lifeSpan: e.lifeSpan,
            image: e.image,
            createdInDb: e.createdInDb
        }
    })
}

const getAllInfo = async()=>{
    const apiInfo = await getApi();
    const dbInfo = await getDbInfo();
    const allInfo = await apiInfo.concat(dbInfo);
    

    return allInfo;
}

module.exports = {
    getApi,
    getAllInfo
}


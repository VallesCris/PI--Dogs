import axios from "axios";

export const GET_ALL_DOGS = "GET_ALL_DOGS";
export const TEMPERAMENT_FILTER = "TEMPERAMENT_FILTER";
export const GET_DOG_DETAILS = "GET_DOG_DETAILS";
export const SEARCH_DOG = "SEARCH_DOG";
export const GET_TEMP = "GET_TEMP";
export const FILTER_CREATED = "FILTER_CREATED";
export const ALPHABETIC_SORT = "ALPHABETIC_SORT";
export const SCORE_SORT = "SCORE_SORT";


//todos los dogs
export function getAllDogs(){
    return function(dispatch){
        axios.get(`http://localhost:3001/dogs`)
        .then(dogs =>
            dispatch({
                type: "GET_ALL_DOGS",
                payload: dogs.data
            })
        )
        .catch(error => console.error(error))
    }
}

//filtro temperamento
export function filterByTemp(payload){
    return{
        type: "TEMPERAMENT_FILTER",
        payload: payload
    }
}

//detail id
export function getDogDetail(id){
    return async function(dispatch){
        try{
            const dogDetails = await axios.get(`http://localhost:3001/dogs/${id}`)
            return dispatch({
                type: "GET_DOG_DETAILS",
                payload: dogDetails.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

//search by name
export function dogByName(name){
    return async function(dispatch){
        try{
            const search = await axios.get(`http://localhost:3001/dogs?name=${name}`)
            return dispatch({
                type: "SEARCH_DOG",
                payload: search.data
            })
        } catch(error){
            alert("nonexistent dog")
        }
    }
}

//temp en el post
export function getTemperaments(){
    return async function(dispatch){
        try{
            const temp = axios.get(`http://localhost:3001/temperaments`)
            return dispatch({
                type: "GET_TEMP",
                payload: temp.data
            })
        } catch(error){
            console.log(error)
        }
    }
}

//post
export function postDog(payload){
    return async function(dispatch){
        const posteo = await axios.post(`http://localhost:3001/dogs`, payload)
        return posteo
    }
}

//filter db and api
export const filterCreated = (payload) =>{
    return{
        type: FILTER_CREATED,
        payload
    }
}

//Alphabetic sort 
export function alphabeticSort(payload){
    return{
        type: "ALPHABETIC_SORT",
        payload: payload
    }
}

//Score 
export function scoreSort(payload){
    return {
        type: "SCORE_SORT",
        payload: payload
    }
}

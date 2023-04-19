import {
    GET_ALL_DOGS, 
    TEMPERAMENT_FILTER,
    GET_DOG_DETAILS, 
    SEARCH_DOG,
    GET_TEMP,
    FILTER_CREATED,
    ALPHABETIC_SORT,
    SCORE_SORT, 
} from '../actions/indexActions'

const initialState = {
    allDogs: [],
    dogs: [],
    dogDetails: [],
    temperament: [],
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_ALL_DOGS: 
            return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload
            }
        case SEARCH_DOG:
            return{
                ...state,
                dogs: action.payload
            }
        case "POST_DOG":
            return{
                ...state
            }
        case GET_TEMP:
            return{
                ...state,
                temperament: action.payload
            }
            case TEMPERAMENT_FILTER:
                const filterTemp = state.allDogs.filter(e => e.temperament.split(', ')?.some(r => r === action.payload))
                
                return{
                    ...state,
                dogs: action.payload === 'all' ? state.allDogs : filterTemp
            }
            

            /*FILTRO PENDIENTE*/
            case FILTER_CREATED:
                let dogCopy = state.allDogs;
                let createdFiltered;
                if(action.payload === 'created'){
                    createdFiltered = dogCopy.filter(e => e.createdInDb)
                } else if (action.payload === 'api') {
                    createdFiltered = dogCopy.filter(e => !e.createdInDb)
                } else {
                    createdFiltered = dogCopy
                } 
                return {
                    ...state,
                    dogs: createdFiltered
                }
                
            case ALPHABETIC_SORT:
                const array = action.payload === "asc" ? state.allDogs.sort(function(a, b){
                    if(a.name > b.name){
                        return 1
                    }
                    if(b.name > a.name){
                        return -1
                    }
                    return 0
                }) :
                state.allDogs.sort(function(a, b){
                    if(a.name.toLowerCase() > b.name.toLowerCase()){
                        return -1
                    }
                    if(b.name.toLowerCase() > a.name.toLowerCase()){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    dogs: array
                }
                //SCORE = PESO
                case SCORE_SORT: 
                const sortedArr = action.payload === "down" ? state.allDogs.sort(function (a, b){
                    if(a.weight.metric > b.weight.metric){
                        return 1
                    }
                    if(b.weight.metric > a.weight.metric){
                        return -1
                    }
                    return 0
                }) : 
                state.allDogs.sort(function(a, b){
                    if(a.weight.metric > b.weight.metric){
                        return -1
                    }
                    if(b.weight.metric > a.weight.metric){
                        return 1
                    }
                    return 0
                })
                return{
                    ...state,
                    dogs: sortedArr
                }
        case GET_DOG_DETAILS:
            return{
                ...state,
                dogDetails: action.payload
            };
            default:
                return{
                    ...state
                }
            }
        };
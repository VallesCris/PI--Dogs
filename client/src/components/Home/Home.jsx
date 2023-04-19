import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterByTemp, filterCreated, alphabeticSort, scoreSort } from "../../actions/indexActions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import cd from '../Card/cd.module.css'
import hm from '../Home/hm.module.css'
import sb from '../SearchBar/sb.module.css'

export default function HomePage(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> {return state.dogs});
    const [orden, setOrden] = useState("");
    const [pagActual, setPagActual] = useState(1);
    //son 8 por pagina pero por diseño se ve mejor con 9
    const dogPerPage = 9
    const indexLastDog = pagActual * dogPerPage;
    const indexFirstDog = indexLastDog - dogPerPage;
    const dogActual  = allDogs.slice(indexFirstDog, indexLastDog)
    console.log('dogActual', dogActual);

    const paginado = (numberPage) => {
        setPagActual(numberPage)
    }

    useEffect(()=>{
        dispatch(getAllDogs())
    },[dispatch])

    function handleClick(e){
        e.preventDefault(e)
        dispatch(getAllDogs())
    }

    function handleFilterByTemp(e){
        dispatch(filterByTemp(e.target.value))
    }

    function handleFilterDb(e){
        e.preventDefault(e)
        dispatch(filterCreated(e.target.value));
        //setCurrentPage(1);
    }

    function handleAToZ(e){
        e.preventDefault(e)
        dispatch(alphabeticSort(e.target.value))
        setPagActual(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleScoreSort(e){
        e.preventDefault(e)
        dispatch(scoreSort(e.target.value))
        setPagActual(1)
        setOrden(`Ordenado ${e.target.value}`)
    }

    return(
        <React.Fragment>
            <div className={hm.container}>
                <div>
                    <h1 className={hm.tittle} >PI - DOGS</h1>
                <Link to= '/dogs'>
                    <h2><button className={hm.botonNewDog}>Crear Perro</button></h2>
                </Link>
                <button className={hm.botonNewDog} onClick={e=>{handleClick(e)}}>Recargar Perros</button>
                </div>

                <div>
                    <select className={hm.botonNewDog} onChange={e=> {handleAToZ(e)}}>
                        <option value="">Busqueda alfabética</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botonNewDog} onChange={e => {handleScoreSort(e)}}>
                        <option value="">Busqueda por Peso</option>
                        <option value="up">Mas alto</option>
                        <option value="down">Mas bajo</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botonNewDog} onChange={e=>{handleFilterDb     (e)}}>
                        <option value="all">Todos los perros</option>
                        <option value="created">Creados</option>
                        <option value="api">Api</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botonNewDog} onChange ={e => handleFilterByTemp(e)} defaultValue="default">
                        <option value='default' disabled='disabled' >Filtro por temperamentos</option>
                        <option value='all'>All temperaments</option>
                        <option value='Loyal'>Leal</option>
                        <option value='Curious'>Curioso</option>
                        <option value='Playful'>Juguetón</option>
                        <option value='Adventurous'>Aventuroso</option>
                        <option value='Active'>Activo</option>
                        <option value='Fun-loving'>Amante de la diversión</option>
                        <option value='Independent'>Independiente</option>
                        <option value='Happy'>Alegre</option>
                        <option value='Wild'>Salvaje</option>
                        <option value='Friendly'>Amigable</option>
                        <option value='Intelligent'>Inteligente</option>
                        <option value='Brave'>Valiente</option>
                        <option value='Gentle'>Caballeroso</option>
                    </select>
                </div>  
                <div className={sb.search}> 
                <SearchBar/>
                </div>
                <div className={cd.container}>
                            {
                                dogActual?.map(r=>{
                                    return(
                                        <div key = {r.id} className={cd.card}>
                                            <Link to ={`/dogs/${r.id}`}>
                                                <Card name={r.name} temperament={r.temperament} image={r.image} weight={r.weight.metric}/>
                                            </Link>
                                        </div>
                                    )
                                })
                            }
        
                </div>
                <Pagination
                dogPerPage={dogPerPage}
                allDogs = {allDogs.length}
                pagination = {paginado}
                />

            </div>
        </React.Fragment>
    )
}
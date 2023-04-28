import React from "react";
import {Link} from "react-router-dom";
import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import { getAllDogs, filterByTemp, filterCreated, alphabeticSort, scoreSort, getTemperaments } from "../../actions/indexActions";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import cd from '../Card/cd.module.css'
import hm from '../Home/hm.module.css'
import sb from '../SearchBar/sb.module.css'

export default function HomePage(){
    const dispatch = useDispatch();
    const allDogs = useSelector((state)=> {return state.dogs});
    const allTemps = useSelector((state) => {return state.temperament})
    console.log('allTemps', allTemps)
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
        dispatch(getTemperaments())
    },[dispatch])

    function handleClick(e){
        e.preventDefault(e)
        dispatch(getAllDogs())
    }

    function handleFilterByTemp(e){
        dispatch(filterByTemp(e.target.value))
    }

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value));
        setPagActual(1);
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
                    <h2><button className={hm.botoninput}>Crear Perro</button></h2>
                </Link>
                <button className={hm.botoninput} onClick={e=>{handleClick(e)}}>Recargar Perros</button>
                </div>

                <div>
                    <select className={hm.botoninput} onChange={e=> {handleAToZ(e)}}>
                        <option value="">Busqueda alfabética</option>
                        <option value="asc">A-Z</option>
                        <option value="desc">Z-A</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botoninput} onChange={e => {handleScoreSort(e)}}>
                        <option value="">Busqueda por Peso</option>
                        <option value="up">Mas alto</option>
                        <option value="down">Mas bajo</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botoninput} onChange={e=>{handleFilterCreated(e)}}>
                        <option key={1} value="all">Todos los perros</option>
                        <option key={2} value="created">Creados</option>
                        <option key={3} value="api">Api</option>
                    </select>
                </div>
                <div>
                    <select className={hm.botoninput} onChange ={e => handleFilterByTemp(e)} defaultValue="default">
                        <option value='default' disabled='disabled' >Filtro por temperamentos</option>
                        <option value='all'>All temperaments</option>
                        {
                            allTemps.map(t => (
                                <option value={t.name} key={t.id}>{t.name}</option>
                            ))
                        }
                        
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
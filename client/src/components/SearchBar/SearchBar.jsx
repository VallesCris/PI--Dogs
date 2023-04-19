import React from "react";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { dogByName } from "../../actions/indexActions";
import hm from '../Home/hm.module.css'



export default function SearchBar(){
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault(e)
        setName(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault(e)
        if(name !== ''){
            dispatch(dogByName(name))
            setName("")
        } else{
            alert('Introduce un perro existente')
        }
    }
    return(
        <React.Fragment>
            <input value={name} type="text" placeholder="Busca aqui" onChange={(e)=> handleInputChange(e)}/>
            <button className={hm.botonNewDog} type="submit" onClick={(e)=> handleSubmit(e)}>Buscar</button>
        </React.Fragment>
    )

}

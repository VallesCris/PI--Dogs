import React from 'react';
import {Link,} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, postDog } from "../../actions/indexActions";
import { useState } from 'react';
import dg from '../DogCreate/dg.module.css'

function validation(input){
    let errors = {}
    if(input.name === ' '){
        errors.name = 'Ingresa un nombre'
    }
    if(input.minheight && input.minheight <= 0 ){
        errors.numberMinheight = 'La altura minima debe ser mayor a 0!'
    }
    if(input.maxheight && (input.maxheight > 500 || input.maxheight <= 0|| parseInt(input.minheight) > parseInt(input.maxheight))){
        errors.numberMaxheight = `${input.maxheight} cm excede la altura maxima!`
    }
    if(input.minweight && input.minweight <= 0) {
        errors.numberMinweight = 'El peso minimo debe ser mayor a 0!'
    }
    if(input.maxweight && (input.maxweight > 100 || parseInt(input.minweight) > parseInt(input.maxweight))){
        errors.numberMaxweight = `${input.maxweight} kg excede el peso maximo!`
    }
    if(input.minlife_span && input.minlife_span <= 0) {
        errors.numberMinLifeSpan = 'La edad minima debe ser mayor a 0!'
    }
    if(input.maxlife_span && (input.maxlife_span > 50 || parseInt(input.minlife_span) > parseInt(input.maxlife_span))){
        errors.numberMaxLifeSpan = `${input.maxlife_span} excede los years maximos!`
    }
    return errors
}

export default function DogCreate(){
    const [input, setInput] = useState({
        name:'',  
        minheight:'', 
        maxheight:'', 
        minweight:'', 
        maxweight:'', 
        minlife_span:'', 
        maxlife_span:'', 
        temperament:[],
        image: '',
    });
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const state = useSelector((state) => state)

    // console.log("temps", state.temperament)


    useEffect(() => {
        dispatch(getTemperaments());
    },[dispatch]);





    function handleChange(e){
        setInput({
          ...input,
          [e.target.name]: e.target.value
          
        });
        setErrors(validation({
            ...input,
            [e.target.name]: e.target.value
        }))
      };

    const handleSelect = (e) => {
        if(!input.temperament.includes(e.target.value)){
            setInput({
                ...input,
                temperament : [...input.temperament, e.target.value]
            })
        }
}

const handleDelete = (e) => {
    setInput({
        ...input,
        temperament: input.temperament.filter(temperament => temperament != e)
    })
}

      function handleSubmit(e){
          e.preventDefault();
          if(input.minheight >= 0 && input.minweight >= 0 && parseInt(input.maxheight) >= parseInt(input.minheight) && parseInt(input.maxweight) >= parseInt(input.minweight) && input.name){
          dispatch(postDog(input));
          alert('Dog was succesfully created');
          setInput({
            name:'',  
            minheight:'', 
            maxheight:'', 
            minweight:'', 
            maxweight:'', 
            minlife_span:'', 
            maxlife_span:'', 
            temperament:[],
            image: '',
        });
            } 
        else{
            alert('Algo va mal, Asegurate que todos los campos esten completos')
         }
        };

      
    return (
        <div className={dg.container}>
        <br />  
        <h1 className={dg.h1}>CREATE NEW DOG</h1>
        <br/>
        <form onSubmit={handleSubmit} >

            <div className={dg.div2}>
            <label className={dg.label}>Nombre / Raza </label>
            <input type="text" name ="name" value ={input.name} onChange={handleChange}/><br/>
            { errors.name && 
            <span className={dg.error}>{errors.name}</span>
            }
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Altura mínima (cm) </label>
                <input type="number" name ="minheight" value ={input.minheight} onChange={handleChange} />
                <br/>
                <label className={dg.label}>Altura máxima (cm) </label>
                <input type="number" name ="maxheight" value ={input.maxheight} onChange={handleChange} />
                <br/>
                { (errors.numberMinheight ||errors.numberMaxheight) && 
                <span className={dg.error}>{(errors.numberMinheight)|| (errors.numberMaxheight)}</span>
            }            
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Peso mínimo (kg) </label>
                <input type="number" name ="minweight" value ={input.minweight} onChange={handleChange}/>
                <label className={dg.label}>Peso máximo (kg) </label>
                <input type="number" name ="maxweight" value ={input.maxweight} onChange={handleChange} />
                <br />
                { (errors.numberMaxweight || errors.numberMinweight) && 
                <span className={dg.error}>{(errors.numberMaxweight)||(errors.numberMinweight)}</span>
            }
            </div>
            
            <div className={dg.div2}>
                <label className={dg.label}>Años mínimos de vida </label>
                <input type="number" name ="minlife_span" value ={input.minlife_span} onChange={handleChange}/>
                <label className={dg.label}>Años máximos de vida </label>
                <input type="number" name ="maxlife_span" value ={input.maxlife_span} onChange={handleChange}/>
                <br/>
                { (errors.numberMaxLifeSpan || errors.numberMinLifeSpan) && 
                <span className={dg.error}>{(errors.numberMaxLifeSpan)||(errors.numberMinLifeSpan)}</span>
            }
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Imagen</label>
                <input type="text" value={input.image} name="image" onChange={(e)=>handleChange(e)}  className={dg.input}/>
            </div>

            <div>
                <h3>TEMPERAMENTS</h3>
                <select onChange={handleSelect} >
                    <option value='all' disabled selected defaultValue>prototemperament</option>
                    {
                        state?.temperament?.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                                )
                            })
                        }
                </select>
            </div>

            <div>
                        {input.temperament.map((d , i) => {
                            return (
                                <div key={i++}>
                            <div> {d} </div>
                            <button onClick={() => handleDelete(d)}>X</button>
                            </div>
                                )
                            })
                        }
            </div>

            
                <br /><br />
                    <button type="submit" className={dg.button} disabled={Object.keys(errors).length}>Crear Perro</button>
                <br /><br />
        </form>
        <Link to = '/home'>
            <button className={dg.buttonB}>Volver al menú</button>
         </Link>
        </div>
    ) 
    
}  






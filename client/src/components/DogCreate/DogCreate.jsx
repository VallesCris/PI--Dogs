import React from 'react';
import {Link,} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getTemperaments, postDog } from "../../actions/indexActions";
import { useState } from 'react';
import dg from '../DogCreate/dg.module.css'

function validation(newDog){
    let errors = {}
    if(newDog.name === ' '){
        errors.name = 'Ingresa un nombre'
    }
    if(newDog.minheight && newDog.minheight <= 0 ){
        errors.numberMinheight = 'La altura minima debe ser mayor a 0!'
    }
    if(newDog.maxheight && (newDog.maxheight > 500 || newDog.maxheight <= 0|| parseInt(newDog.minheight) > parseInt(newDog.maxheight))){
        errors.numberMaxheight = `${newDog.maxheight} cm excede la altura maxima!`
    }
    if(newDog.minweight && newDog.minweight <= 0) {
        errors.numberMinweight = 'El peso minimo debe ser mayor a 0!'
    }
    if(newDog.maxweight && (newDog.maxweight > 100 || parseInt(newDog.minweight) > parseInt(newDog.maxweight))){
        errors.numberMaxweight = `${newDog.maxweight} kg excede el peso maximo!`
    }
    if(newDog.minlife_span && newDog.minlife_span <= 0) {
        errors.numberMinLifeSpan = 'La edad minima debe ser mayor a 0!'
    }
    if(newDog.maxlife_span && (newDog.maxlife_span > 50 || parseInt(newDog.minlife_span) > parseInt(newDog.maxlife_span))){
        errors.numberMaxLifeSpan = `${newDog.maxlife_span} excede los years maximos!`
    }
    return errors
}

export default function DogCreate(){
    const [newDog, setNewDog] = useState({
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
        setNewDog({
          ...newDog,
          [e.target.name]: e.target.value
          
        });
        setErrors(validation({
            ...newDog,
            [e.target.name]: e.target.value
        }))
      };

      const handlerOnchangeTemp =  (e) => {
  
        if (newDog.temperament.includes(e.target.value)) return;
        
        setNewDog({
          ...newDog,
          [e.target.name]: [...newDog.temperament].concat(e.target.value),
        });
        let temps =  [...newDog.temperament].concat(e.target.value);
        setErrors(
          validation({
            ...newDog,
            [e.target.name]: temps ,
          })
        );
      
      };
      
      function handleSubmit(e){
          e.preventDefault();
          if(newDog.minheight >= 0 && newDog.minweight >= 0 && parseInt(newDog.maxheight) >= parseInt(newDog.minheight) && parseInt(newDog.maxweight) >= parseInt(newDog.minweight) && newDog.name){
          dispatch(postDog(newDog));
          alert('Dog was succesfully created');
          setNewDog({
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
            <input type="text" name ="name" value ={newDog.name} onChange={handleChange}/><br/>
            { errors.name && 
            <span className={dg.error}>{errors.name}</span>
            }
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Altura mínima (cm) </label>
                <input type="number" name ="minheight" value ={newDog.minheight} onChange={handleChange} />
                <br/>
                <label className={dg.label}>Altura máxima (cm) </label>
                <input type="number" name ="maxheight" value ={newDog.maxheight} onChange={handleChange} />
                <br/>
                { (errors.numberMinheight ||errors.numberMaxheight) && 
                <span className={dg.error}>{(errors.numberMinheight)|| (errors.numberMaxheight)}</span>
            }            
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Peso mínimo (kg) </label>
                <input type="number" name ="minweight" value ={newDog.minweight} onChange={handleChange}/>
                <label className={dg.label}>Peso máximo (kg) </label>
                <input type="number" name ="maxweight" value ={newDog.maxweight} onChange={handleChange} />
                <br />
                { (errors.numberMaxweight || errors.numberMinweight) && 
                <span className={dg.error}>{(errors.numberMaxweight)||(errors.numberMinweight)}</span>
            }
            </div>
            
            <div className={dg.div2}>
                <label className={dg.label}>Años mínimos de vida </label>
                <input type="number" name ="minlife_span" value ={newDog.minlife_span} onChange={handleChange}/>
                <label className={dg.label}>Años máximos de vida </label>
                <input type="number" name ="maxlife_span" value ={newDog.maxlife_span} onChange={handleChange}/>
                <br/>
                { (errors.numberMaxLifeSpan || errors.numberMinLifeSpan) && 
                <span className={dg.error}>{(errors.numberMaxLifeSpan)||(errors.numberMinLifeSpan)}</span>
            }
            </div>

            <div className={dg.div2}>
                <label className={dg.label}>Imagen</label>
                <input type="text" value={newDog.image} name="image" onChange={(e)=>handleChange(e)}  className={dg.input}/>
            </div>


            <label className={dg.temps}>Temperamentos:</label>
            <div className = {dg.div2}>
                <h3>TEMPERAMENTS</h3>
                <select onChange={handlerOnchangeTemp} >
                    {
                        state?.temperament?.map(e => {
                            return (
                                <option value={e.name} key={e.id}>{e.name}</option>
                                )
                            })
                        }
                </select>
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






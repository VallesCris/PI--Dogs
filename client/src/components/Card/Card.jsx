import React from "react";
import cd from '../Card/cd.module.css'

export default function Card({name, image, temperament, weight}){
    if(!temperament){
        temperament = 'Ninguno'
    }

    const temperaments = temperament.split(", ");

    return(
                <div className={cd.text}>
                    <h2>{name}</h2>
                    <h2>{weight} kg</h2>
                    <h2 className={cd.h2}>Temperamentos:</h2>
                    {temperaments.map(d => <h5 key={d}>{ d + " "}</h5>)}
                    <img src={image} alt="a"/>
                </div>
    )

}
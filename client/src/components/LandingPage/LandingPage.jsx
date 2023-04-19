import React from "react";
import {Link} from "react-router-dom";
import land from '../LandingPage/land.module.css';



export default function LandingPage(){
    return(
        <React.Fragment>
            <div className={land.container}>
                <div className={land.h1}>
                    <h1>Bienvenidos al PI-DOGS</h1>
                    <h2 className={land.h2}>By: Cristian Valles B.</h2>
                <Link to = '/home'>
                    <button className={land.button}>Ingresar</button>
                </Link>
                </div>
             </div>
        </React.Fragment>
    )
}
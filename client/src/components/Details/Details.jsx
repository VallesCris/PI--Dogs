import React from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDogDetail } from "../../actions/indexActions";
import { useEffect } from "react";
import det from '../Details/det.module.css'

export default function DogsDetails(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(()=>{
        dispatch(getDogDetail(id))
    },[dispatch, (id)]) 

    const dogDetail = useSelector(state => state.dogDetails)
    //console.log('dogDetail', dogDetail, "id", id)
    

    if(!dogDetail.temperament){
        dogDetail.temperament = "None"
    }
    if(!dogDetail){
        return null;
    }

    return(
        <React.Fragment>
            <div className={det.container}>

                <div className={det.containerS}>

                        <h1 className={det.h1}>Nombre: {dogDetail.name}</h1>

                        <h3 className={det.h3}>Altura: {dogDetail.height ? dogDetail.height.metric : "No se ha indicado la altura"} cm</h3>

                        <h4 className={det.h4}>Peso: {dogDetail.weight ? dogDetail.weight.metric : "No se ha indicado el peso"} kg</h4>
                    
                        <h4 className={det.h4}>Años de vida: {dogDetail.lifeSpan ? dogDetail.lifeSpan : "No se ha indicado los años de vida" } aprox.</h4>

                        <h4 className={det.h4}>Temperamento: {dogDetail.temperament}</h4>
                
                        {/* <h4>Temperamento: {dogDetail.temperament.length === 0 ? "No se han indicado dietas" : !dogDetail[0].createdInDb ? dogDetail[0].temperament + "" : dogDetail[0].temperament.map((d) => d.name + (' '))}</h4>  */}

                        <img className={det.img} src={dogDetail.image}/>

                        <Link to = '/home'>
                             <button className={det.button}>Volver al menú</button>
                        </Link>
                </div>
            </div>

            
       </React.Fragment>
    )
}
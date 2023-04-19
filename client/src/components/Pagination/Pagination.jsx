import React  from "react";
import pg from '../Pagination/pg.module.css'

export default function Pagination({dogPerPage, allDogs, pagination}){
    const pageNumbers = [];

    for(let i = 0; i < Math.ceil(allDogs/dogPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <React.Fragment>
            <div>
                {
                    pageNumbers && pageNumbers.map(n=>{
                        return <button className={pg.buttonPg} key={n} onClick={()=> pagination(n)}>{n}</button>
                    })
                }
            </div>
        </React.Fragment>
    )

}
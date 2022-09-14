import React from 'react';
import './styles/Paginado.css';

export default function Paginado({cantPoke, pokemons, paginado, actual}){
    const pageNumbers = []

    for(let i = 1; i<=Math.ceil(pokemons / cantPoke); i++){
        pageNumbers.push(i)
    }
    // console.log(pageNumbers)
    return(
        <nav className="pages">
                {/* { pageNumbers && pageNumbers.map(number => (
                    <button onClick= {()=> paginado(number)} key = {number} className ="btn-page">{number}</button>
                ))} */}
                {
                    pageNumbers.includes(actual - 1) && 
                    <button onClick={()=> paginado(actual - 1)} >Previous</button>
                }
                    <button >{actual}</button>
                {
                    pageNumbers.includes(actual + 1) && 
                    <button onClick={()=> paginado(actual + 1)}>Next</button>
                }
        </nav>
    )
}


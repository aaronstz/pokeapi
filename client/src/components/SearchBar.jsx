import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNamePokes } from '../actions';
import Loading from './Loading'
import NotFound from './NotFound'
import './styles/Home.css'

export default function Searchbar ({setPage}){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

    function handleInput(e){
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNamePokes(name));
        setPage(1)
    }


    return (
        <div >
            <input
            type = 'text'
            placeholder = 'Search...'
            onChange={(e)=>handleInput(e)}
            className="search"
            />
            <button type = 'submit' onClick={(e)=>handleSubmit(e)}>Search</button>
        </div>
    )
}

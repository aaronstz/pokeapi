import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getDetails, resetDetails, deletePoke } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import './styles/CardDetail.css';
import arrow from '../wallpaper/arrow-left-3099.png'


export default function CardDetail(){
    const { id } = useParams();
    const dispatch = useDispatch();
    const { name, image, health, attack, defense, speed, height, weight, types} = useSelector((state)=>state.details)

    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(getDetails(id))
    }, [dispatch, id])

    function clear(){
        dispatch(resetDetails())
    }

    function handleDelete(){
        dispatch(deletePoke(id))
        navigate('/home')
    }
    
    let typesArr = types?.map((t)=>{
        if(t.name){return <li key = {Math.random()}>{ t.name + " "}</li>}
        if(t[0] !== 'no types') {return <li key = {Math.random()}>{t}</li>}
        else return 'no types'
    })
    
    return(
        <div className="content">
            <Link to ='/home'><img src ={arrow} alt = "Home" className="arrow" onClick={clear}/></Link>
            <button onClick = {handleDelete}>Delete</button>

            <h1 className="title">{name}</h1>
            <h2 className="subtitle">Types</h2>
            <h3 className="text">{typesArr}</h3>
            
            <div className="summary">
                <h3>Stats:</h3>

                <p id="health">
                Health Level:{" "}
                <progress
                id="health"
                max="100"
                value={health}
                className="score"
                />{" "}
                {health}/∞
                </p>

                <p id="attack">
                Attack Level:{" "}
                <progress
                id="attack"
                max="100"
                value={attack}
                className="score"
                />{" "}
                {attack}/∞
                </p>

                <p id="defense">
                Defense Level:{" "}
                <progress
                id="defense"
                max="100"
                value={defense}
                className="score"
                />{" "}
                {defense}/∞
                </p>

                <p id="speed">
                Speed Level:{" "}
                <progress
                id="speed"
                max="100"
                value={speed}
                className="score"
                />{" "}
                {speed}/∞
                </p>

                <p id="height">
                Height Level:{" "}
                <progress
                id="height"
                max="100"
                value={height}
                className="score"
                />{" "}
                {height}/∞
                </p>

                <p id="weight">
                Weight Level:{" "}
                <progress
                id="weight"
                max="100"
                value={weight}
                className="score"
                />{" "}
                {weight}/∞
                </p>

            </div>
            <img src ={image} alt = {name} className="img-responsive"/>
        </div>
    )
}
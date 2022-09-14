import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { postPoke, getTypes } from '../actions';
import { useDispatch, useSelector } from 'react-redux';
import './styles/Create.css'
import CardInCreate from './CardInCreate'

function validate(input) {
    let validateName = /^[a-zA-Z\s]+$/;
    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    let errors = {};
    let formIsValid = true

    if(!input.name.length){
        errors.title = 'This field cannot be empty'
        formIsValid = false;
    }
    if(!validateName.test(input.name)){
        errors.name = 'Name cannot contain special characters or numbers'
        formIsValid = false;
    }
    if(input.image && !validateUrl.test(input.image)){
        errors.image = 'This is not a valid url'
        formIsValid = false;
    }
    if (input.health > 150 || input.health < 1){
        errors.health = 'Health level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.attack > 150 || input.attack < 1){
        errors.attack = 'Attack level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.defense > 150 || input.defense < 1){
        errors.defense = 'Defense level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.speed > 150 || input.speed < 1){
        errors.speed = 'Speed level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.height > 150 || input.height < 1){
        errors.height = 'Height level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.weight > 150 || input.weight < 1){
        errors.weight = 'Weight level must be between 0 and 150'
        formIsValid = false;
    }
    if (input.types > 3 || input.types < 0){
        errors.types = 'Select one to three types'
        formIsValid = false;
    }   
    return errors;
}


export default function Create(){
    const dispatch = useDispatch();
    const types = useSelector(state=> state.types)
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        name: "",
        image: "",
        health: 0,
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        types: []
    })

    function handleChange(e){
        e.preventDefault();
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
        console.log(input)
    }

    function handleOption(e){
        e.preventDefault();
        setInput({
            [e.target.name] : e.target.value
        })
    }

    function handleSelect(e){
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }

    function handleDelete(e){
        setInput({
            ...input,
            types: input.types.filter(t => t !== e)
        })
    }


    function handleSubmit(e){
        e.preventDefault();
        if(Object.keys(errors).length === 0 && input.types.length > 0) {

        
        dispatch(postPoke(input))
        alert('Pokemon created successfully!')
        setInput({
            name: "",
            image: "",
            health: 0,
            attack: 0,
            defense: 0,
            speed: 0,
            height: 0,
            weight: 0,
            types: []
        })
    }else{
        alert('All fields are required')
    }
        console.log(input)
    }

    

    useEffect(()=>{
        dispatch(getTypes())
    }, [dispatch])

    return(
        <body className="body">

        <div className= "create">
            <Link to ='/home'><button>Go back</button></Link>

            <h1 className= "title">Create your own Pokemon!</h1>
        
            <form onSubmit={(e)=>handleSubmit(e)} >
                <div>
                    <label>Name:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'text'
                    value = {input.name}
                    name = 'name'
                    className = 'form'
                    
                    />
                    {!errors.name ? null : <span>{errors.name}</span>}
                    
                </div>
                <div>
                    <label>Image:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'text'
                    value = {input.image}
                    name = 'image'
                    className = 'form'
                    />
        {!errors.image ? null : <span>{errors.image}</span>}

                </div>
                <div>
                    <label>HP:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.health}
                    name = 'health'
                    className = 'form'
                    />
        {!errors.health ? null : <span>{errors.health}</span>}

                </div>
                <div>
                    <label>Attack:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.attack}
                    name = 'attack'
                    className = 'form'
                    />
        {!errors.attack ? null : <span>{errors.attack}</span>}

                </div>
                <div>
                    <label>Defense:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.defense}
                    name = 'defense'
                    className = 'form'
                    />
        {!errors.defense ? null : <span>{errors.defense}</span>}

                </div>
                <div>
                    <label>Speed:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.speed}
                    name = 'speed'
                    className = 'form'
                    />
        {!errors.speed ? null : <span>{errors.speed}</span>}

                </div>
                <div>
                    <label>Height:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.height}
                    name = 'height'
                    className = 'form'
                    />
        {!errors.height ? null : <span>{errors.height}</span>}

                </div>
                <div>
                    <label>Weight:</label>
                    <input onChange= {(e)=> handleChange(e)}
                    type = 'number'
                    value = {input.weight}
                    name = 'weight'
                    className = 'form'
                    />
        {!errors.weight ? null : <span>{errors.weight}</span>}

                </div>
                <label>Types:
                <select onChange ={(e)=> handleSelect(e)} className = 'types' >
                {
                    types?.map(t =>{
                        return(

                            <option
                            // type = 'checkbox'
                            value = {t.name}
                            name = 'types'
                            onChange={(e) => {handleOption(e)}}
                            >{t.name}</option>
                            )
                    })
                }
                <div>
                </div>
                </select>
                 {
                    input.types.map((e)=>{
                        return(
                            <div className="delete">
                                <button onClick={()=> {handleDelete(e)}} className="x_button"><p className= 'typeDel'>{e}</p></button>
                            </div>
                        )
                    })
                } 
                </label>
                <button type = 'submit' className = 'button' >Create!</button>
            </form>
                    <CardInCreate className = 'card-create'  image = {input.image} name = {input.name} types = {input.types} hp = {input.health} attack = {input.attack} defense = {input.defense} speed = {input.speed} height = {input.height} weight = {input.weight}/>
        </div>
        <div className = 'errors'>

        </div>
        </body>
    )

}
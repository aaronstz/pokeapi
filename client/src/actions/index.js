import axios from 'axios'

export function getPokes(){
    return function(dispatch){
        fetch('/pokemons')
        .then(res => res.json())
        .then(json => dispatch({
            type: 'GET_POKEMONS',
            payload: json,
            loading: false
        }))
    }
}

export function getTypes(){
    return function(dispatch){
        fetch('/types')
        .then(res => res.json())
        .then(json => dispatch({
            type: 'GET_TYPES',
            payload: json
        }))
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByStrength(payload){
    return { 
        type: 'ORDER_BY_STRENGTH', 
        payload
    }
}

export function filterByType(payload){
    return { 
        type: 'FILTER_BY_TYPE',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function getNamePokes(name){
    return async function(dispatch){
        try {
            const json = await axios('/pokemons?name=' + name)
            return dispatch({ 
                type: 'GET_NAMES',
                payload: json.data
            })
        } catch (error) {
            console.log('Pokemon not found');
            alert('Pokemon not found :/')
        }
    }
}

export function postPoke(payload){
    return async function (dispatch) {
        await axios.post('/pokemons', payload)
    }
}

export function getDetails(id){
    return async function(dispatch) {
        try {
            const json = await axios(`/pokemons/${id}`);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function deletePoke(id){
    return async function(dispatch) {
        try {
            const json = await axios.delete('/pokemons/' + id);
            return dispatch({
                type: 'DELETE_POKEMON',
                payload: json.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function resetDetails(){
    return {
        type: 'RESET_DETAILS'
    }
}
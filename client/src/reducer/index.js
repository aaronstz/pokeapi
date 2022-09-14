const initialState = {
    pokemons: [],
    pokesOnPage: [],
    types: [],
    details: [],
    getName: false,
    errors:[],
    loading: true,
}

export default function reducer(state = initialState, action){
    switch(action.type){
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                pokesOnPage: action.payload,
                loading: action.loading
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
        case 'ORDER_BY_NAME':
            const pokesName = state.pokesOnPage
            const nameFiltered = action.payload === 'All' ? state.pokemons :
                action.payload === 'Ascen' ? pokesName.sort((a,b)=> {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase())}) 
                : action.payload === 'Descen' ? pokesName.sort((a,b)=> {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())})
                : state.pokemons
                console.log(nameFiltered)
                return{
                ...state,
                pokemons: nameFiltered
            }
        case 'ORDER_BY_STRENGTH':
            const pokesStrength = state.pokesOnPage
            const orderStrength = 
            action.payload === 'Ascen' ? pokesStrength.sort((a,b)=> {
                return a.attack - b.attack})
            : action.payload === 'Descen' ? pokesStrength.sort((a,b)=>{
                return b.attack - a.attack})
            : state.pokemons
            return{
                ...state,
                pokemons: orderStrength
            }
        case 'FILTER_BY_TYPE':
            const allTypes = state.pokesOnPage
            const typesFiltered = action.payload === 'All' ? allTypes :
            allTypes.filter(t=>
                t.types.map(e=> e.name).includes(action.payload))
                if(!typesFiltered.length){
                    return{
                        ...state,
                        pokesOnPage: alert('No pokemons were found with that type'),
                        pokemons: state.pokemons,
                        types: state.types
                    }
                }
                    return{
                        ...state,
                        pokemons: typesFiltered.length? typesFiltered : state.pokesOnPage
                    }
                
        case 'FILTER_CREATED':
            const pokes = state.pokesOnPage
            const created = action.payload === 'Created' ? pokes.filter(e => e.created) : pokes.filter(e => !e.created)
            return{
                ...state,
                pokemons: action.payload === 'All' ? state.pokesOnPage : created
            }
        case 'GET_NAMES':

            return {
                ...state,
                pokemons: action.payload,
                getName: action.getName
            }
        case 'GET_DETAILS':
            return{
                ...state,
                details:action.payload,
            }
        case 'RESET_DETAILS':
            return{
                ...state,
                details: [],
                pokemons: state.pokemons,
                types: state.types
            }
        case 'LOADING':
            return{
                ...state,
                loading: true
            }
        case 'DELETE_POKEMON':
            return{
                ...state
            }
        default:
            return state
    }
}
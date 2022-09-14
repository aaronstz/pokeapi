import { getPokes, getTypes, orderByName, orderByStrength, filterByType, filterCreated } from '../actions'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card'
import Paginado from './Paginado'
import SearchBar from './SearchBar'
import Loading from './Loading'
import NotFound from './NotFound'
import './styles/Home.css'

export default function Home(){




    const dispatch = useDispatch()
    const pokemons = useSelector(store => store.pokemons)
    const types = useSelector(store => store.types)
    const loading = useSelector(store => store.loading)
    const name = useSelector(store => store.getName)


    ///////////////PAGINADO///////////////
    const [refresh, setRefresh] = useState(1)
    const [page, setPage] = useState(1)
    const [cantPoke, setCantPoke] = useState(12)
    const lastPoke = page * cantPoke
    const firstPoke = lastPoke - cantPoke
    const pokesPage = pokemons?.slice(firstPoke, lastPoke)
    const cantPages = Math.ceil(pokemons.length / cantPoke)

    const paginado = (pageNumber) => {
        setPage(pageNumber)
    }

    useEffect(()=>{
        dispatch(getPokes())
        dispatch(getTypes())
    }, [dispatch])

    function handleCreated(e){
        e.preventDefault()
        setRefresh(refresh + 1)
        dispatch(filterCreated(e.target.value))
        setPage(1)
    }

    function handleReset(e){
        e.preventDefault()
        setRefresh(refresh + 1)
        dispatch(getPokes())
    }

    function handleName(e){
        e.preventDefault()
        setRefresh(refresh + 1)
        dispatch(orderByName(e.target.value))
    }
    
    function handleStrength(e){
        e.preventDefault()
        setRefresh(refresh + 1)
        dispatch(orderByStrength(e.target.value))
    }

    function handleType(e){
        e.preventDefault()
        setPage(1)
        dispatch(filterByType(e.target.value))
    }

    if(loading){
        return(
            <div>
            <Loading/>
            </div>
        )
    }
    if(name === true){
        return(
            <div>
                <NotFound/>
            </div>
        )
    }
    else{
    return(
        <div >
            <div className="navbar">
                <button onClick = {(e)=> handleReset(e)} className = "home">Home</button>
                {/* <button>About</button> */}
                <Link to ='/create'><button className = "home">Create</button></Link>
            <select onChange = {(e)=> handleType(e)}>
                <option value ='All'>Type</option>
            {
                types&&types.map(t => {
                    return(
                        <option value={t.name}>
                            {t.name}
                        </option>
                    )
                })
            }
                </select>
                {/* <label>A-Z</label> */}
                <select onChange = {(e)=> handleName(e)}>
                    <option value = 'All'>A-Z</option>
                    <option value ='Ascen'>Ascendente</option>
                    <option value ='Descen'>Descendente</option>
                </select>
                <select onChange = {(e)=> handleStrength(e)}>
                    <option value = 'All'>Strength</option>
                    <option value ='Ascen'>Ascendente</option>
                    <option value ='Descen'>Descendente</option>
                </select>
                <select onChange = {(e) => handleCreated(e)}>
                    <option value = 'All'>Api/Created by user</option>
                    <option value ='Api'>Api</option>
                    <option value ='Created'>Created</option>
                </select>
            <SearchBar setPage={setPage} />
            </div>

                {/* <p className="page">You're currently on page {page}</p> */}
                <Paginado cantPoke= {cantPoke} pokemons = {pokemons.length} paginado = {paginado} actual = {page}></Paginado>
            {
               
                refresh && pokesPage.map((p, i) => {
                    return(
                        <div key = {i}>
                        <Link to ={'/home/' + p.id}>
                        <Card image = {p.image} name = {p.name} types = {p.types} />
                        </Link>
                        </div>
                    )
                })
            }
            
        </div>
    )
}
}
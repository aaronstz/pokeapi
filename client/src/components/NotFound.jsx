import React from 'react';
import { Link } from 'react-router-dom';

export default function notFound(){
    return(
        <div >
            <Link to ='/home'><button>Back Home</button></Link>
            <h1>Oops! Something went wrong...</h1>
        </div>
    )
}
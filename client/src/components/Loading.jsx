import React from "react";
import './styles/Loading.css'
import Loading from '../wallpaper/studio.png'


export default function LoadingPage(){
    return(
        <div className="loading_container">
            <img className="img_loading" src={Loading} alt="gif" />
        </div>
    );
}
import { Link } from 'react-router-dom';
import './styles/Landing.css'




export default function LandingPage(){

    
    



    return (
        
        <div>
            <h1 className="welcome">Ready to catch 'em all?</h1>
                <Link to ='/home'>
                <button className = "btn">GO!</button>
                </Link>
        </div>
    )
}
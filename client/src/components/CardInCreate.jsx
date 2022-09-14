import './styles/CardInCreate.css'

export default function Card({image, name, types, hp, attack, defense, speed, height, weight}){
    return(
        <div className = 'container-create'>
            <div className="card-create">
            <h1 className="title-create">{name}</h1>
            <img src={image} alt = '' className = "img-create"/>


            
            <div className = 'stats'>
            <h3>TYPES: {types.map(e => e + ", ")}</h3>
            <h3>HP:{hp}</h3>
            <h3>ATTACK:{attack}</h3>
            <h3>DEFENSE:{defense}</h3>
            <h3>SPEED:{speed}</h3>
            <h3>HEIGHT:{height}</h3>
            <h3>WEIGHT:{weight}</h3>
            </div>
            </div>
        </div>
    )
}
import './styles/Card.css'

export default function Card({image, name, types, msg}){
    return(
        <div className="container" key={Math.random()}>
            <div className="card">
            <h1 className="title">{name}</h1>
            <img src={image} alt = '' className = "img"/>
            {
                types.map((t)=>{
                    return(
                        <>
                        <p className = "type">{t.name}</p>
                        </>
                    )
                })
            }
            </div>
        </div>
    )
}
import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';


const CharacterCard = ({ 
  imgURL = "https://placehold.co/600x400", 
  name = "Noah Botty", 
  homeworld = "n/a", 
  eyeColor = "n/a", 
  id
}) => {
  const {store, actions} = useContext(Context);
  
  return (
    <div className="card me-5 flex-shrink-0" style={{width: "18rem"}}>
      <img 
      src={imgURL} 
      className="card-img-top" 
      alt={name}
      onError={e => e.target.src = "https://placehold.co/400x550"} 
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1">Homeworld: {homeworld}</p>
        <p className='card-text mb-1'>Eye Color: {eyeColor}</p>
        <div className='d-flex justify-content-between mt-3'>
            <Link to={"/characterPage/" + id}>
                <button className='btn btn-info'>Learn More!</button>
            </Link>
            <button 
            className={`btn btn-${store.userFavorites.filter((item) => item.name === name).length < 1 ? "outline-" : "" }danger`} 
            onClick={() => actions.addUserFavorite(name, "character", id)}
            disabled={store.loggedIn ? false : true}
            >
                <i className="fa-regular fa-heart"></i>
            </button>
        </div>
      </div>
    </div>
  )
}

export default CharacterCard
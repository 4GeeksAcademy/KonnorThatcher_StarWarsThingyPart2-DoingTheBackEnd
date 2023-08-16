import React, {useContext} from 'react'
import { Link } from "react-router-dom";
import { Context } from '../store/appContext';


const PlanetCard = ({
  imgURL = "https://placehold.co/600x400", 
  name = "Mars 2", 
  population = 0, 
  terrain = "n/a",
  id
}) => {
  const {store, actions} = useContext(Context)
  
  return (
    <div className="card me-5 flex-shrink-0" style={{ width: "18rem" }}>
      <img 
      src={imgURL} 
      className="card-img-top" 
      alt={name}
      onError={(e) => e.target.src = "https://placehold.co/400x400"}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text mb-1">Population: {population}</p>
        <p className="card-text mb-1">Terrain: {terrain}</p>
        <div className='d-flex justify-content-between mt-3'>
            <Link to={"/planetPage/" + id}>
                <button className='btn btn-info'>Learn More!</button>
            </Link>
            <button 
            className={`btn btn-${store.userFavorites.filter((item) => item.name === name).length < 1 ? "outline-" : "" }danger`} 
            onClick={() => actions.addUserFavorite(name, "planet", id)}
            disabled={store.loggedIn ? false : true}
            >
                <i className="fa-regular fa-heart"></i>
            </button>
        </div>
      </div>
    </div>
  )
}

export default PlanetCard
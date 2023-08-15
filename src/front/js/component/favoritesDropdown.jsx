import React, {useEffect, useContext} from 'react'
import { Context } from '../store/appContext'
import { Link } from 'react-router-dom'

const FavoritesDropdown = () => {
  const {store, actions} = useContext(Context)

  useEffect(() => {
    actions.getUserFavorites()
  }, [])
  
  console.log(store.userFavorites)

  return (
    <div className="dropdown">
        <button 
        className="btn btn-primary dropdown-toggle" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
        disabled={store.favorites.length === 0 ? true : false}
        >
            Favorites 
            {store.favorites.length > 0 ? (<span className='bg-light ms-1 text-danger px-2 fw-semibold rounded-circle'>
                {store.favorites.length}
            </span>) : ""}
        </button>
        <ul className="dropdown-menu">
            {store.favorites.map((item, idx) => {
                return (
                  <div key={idx} className='dropdown-item d-flex justify-content-between align-items-center'>
                      <Link to={`/${item.type}Page/${item.id}`}>
                          <p className='my-1'>{item.name}</p>
                      </Link>
                      <button className="btn btn-danger ms-1" onClick={() => actions.removeFavorite(item)}>
                          <i className="fa-solid fa-trash-can"></i>
                      </button>
                  </div>
                )
            })}
            <li><hr className='dropdown-divider' /></li>
            <button className='btn ms-2 btn-danger' onClick={() => actions.logout()}>Logout</button>
        </ul>
    </div>
  )
}

export default FavoritesDropdown
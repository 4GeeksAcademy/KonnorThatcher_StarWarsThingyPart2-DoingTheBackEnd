import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaceholderPage from '../component/placeholderPage.jsx'

const PlanetPage = () => {
    const {planetID} = useParams()
    const [planet, setPlanet] = useState({})

    useEffect(() => {getPlanet()}, [])

    const url = `https://swapi.dev/api/planets/${planetID}/`

    const getPlanet = () => {
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(planet => setPlanet(planet))
    }

    const imgStyle = {
        width: "90%"
    }

    return (
      <div className='row p-5'>
            <div className="col-6 d-flex">
                <img
                 className='ms-auto' 
                 src={planetID == 1 ? "https://placehold.co/400x400" : `https://starwars-visualguide.com/assets/img/planets/${planetID}.jpg`} 
                 style={imgStyle}></img>
            </div>
            {Object.keys(planet).length === 0 ? (<PlaceholderPage />) : (<div className="col-6">
                <h2>{planet.name}</h2>
                <ul className='mt-3'>
                    <li>
                        <b>Population:</b> {planet.population}
                    </li>
                    <li>
                        <b>Terrain:</b> {planet.terrain}
                    </li>
                    <li>
                        <b>Climate:</b> {planet.climate}
                    </li>
                    <li>
                        <b>Hours in a Day:</b> {planet.rotation_period} hours
                    </li>
                    <li>
                        <b>Days in a Year:</b> {planet.orbital_period} days
                    </li>
                </ul>
            </div>)}
        </div>
    )
}

export default PlanetPage
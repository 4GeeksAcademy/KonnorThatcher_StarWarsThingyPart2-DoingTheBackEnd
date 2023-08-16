import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PlaceholderPage from '../component/placeholderPage.jsx'

const PlanetPage = () => {
    const {planetID} = useParams()
    const [planet, setPlanet] = useState({})

    useEffect(() => {getPlanet()}, [planetID])

    const url = `${process.env.BACKEND_URL}api/planets/${planetID}`

    const getPlanet = () => {
        if (Object.keys(planet).length > 0) setPlanet({})
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(planet => setPlanet(planet))
    }

    const imgStyle = {
        width: "90%",
        maxWidth: "32rem"
    }

    return (
      <div className='row p-5'>
            <div className="col-6 d-flex">
                <img
                 className='ms-auto' 
                 src={planet.image_url} 
                 style={imgStyle}
                 onError={e => e.target.src = "https://placehold.co/400x400"} 
                 />
            </div>
            {Object.keys(planet).length === 0 ? (<PlaceholderPage />) : (<div className="col-6">
                <h2>{planet.name}</h2>
                <ul className='mt-3'>
                    <li>
                        <b>Population:</b> {planet.population}
                    </li>
                    <li>
                        <b>Diameter:</b> {planet.diameter} km
                    </li>
                    <li>
                        <b>Terrain:</b> {planet.terrain}
                    </li>
                    <li>
                        <b>Climate:</b> {planet.climate}
                    </li>
                    <li>
                        <b>Hours in a Day:</b> {planet.hours_in_day} hours
                    </li>
                    <li>
                        <b>Days in a Year:</b> {planet.days_in_year} days
                    </li>
                </ul>
            </div>)}
        </div>
    )
}

export default PlanetPage
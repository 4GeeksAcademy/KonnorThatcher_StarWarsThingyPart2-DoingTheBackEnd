import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import PlaceholderPage from '../component/placeholderPage.jsx'

const CharacterPage = () => {
    const {charID} = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {getPerson()}, [charID])

    const url = `${process.env.BACKEND_URL}api/characters/${charID}`

    const getPerson = () => {
        if (Object.keys(character).length > 0) setCharacter({})
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(person => setCharacter(person))
    }

    const imgStyle = {
        width: "90%",
        maxWidth: "32rem"
    }
    
    const cmToFt = (height) => {
        let inches = height * 0.39
        let feet = Math.floor(inches/12)
        let remainder = Math.floor(inches) - (feet * 12)
        return `${feet}'${remainder}`
    }
    
    console.log(character)

    return (
        <div className='row p-5'>
            <div className="col-6 d-flex">
                <img 
                className='ms-auto' 
                src={character.image_url}
                style={imgStyle}
                onError={e => e.target.src = "https://placehold.co/400x550"} 
                />
            </div>
            {Object.keys(character).length === 0 ? (<PlaceholderPage />) : (<div className="col-6">
                <h2>{character.name}</h2>
                <ul className='mt-3'>
                    <li>
                        <b>Gender:</b> {character.gender}
                    </li>
                    <li>
                        <b>Species:</b> {character.species}
                    </li>
                    <li>
                        <b>Birth Year:</b> {character.birth_year}
                    </li>
                    <li>
                        <b>Height:</b> {cmToFt(character.height)}
                    </li>
                    <li>
                        <b>Weight:</b> {character.weight * 2.205} lbs
                    </li>
                    <li>
                        <b>Eye Color:</b> {character.eye_color}
                    </li>
                    <li>
                        <b>Homeworld:</b> {character.homeworld}
                    </li>
                </ul>
            </div>)}
        </div>
    )
}

export default CharacterPage
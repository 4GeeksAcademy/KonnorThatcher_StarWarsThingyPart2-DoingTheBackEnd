import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const CharacterPage = () => {
    const {charID} = useParams()
    const [character, setCharacter] = useState({})

    useEffect(() => {getPerson()}, [])

    const url = `https://swapi.dev/api/people/${charID}/`

    const getPerson = () => {
        fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(person => setCharacter(person))
    }

    const imgStyle = {
        width: "90%",
        aspectRatio: "3/2",
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
                <img className='ms-auto' src="https://placehold.co/600x400" style={imgStyle}></img>
            </div>
            <div className="col-6">
                <h2>{character.name}</h2>
                <ul>
                    <li>
                        <b>Gender:</b> {character.gender}
                    </li>
                    <li>
                        <b>Birth Year:</b> {character.birth_year}
                    </li>
                    <li>
                        <b>Height:</b> {cmToFt(character.height)}
                    </li>
                    <li>
                        <b>Hair Color:</b> {character.hair_color}
                    </li>
                    <li>
                        <b>Eye Color:</b> {character.eye_color}
                    </li>
                    <li></li>
                </ul>
            </div>
        </div>
    )
}

export default CharacterPage
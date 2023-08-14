import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import CharacterCard from '../component/characterCard.jsx'
import PlanetCard from '../component/planetCard.jsx'
import PlaceholderCard from "../component/placeholderCard.jsx";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [people, setPeople] = useState([])
	const [planets, setPlanets] = useState([])

	useEffect(() => {
		getPeople();
		getPlanets();
	}, [])

	const getPeople = () => {
		fetch(`${process.env.BACKEND_URL}api/characters`, {method: 'GET'})
		.then(result => result.json())
		.then(people => setPeople(people.Characters))
	}

	const getPlanets = () => {
		fetch(`${process.env.BACKEND_URL}api/planets`, {method: 'GET'})
		.then(result => result.json())
		.then(planets => setPlanets(planets.Planets))
	}

	return (
		<div className="mt-5">
    		<div className='mx-5'>
    		    <h2 className='text-danger'>Characters</h2>
    		    <div className='d-flex overflow-x-auto p-2'>
    		        {people.length === 0 ? (<PlaceholderCard />) : people.map((person, idx) => {
						return (
							<CharacterCard 
								imgURL={person.image_url}
								key={idx} 
								name={person.name} 
								homeworld={person.homeworld} 
								eyeColor={person.eye_color} 
								id={person.id}
							/>
						)
					})}
    		    </div>
    		</div>
    		<div className='m-5'>
    		    <h2 className='text-danger'>Planets</h2>
    		    <div className="d-flex overflow-x-auto p-2">
    		        {planets.length === 0 ? (<PlaceholderCard />) : planets.map((planet, idx) => {
						return (
							<PlanetCard 
								imgURL={planet.image_url}
								key={idx} 
								name={planet.name} 
								population={planet.population} 
								terrain={planet.terrain}
								id={planet.id}
							/>
						)
					})}
    		    </div>
    		</div>
		</div>
	);
};

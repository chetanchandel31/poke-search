import React from 'react';
import Search from "../components/search"
import { fetchPokemon, fetchPokemonSpecies } from '../services/getPokemon';
import PokemonData from '../components/PokemonData'
import { Alert, Spinner } from 'react-bootstrap';

const spinnerStyle = {
    width: '10rem',
    height: '10rem',
    borderWidth: '1rem'
}

const spinnerWrapperStyle = {
    textAlign: 'center',
    marginTop: '100px'
}

export default function HomePage () {

    const [pokemon, setPokemon] = React.useState();
    const [pokemonSpecies, setPokemonSpecies] = React.useState();
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errMessage, setErrMessage] = React.useState('');

    const getPokemon = async (query) => {
        if (!query) {
            setErrMessage('Enter a name to search')
            return setError(true)
        }
        setError(false);
        setLoading(true);
        setTimeout(async () => {
        try{
        const response = await fetchPokemon(query); //fetch() returns a promise. await or .then of that promise returns the "resolve" part which contains object called "response" | BUT the body of response object is not directly accessible
        // console.log(response)
        const results = await response.json(); //.json() on RESPONSE object returns another promise.| await or .then on that returns content inside body(which is also another object) of RESPONSE object
        console.log(results)
        const speciesResponse = await fetchPokemonSpecies(query);
        const speciesResults = await speciesResponse.json();
        console.log(speciesResults)
        setPokemon(results);
        setPokemonSpecies(speciesResults);
        setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrMessage("Enter correct spelling");
        }
        }, 1500);
    } //this function being called in search component but still changing state variables defined in this component because search component is a CHILD of Homepage component

    return(
        <div>

    {error? <Alert variant='danger'>{errMessage}</Alert> : null}

            <Search getPokemon={getPokemon}/> 
            
            {loading ? (
                <div style=  {spinnerWrapperStyle}>
                <Spinner style={spinnerStyle} animation="border"/>
                </div>) :null} 

            {!loading && pokemon ? (
            <PokemonData 
            name={pokemon.name} 
            sprite={pokemon.sprites.front_default}
            abilities={pokemon.abilities}
            stats={pokemon.stats}
            types={pokemon.types}
            desc={pokemonSpecies.flavor_text_entries.filter(x => x.language.name === 'en').map((x) => x.flavor_text)}
            genus={pokemonSpecies.genera.filter(x => x.language.name === 'en' )}
            eggGroups={pokemonSpecies.egg_groups}
            habitat={pokemonSpecies.habitat}
            captureRate={pokemonSpecies.capture_rate}
            genderRate={pokemonSpecies.gender_rate}
            height={pokemon.height}
            weight={pokemon.weight}
            /> 
            ): null} {/* shouldn't be in loading state because the function is asynchronus(await's concept), we want pokemon's properties rendered only after loading phase has ended. We dont want to render pokemon's properties when it is undefined or in middle of loading(await concept) */}
        </div>
    )
}
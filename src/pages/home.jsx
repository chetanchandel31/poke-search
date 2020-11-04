import React from 'react';
import Search from "../components/search"
import { fetchPokemon } from '../services/getPokemon';
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
        // console.log(results)
        setPokemon(results);
        setLoading(false);
        } catch (err) {
            setLoading(false);
            setError(true);
            setErrMessage("Enter correct spelling");
        }
        }, 1500);
    }

    return(
        <div>

    {error? <Alert variant='danger'>{errMessage}</Alert> : null}

            <Search getPokemon={getPokemon}/> 
            {/* shouldn't be in loading state because the function is asynchronus(await's concept), we want pokemon's properties rendered only after loading phase has ended. We dont want to render pokemon's properties when it is undefined or in middle of loading(await concept) */}
            
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
            types={pokemon.types}/> 
            ): null}
        </div>
    )
}
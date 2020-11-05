const baseURL = "https://pokeapi.co/api/v2";
const query = {
    pokemon: "pokemon",
    pokemonSpecies : 'pokemon-species'
}

export async function fetchPokemon(pokemon) { //why is this async?
    console.log(`${baseURL}/${query.pokemon}/${pokemon}`)
    return fetch(`${baseURL}/${query.pokemon}/${pokemon}`)
}

export async function fetchPokemonSpecies(pokemon) { //why is this async?
    console.log(`${baseURL}/${query.pokemonSpecies}/${pokemon}`)
    return fetch(`${baseURL}/${query.pokemonSpecies}/${pokemon}`)
}
import React, { useState, useEffect } from 'react';
import axios from "axios";
import './Pokemon.css';



function Pokemon({ endpoint }) {
  const [ pokemonData, setPokemonData ] = useState({})

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const result = await axios.get(endpoint);
        setPokemonData(result.data);
        console.log('result')
      } catch (e) {
        console.error(e);
      }
    }

    if (endpoint) {
      void fetchPokemon();
    }

  }, [endpoint])

  return (
    <>
      {Object.keys(pokemonData).length > 0 && (
        <>
          <div className="pokemon-container">
            <h2>{pokemonData.name}</h2>
            <img src={pokemonData.sprites.front_default} alt='Pokemon'/>
            <p><strong>Moves: </strong>{pokemonData.moves.length}</p>
            <p><strong>Weight: </strong>{pokemonData.weight}</p>
            <p><strong>Abilities: </strong></p>
            <ul>
              {pokemonData.abilities.map((ability) => {
                return (
                  <li><i>{ability.ability.name}</i></li>
                );
              })
              }
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default Pokemon;

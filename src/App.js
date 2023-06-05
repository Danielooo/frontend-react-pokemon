import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import './App.css';
import logo from './assets/logo.png'

function App() {
  const [ endpoint, setEndpoint ] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [ pokemons, setPokemons ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ error, setError ] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const response = await axios.get(endpoint);
        if (response.data) {
          setError(false);
        }
        setPokemons(response.data)
        console.log(response.data)

      } catch (e) {
        console.error(e);
        console.log(e);
      }
      setLoading(false);
    }

    void fetchData();

  }, [endpoint])

  return (
    <>
      <section className="header-section">
        <img src={logo} alt="Pokemon Logo"/>
        <div className="button-section">
          <Button
            buttonType="button"
            children="Vorige"
            clickHandler={() => setEndpoint(pokemons.previous)}
            disabled={!pokemons.previous}
          />
          <Button
            buttonType="button"
            children="Volgende"
            clickHandler={() => setEndpoint(pokemons.next)}
            disabled={!pokemons.next}
          />
        </div>
      </section>

      <div className="message-section">
        {loading && <h3>Loading... </h3>}
        {error && <h2>Error: Could not fetch data!</h2>}
      </div>


      <div className="pokemon-deck">
        {pokemons.results && pokemons.results.map((pokemon) => {
          return <Pokemon key={pokemon.name} endpoint={pokemon.url}/>
        })}
      </div>
    </>
  );
}

export default App;

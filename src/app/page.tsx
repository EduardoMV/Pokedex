"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import PokedexGrid from '@/components/pokegrid';

interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export default function Home() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=27`);
        const pokemonPromises = response.data.results.map((pokemon: { url: string }) =>
          axios.get(pokemon.url)
        );
        const pokemonResponses = await Promise.all(pokemonPromises);
        const pokemonList: Pokemon[] = pokemonResponses.map((res) => ({
          id: res.data.id,
          name: res.data.name,
          image: res.data.sprites.front_default,
          artwork: res.data.sprites.other['official-artwork'].front_default,
          types: res.data.types.map((typeInfo: { type: { name: string } }) => typeInfo.type.name),
          moves: res.data.moves.slice(0, 4).map((moveInfo: { move: { name: string } }) => moveInfo.move.name),
        }));
        setPokemons(pokemonList);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  if (loading) return <div>Loading Pokedex...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto">
      <img 
        src="/image/pokeball.png" 
        alt="Pokeball" 
        style={{
          position: 'absolute',
          top: '-40px',
          left: '-50px',
          zIndex: -1,
          width: '250px', 
          height: 'auto'
        }} 
      />
      <h1 className="text-4xl font-bold mb-4">Pokedex</h1>
      <PokedexGrid pokemons={pokemons} />
    </div>
  );
}

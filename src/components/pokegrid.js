import PokemonCard from './pokecard';

export default function PokedexGrid({ pokemons }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {pokemons.map((pokemon) => (
        <PokemonCard
          id={pokemon.id}
          name={pokemon.name}
          image={pokemon.image}
          types={pokemon.types} 
          artwork={pokemon.artwork}
          moves={pokemon.moves}
        />
      ))}
    </div>
  );
}

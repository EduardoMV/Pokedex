"use client";
import { useState } from 'react';

export default function PokemonCard({ id, name, image, artwork, types, moves }) {
  const [showOverlay, setShowOverlay] = useState(false);
  const formattedId = `N°${String(id).padStart(3, '0')}`;


  const toggleOverlay = () => setShowOverlay(!showOverlay);

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('overlay')) {
      setShowOverlay(false);
    }
  };

  const getTypeStyle = (types) => {
    if (types.length === 1) {
      return `background-color: var(--type-${types[0].toLowerCase()});`;
    } else if (types.length === 2) {
      return `background: linear-gradient(45deg, var(--type-${types[0].toLowerCase()}), var(--type-${types[1].toLowerCase()}));`;
    }
  };

  return (
    <>
      <div onClick={toggleOverlay} className="pokemon-card bg-white rounded-lg shadow-lg p-4 flex flex-col items-center cursor-pointer">
        <img src={image} alt={name} className="w-20 h-20" />
        <span id='Poke-number'>{formattedId}</span>
        <h2 className="text-xl font-bold">{name}</h2>
        <div className="flex space-x-1">
          {types.map((type) => (
            <span key={type} className={`badge badge-${type}`}>{type}</span>
          ))}
        </div>
      </div>

      {showOverlay && (
        <div
          className="overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleClickOutside}
        >
          <div className="bg-white rounded-lg p-6 relative max-w-sm w-full">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowOverlay(false)}
            >
              X
            </button>
            <div className="flex flex-col items-center">
              <img src={artwork} alt={name} className="w-32 h-32 mb-4" />
              <span id='Poke-number'>{formattedId}</span>
              <h2 className="text-2xl font-bold mb-4">{name}</h2>
              <div className="flex space-x-2 mb-4">
                {types.map((type) => (
                  <span key={type} className={`badge badge-${type}`}>{type}</span>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold mb-2">Moves</h3>
                <ul className="moves-list">
                  {moves.map((move) => (
                    <li key={move} style={{ cssText: getTypeStyle(types) }}>
                      {move}
                    </li>
                  ))}
                </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

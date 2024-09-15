import { useEffect } from "react";
import { useState } from "react";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const fetchPokemon = async () => {
    const pokemonList = [];
    for (let i = 1; i <= 12; i++) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const data = await response.json();
      pokemonList.push({
        id: data.id,
        name: data.name,
        image: data.sprites.front_default,
      });
    }

    setPokemon(pokemonList);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  const handleClick = (id) => {
    if (clickedPokemon.includes(id)) {
      setClickedPokemon([]);
      setScore(0);
      alert("Game Over");
    } else {
      setClickedPokemon([...clickedPokemon, id]);
      setScore(score + 1);
      setBestScore(Math.max(bestScore, score + 1));

      if (score + 1 === 12) {
        alert("You've won!");
        setClickedPokemon([]);
        setScore(0);
      }
    }

    setPokemon(shuffleArray(pokemon));
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-3 sm:gap-5
      bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-4
      "
      >
        <div className="flex flex-col items-center justify-center text-center backdrop-blue-xl bg-black/70 p-3 sm:p-5 rounded-2xl">
          <h1 className="font-mono font-bold text-3xl text-white sm:text-4xl md:text-5xl mb-2 sm:mb-3 p-2 sm:p-5">
            Pokemon Memory Game
          </h1>
          <div className="mb-3 sm:mb-5 text-white text-lg sm:text-xl md:text-2xl">
            <p>Score: {score}</p>
            <p>Best Score: {bestScore}</p>
          </div>
        </div>

        <div className="grid grid-col-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 w-full max-w-3xl">
          {pokemon.map((p) => (
            <div
              className="bg-white rounded-lg shadow-lg p-2 sm:p-4 cursor-pointer transform hover:scale-105 transition-transform"
              key={p.id}
              onClick={() => handleClick(p.id)}
            >
              <img
                src={p.image}
                alt=""
                className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32  mx-auto"
              />
              <p className="text-center mt-1 sm:mt-2 text-sm sm:text-base">
                {p.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;

import { useState } from 'react';

function SearchBoardGame() {
  const [boardGameString, setBoardGameString] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    console.log(`Form submitted`, boardGameString);
    setBoardGameString('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search board game"
        value={boardGameString}
        onChange={(e) => setBoardGameString(e.target.value)}
        className="w-28 rounded-full bg-amber-300 px-4 py-3 text-sm transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-amber-500 focus:ring-opacity-50 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchBoardGame;

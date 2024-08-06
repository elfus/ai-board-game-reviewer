import { useState } from 'react';

function SearchBoardGame() {
  const [boardGameString, setBoardGameString] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    setBoardGameString('');
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search board game..."
        value={boardGameString}
        onChange={(e) => setBoardGameString(e.target.value)}
        className="w-28 rounded-full bg-slate-500 px-4 py-3 text-sm transition-all duration-300 placeholder:text-stone-200 focus:outline-none focus:ring focus:ring-amber-400 sm:w-64 sm:focus:w-72"
      />
    </form>
  );
}

export default SearchBoardGame;

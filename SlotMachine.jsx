import React from 'react';
import { useAction, play } from 'wasp/client/operations';

const SlotMachinePage = () => {
  const playFn = useAction(play);

  const handlePlay = () => {
    playFn();
  };

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold mb-4'>Slot Machine Game</h1>
      <button
        onClick={handlePlay}
        className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
      >
        Play
      </button>
    </div>
  );
}

export default SlotMachinePage;
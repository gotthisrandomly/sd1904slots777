import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getPlays } from 'wasp/client/operations';

const LandingPage = () => {
  const { data: plays, isLoading, error } = useQuery(getPlays);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-3xl font-bold'>Welcome to our Online Casino!</h1>
      <p className='mt-4'>Feel the thrill of the game and try your luck at our slot machine!</p>
      <Link to='/slot-machine' className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>Go to Slot Machine</Link>
    </div>
  );
}

export default LandingPage;
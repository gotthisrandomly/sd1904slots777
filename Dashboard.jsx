import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, getUser, getTransactions, getPlays } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser);
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useQuery(getTransactions);
  const { data: plays, isLoading: playsLoading, error: playsError } = useQuery(getPlays);

  if (userLoading || transactionsLoading || playsLoading) return 'Loading...';
  if (userError || transactionsError || playsError) return 'Error: ' + (userError || transactionsError || playsError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      <div className='bg-gray-100 p-4 mb-4 rounded-lg'>
        <div>Username: {user.username}</div>
        <div>Balance: ${user.balance}</div>
      </div>
      <h2 className='text-xl font-bold mb-4'>Transactions</h2>
      {transactions.map((transaction) => (
        <div key={transaction.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Amount: ${transaction.amount}</div>
        </div>
      ))}
      <h2 className='text-xl font-bold mb-4'>Plays</h2>
      {plays.map((play) => (
        <div key={play.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>Amount: ${play.amount}</div>
          <div>Win: {play.win ? 'Yes' : 'No'}</div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
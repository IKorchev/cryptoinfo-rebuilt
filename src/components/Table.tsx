'use client';

import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import type Coin from '@/types/Coin';
import TableRow from './TableRow';
const tableFields = ['#', 'Symbol', 'Name', 'Price', 'Supply', 'Volume', '24hr change', 'Ex'];

function Table({ coins }: { coins: Coin[] }) {
  const [arr, setArr] = useState(coins.slice(0, 20));
  function handleSocketMessage(message: string) {
    const parsedMessage = JSON.parse(message);
    setArr((oldArr) => oldArr.map((obj) => (parsedMessage[obj.id] ? { ...obj, priceUsd: parsedMessage[obj.id] } : obj)));
  }
  const initSocket = () => {
    fetch('/api/socket');
    const socket = io();
    socket.on('new-message', handleSocketMessage);
  };
  //prettier-ignore
  useEffect(() => {
    initSocket()
   }, []);
  return (
    <table className='min-w-full'>
      <thead className='bg-gray-900 border-b'>
        <tr>
          {tableFields.map((content) => (
            <th key={content} scope='col' className='px-6 py-4 text-left'>
              {content}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {arr.map((coin) => (
          <TableRow key={coin.id} coin={coin} />
        ))}
      </tbody>
    </table>
  );
}

export default React.memo(Table);

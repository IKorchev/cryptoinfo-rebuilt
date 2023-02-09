'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import type Data from '@/types/Data';

const COUNT_ABBRS = ['', 'k', 'm', 'b', 't', 'qd', 'qt', 'sx', 'sp'];

function formatCount(count: number, decimals = 2) {
  const i = 0 === count ? count : Math.floor(Math.log(count) / Math.log(1000));
  let result = `${parseFloat((count / Math.pow(1000, i)).toFixed(decimals))}${COUNT_ABBRS[i]}`.trim();
  return result;
}

function formatCurrency(stringOrNumber: string | number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(Number(stringOrNumber));
}
function Table({ data }: { data: Data[] }) {
  const [socketData, setSocketData] = useState<{ [key: string]: string }>({});
  console.log(data);
  const initSocket = async () => {
    await fetch('/api/socket');
    const socket = io();
    socket.on('new-message', (msg) => {
      setSocketData(msg as {});
    });
  };
  useEffect(() => {
    // initSocket();
  }, []);
  return (
    <div className='container mx-auto'>
      <div className='flex flex-col mx-auto'>
        <table className='min-w-full my-16'>
          <thead className='bg-gray-900 border-b'>
            <tr>
              <th scope='col' className='px-6 py-4 text-left'>
                #
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Symbol
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Name
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Price
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Supply
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Volume
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                24hr change
              </th>
              <th scope='col' className='px-6 py-4 text-left'>
                Ex
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((el) => {
              const isNegative24hr = Number(el.changePercent24Hr) < 0;
              return (
                <tr key={el.id} className='bg-gray-700 border-b transition duration-300 ease-in-out hover:bg-gray-800'>
                  <td className='px-6 py-4 whitespace-nowrap '>{el.rank}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{el.symbol}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{el.name}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{formatCurrency(el.priceUsd)}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{formatCount(Number(el.supply))}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>{formatCount(Number(el.volumeUsd24Hr))}</td>
                  <td className={`px-6 py-4 whitespace-nowrap ${isNegative24hr ? 'text-red-400' : 'text-emerald-400'}`}>
                    {Number(el.changePercent24Hr).toFixed(2)}%
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <a target='_blank' rel='noreferrer' href={el.explorer}>
                      Link
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className='grid grid-cols-4'>
        {Object.entries(socketData).map((kv) => {
          return (
            <div className='flex flex-column gap-5 w-[200px] justify-between' key={kv[0]}>
              <p>{kv[0]}</p>
              <p className='text-right'>{kv[1]}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Table;

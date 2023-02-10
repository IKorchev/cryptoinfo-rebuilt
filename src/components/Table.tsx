'use client';

import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import type Data from '@/types/Data';
import { formatBigNumber, formatCurrency, formatToFixed } from '@/utils/format';

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
                  <td className='px-6 py-4'>{el.rank}</td>
                  <td className='px-6 py-4'>{el.symbol}</td>
                  <td className='px-6 py-4'>{el.name}</td>
                  <td className='px-6 py-4'>{formatCurrency(el.priceUsd)}</td>
                  <td className='px-6 py-4'>{formatBigNumber(el.supply)}</td>
                  <td className='px-6 py-4'>${formatBigNumber(el.volumeUsd24Hr)}</td>
                  <td className={`px-6 py-4 ${isNegative24hr ? 'text-red-400' : 'text-emerald-400'}`}>{formatToFixed(el.changePercent24Hr, 2)}%</td>
                  <td className='px-6 py-4'>
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

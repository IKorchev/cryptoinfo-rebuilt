import type Coin from '@/types/Coin';
import { formatBigNumber, formatCurrency, formatToFixed } from '@/utils/format';
import { memo } from 'react';
import useFlicker from '@/hooks/useFlicker';

type RowProps = { coin: Coin };

function TableRow({ coin }: RowProps) {
  const { rank, symbol, name, priceUsd, supply, volumeUsd24Hr, explorer, changePercent24Hr } = coin || {};
  const textColour = Number(changePercent24Hr) < 0 ? 'text-red-400' : 'text-emerald-400';
  const flicker = useFlicker({ price: priceUsd });

  return (
    <tr className={`bg-gray-700 ${flicker} transition-colors border-b duration-300 ease-in-out hover:bg-gray-800`}>
      <td className='px-6 py-4'>{rank}</td>
      <td className='px-6 py-4'>{symbol}</td>
      <td className='px-6 py-4'>{name}</td>
      <td className='px-6 py-4'> {formatCurrency(priceUsd)}</td>
      <td className='px-6 py-4'> {formatBigNumber(supply)}</td>
      <td className='px-6 py-4'>$ {formatBigNumber(volumeUsd24Hr)}</td>
      <td className={`px-6 py-4 ${textColour}`}>{formatToFixed(changePercent24Hr, 2)}%</td>
      <td className='px-6 py-4'>
        <a target='_blank' rel='noreferrer' href={explorer}>
          Link
        </a>
      </td>
    </tr>
  );
}

export default memo(TableRow);

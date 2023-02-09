import Table from '@/components/Table';
import type Data from '@/types/Data';
type CoinsResponse = {
  data: Data[];
  timestamp: number;
};

async function getCoinsData(): Promise<CoinsResponse> {
  return fetch(`${process.env.COINS_URL}/assets`).then((res) => res.json());
}

export default async function Home() {
  const coinsResponse = await getCoinsData();
  return (
    <div>
      <Table data={coinsResponse.data} />
    </div>
  );
}

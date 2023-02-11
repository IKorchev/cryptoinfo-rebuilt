import Dashboard from '@/components/Dashboard';
import Table from '@/components/Table';
import type Data from '@/types/Coin';
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
      <Dashboard>
        <Table coins={coinsResponse.data} />
      </Dashboard>
    </div>
  );
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import WebSocket from 'ws';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const serverSocket = new Server(res.socket.server);
  const clientSocket = serverSocket.on('connection', (s) => s);
  const pricesSocket = new WebSocket(process.env.PRICES_WS_URL);
  pricesSocket.addEventListener('message', (event: MessageEvent) => {
    clientSocket.emit('new-message', JSON.parse(event.data.split(',')));
  });
  res.end();
}

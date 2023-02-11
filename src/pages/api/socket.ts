// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';
import WebSocket from 'ws';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  const io = new Server(res.socket.server);
  const pricesSocket = new WebSocket(process.env.PRICES_WS_URL || '');
  pricesSocket.on('message', (event) => {
    io.sockets.emit('new-message', event.toString());
  });
  res.end();
}
export default handler;

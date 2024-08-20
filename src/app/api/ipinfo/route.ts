import type { NextRequest } from 'next/server';

export const runtime = 'edge'

export async function GET(request: NextRequest & { cf?: Record<string, any> }) {
  const { headers } = request;
  const cfIpCountry = headers.get("cf-ipcountry");
  const cfConnectingIp = headers.get("cf-connecting-ip");
  const realIp = headers.get("x-real-ip");
  const userAgent = headers.get("user-agent");

  const data = {
    cfConnectingIp,
    cfIpCountry,
    realIp,
    userAgent
  }
  return new Response(JSON.stringify(data, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

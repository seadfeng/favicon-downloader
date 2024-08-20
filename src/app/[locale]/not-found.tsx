import { redirect } from 'next/navigation';
export const runtime = 'edge';

export default function RootPage() {
  redirect('/404');
}
// pages/hotel/[id].tsx
import { Hotel } from '@/types';
import HotelDetails from '@/components/HotelDetails';
// import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getHotel(id: string): Promise<Hotel | null> {
  try {
    const res = await fetch(`http://localhost:3005/api/hotel/${id}`, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch hotel. Status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;  // Return null if the hotel is not found or there's an error
  }
}

export default async function HotelPage({
  params,
}: {
  params: { id: string };
}) {
  const hotel = await getHotel(params.id);

  if (!hotel) {
    // Use the notFound() function to show Next.js's default error page
    notFound();
  }

  return <HotelDetails hotel={hotel} />;
}

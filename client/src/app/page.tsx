import HotelCard from '@/components/HotelCard';
import { Hotel } from '@/types';
import { notFound } from 'next/navigation';  // Import notFound function

async function getHotels(): Promise<Hotel[]> {
  try {
    const res = await fetch('http://localhost:3005/api/hotels', {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Failed to fetch hotels');
    }

    const data: Hotel[] = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];  // Return an empty array if an error occurs
  }
}

export default async function Home() {
  const hotels: Hotel[] = await getHotels();

  if (hotels.length === 0) {
    // If no hotels were found, display the default 404 page
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Our Hotels</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </main>
  );
}

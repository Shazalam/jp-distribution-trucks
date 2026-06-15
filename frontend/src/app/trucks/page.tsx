import TrucksClient from './TrucksClient';

// This uses Next.js ISR. It caches the HTML indefinitely,
// until the backend sends a webhook to /api/revalidate with tag 'trucks'.
export default async function TrucksPage() {
  let featuredTrucks = [];

  try {
    const res = await fetch('http://localhost:5000/api/cms/trucks?status=Published', {
      next: { tags: ['trucks'] },
    });
    const data = await res.json();
    if (data.success) {
      featuredTrucks = data.data;
    }
  } catch (error) {
    console.error('Failed to fetch published trucks:', error);
  }

  return <TrucksClient featuredTrucks={featuredTrucks} />;
}

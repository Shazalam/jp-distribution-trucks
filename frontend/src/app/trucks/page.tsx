import TrucksClient from './TrucksClient';

// This uses Next.js ISR. It caches the HTML indefinitely,
// until the backend sends a webhook to /api/revalidate with tag 'trucks' or 'pages'.
export default async function TrucksPage() {
  let featuredTrucks = [];
  let pageConfig = null;

  try {
    const [trucksRes, configRes] = await Promise.all([
      fetch('http://localhost:5000/api/cms/trucks?status=Published', { next: { tags: ['trucks'] } }),
      fetch('http://localhost:5000/api/cms/pages/trucks', { next: { tags: ['pages'] } })
    ]);

    const trucksData = await trucksRes.json();
    if (trucksData.success) {
      featuredTrucks = trucksData.data;
    }

    const configData = await configRes.json();
    if (configData.success && configData.data) {
      pageConfig = configData.data;
    }
  } catch (error) {
    console.error('Failed to fetch trucks data:', error);
  }

  return <TrucksClient featuredTrucks={featuredTrucks} pageConfig={pageConfig} />;
}

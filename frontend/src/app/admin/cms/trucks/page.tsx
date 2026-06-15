'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Loader2, Plus, Edit, RefreshCcw, Archive, UploadCloud } from 'lucide-react';

interface Truck {
  _id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  status: 'Draft' | 'Published' | 'Archived';
  images: string[];
}

export default function TrucksCMSDashboard() {
  const [trucks, setTrucks] = useState<Truck[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTrucks();
  }, []);

  const fetchTrucks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/cms/trucks');
      const data = await res.json();
      if (data.success) setTrucks(data.data);
    } catch (error) {
      console.error('Failed to fetch trucks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/cms/trucks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'Published' })
      });
      fetchTrucks();
    } catch(e) {}
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-heading">Trucks CMS</h1>
            <p className="text-zinc-400">Manage all your vehicle listings.</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700 text-white gap-2">
            <Plus size={18} /> New Truck
          </Button>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-900/20 border border-blue-500/30 p-4 rounded-xl text-sm text-blue-200">
          <strong>Cloudinary Upload Requirement:</strong> For best visual results, Truck Card images should be exported in a <strong>4:3 aspect ratio</strong> before uploading. Hero backgrounds should be <strong>16:9</strong>.
        </div>

        {/* Data Table */}
        <div className="grid gap-4">
          {trucks.map((truck) => (
            <Card key={truck._id} className="bg-zinc-900 border-zinc-800 flex items-center justify-between p-4">
              <div className="flex items-center gap-6">
                <div className="h-16 w-24 relative rounded-md overflow-hidden bg-zinc-800">
                  {truck.images?.[0] && (
                    <Image src={truck.images[0]} alt={truck.title} fill className="object-cover" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{truck.title}</h3>
                  <p className="text-zinc-400 text-sm">{truck.brand} {truck.model} ({truck.year}) • ${truck.price?.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Badge variant={truck.status === 'Published' ? 'default' : 'secondary'} className={truck.status === 'Published' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}>
                  {truck.status}
                </Badge>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="hover:text-red-500">
                    <Edit size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-blue-500" onClick={() => handlePublish(truck._id)}>
                    <UploadCloud size={18} />
                  </Button>
                  <Button variant="ghost" size="icon" className="hover:text-orange-500">
                    <RefreshCcw size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}

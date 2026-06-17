import mongoose from 'mongoose';
import Part from './src/models/Part';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/toyota_export';

const exampleParts = [
  {
    name: 'Heavy Duty Leaf Springs',
    category: 'Suspension',
    condition: 'New',
    price: 850,
    description: 'Upgraded heavy-duty leaf springs designed for high-payload environments and off-road durability.',
    images: ['https://res.cloudinary.com/dd8a5dpnh/image/upload/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg'], // Using placeholder image for now
    inStock: true,
    vehicleCompatibility: ['Hilux 2016+', 'Hilux Revo'],
    status: 'Published'
  },
  {
    name: 'TRD Front Bumper Billet Grill',
    category: 'Exterior',
    condition: 'New',
    price: 420,
    description: 'Aggressive TRD styling billet grill for the front bumper. Direct bolt-on replacement.',
    images: ['https://res.cloudinary.com/dd8a5dpnh/image/upload/v1781498078/jp-distribution/trucks/cards/truck-2.png'],
    inStock: true,
    vehicleCompatibility: ['Hilux 2021+'],
    status: 'Published'
  },
  {
    name: 'Long Range Fuel Tank (140L)',
    category: 'Overland',
    condition: 'New',
    price: 1200,
    description: 'Extended range replacement fuel tank for self-sustained travel across remote terrain.',
    images: ['https://res.cloudinary.com/dd8a5dpnh/image/upload/v1781498080/jp-distribution/trucks/cards/truck-3.png'],
    inStock: false,
    vehicleCompatibility: ['Hilux Double Cab 2016+'],
    status: 'Published'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
    
    await Part.deleteMany({});
    console.log('Cleared existing parts');
    
    await Part.insertMany(exampleParts);
    console.log('Inserted example parts');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

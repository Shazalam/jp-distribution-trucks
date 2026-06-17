require('dotenv').config();
const mongoose = require('mongoose');

const TruckSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  images: { type: [String] },
  price: { type: Number },
  condition: { type: String, enum: ['New', 'Used'], default: 'New' },
  brand: { type: String, default: 'Toyota' },
  model: { type: String },
  year: { type: Number },
  type: { type: String, enum: ['Truck', 'Custom Build'], default: 'Truck' },
  stockStatus: { type: String, enum: ['Available', 'Reserved', 'Sold'], default: 'Available' },
  features: { type: [String], default: [] },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  seoMetadata: {
    title: { type: String },
    description: { type: String },
    keywords: { type: [String], default: [] }
  }
}, { timestamps: true });

const Truck = mongoose.models.Truck || mongoose.model('Truck', TruckSchema);

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toyota_export';

const BUILD_CATEGORIES = [
  { title: "Expedition Builds", description: "Long-range self-sustained travel setups.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498050/jp-distribution/home/hero/cinematic-hilux-hero.jpg"], price: 65000 },
  { title: "Overland Builds", description: "Premium camping and exploration platforms.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498047/jp-distribution/custom-builds/cards/desert-runner.png"], price: 55000 },
  { title: "Adventure Builds", description: "Weekend warrior and trail-ready modifications.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498040/jp-distribution/custom-builds/cards/build-1.png"], price: 45000 },
  { title: "Commercial Utility Builds", description: "Heavy-duty chassis configurations for work.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498078/jp-distribution/trucks/cards/truck-2.png"], price: 42000 },
  { title: "Fleet Customization", description: "Standardized enterprise deployments.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png"], price: 40000 },
  { title: "Mining & Industrial Builds", description: "Safety-compliant subterranean specs.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498042/jp-distribution/custom-builds/cards/build-2.png"], price: 58000 },
  { title: "Agricultural Builds", description: "Rugged platforms for farming and rural use.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498044/jp-distribution/custom-builds/cards/build-3.png"], price: 41000 },
  { title: "Emergency & Rescue Vehicles", description: "Rapid response and medical transport.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498046/jp-distribution/custom-builds/cards/build-4.png"], price: 72000 },
  { title: "Security & Patrol Builds", description: "Armored enforcement platforms.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498071/jp-distribution/trucks/cards/black-edition.png"], price: 85000 },
  { title: "Extreme Builds", description: "Pushing limits with custom upgrades and performance.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498046/jp-distribution/custom-builds/cards/build-4.png"], price: 95000 },
  { title: "Classic Builds", description: "Restored and highly durable legacy platforms.", images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498044/jp-distribution/custom-builds/cards/build-3.png"], price: 50000 },
];

const mappedBuilds = BUILD_CATEGORIES.map(b => ({
  title: b.title,
  description: b.description,
  images: b.images,
  price: b.price,
  condition: 'New',
  brand: 'Toyota',
  model: 'Hilux Custom',
  year: 2025,
  type: 'Custom Build',
  stockStatus: 'Available',
  status: 'Published'
}));

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
    
    // Delete only custom builds
    await Truck.deleteMany({ type: 'Custom Build' });
    console.log('Cleared existing custom builds');
    
    await Truck.insertMany(mappedBuilds);
    console.log(`Inserted ${mappedBuilds.length} custom builds`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

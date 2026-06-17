require('dotenv').config();
const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used'], default: 'New' },
  price: { type: Number, default: 0 },
  description: { type: String },
  images: { type: [String], default: [] },
  inStock: { type: Boolean, default: true },
  vehicleCompatibility: { type: [String], default: [] },
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  subcategory: { type: String },
  popular: { type: Boolean, default: false }
}, { timestamps: true });

const Part = mongoose.models.Part || mongoose.model('Part', PartSchema);

const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/toyota_export';

const DUMMY_PARTS = [
  { name: "Toyota Hilux LED Fog Lamps", category: "Lighting Systems", subcategory: "Fog Lamps", price: 145.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "TRD Pro Style Grille DRL", category: "Lighting Systems", subcategory: "DRLs", price: 120.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "Fox 2.0 Performance Series IFP", category: "Suspension & Lift Kits", subcategory: "Shocks & Struts", price: 495.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "Old Man Emu 2-Inch Lift Kit", category: "Suspension & Lift Kits", subcategory: "Lift Kits", price: 1850.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498063/jp-distribution/parts-supply/categories/parts-suspension.png"], popular: false, condition: "New", inStock: true, status: "Published" },
  { name: "Genuine OEM Oil Filter 90915-YZZD1", category: "OEM Genuine Parts", subcategory: "Filters", price: 12.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498058/jp-distribution/parts-supply/categories/parts-engine.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "TRD Cat-Back Exhaust System", category: "Performance Upgrades", subcategory: "Exhaust Systems", price: 850.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498084/jp-distribution/wholesale-retail/cards/wholesale-parts.jpg"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "ARB Touring Awning", category: "Overland Equipment", subcategory: "Awnings", price: 350.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498060/jp-distribution/parts-supply/categories/parts-overland.png"], popular: false, condition: "New", inStock: true, status: "Published" },
  { name: "Warn VR EVO 10-S Winch", category: "Recovery Equipment", subcategory: "Winches", price: 980.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498042/jp-distribution/custom-builds/cards/build-2.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "Projecta Dual Battery System", category: "Electrical Components", subcategory: "Wiring", price: 299.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "Ironman 4x4 Commercial Bull Bar", category: "Body & Exterior Parts", subcategory: "Bumpers", price: 1200.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498054/jp-distribution/parts-supply/categories/parts-body.png"], popular: true, condition: "New", inStock: true, status: "Published" },
  { name: "Rigid Industries 40\" Light Bar", category: "Lighting Systems", subcategory: "Light Bars", price: 850.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498056/jp-distribution/parts-supply/categories/parts-electrical.png"], popular: false, condition: "New", inStock: true, status: "Published" },
  { name: "Genuine Toyota Brake Pads", category: "Fleet Maintenance", subcategory: "Brake Pads", price: 85.00, images: ["https://res.cloudinary.com/dd8a5dpnh/image/upload/f_auto,q_auto/v1781498080/jp-distribution/trucks/cards/truck-3.png"], popular: true, condition: "New", inStock: true, status: "Published" },
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
    
    await Part.deleteMany({});
    console.log('Cleared existing parts');
    
    await Part.insertMany(DUMMY_PARTS);
    console.log('Inserted full dummy parts catalog');
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
}

seed();

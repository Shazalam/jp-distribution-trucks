import mongoose, { Schema, Document } from 'mongoose';

export interface ITruck extends Omit<Document, 'model'> {
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  condition: 'New' | 'Used';
  type: 'Import' | 'Custom Build' | 'Standard';
  description: string;
  features: string[];
  images: string[];
  stockStatus: 'Available' | 'Sold' | 'Reserved';
  
  // CMS Fields
  status: 'Draft' | 'Published' | 'Archived';
  seoMetadata?: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  lastEditedBy?: mongoose.Types.ObjectId;
  publishedAt?: Date;
  
  createdAt: Date;
}

const TruckSchema: Schema = new Schema({
  title: { type: String, required: true },
  brand: { type: String, required: true, default: 'Toyota' },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  price: { type: Number },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  type: { type: String, enum: ['Import', 'Custom Build', 'Standard'], default: 'Standard' },
  description: { type: String, required: true },
  features: [{ type: String }],
  images: [{ type: String }],
  stockStatus: { type: String, enum: ['Available', 'Sold', 'Reserved'], default: 'Available' },
  
  // CMS Fields
  status: { type: String, enum: ['Draft', 'Published', 'Archived'], default: 'Draft' },
  seoMetadata: {
    title: String,
    description: String,
    keywords: [String]
  },
  lastEditedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  publishedAt: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ITruck>('Truck', TruckSchema);

import mongoose, { Schema, Document } from 'mongoose';

export interface IPart extends Document {
  name: string;
  category: string;
  subcategory?: string;

  condition: 'New' | 'Used';
  price: number;
  description: string;
  images: string[];
  inStock: boolean;
  vehicleCompatibility: string[];
  
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

const PartSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String },

  condition: { type: String, enum: ['New', 'Used'], required: true },
  price: { type: Number },
  description: { type: String },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  vehicleCompatibility: [{ type: String }],
  
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

export default mongoose.model<IPart>('Part', PartSchema);

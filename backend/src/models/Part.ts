import mongoose, { Schema, Document } from 'mongoose';

export interface IPart extends Document {
  name: string;
  category: string;
  condition: 'New' | 'Used';
  price: number;
  description: string;
  images: string[];
  inStock: boolean;
  vehicleCompatibility: string[];
  createdAt: Date;
}

const PartSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Used'], required: true },
  price: { type: Number },
  description: { type: String },
  images: [{ type: String }],
  inStock: { type: Boolean, default: true },
  vehicleCompatibility: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPart>('Part', PartSchema);

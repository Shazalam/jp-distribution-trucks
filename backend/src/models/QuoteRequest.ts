import mongoose, { Schema, Document } from 'mongoose';

export interface IQuoteRequest extends Document {
  name: string;
  email: string;
  phone: string;
  companyName?: string;
  type: 'General' | 'Wholesale' | 'Retail' | 'SpecialPart';
  details: string;
  status: 'Requested' | 'Quoted' | 'Confirmed' | 'Packed' | 'Shipped' | 'Delivered';
  truckId?: mongoose.Types.ObjectId;
  partId?: mongoose.Types.ObjectId;
  createdAt: Date;
}

const QuoteRequestSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  companyName: { type: String },
  type: { type: String, enum: ['General', 'Wholesale', 'Retail', 'SpecialPart'], default: 'General' },
  details: { type: String, required: true },
  status: { type: String, enum: ['Requested', 'Quoted', 'Confirmed', 'Packed', 'Shipped', 'Delivered'], default: 'Requested' },
  truckId: { type: Schema.Types.ObjectId, ref: 'Truck' },
  partId: { type: Schema.Types.ObjectId, ref: 'Part' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQuoteRequest>('QuoteRequest', QuoteRequestSchema);

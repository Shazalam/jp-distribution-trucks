import mongoose, { Schema, Document } from 'mongoose';

export interface IPageSection {
  id: string;
  name: string;
  type: string;
  enabled: boolean;
  config: Record<string, any>;
  selectedTruckIds: string[];
}

export interface IPageConfig extends Document {
  pageId: string; // e.g., 'trucks', 'home', 'custom-builds'
  sections: IPageSection[];
  lastEditedBy?: mongoose.Types.ObjectId;
  updatedAt: Date;
}

const PageSectionSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, required: true },
  enabled: { type: Boolean, default: true },
  config: { type: Schema.Types.Mixed, default: {} },
  selectedTruckIds: [{ type: String }] // Storing IDs as strings since they map to Truck _ids or CustomBuild _ids
});

const PageConfigSchema = new Schema({
  pageId: { type: String, required: true, unique: true },
  sections: [PageSectionSchema],
  lastEditedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPageConfig>('PageConfig', PageConfigSchema);

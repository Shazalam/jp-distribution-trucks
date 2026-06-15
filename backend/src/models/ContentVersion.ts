import mongoose, { Schema, Document } from 'mongoose';

export interface IContentVersion extends Document {
  entityId: mongoose.Types.ObjectId;
  entityModel: string; // e.g., 'Truck', 'CustomBuild'
  snapshotData: any; // The complete state of the document at this version
  changedBy: mongoose.Types.ObjectId; // User ID of the admin
  changeNotes?: string;
  createdAt: Date;
}

const ContentVersionSchema: Schema = new Schema({
  entityId: { type: Schema.Types.ObjectId, required: true, index: true },
  entityModel: { type: String, required: true, index: true },
  snapshotData: { type: Schema.Types.Mixed, required: true },
  changedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  changeNotes: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IContentVersion>('ContentVersion', ContentVersionSchema);

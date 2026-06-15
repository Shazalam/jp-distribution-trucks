import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'PUBLISH' | 'UNPUBLISH' | 'ARCHIVE' | 'REVERT' | 'LOGIN' | 'MEDIA_UPLOAD';
  entityType: string; // e.g., 'Truck', 'CustomBuild', 'System'
  entityId?: mongoose.Types.ObjectId;
  oldValue?: any;
  newValue?: any;
  adminId: mongoose.Types.ObjectId;
  ipAddress?: string;
  details?: string;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema({
  action: { type: String, required: true },
  entityType: { type: String, required: true },
  entityId: { type: Schema.Types.ObjectId },
  oldValue: { type: Schema.Types.Mixed },
  newValue: { type: Schema.Types.Mixed },
  adminId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ipAddress: { type: String },
  details: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);

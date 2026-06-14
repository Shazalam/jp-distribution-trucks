import mongoose, { Schema, Document, Model } from "mongoose";

export interface ILead extends Document {
  requestId: string;
  formType: string;
  leadTitle: string;
  status: string;
  priority: string;
  isDuplicate: boolean;
  duplicateReason?: string;
  
  // Source Tracking
  sourcePage?: string;
  sourceSection?: string;
  sourceCard?: string;
  selectedVehicle?: string;
  selectedPart?: string;
  selectedBuild?: string;
  selectedProduct?: string;
  clickedButton?: string;
  currentUrl?: string;
  referrerUrl?: string;
  userDevice?: string;
  userBrowser?: string;
  userIp?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;

  // Customer Fields
  customerName: string;
  email: string;
  phone: string;
  country?: string;
  city?: string;
  companyName?: string;
  customerType?: string;

  // Request Details
  message?: string;
  requestDetails?: any;
  quantity?: number;
  preferredModel?: string;
  vehicleYear?: string;
  partNumber?: string;
  usageType?: string;
  budgetRange?: string;
  timeline?: string;
  shippingRequirement?: string;

  // Admin / CRM Fields
  assignedTo?: string;
  internalNotes?: string;
  lastContactedAt?: Date;
  nextFollowUpDate?: Date;
  followUpHistory?: any[];
  statusHistory?: any[];
  tags?: string[];
  
  createdAt: Date;
  updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
  {
    requestId: { type: String, required: true, unique: true },
    formType: { type: String, required: true },
    leadTitle: { type: String, required: true },
    status: { 
      type: String, 
      enum: ["New", "Viewed", "Contacted", "Quoted", "Quote Sent", "Follow-up", "Won", "Lost", "Closed"], 
      default: "New" 
    },
    priority: { 
      type: String, 
      enum: ["Normal", "Urgent", "Bulk Order", "Wholesale", "Custom Build", "Parts Request", "Commercial Vehicle", "High Value Lead"],
      default: "Normal"
    },
    isDuplicate: { type: Boolean, default: false },
    duplicateReason: { type: String },

    // Source Tracking
    sourcePage: { type: String },
    sourceSection: { type: String },
    sourceCard: { type: String },
    selectedVehicle: { type: String },
    selectedPart: { type: String },
    selectedBuild: { type: String },
    selectedProduct: { type: String },
    clickedButton: { type: String },
    currentUrl: { type: String },
    referrerUrl: { type: String },
    userDevice: { type: String },
    userBrowser: { type: String },
    userIp: { type: String },
    utmSource: { type: String },
    utmMedium: { type: String },
    utmCampaign: { type: String },

    // Customer
    customerName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    country: { type: String },
    city: { type: String },
    companyName: { type: String },
    customerType: { type: String },

    // Details
    message: { type: String },
    requestDetails: { type: Schema.Types.Mixed },
    quantity: { type: Number },
    preferredModel: { type: String },
    vehicleYear: { type: String },
    partNumber: { type: String },
    usageType: { type: String },
    budgetRange: { type: String },
    timeline: { type: String },
    shippingRequirement: { type: String },

    // CRM
    assignedTo: { type: String },
    internalNotes: { type: String },
    lastContactedAt: { type: Date },
    nextFollowUpDate: { type: Date },
    followUpHistory: [{ 
      date: { type: Date, default: Date.now },
      note: String,
      addedBy: String
    }],
    statusHistory: [{
      status: String,
      date: { type: Date, default: Date.now },
      note: String,
      changedBy: String
    }],
    tags: [{ type: String }]
  },
  { timestamps: true }
);

export const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>("Lead", LeadSchema);

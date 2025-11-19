// src/models/ItemReport.ts
import mongoose, { Document, Schema } from 'mongoose';

// Interface
export interface IItemReport extends Document {
  type: 'LOST' | 'FOUND';
  title: string;
  description: string;
  category: string;
  location: string;
  date: Date;
  imageUrl: string; // Path gambar yang diupload
  status: 'ACTIVE' | 'RESOLVED';
  user: mongoose.Schema.Types.ObjectId; // Relasi ke User
}

// Schema
const ItemReportSchema: Schema = new Schema({
  type: { 
    type: String, 
    enum: ['LOST', 'FOUND'], 
    required: true 
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  imageUrl: { type: String, required: true }, // Wajib ada foto
  status: { 
    type: String, 
    enum: ['ACTIVE', 'RESOLVED'], 
    default: 'ACTIVE' 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, {
  timestamps: true
});

export default mongoose.model<IItemReport>('ItemReport', ItemReportSchema);
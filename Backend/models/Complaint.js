import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['pending', 'assigned', 'resolved'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // Admin assigned
}, { timestamps: true });

const Complaint = mongoose.model('Complaint', complaintSchema);
export default Complaint;

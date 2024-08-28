import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  changes: {
    title: { type: String },
    description: { type: String },
    price: { type: Number },
    image: { type: String },
  },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);

import { connectToDatabase } from '@/lib/dbConnect';
import Review from '@/models/Review';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const reviews = await Review.find().populate('product').populate('author');
    return res.status(200).json(reviews);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

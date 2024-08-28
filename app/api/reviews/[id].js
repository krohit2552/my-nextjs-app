import { connectToDatabase } from '@/lib/dbConnect';
import Review from '@/models/Review';
import Product from '@/models/Product';

export default async function handler(req, res) {
  const { id } = req.query;

  await connectToDatabase();

  if (req.method === 'PATCH') {
    const { status, adminId } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.status = status;
    review.admin = adminId;

    if (status === 'approved') {
      const product = await Product.findById(review.product);
      Object.assign(product, review.changes);
      await product.save();
    }

    await review.save();
    return res.status(200).json(review);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

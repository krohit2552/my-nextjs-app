import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  
  const token = req.headers.authorization.split(' ')[1];
  const user = verifyToken(token);
  
  if (req.method === 'POST' && user.role === 'team member') {
    const { title, description, price, image } = req.body;
    const review = new Review({
      product: id,
      changes: { title, description, price, image },
      author: user.id,
    });
    await review.save();
    res.status(201).json(review);
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

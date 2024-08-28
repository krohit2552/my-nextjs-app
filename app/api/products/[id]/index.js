import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import { verifyToken } from '@/lib/auth';

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();
  
  const token = req.headers.authorization.split(' ')[1];
  const user = verifyToken(token);

  if (req.method === 'GET') {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } else if (req.method === 'PUT' && user.role === 'admin') {
    const { title, description, price, image } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(id, { title, description, price, image }, { new: true });
    res.status(200).json(updatedProduct);
  } else {
    res.status(403).json({ message: 'Forbidden' });
  }
}

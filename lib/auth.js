import { getSession } from 'next-auth/react';

export const requireAuth = async (req, res, next) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  req.user = session.user;
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

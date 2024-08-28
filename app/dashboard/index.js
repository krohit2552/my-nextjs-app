import { useEffect, useState } from 'react';
import axios from 'axios';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const session = await getSession();
      setUser(session.user);
      const { data } = await axios.get('/api/products', {
        headers: { Authorization: `Bearer ${session.jwt}` },
      });
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{user?.role === 'admin' ? 'Admin' : 'Team Member'} Dashboard</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link href={`/dashboard/${product._id}`}>
              {product.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;

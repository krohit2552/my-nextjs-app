import { useState } from 'react';
import { signIn } from 'next-auth/react';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await signIn('credentials', { email, password });
    } else {
      await axios.post('/api/user', { email, password, role: 'team member' });
      await signIn('credentials', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="block w-full p-2 border rounded-md"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md"
      >
        {isLogin ? 'Login' : 'Register'}
      </button>
    </form>
  );
};

export default AuthForm;

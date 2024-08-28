import { useState } from 'react';
import axios from 'axios';
import { signIn } from 'next-auth/react';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('team member');

  const handleRegister = async (e) => {
    e.preventDefault();
    await axios.post('/api/user', { email, password, role });
    signIn('credentials', { email, password });
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="team member">Team Member</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;

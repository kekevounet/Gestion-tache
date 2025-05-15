import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      login(user);
      navigate('/');
    } else {
      alert('Identifiants invalides');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Connexion</h1>
      <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} className="mb-2 p-2 border" />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="mb-2 p-2 border" />
      <button onClick={handleLogin} className="bg-blue-600 text-white p-2">Se connecter</button>
    </div>
  );
}
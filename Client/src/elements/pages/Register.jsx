import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.username === username)) {
      alert("Nom d'utilisateur déjà utilisé");
      return;
    }
    const newUser = { id: Date.now(), username, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert("Compte créé avec succès !");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-2xl mb-4">Créer un compte</h1>
      <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={e => setUsername(e.target.value)} className="mb-2 p-2 border" />
      <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="mb-2 p-2 border" />
      <button onClick={handleRegister} className="bg-green-600 text-white p-2">S'inscrire</button>
    </div>
  );
}
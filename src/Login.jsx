import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6">
      <div className="bg-white rounded-[2rem] shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="RGC Logo" className="h-20 w-auto mx-auto mb-4" />
          <h1 className="text-3xl font-black text-red-700 uppercase tracking-tight">Admin Panel</h1>
          <p className="text-gray-500 mt-2 text-sm">Redeemed Gospel Church Mwihoko 2</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Email</label>
            <input
              type="email"
              placeholder="pastor@rgcmwihoko2.com"
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-4 bg-gray-50 border-2 border-transparent rounded-xl focus:border-red-600 outline-none transition duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm font-medium text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white font-black py-4 rounded-xl hover:bg-red-800 transition duration-300 shadow-lg uppercase tracking-widest disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
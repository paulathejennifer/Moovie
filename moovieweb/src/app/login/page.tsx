'use client';
import React, { useState } from 'react';
import Footer from '../shared-component/Footer';
import NavBar from '../shared-component/NavBar';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password');
      return;
    }
    setError(null);
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="bg-gray-950 min-h-screen w-full font-sans text-white flex flex-col">
      <NavBar onSearch={() => {}} />
      <main className="flex-grow flex items-center justify-center px-4 sm:px-8 lg:px-12">
        <div className="max-w-md w-full bg-gray-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-yellow-400 text-center">Sign In</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-yellow-400 text-white"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-yellow-400 text-white"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="px-4 py-3 rounded-lg bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;

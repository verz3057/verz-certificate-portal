import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Home = () => {
  const [rollNumber, setRollNumber] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (rollNumber.trim()) {
      navigate(`/verify?rollNumber=${encodeURIComponent(rollNumber.trim())}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-verz-black text-verz-white">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center w-full px-4 text-center">
        <div className="max-w-2xl w-full">
          <div className="flex justify-center mb-6">
            <ShieldCheck size={64} className="text-verz-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
            Certificate Verification
          </h1>

          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="Enter Roll Number"
                className="w-full pl-12 pr-4 py-4 bg-verz-gray/20 border border-gray-700 rounded-lg focus:outline-none focus:border-verz-gold text-white text-lg transition-all"
                required
              />
            </div>
            <button 
              type="submit"
              className="py-4 px-8 bg-verz-gold text-verz-black font-bold rounded-lg hover:bg-yellow-500 transition-all"
            >
              Verify
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

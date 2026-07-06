import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="w-full bg-verz-black border-t border-gray-800 text-verz-white z-10 mt-auto py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="flex flex-col items-start gap-4">
          {/* Placeholder for Attached VERZ logo */}
          <div className="w-16 h-16 bg-verz-gold text-verz-black flex items-center justify-center font-bold text-3xl rounded shadow-[0_0_15px_rgba(212,175,55,0.4)]">
            V
          </div>
          <p className="text-gray-400 max-w-sm mt-2">
            The official certificate verification portal. Providing trustworthy and secure validation for all VERZ issued credentials.
          </p>
        </div>
        
        <div className="flex flex-col md:items-end">
          <h3 className="text-verz-gold font-bold text-lg mb-4">Quick Links</h3>
          <div className="flex flex-col space-y-2 text-gray-300 md:text-right">
            <Link to="/" className="hover:text-verz-gold transition">Home</Link>
            <Link to="#" className="hover:text-verz-gold transition">About</Link>
            <Link to="#" className="hover:text-verz-gold transition">Courses</Link>
            <Link to="/verify" className="hover:text-verz-gold transition">Certificate Verification</Link>
            <Link to="#" className="hover:text-verz-gold transition">Contact</Link>
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500 text-sm mt-12 pt-8 border-t border-gray-800">
        &copy; 2026 VERZ. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;

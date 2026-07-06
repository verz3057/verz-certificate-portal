import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="w-full p-6 flex justify-between items-center z-10 bg-verz-black shadow-lg">
      <div className="flex items-center gap-4">
        {/* Placeholder for Attached VERZ logo */}
        <div className="w-12 h-12 bg-verz-gold text-verz-black flex items-center justify-center font-bold text-xl rounded shadow-[0_0_15px_rgba(212,175,55,0.4)]">
          V
        </div>
        <div className="text-xl md:text-2xl font-bold tracking-wide text-verz-white hidden sm:block">
          VERZ <span className="text-verz-gold text-lg block sm:inline font-normal tracking-normal">Certificate Verification Portal</span>
        </div>
      </div>
      
      <nav className="hidden lg:flex items-center gap-8 text-verz-white font-medium">
        <Link to="/" className="hover:text-verz-gold transition">Home</Link>
        <Link to="#" className="hover:text-verz-gold transition">About</Link>
        <Link to="#" className="hover:text-verz-gold transition">Courses</Link>
        <Link to="/verify" className="hover:text-verz-gold transition text-verz-gold">Certificate Verification</Link>
        <Link to="#" className="hover:text-verz-gold transition">Contact</Link>
      </nav>

      {/* Mobile Menu Button - simple for now */}
      <div className="lg:hidden text-verz-gold font-bold">Menu</div>
    </header>
  );
};

export default Navbar;

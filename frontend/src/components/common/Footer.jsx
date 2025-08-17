import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <ShieldCheckIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                ToxiGuard <span className="text-yellow-400">AI</span>
              </span>
            </div>
            <p className="text-white/70 text-sm mb-4 max-w-md">
              Advanced AI-powered toxic speech detection system for safer digital communities. 
              Protect your platforms with cutting-edge machine learning technology.
            </p>
            <div className="flex items-center text-white/60 text-sm">
              <span>Made with</span>
              <HeartIcon className="w-4 h-4 mx-1 text-red-400" />
              <span>for safer communities</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Analyzer
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-white/70 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" className="text-white/70 hover:text-white transition-colors">
                  History
                </Link>
              </li>
              {/* <li>
                <Link to="/api" className="text-white/70 hover:text-white transition-colors">
                  API Docs
                </Link>
              </li> */}
            </ul>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;

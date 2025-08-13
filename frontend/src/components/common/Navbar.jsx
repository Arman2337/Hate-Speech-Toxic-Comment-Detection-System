// import React, { useState } from 'react'
// import { Link, useLocation, useNavigate } from 'react-router-dom'
// import { FiShield, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi'
// import { useAuth } from '../../hooks/useAuth'
// import Button from '../ui/Button'
// import Modal from './Modal'

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
//   const { user, isAuthenticated, logout } = useAuth()
//   const location = useLocation()
//   const navigate = useNavigate()

//   const navigation = [
//     { name: 'Home', href: '/' },
//     { name: 'Dashboard', href: '/dashboard' },
//     { name: 'History', href: '/history' },
//     { name: 'Batch Process', href: '/batch-process' },
//     { name: 'API Docs', href: '/api-docs' },
//   ]

//   const isActive = (path) => location.pathname === path

//   const handleLogout = () => {
//     logout()
//     navigate('/')
//   }

//   return (
//     <header className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/20">
//       <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <Link to="/" className="flex items-center space-x-2 group">
//             <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors">
//               <FiShield className="w-6 h-6 text-white" />
//             </div>
//             <span className="text-xl font-bold text-white">ToxiGuard AI</span>
//           </Link>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-1">
//             {navigation.map((item) => {
//               if (!isAuthenticated && item.href !== '/') return null
//               return (
//                 <Link
//                   key={item.name}
//                   to={item.href}
//                   className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
//                     isActive(item.href)
//                       ? 'bg-white/20 text-white'
//                       : 'text-white/80 hover:bg-white/10 hover:text-white'
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               )
//             })}
//           </div>

//           {/* User Menu / Auth Buttons */}
//           <div className="flex items-center space-x-4">
//             {isAuthenticated ? (
//               <div className="relative">
//                 <button
//                   onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
//                   className="flex items-center space-x-2 bg-white/10 rounded-full px-3 py-1 hover:bg-white/20 transition-colors"
//                 >
//                   <FiUser className="w-4 h-4 text-white/80" />
//                   <span className="text-sm text-white/80 hidden sm:block">{user?.name}</span>
//                 </button>

//                 {isUserMenuOpen && (
//                   <div className="absolute right-0 mt-2 w-48 glass-card rounded-lg shadow-lg">
//                     <div className="py-1">
//                       <Link
//                         to="/settings"
//                         className="flex items-center px-4 py-2 text-sm text-white/80 hover:bg-white/10"
//                         onClick={() => setIsUserMenuOpen(false)}
//                       >
//                         <FiSettings className="w-4 h-4 mr-3" />
//                         Settings
//                       </Link>
//                       <button
//                         onClick={handleLogout}
//                         className="flex items-center w-full px-4 py-2 text-sm text-white/80 hover:bg-white/10"
//                       >
//                         <FiLogOut className="w-4 h-4 mr-3" />
//                         Logout
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <Link to="/login">
//                   <Button variant="ghost" className="text-white/80 hover:text-white">
//                     Login
//                   </Button>
//                 </Link>
//                 <Link to="/register">
//                   <Button className="bg-blue-600 hover:bg-blue-700 text-white">
//                     Sign Up
//                   </Button>
//                 </Link>
//               </div>
//             )}

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 text-white/80 hover:text-white"
//             >
//               {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden">
//             <div className="px-2 pt-2 pb-3 space-y-1 glass-card rounded-lg mt-2 mb-4">
//               {navigation.map((item) => {
//                 if (!isAuthenticated && item.href !== '/') return null
//                 return (
//                   <Link
//                     key={item.name}
//                     to={item.href}
//                     className={`block px-3 py-2 rounded-md text-base font-medium ${
//                       isActive(item.href)
//                         ? 'bg-white/20 text-white'
//                         : 'text-white/80 hover:bg-white/10 hover:text-white'
//                     }`}
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 )
//               })}
//             </div>
//           </div>
//         )}
//       </nav>
//     </header>
//   )
// }

// export default Navbar


// src/components/common/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ChartBarIcon, 
  ClockIcon, 
  DocumentDuplicateIcon, 
  CodeBracketIcon, 
  CogIcon, 
  Bars3Icon, 
  XMarkIcon,
  UserCircleIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Analyzer', href: '/', icon: ShieldCheckIcon },
    { name: 'Dashboard', href: '/dashboard', icon: ChartBarIcon },
    { name: 'History', href: '/history', icon: ClockIcon },
    // { name: 'Batch Process', href: '/batch', icon: DocumentDuplicateIcon },
    // { name: 'API', href: '/api', icon: CodeBracketIcon },
    // { name: 'Settings', href: '/settings', icon: CogIcon },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
            : 'bg-white/10 backdrop-blur-md'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="hidden sm:block">
                <span className={`text-xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                  ToxiGuard{' '}
                  <span className="text-yellow-500">AI</span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? isScrolled
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-white/20 text-white'
                        : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-white/90 hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                    {isActive(item.href) && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-blue-500/20 rounded-lg"
                        initial={false}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* User Profile & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div className={`hidden sm:flex items-center space-x-2 px-3 py-2 rounded-lg ${
                isScrolled ? 'bg-gray-100' : 'bg-white/10'
              }`}>
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">JD</span>
                </div>
                <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-white'}`}>
                  John Doe
                </span>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-colors ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {isMobileMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/95 backdrop-blur-lg border-t border-gray-200"
            >
              <div className="px-4 py-2 space-y-1">
                {/* Mobile User Profile */}
                <div className="flex items-center space-x-3 px-3 py-3 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JD</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">John Doe</div>
                    <div className="text-sm text-gray-500">john.doe@example.com</div>
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.href)
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* Mobile Auth Links */}
                <div className="border-t border-gray-200 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-3 py-3 rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    <UserCircleIcon className="w-5 h-5" />
                    <span>Login</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FiHome, 
  FiBarChart3, 
  FiClock, 
  FiLayers, 
  FiBook, 
  FiSettings,
  FiActivity
} from 'react-icons/fi'

const Sidebar = () => {
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: FiBarChart3 },
    { name: 'Analyze', href: '/', icon: FiActivity },
    { name: 'History', href: '/history', icon: FiClock },
    { name: 'Batch Process', href: '/batch-process', icon: FiLayers },
    { name: 'API Docs', href: '/api-docs', icon: FiBook },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16">
      <div className="flex-1 flex flex-col min-h-0 glass-card border-r border-white/20 m-4 rounded-2xl">
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    isActive(item.href) ? 'text-white' : 'text-white/70'
                  }`}
                />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}

export default Sidebar

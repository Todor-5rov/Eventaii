'use client'

import { useState } from 'react'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gradient">Eventai</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-gray-700 hover:text-primary-600 transition-colors">
              How It Works
            </a>
            <a href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#for-organizers" className="text-gray-700 hover:text-primary-600 transition-colors">
              For Organizers
            </a>
            <a href="#for-vendors" className="text-gray-700 hover:text-primary-600 transition-colors">
              For Vendors
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/signin">
              <button className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors">
                Sign In
              </button>
            </a>
            <a href="/register-organizer">
              <button className="px-6 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg hover:shadow-lg transition-all">
                Get Started
              </button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a href="#how-it-works" className="block py-2 text-gray-700 hover:text-primary-600">
              How It Works
            </a>
            <a href="#features" className="block py-2 text-gray-700 hover:text-primary-600">
              Features
            </a>
            <a href="#for-organizers" className="block py-2 text-gray-700 hover:text-primary-600">
              For Organizers
            </a>
            <a href="#for-vendors" className="block py-2 text-gray-700 hover:text-primary-600">
              For Vendors
            </a>
            <div className="pt-4 space-y-2">
              <a href="/signin" className="block">
                <button className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Sign In
                </button>
              </a>
              <a href="/register-organizer" className="block">
                <button className="w-full px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg">
                  Get Started
                </button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}


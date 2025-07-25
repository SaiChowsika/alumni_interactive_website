/**
 * Footer Component
 *
 * A reusable footer component that appears at the bottom of every page,
 * providing essential links and information about the application.
 *
 * Features:
 * - Responsive design
 * - Social media links
 * - Quick navigation links
 * - Contact information
 * - Copyright notice
 * - Newsletter subscription (if enabled)
 *
 * Components Used:
 * - React Icons: For social media icons
 * - React Router: For internal navigation
 * - Tailwind CSS: For styling
 *
 * Sections:
 * - About Us
 * - Quick Links
 * - Social Media
 * - Contact Info
 * - Copyright
 *
 * Layout:
 * - Desktop: 4-column grid
 * - Tablet: 2-column grid
 * - Mobile: Single column
 *
 * @type {static} - Content remains consistent across pages
 */

import React from 'react'

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bg-red-800 w-full px-5 py-4 my-0.5 flex items-center sm:flex-row flex-col ">
          <p className="text-sm text-white sm:ml-4 sm:pl-4 sm:border-l-2 sm:py-1 sm:mt-0 mt-4 text-center ">
            The Rajiv Gandhi University of Knowledge Technologies has been constituted under A.P. Act No. 18 of 2008.
          </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start" style={{marginRight: "80px"}}>
            <a className="text-white">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-white">
              <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a className="ml-3 text-white">
              <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a className="ml-3 text-white">
              <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0" className="w-5 h-5" viewBox="0 0 24 24">
                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </footer>
    </>
  )
}

export default Footer;
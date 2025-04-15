/**
 * Landing Page Component
 * 
 * The main entry point of the application showcasing key features
 * and providing access to different user roles.
 * 
 * Features:
 * - Hero section
 * - Feature highlights
 * - Role-based navigation
 * - Quick access links
 * 
 * Sections:
 * 1. Hero Section
 *    - Welcome message
 *    - Call to action
 *    - Background animation
 *    - Quick links
 * 
 * 2. Features Overview
 *    - Mentorship program
 *    - Knowledge sharing
 *    - Career guidance
 *    - Alumni network
 * 
 * 3. Role-based Content
 *    - Student resources
 *    - Alumni opportunities
 *    - Faculty portal
 *    - Admin access
 * 
 * 4. Information Sections
 *    - About RGUKT
 *    - Success stories
 *    - Latest updates
 *    - Contact info
 * 
 * Interactive Elements:
 * - Sign up buttons
 * - Feature cards
 * - Testimonial slider
 * - Contact forms
 * 
 * Responsive Design:
 * - Mobile optimization
 * - Tablet layouts
 * - Desktop views
 * - Dynamic content
 * 
 * Dependencies:
 * - Navigation components
 * - Authentication context
 * - Image assets
 * - Animation libraries
 * 
 * @component LandingPage
 * @example
 * ```jsx
 * <LandingPage 
 *   featuredContent={content}
 *   announcements={latest}
 * />
 * ```
 */

import React from 'react'
import Header  from '../components/Header';
import LandingPageNavbar from '../components/LandingPageNavbar'
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import PlacementsProgres from '../components/PlacementsProgres';
const LandingPage = () => {
  return (
    <>
        <Header />
        <LandingPageNavbar />
        <div className="flex flex-col md:flex-row  ">
            {/* Carousel - Full width on small screens, fixed width on large screens */}
            <div className="w-full md:min-w-[full] md:flex-1">
                <Carousel />
            </div>
            {/* PlacementsProgress - Takes remaining space on large screens */}
            <div className="lg:w-[450px]  mt-4 md:mt-0">
                <PlacementsProgres />
            </div>
        </div>
        <div className='m-1 p-2 border border-gray-400 rounded-2xl text-md '>
          <h2 className='font-bold mx-2 '></h2>
        This platform is designed to bridge the gap between RGUKT alumni and current students, fostering meaningful connections and opportunities. Alumni can conduct sessions, share job and internship openings, and guide students through their professional journeys. Faculty members oversee and approve these initiatives to ensure alignment with institutional goals. Students gain access to approved events, opportunities, and mentorship, empowering them to grow academically and professionally. Together, we build a stronger RGUKT community, where knowledge, experience, and collaboration thrive. Join us in shaping the future of RGUKT students!
        </div>
        <Footer />
    </>
  )
}

export default LandingPage;
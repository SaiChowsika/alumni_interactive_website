import React from 'react';
import Header from '../components/Header';
import MainNavbar from '../components/MainNavbar';
import Carousel from '../components/Carousel';
import PlacementsProgres from '../components/PlacementsProgres';
import Blogs from '../components/Blogs';
import RequestSession from '../components/RequestSession';
import Footer from '../components/Footer';
const AlumniPage = () => {
  return (
    <>
        <Header />
        <MainNavbar />
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
        <Blogs />
        <RequestSession />
        <Footer />
    </>
  )
}

export default AlumniPage
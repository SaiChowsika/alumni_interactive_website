import React from 'react'
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import DPNMembers from '../components/DPNMembers';
import Footer from '../components/Footer';
const AboutUs = () => {
  return (
    <div className="bg-gray-50">
        <Header />
        <hr />
        <Breadcrumb />
        <div className='m-1 p-2 border-2 border-gray-200 rounded-xl text-md '>
          <h2 className='font-bold mx-2 text-lg'>About Us</h2>
          <p className='p-1  text-[16px]'>
            This platform is designed to bridge the gap between RGUKT alumni and current students, fostering meaningful connections and opportunities. Alumni can conduct sessions, share job and internship openings, and guide students through their professional journeys. Faculty members oversee and approve these initiatives to ensure alignment with institutional goals. Students gain access to approved events, opportunities, and mentorship, empowering them to grow academically and professionally. Together, we build a stronger RGUKT community, where knowledge, experience, and collaboration thrive.
          </p>
          <p className='p-1 text-[16px]'>
            The platform allows alumni to share their expertise by hosting webinars, workshops, or interactive sessions with students. They can also post job and internship opportunities to help students kickstart their careers. Additionally, alumni can offer mentorship, providing advice, career insights, and professional support to guide students. Each alumni profile showcases their professional achievements, making it easier for students and faculty to connect with them. Faculty members play a crucial role in reviewing and approving alumni requests for sessions or opportunities, ensuring they align with the institution’s objectives. They also collaborate with alumni to create impactful programs for student development and oversee the platform to maintain its effectiveness and relevance.
          </p>
          <p className='p-1 text-[16px]'>
            For students, the platform serves as a gateway to valuable resources. They can explore approved job postings, internships, and events tailored to their interests and career goals. By attending sessions conducted by alumni, students gain industry insights, career advice, and practical knowledge. After participating in events, students can share their feedback, which helps improve future initiatives. The platform also facilitates mentorship, allowing students to connect with alumni for personalized guidance and support in their academic and professional journey.
          </p>
          <p className='p-1 text-[16px]'>
            This platform is more than just a tool—it’s a community where alumni, faculty, and students come together to create a brighter future. Alumni have the opportunity to give back to their alma mater by shaping the future of RGUKT students. Faculty members can collaborate with alumni to design programs that benefit students and align with institutional goals. Students gain access to resources, mentorship, and opportunities that prepare them for success in their careers. Together, we are building a vibrant RGUKT community where knowledge, experience, and collaboration come together to create lasting impact. Join us today and be a part of this transformative journey.
          </p>
        </div>
        <DPNMembers />
        <Footer />
    </div>
  )
}

export default AboutUs
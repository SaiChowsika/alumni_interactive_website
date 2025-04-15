import React from 'react';
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import PlacementsProgres from '../components/PlacementsProgres';
import Footer from '../components/Footer';

const PlacementsPage = () => {
  return (
    <div className="bg-gray-100">
      <Header /> <hr />
      <Breadcrumb />
      {/* Flex container for About Placements and PlacementsProgres */}
      <div className="flex flex-col lg:flex-row mt-1">
        {/* About Placements section */}
        <div className="w-full lg:flex-1 pt-4 pl-4 pr-4 bg-gray-100 border-3  border-gray-200">
          <h1 className="font-bold text-xl">About Placements</h1>
          <p>
            Rajiv Gandhi University of Knowledge Technologies (RGUKT), Nuzvid, has a strong track record of placements, providing students with excellent career opportunities in top companies. The university collaborates with leading industries and organizations, ensuring students receive exposure to diverse career paths in software development, data science, cloud computing, and core engineering fields.
          </p>
          <p>
            With a rigorous academic curriculum, hands-on projects, and dedicated placement training, RGUKT Nuzvid equips students with the skills needed to excel in competitive job markets. Every year, reputed companies like TCS, Infosys, Wipro, and Capgemini, among others, visit the campus to recruit talented graduates. The placement cell actively conducts mock interviews, aptitude tests, and coding challenges to enhance students' employability.
          </p>
          <p>
            The university’s focus on industry-driven learning ensures that students are well-prepared to secure placements with competitive salary packages, setting a strong foundation for their professional careers. It also provides internship opportunities that help students gain practical experience before entering the workforce. The alumni network plays a key role in mentoring and guiding students through the placement process.
          </p>
        </div>

        {/* PlacementsProgres section */}
        <div className="w-full lg:w-[450px] mt-4 lg:mt-0 p-2">
          <PlacementsProgres />
        </div>
      </div>

      {/* Placements of each branch details */}
      <section className="p-4 lg:p-8">
        <h1 className="font-bold text-[22px] mb-3">Branch wise placements</h1>
        <div className="container mx-auto">
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img src="src/assets/cse-blog.jpg" alt="CSE" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Computer Science and Engineering</h5>
              <p className="my-6">CSE students at RGUKT Nuzvid secure placements in top IT companies specializing in Web Development, Artificial Intelligence (AI), Machine Learning (ML), Data Science, Cloud Computing, and Cybersecurity. Every year, companies like TCS, Infosys, Wipro, and Capgemini recruit a significant number of graduates. Many students also get placed in startups and product-based companies working on cutting-edge technologies. A few students opt for higher studies in top universities in India and abroad to specialize in advanced computing fields.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <img src="src/assets/ece-blog.jpeg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Electronics and Communication Engineering</h5>
              <p className="my-6">ECE graduates have strong placement opportunities in VLSI Design, Embedded Systems, Signal Processing, and Telecommunication. Leading companies such as Intel, Qualcomm, Texas Instruments, and TCS visit the campus for recruitment. Some students take up roles in software development due to their programming expertise, while others explore careers in robotics and IoT-based industries. A portion of students pursue higher studies (M.Tech/MS) in reputed institutes like IITs and NITs to specialize in advanced electronics.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img src="src/assets/eee-blog.jpg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Electrical and Electronics Engineering</h5>
              <p className="my-6">EEE students at RGUKT Nuzvid find placements in Power Systems, Electrical Design, Automation, and Renewable Energy sectors. Companies like Siemens, ABB, Schneider Electric, and Tata Power recruit graduates for core electrical roles. Some students enter the software industry, leveraging their programming skills. A few students qualify for Public Sector Undertakings (PSUs) like NTPC, BHEL, and ONGC through competitive exams. Many opt for higher studies in power electronics and automation.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <img src="src/assets/civil-blog.jpg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">CIVIL Engineering</h5>
              <p className="my-6">Civil Engineering graduates have excellent career opportunities in Structural Engineering, Construction Management, Transportation, and Geotechnical Engineering. L&T, Tata Projects, and GMR Group are among the major recruiters. Many students secure jobs in government departments and PSUs like CPWD, PWD, and NHAI after clearing competitive exams. Some graduates become entrepreneurs in construction and real estate, while others pursue higher studies in IITs and NITs to specialize in smart city planning and sustainable infrastructure.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img src="src/assets/mech-blog.jpg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Mechanical Engineering</h5>
              <p className="my-6">Mechanical Engineering students secure placements in Automobile, Manufacturing, Robotics, and Thermal Engineering sectors. Companies like Tata Motors, Mahindra, Ashok Leyland, and Bajaj Auto regularly recruit from the campus. A few students opt for roles in product design and CAD/CAM industries, while others enter aerospace and defense technology. Many graduates aim for PSU jobs in organizations like BHEL, GAIL, and ISRO. Higher studies in mechanical design and automation are also a preferred choice.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
            <img src="src/assets/chem-blog.jpg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Chemical Engineering</h5>
              <p className="my-6">Chemical Engineering graduates find placements in Petroleum, Process Design, Environmental Engineering, and Pharmaceuticals. Companies like ONGC, Reliance Industries, Indian Oil, and Dr. Reddy’s Laboratories recruit chemical engineers from RGUKT Nuzvid. Some students get opportunities in biotechnology and nanotechnology-based startups. A considerable number of students clear GATE to secure M.Tech admissions in IITs/NITs or PSU jobs in refineries and research institutes.</p>
            </div>
          </div>
          <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
            <img src="src/assets/mme-blog.jpg" alt="" className="h-60 aspect-video" />
            <div className="flex flex-col justify-center flex-1 p-6">
              <h5 className="text-xl font-bold">Metallurgical and Materials Engineering</h5>
              <p className="my-6">MME graduates have career opportunities in Steel, Mining, Aerospace, and Materials Science industries. Companies like JSW Steel, Tata Steel, Hindalco, and BARC offer placements for core metallurgical roles. Some students take up positions in welding and quality control sectors. A few opt for higher studies in material science, nanotechnology, and composite materials. Many students aim for PSU jobs in SAIL, NMDC, and IOCL, while others explore research opportunities in IITs and IISc.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PlacementsPage;
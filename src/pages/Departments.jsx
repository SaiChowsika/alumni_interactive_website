import React from 'react'
import Header from '../components/Header';
import Breadcrumb from '../components/Breadcrumb';
import DepartmentMembers from '../components/DepartmentMembers';
import Footer from '../components/Footer';
const Departments = () => {
  return (
    <div>
        <Header /> 
        <hr />
        <Breadcrumb />
        <DepartmentMembers />
        <Footer />
    </div>
  )
}

export default Departments
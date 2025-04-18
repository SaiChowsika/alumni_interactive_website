import { dummyStudents, dummyFaculty, dummyAdmins, dummyAlumni } from '../UsersData/dummyData';

// Validate student data
export const validateStudentData = async (email, studentId) => {
  try {
    const student = dummyStudents.find(s => s.Email === email && s.Id === studentId);
    
    if (!student) {
      throw new Error('Invalid student credentials. Please check your email and student ID.');
    }
    
    return { isValid: true, data: student };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

// Validate faculty data
export const validateFacultyData = async (email) => {
  try {
    const facultyMember = dummyFaculty.find(f => f.Email === email);
    
    if (!facultyMember) {
      throw new Error('Invalid faculty email. Please use your registered faculty email.');
    }
    
    return { isValid: true, data: facultyMember };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

// Validate admin data
export const validateAdminData = async (email) => {
  try {
    const admin = dummyAdmins.find(a => a.Email === email);
    
    if (!admin) {
      throw new Error('Invalid admin email. Please use your registered admin email.');
    }
    
    return { isValid: true, data: admin };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
};

// Validate alumni data
export const validateAlumniData = async (email) => {
  try {
    const alumnus = dummyAlumni.find(a => a.Email === email);
    
    if (!alumnus) {
      throw new Error('Invalid alumni email. Please use your registered alumni email.');
    }
    
    return { isValid: true, data: alumnus };
  } catch (error) {
    return { isValid: false, error: error.message };
  }
}; 
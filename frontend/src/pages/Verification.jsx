import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Verification = () => {
  const [searchParams] = useSearchParams();
  const rollNumber = searchParams.get('rollNumber');
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('loading'); // loading, verified, invalid
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!rollNumber) {
      setStatus('invalid');
      return;
    }

    const verifyCert = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify/${rollNumber}`);
        setStudent(response.data);
        setStatus('verified');
      } catch (err) {
        setStatus('invalid');
      }
    };

    verifyCert();
  }, [rollNumber]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 flex flex-col items-center justify-center p-6 w-full relative">
        <button 
          onClick={() => navigate('/')}
          className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={20} /> Back to Search
        </button>

        <div className="w-full max-w-2xl mt-12 md:mt-0">
          {status === 'loading' && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verz-gold"></div>
            </div>
          )}

          {status === 'verified' && student && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-green-200">
              <div className="bg-green-500 text-white p-6 text-center">
                <h2 className="text-3xl font-bold">VERIFIED ✅</h2>
              </div>
              
              <div className="p-8">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    <tr className="border-b">
                      <th className="py-3 text-gray-500 font-medium">Student Name</th>
                      <td className="py-3 font-bold text-gray-800">{student.student_name}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-3 text-gray-500 font-medium">Father Name</th>
                      <td className="py-3 font-bold text-gray-800">{student.father_name}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-3 text-gray-500 font-medium">Roll Number</th>
                      <td className="py-3 font-bold text-gray-800">{student.roll_number}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-3 text-gray-500 font-medium">College Name</th>
                      <td className="py-3 font-bold text-gray-800">{student.college_name}</td>
                    </tr>
                    <tr className="border-b">
                      <th className="py-3 text-gray-500 font-medium">Course Name</th>
                      <td className="py-3 font-bold text-gray-800">{student.course_name}</td>
                    </tr>
                    <tr>
                      <th className="py-3 text-gray-500 font-medium">Certificate Status</th>
                      <td className="py-3 font-bold text-green-600">{student.certificate_status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {status === 'invalid' && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-200">
              <div className="bg-red-500 text-white p-6 text-center">
                <h2 className="text-3xl font-bold">INVALID CERTIFICATE ❌</h2>
              </div>
              <div className="p-10 text-center">
                <p className="text-xl text-gray-700">
                  This Roll Number is not found in our database.
                </p>
                <button 
                  onClick={() => navigate('/')}
                  className="mt-8 px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
                >
                  Search Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Verification;

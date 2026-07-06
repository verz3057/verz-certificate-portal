import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axiosSetup';
import { LayoutDashboard, UserPlus, Users, LogOut, Edit, Trash2 } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    roll_number: '',
    student_name: '',
    father_name: '',
    college_name: '',
    course_name: '',
    certificate_status: 'Verified'
  });

  useEffect(() => {
    if (activeTab === 'list' || activeTab === 'dashboard') {
      fetchStudents();
    }
  }, [activeTab]);

  const fetchStudents = async () => {
    try {
      const res = await api.get('/students');
      setStudents(res.data);
    } catch (error) {
      if (error.response?.status === 401 || error.response?.status === 403) {
        handleLogout();
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/students/${formData.id}`, formData);
        alert('Student updated successfully');
      } else {
        await api.post('/students', formData);
        alert('Student added successfully');
      }
      setFormData({
        id: null, roll_number: '', student_name: '', father_name: '',
        college_name: '', course_name: '', certificate_status: 'Verified'
      });
      setActiveTab('list');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving student');
    }
  };

  const handleEdit = (student) => {
    setFormData({
      id: student.id,
      roll_number: student.roll_number,
      student_name: student.student_name,
      father_name: student.father_name,
      college_name: student.college_name,
      course_name: student.course_name,
      certificate_status: student.certificate_status
    });
    setActiveTab('add');
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this student?')) {
      try {
        await api.delete(`/students/${id}`);
        fetchStudents();
      } catch (err) {
        alert('Failed to delete');
      }
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Panel</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'dashboard' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <LayoutDashboard size={20} /> Dashboard
          </button>
          <button 
            onClick={() => {
              setFormData({id: null, roll_number: '', student_name: '', father_name: '', college_name: '', course_name: '', certificate_status: 'Verified'});
              setActiveTab('add');
            }} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'add' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <UserPlus size={20} /> Add Student
          </button>
          <button 
            onClick={() => setActiveTab('list')} 
            className={`w-full flex items-center gap-3 px-4 py-3 rounded text-left ${activeTab === 'list' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
          >
            <Users size={20} /> Student List
          </button>
        </nav>
        <div className="p-4">
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-gray-800 rounded text-left"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-auto">
        {activeTab === 'dashboard' && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <div className="bg-white p-6 rounded shadow border">
              <h2 className="text-xl font-semibold mb-2">Total Students</h2>
              <p className="text-4xl font-bold text-blue-600">{students.length}</p>
            </div>
          </div>
        )}

        {activeTab === 'add' && (
          <div className="max-w-2xl bg-white p-6 rounded shadow border">
            <h1 className="text-2xl font-bold mb-6">{formData.id ? 'Edit Student' : 'Add Student'}</h1>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Student Name</label>
                <input type="text" name="student_name" value={formData.student_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Father Name</label>
                <input type="text" name="father_name" value={formData.father_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Roll Number</label>
                <input type="text" name="roll_number" value={formData.roll_number} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">College Name</label>
                <input type="text" name="college_name" value={formData.college_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Course Name</label>
                <input type="text" name="course_name" value={formData.course_name} onChange={handleInputChange} className="w-full p-2 border rounded" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Certificate Status</label>
                <select name="certificate_status" value={formData.certificate_status} onChange={handleInputChange} className="w-full p-2 border rounded" required>
                  <option value="Verified">Verified</option>
                  <option value="Pending">Pending</option>
                  <option value="Revoked">Revoked</option>
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium">
                  {formData.id ? 'Update' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        )}

        {activeTab === 'list' && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Student List</h1>
            <div className="bg-white rounded shadow border overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="p-3">Roll Number</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Course</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map(s => (
                    <tr key={s.id} className="hover:bg-gray-50">
                      <td className="p-3">{s.roll_number}</td>
                      <td className="p-3">{s.student_name}</td>
                      <td className="p-3">{s.course_name}</td>
                      <td className="p-3">{s.certificate_status}</td>
                      <td className="p-3 flex justify-end gap-2">
                        <button onClick={() => handleEdit(s)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1 rounded"><Edit size={16}/></button>
                        <button onClick={() => handleDelete(s.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-1 rounded"><Trash2 size={16}/></button>
                      </td>
                    </tr>
                  ))}
                  {students.length === 0 && (
                    <tr><td colSpan="5" className="p-6 text-center text-gray-500">No students found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

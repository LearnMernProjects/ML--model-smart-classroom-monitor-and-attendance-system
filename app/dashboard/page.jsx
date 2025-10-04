"use client"
import React, { useState } from 'react';


const Dashboard = () => {
  const [_selectedImage, _setSelectedImage] = useState(null);
  const [_imagePreview, _setImagePreview] = useState(null);
  

  const user = { firstName: 'User', emailAddresses: [{ emailAddress: 'user@example.com' }] };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      _setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        _setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen p-6 text-black" style={{ backgroundColor: '#F5F9FC' }}>
      {/* Header with explicit text styling */}
      <div className="w-full flex flex-col px-6 py-4 bg-white shadow-md rounded-md mb-8 text-black" style={{ backgroundColor: '#F5F9FC' }}>
        <h1 
          className="text-5xl font-bold mb-2 text-black" 
          style={{ fontSize: '3rem', backgroundColor: '#F5F9FC' }}
        >
          Student Management System
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 font-mono" style={{ backgroundColor: '#F5F9FC' }}>
          Manage student profiles, images, and voice recordings
        </h2>
      </div>

      {/* Welcome Box */}
      {user && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6 text-black" style={{ backgroundColor: '#F5F9FC' }}>
          <h2 className="text-xl font-semibold mb-4 text-black" style={{ backgroundColor: '#F5F9FC' }}>
            Welcome, {user.firstName || user.emailAddresses[0]?.emailAddress}!
          </h2>
          <p className="text-black" style={{ backgroundColor: '#F5F9FC' }}>
            You are successfully logged in.
          </p>
        </div>
      )}

      <div className="flex flex-row md:flex-row p-3 gap-6 mb-8">
        {/* Total Students */}
        <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-lg shadow-md p-6 border-l-4 m-3 flex-1 text-black" style={{
          borderLeft: '4px solid #3b82f6'
        }}>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </div>

        {/* With Photos */}
        <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-lg shadow-md p-6 border-l-4 m-3 flex-1 text-black" style={{
          borderLeft: '4px solid #3b82f6'
        }}>
          <h3 className="text-gray-600 text-sm font-medium mb-2">With Photos</h3>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </div>

        {/* With Voice */}
        <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-lg shadow-md p-6 border-l-4 m-3 flex-1 text-black" style={{
          borderLeft: '4px solid #3b82f6'
        }}>
          <h3 className="text-gray-600 text-sm font-medium mb-2">With Voice</h3>
          <p className="text-3xl font-bold text-cyan-500">0</p>
        </div>

        {/* Standards */}
        <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-white rounded-lg shadow-md p-6 border-l-4 m-3 flex-1 text-black" style={{
          borderLeft: '4px solid #3b82f6'
        }}>
          <h3 className="text-gray-600 text-sm font-medium mb-2">Standards</h3>
          <p className="text-3xl font-bold text-blue-600">2</p>
        </div>
      </div>

      {/* Fixed 50-50 Layout with true black border and enhanced shadow */}
      <div className="flex flex-row m-2" style={{ gap: '1.5rem' }}>
        <div 
          className="flex-1 bg-white rounded-lg p-6 m-8" 
          style={{ 
            color: '#000000',
            border: '2px solid #000000',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)'
          }}
        >
          <h1 className="font-bold text-xl record leading-tight" style={{ color: '#000000' }}>
          + Add New Student
          </h1>
        
          <p className='text-gray-500 leading-snug mb-4'>
          Upload student information, photo, and voice recording
          </p>
         
          <div className="flex flex-col m-2" style={{ gap: '1.5rem' }}>
                <div className="flex flex-row gap-6">
                    {/* Student Name */}
                    <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Student Name</h2>
                        <textarea 
                            placeholder='Enter Student Name' 
                            className='w-full m-3 rounded-lg shadow-lg px-4 mx-5 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all resize-none' 
                            style={{ border: '2px solid #000000' }}
                            rows="1"
                        ></textarea>
                    </div>

                    {/* Enter Date of Birth */}
                    <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Enter Date of Birth</h2>
                        <input 
                            type="date" 
                            placeholder='Enter DOB' 
                            className='w-full rounded-lg m-3 shadow-lg px-3 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
                            style={{ border: '2px solid #000000' }}
                        />
                    </div>
                </div>

                <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-row gap-9 leading-4">
                     {/* Enter Phone Number */}
                    <div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Enter Phone Number</h2>
                        <input 
                            type="tel"
                            placeholder='+91 9824211016' 
                            className='w-full rounded-lg m-3 shadow-lg px-3 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all'
                            style={{ border: '2px solid #000000' }}
                        />
                    </div>
                    
                    {/* Enter Standard/Grade */}
                    <div initial={{ scale: 0 }} animate={{ scale: 1 }}  className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Enter Standard/Grade</h2>
                        <textarea 
                            placeholder='Enter Standard/Grade' 
                            className='w-full rounded-xl shadow-lg px-3 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all resize-none' 
                            style={{ border: '2px solid #000000', margin: '12px' }}
                            rows="1"
                        ></textarea>
                    </div>
                </div>

                <div className="flex flex-row gap-9 leading-4">
                     {/* Student Photo */}
                     <div className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Upload Student Image</h2>
                        <input 
                            type="file" 
                            onChange={handleImageChange}

                            accept="image/*"
                            className='w-full rounded-xl shadow-lg px-3 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all' 
                            style={{ border: '2px solid #000000', margin: '12px' }}
                        />
                    </div>
                    
                    {/* Upload Student Voice recording*/}
                    <div initial={{ scale: 0 }} animate={{ scale: 1 }}  className="flex-1">
                        <h2 className='leading-6 font-semibold text-lg'>Upload Student Voice recording</h2>
                        <input 
                            type="file" 
                            
                            accept="audio/*"
                            className='w-full rounded-xl shadow-lg px-3 py-3 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all' 
                            style={{ border: '2px solid #000000', margin: '12px' }}
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex items-center mt-6">
                <button type="submit" className="submit-button">Add Student</button>
                </div>
            </div>
        </div>
        
        <div 
          className="flex-1 bg-white rounded-xl p-6 ml-3" 
          style={{ 
            color: '#000000',
            border: '2px solid #000000',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.1)'
          }}
        >
            {/* Header Section */}
            <div className="flex flex-row gap-8 items-start mb-6">
                <div>
                    <h1 className="font-bold text-xl leading-snug" style={{ color: '#000000' }}>
                        Student Directory
                    </h1>
                    <p className='text-gray-500 leading-snug text-sm mt-1'>
                        View and manage all student records
                    </p>
                </div>
                
                {/* Search Box */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search students..."
                        className="border border-gray-300 rounded-lg pl-10 pr-10 py-10 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all ml-9 mr-9"
                        style={{ width: '200px' }}
                    />
                </div>
            </div>

            {/* Student Cards */}
            <div className="space-y-4">
                {/* Student 1 - Alex Johnson */}
                <div className="bsd border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Student Photo */}
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                   
                                </div>
                            </div>
                            
                            {/* Student Info */}
                            <div>
                                <div initial={{ scale: 0 }} animate={{ scale: 1 }}  className="flex items-center space-x-9">
                                    <img src="./ig1.png" width={55} height={55} alt="Student"/>
                                    <h3 className="font-semibold text-lg text-black">Viraj Sanjay Naik</h3>
                                    <div className="grade inline-flex gap-7 mx-2 border border-gray-900 border-solid rounded-xl items-center text-sm text-gray-700 px-3 py-1">
                                        10th Grade
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-12 mt-1">
                                    <div className="date inline-flex items-center text-sm text-gray-600">
                                        5/15/2008
                                    </div>
                                    <div className="datae inline-flex items-center text-sm text-gray-600">
                                        +91 9824211018
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Photo Indicator */}
                        <div className="flex items-center space-x-2">
                            <div className="pht inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Photo
                            </div>
                        </div>
                    </div>
                </div>

                {/* Student 2 - Sarah Chen */}
                <div initial={{ scale: 0 }} animate={{ scale: 1 }}  className="bsd border border-gray-500 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            {/* Student Photo */}
                            <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-red-500 rounded-full flex items-center justify-center overflow-hidden">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                    
                                </div>
                            </div>
                            
                            {/* Student Info */}
                            <div>
                                <div className="flex items-center space-x-6">
                                <img src="./ig1.png" width={55} height={55} alt="Student"/>
                                    <h3 className="font-semibold text-lg text-black">Jay Bhokare</h3>
                                    <div className="grade inline-flex items-center text-sm text-gray-600">
                                        9th Grade
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-12 mt-1">
                                    <div className="date inline-flex items-center text-sm text-gray-600">
                                        3/22/2009
                                    </div>
                                    <div className="inline-flex datae items-center text-sm text-gray-600">
                                        +91 9824211016
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Photo Indicator */}
                        <div className="flex items-center space-x-2">
                            <div className="inline-flex pht items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                Photo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
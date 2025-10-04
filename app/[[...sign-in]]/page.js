'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Loader from '/components/Loader';

const SignUp = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignUp })), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading...</div>
});

const SignIn = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignIn })), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading...</div>
});

const Page1 = () => {
  // eslint-disable-next-line no-unused-vars
  const [authMode, setAuthMode] = useState('signup');
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  // 🔁 Redirect to /StudentYaTeacher if signed in
  useEffect(() => {
    const hasRedirected = sessionStorage.getItem('StudentYaTeacherRedirected');
  
    if (isSignedIn && isLoaded && !hasRedirected) {
      sessionStorage.setItem('StudentYaTeacherRedirected', 'true');
      router.push('/StudentYaTeacher');
    }
  }, [isSignedIn, isLoaded, router]);
  

  // ⏳ Optional: loader while redirecting
  if (isSignedIn && isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-600">
        Redirecting to StudentYaTeacher...
        <Loader />
      </div>
    );
  }
  

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center text-xl text-gray-600">
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left: Info Section */}
      <div className="bgk flex rounded-xl m-3 flex-col justify-start p-[10%] items-center text-white gap-2 text-lg">
        <div className="max-w-md">
          <img src="/graduate-hat.png" className="w-16 h-16 mb-6 ml-16" alt="Graduate Hat" />
          <h1 className="text-4xl font-bold mb-4">NeuraAttend</h1>
          <p className="mb-8 text-2xl">Where Attendance Meets Attention</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2">
              <img src="/checked.png" className="bi w-5 h-5" alt="Checked" />
              Free account with instant access
            </li>
            <li className="flex items-center gap-2">
              <img src="/brain.png" className="bi w-5 h-5" alt="Brain" />
              From Faces to Focus: Attendance Reinvented with AI
            </li>
            <li className="flex items-center gap-2">
              <img src="/public-service.png" className="bi w-5 h-5" alt="Service" />
              Your Camera. Your Classroom Assistant
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Clerk Auth Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50">
        <div className="w-full max-w-md">
          <div className="flex mb-6">
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-2 rounded-l-lg ${
                authMode === 'signup'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-600'
              }`}
            >
              Sign Up
            </button>
            <button
              onClick={() => setAuthMode('signin')}
              className={`flex-1 py-2 rounded-r-lg ${
                authMode === 'signin'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-blue-600 border border-blue-600'
              }`}
            >
              Login
            </button>
          </div>
          
          <button 
            onClick={() => router.push('/Users')} 
            className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Go to 
          </button>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            {authMode === 'signup' ? (
              <SignUp fallbackRedirectUrl="/RoleSelectionPage" />
            ) : (
              <SignIn fallbackRedirectUrl="/RoleSelectionPage" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;

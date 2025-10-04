"use client";
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignUp })), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading...</div>
});

const SignIn = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignIn })), {
  ssr: false,
  loading: () => <div className="p-4 text-center">Loading...</div>
});

const Page1 = () => {
  const [authMode, setAuthMode] = useState('signup');
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      console.log('User is signed in');
    }
  }, [isSignedIn, isLoaded]);

  if (isLoaded && isSignedIn) {
    return (
      <div className="flex h-screen">
        {/* Left: Blue Info Section */}
        <div className="bgk flex rounded-xl m-3 flex-col justify-start p-[10%] items-center text-white gap-2 ">
          <div className="max-w-md">
            <img src="/graduate-hat.png" className="w-16 h-16 mb-6 ml-16 flex justify-center items-center" alt="Graduate Hat" />
            <h1 className="text-4xl hover:text-5xl transition-all duration-300  font-bold mb-4">Explain Me At Home</h1>
            <p className="p1 mb-8 font-bold">Start your journey with AI-powered lecture notes and summaries</p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2 text-2xl text-white hover:text-4xl transition-all duration-300" style={{cursor: 'pointer'}}>
                <img src="/checked.png" className="bi " alt="Checked" />
                <span className="hover:text-4xl transition-all duration-300">Free account with instant access</span>
              </li>
              <li className="flex items-center gap-2 text-2xl text-white hover:text-4xl transition-all duration-300" style={{cursor: 'pointer'}}>
                <img src="/brain.png" className="bi " alt="Brain" />
                <span className="hover:text-4xl transition-all duration-300">AI powered transcription and summaries</span>
              </li>
              <li className="flex items-center gap-2 text-2xl text-white hover:text-4xl transition-all duration-300" style={{cursor: 'pointer'}}>
                <img src="/public-service.png" className="bi " alt="Service" />
                <span className="hover:text-4xl transition-all duration-300">Perfect for students and teachers</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: Welcome Message */}
        <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
            <p className="text-gray-600 mb-6">You are successfully signed in.</p>
          </div>
        </div>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 border-4 border-b-red-600 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-1 border-4 border-t-blue-600 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-2 border-4 border-b-green-600 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-3 border-4 border-t-yellow-300 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-5 border-4 border-b-black border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-6 border-4 border-t-orange-500 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-7 border-4 border-t-purple-400 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-8 border-4 border-t-pink-500 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-9 border-4 border-t-emerald-400 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-10 border-4 border-t-violet-500 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-11 border-4 border-t-cyan-400 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-12 border-4 border-t-orange-900 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
            <div className="absolute inset-13 border-4 border-t-rose-500 border-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-14 border-4 border-t-fuchsia-400 border-transparent rounded-full animate-spin"
                 style={{ animationDirection: 'reverse' }}></div>
          </div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Left: Blue Info Section */}
      <div className="bgk flex rounded-xl m-3 flex-col justify-start p-[10%] items-center text-white gap-2 text-lg">
        <div className="max-w-md">
          <img src="/graduate-hat.png" className="w-16 h-16 mb-6 ml-16 flex justify-center items-center" alt="Graduate Hat" />
          <h1 className="text-3xl font-bold mb-4">Explain Me At Home</h1>
          <p className="mb-8">Start your journey with AI-powered lecture notes and summaries</p>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 text-xl text-white">
              <img src="/checked.png" className="bi w-5 h-5" alt="Checked" />
              Free account with instant access
            </li>
            <li className="flex items-center gap-2 text-xl text-white">
              <img src="/brain.png" className="bi w-5 h-5" alt="Brain" />
              AI powered transcription and summaries
            </li>
            <li className="flex items-center gap-2 text-xl text-white">
              <img src="/public-service.png" className="bi w-5 h-5" alt="Service" />
              Perfect for students and teachers
            </li>
          </ul>
        </div>
      </div>

      {/* Right: Clerk Auth Section */}
      <div className="w-1/2 flex flex-col justify-center items-center bg-gray-50">
        <div className="w-full max-w-md">
          {/* Toggle Buttons */}
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
          <div className="bg-white rounded-lg p-6 shadow-lg">
            {authMode === 'signup' ? (
              <SignUp fallbackRedirectUrl="./RoleSelectionPage" />
            ) : (
              <SignIn fallbackRedirectUrl="./RoleSelectionPage" />
            )}
            <button onClick={() => {router.push("./RoleSelectionPage")}}>THIS IS DASHBOARD</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page1;
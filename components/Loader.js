// components/Loader.js
'use client';

import React from 'react';

export default function Loader() {
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
          <div className="absolute inset-14 border-4 border-t-fuchsia-400 border-transparent rounded-full animate-spin"
               style={{ animationDirection: 'reverse' }}></div>
        </div>
        <p className="mt-4 text-gray-600 text-lg font-medium">Loading...</p>
      </div>
    </div>
  );
}

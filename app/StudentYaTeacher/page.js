'use client';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';
import Slider from '/components/Slider';
import Loader from '/components/Loader';
const SignUp = dynamic(
  () => import('@clerk/nextjs').then(mod => ({ default: mod.SignUp })),
  { ssr: false }
);


export default function StudentYaTeacherPage() {
  const { isLoaded, isSignedIn } = useUser();

  
  
      if (!isLoaded) return <Loader />;
      
  
  
  

  return (
    <div className='pura m-0 p-0 h-full overflow-x-hidden'>
    <div className="info1 glass-container bg-red-500 p-10 z-10">
      {isSignedIn ? (
        <>
          <div className="text-xl  font-semibold mb-4">Can you tell me what's your profession?</div>
          <Slider />
        </>
      ) : (
        <SignUp fallbackRedirectUrl="/StudentYaTeacher" />
      )}
    </div>
    
    </div>
    
  );
}

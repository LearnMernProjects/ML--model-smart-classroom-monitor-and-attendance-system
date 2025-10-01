'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignUp })), { ssr: false });
const SignIn = dynamic(() => import('@clerk/nextjs').then(mod => ({ default: mod.SignIn })), { ssr: false });

export default function Page1() {
  const { isLoaded } = useUser();
  const [authMode, setAuthMode] = React.useState('signup');

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 animate-pulse">• • •</div>
      </div>
    );
  }

  return (
    <div>
      {authMode === 'signup' ? (
        <SignUp fallbackRedirectUrl="/StudentYaTeacher" />
      ) : (
        <SignIn fallbackRedirectUrl="/StudentYaTeacher" />
      )}
    </div>
  );
}
// components/DynamicSignUp.js
'use client';
import dynamic from 'next/dynamic';

const SignUp = dynamic(() =>
  import('@clerk/nextjs').then((mod) => ({ default: mod.SignUp })), {
    ssr: false,
    loading: () => <div className="p-4 text-center">Loading...</div>,
  }
);

export default SignUp;

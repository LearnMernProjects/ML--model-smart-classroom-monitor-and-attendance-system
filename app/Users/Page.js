'use client';

import React from 'react';
import { useUser } from '@clerk/nextjs';

export default function UsersPage() {
  const { isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-4xl font-bold text-gray-700 animate-pulse">• • •</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users Page</h1>
      <ul className="list-disc pl-6">
        <li>User 1</li>
        <li>User 2</li>
        <li>User 3</li>
      </ul>
    </div>
  );
}
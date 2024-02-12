'use client'

import React, { useEffect } from 'react';
import prisma from '@/prisma/client';
import { useRouter, redirect } from 'next/navigation';

export default function TasksHome() {
  const router = useRouter()
  
  useEffect(() => {
    router.push('tasks/all');
    router.refresh();
  }, [router]);

  return (
    <div>
      Loading...
    </div>
  );
}
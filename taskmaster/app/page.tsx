'use client'

import React, { useEffect } from 'react';
import { Heading } from '@radix-ui/themes'
import './globals.css';
import { useRouter } from 'next/navigation';

const Home = async () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/');
    router.refresh();
  }, [router]);

  return (
    <div>
      <div className='image-container'>
          <div className="pr-5 pt-2 text-right">
            <div className='pr-2 text-white' >
              <Heading size="9" as="h1">Taskmaster...</Heading>
            </div>
            <div className="text-white inline">
              <Heading size="5" as="h1">Manage your tasks like a boss!</Heading>
            </div>
            <div>
            <button className="p-1 mt-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/all'>Start Managing Tasks</a></button>
            </div>
          </div> 
      </div>
    </div>
  )
}

export default Home

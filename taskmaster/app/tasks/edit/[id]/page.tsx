

import React from 'react'
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';

const UpdateTaskForm = dynamic(() => import("../../_components/UpdateTaskForm"), { ssr: false });

interface Props {
  params: { id: string }; 
}

const EditTaskPage = async ({ params }: Props) => {
  const task = await prisma.task?.findUnique({ where: {id: parseInt(params.id)}});

  if (!task) {
   notFound();
  }

  return (
    <UpdateTaskForm task={task} />
  )    
}

export default EditTaskPage;


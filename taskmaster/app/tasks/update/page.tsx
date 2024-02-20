/* eslint-disable @next/next/no-async-client-component */
"use client"

import React, { useState, FunctionComponent } from 'react'

import { updateTaskSchema } from '@/app/validationSchemas';
import  { z } from 'zod';
import UpdateTaskForm from '../_components/UpdateTaskForm';
import { PiNumberThree } from 'react-icons/pi';

type TaskForm = z.infer<typeof updateTaskSchema>;

interface Props {
  id: string
  taskName: string
  dueOn: string
  completed: boolean
}

const UpdateTaskPage: FunctionComponent<Props> = async ({ id, taskName, dueOn, completed}) => {
  
  return (
    <div>  
      <UpdateTaskForm key={id} id={id} taskName={taskName} dueOn={dueOn} completed={completed} />
    </div>
  )
}

export default UpdateTaskPage




"use client"

import React, { useState } from 'react'
import { Callout, Heading } from '@radix-ui/themes';
import { createTaskSchema } from '@/app/validationSchemas';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/components/Spinner';
import axios from 'axios';

type TaskForm = z.infer<typeof createTaskSchema>;


const NewTaskPage = () => {
    const router = useRouter()
    const [taskName, setTaskName] = useState('');
    const [dueOn, setDueOn] = useState('');
    const [completed, setCompleted] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    let error;

    const submitTask = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            await fetch("http://localhost:3000/api/tasks", {
                method: "POST", 
                body: JSON.stringify({taskName, dueOn, completed}),
                headers: {"Content-Type": "application/json"},
            });
            router.push("/tasks");
        } catch (error) {
            setSubmitting(false);
            throw new Error('Unable to post task.');
        }
    };

  return (

    <div>
        <div className='image-container'>
            <div className='p-4 ml-8'>
                <h1 className='mb-2 text-2xl text-white'>Create a Task: </h1>
                {error && 
                    <Callout.Root color="red" className="mb-5">
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>}
                
                <form 
                    action = ''
                    name="TaskForm"
                    className='space-y-3'>
                    <input 
                        type='text' 
                        required 
                        placeholder="Task Name: " 
                        className='w-96 p-1 border-solid opacity-75 border-yellow-800 border-2  text-yellow-950 max-w-lg rounded-lg placeholder:text-yellow-950'
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <br />
                    <input 
                        type="text" 
                        required 
                        placeholder="Due On (YYYY-DD-MM): "
                        className='w-96 p-1 border-solid opacity-75 border-yellow-800 border-2 text-yellow-950 k max-w-lg rounded-lg placeholder:text-yellow-950' 
                        onChange={(e) => setDueOn(e.target.value)}
                    />
                    <br />
                    <button 
                        className="p-1 border-2 border-yellow-900 bg-white opacity-75  hover:bg-yellow-700 rounded-xl text-yellow-950"
                        onClick={submitTask}
                    >
                        Submit New Task {isSubmitting && <Spinner />}
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default NewTaskPage
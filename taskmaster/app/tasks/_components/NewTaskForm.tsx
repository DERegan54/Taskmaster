'use client';

import React, { useState } from 'react'
import axios from 'axios';
import { Callout } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';
import { createTaskSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


type TaskFormData = z.infer<typeof createTaskSchema>;


const NewTaskForm = () => {
    const router = useRouter()
    const { 
        handleSubmit,
        register, 
        formState: {errors} 
    } = useForm<TaskFormData>({resolver: zodResolver(createTaskSchema)});

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');


    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitted(true);
            await axios.post('/api/tasks', data);
            router.push('/tasks');
            router.refresh();
        } catch (error) {
            setSubmitted(false);
            setError('Unable to submit new task.');
        }
    });

  return (
    <div>
        <div className='image-container'>
            <div className='p-4 ml-8'>
                <h1 className='mb-2 text-2xl text-white'>Create a Task: </h1>
                {error && (
                    <Callout.Root color="red" className="mb-5">
                        <Callout.Text>{error}</Callout.Text>
                    </Callout.Root>
                )};
                <form 
                    className='space-y-3'
                    onSubmit={onSubmit}
                >
                    <input 
                        type='text' 
                        required 
                        placeholder="Task Name: " 
                        className='w-96 p-1 border-solid opacity-75 border-yellow-800 border-2  text-yellow-950 max-w-lg rounded-lg placeholder:text-yellow-950'
                        {...register('taskName')}
                    />
                    <div>
                        <ErrorMessage>{errors.taskName?.message}</ErrorMessage>
                    </div>
                    <br />
                    <input 
                        type="text" 
                        required 
                        placeholder="Due On (YYYY-DD-MM): "
                        className='w-96 p-1 border-solid opacity-75 border-yellow-800 border-2 text-yellow-950 k max-w-lg rounded-lg placeholder:text-yellow-950' 
                        {...register('dueOn')}
                    />
                    <div>
                        <ErrorMessage>{errors.dueOn?.message}</ErrorMessage>
                    </div>
                    <br />
                    <button 
                        className="p-1 border-2 border-yellow-900 bg-white opacity-75  hover:bg-yellow-700 rounded-xl text-yellow-950"
                        disabled={submitted}>
                            Submit New Task
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default NewTaskForm;
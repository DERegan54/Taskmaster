"use client"

import React, { useState } from 'react';
import axios from 'axios';
import { Callout } from '@radix-ui/themes';
import ErrorMessage from '@/app/components/ErrorMessage';

import { updateTaskSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from  'react-hook-form';
import { useRouter } from 'next/navigation';
import { Task } from '@prisma/client';


type UpdateTaskFormData = z.infer<typeof updateTaskSchema>

const UpdateTaskForm = ({ task }: { task: Task }) => {
    const router = useRouter();
    const {
        handleSubmit,
        register, 
        formState: { errors }
    } = useForm<UpdateTaskFormData>({ resolver: zodResolver(updateTaskSchema) });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const onSubmit = handleSubmit(async (data) => {
        try {
            setSubmitted(true);
            await axios.put(`http://localhost:3000/api/tasks/` + task.id, data);
            router.push('/tasks/all');
            router.refresh();
        } catch (error) {
            setSubmitted(false);
            setError('Unable to update this task.');
        }
    });

    return (
        <div>
            <div>
                <div className='image-container'>
                    <div className='p-4 ml-8'>
                        <h1 className='mt=2 mb-2 text-2xl text-white'>Update {task.taskName}: </h1>  
                        {error && (
                            <Callout.Root color="red" className="mb-5">
                                <Callout.Text>{error}</Callout.Text>
                            </Callout.Root>
                        )}
                        <form 
                            name="updateTaskForm"
                            className='space-y-3'
                            onSubmit={onSubmit}
                        > 
                            <label className="text-white">Task Name: </label>
                            <br />
                            <input 
                                type='text' 
                                placeholder="Task Name: " 
                                defaultValue={task.taskName}
                                className="w-96 p-1 border-2 border-yellow-900 opacity-75 rounded-lg text-yellow-950 placeholder:text-yellow-950" 
                                {...register('taskName')}
                            />
                            <div>
                                <ErrorMessage>{errors.taskName?.message}</ErrorMessage>
                            </div>  
                            <label htmlFor='DueDate' className='text-white'>Due On: </label>
                            <br />
                            <input 
                                type='text' 
                                placeholder="Due On (YYY-DD-MM): " 
                                defaultValue={task.dueOn}
                                className='w-96 p-1 border-solid opacity-75 border-yellow-800 border-2 text-yellow-950 k max-w-lg rounded-lg placeholder:text-yellow-950' 
                                {...register('dueOn')}
                            />
                            <div>
                                <ErrorMessage>{errors.dueOn?.message}</ErrorMessage>
                            </div>  
                            <button 
                                className="p-1 bg-white border-2 border-yellow-900 opacity-75 hover:bg-yellow-700 rounded-xl text-yellow-900"
                                disabled={submitted}>
                                    Update Task
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTaskForm;
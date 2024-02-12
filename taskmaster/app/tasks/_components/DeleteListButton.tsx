'use client'

import React, { useState} from 'react';
import axios from 'axios';
import { AlertDialog } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TfiPencil } from 'react-icons/tfi'
import { FaRegTrashCan } from 'react-icons/fa6';
import prisma from '@/prisma/client';

interface Props {
    id: String
    taskName: string
    dueOn: string
    completed: boolean
}

const DeleteListButton = ({id, taskName, dueOn, completed}: Props) => {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [deleted, setDeleted] = useState(false);

    async function deleteAllTasks() {
        try {
            setDeleted(true)
            await axios.delete(`http://localhost:3000/api/tasks`) 
            router.push('/tasks/all');
            router.refresh();
        } catch (error) {
            setDeleted(false);
            setError(true);
       }
    }
      

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button 
                        className="p-1 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"
                        disabled={deleted}
                    >
                        Delete All Tasks
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <div className="mt-5 mb-7  text-yellow-900 border-yellow-900">
                        <AlertDialog.Title>Confirm</AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to delete all tasks on this list?
                        </AlertDialog.Description>
                         <AlertDialog.Cancel>
                            <button 
                                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                            >
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <button
                                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                                onClick={deleteAllTasks}
                            >
                                Delete
                            </button>
                        </AlertDialog.Action>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        Unable to delete task list.
                    </AlertDialog.Description>
                    <button 
                        className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                        onClick={() => setError(false)}
                    >
                        Okay
                    </button>
                </AlertDialog.Content>
            </AlertDialog.Root>      
        </>
    );
}

export default DeleteListButton;

 
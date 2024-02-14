'use client'

import React, { useState} from 'react';
import axios from 'axios';
import { AlertDialog } from '@radix-ui/themes';
import { useRouter } from 'next/navigation';
import Link from 'next/link';import { useForm } from 'react-hook-form';
import { TfiPencil } from 'react-icons/tfi'
import { FaRegTrashCan } from 'react-icons/fa6';


interface Props {
    id: String
}

const Buttons = ({id}: Props) => {
    const router = useRouter()
    const [error, setError] = useState(false);
    const [deleted, setDeleted] = useState(false);

    const deleteTask = async () => {
        try {
            console.log("TRYING TO DELETE")
            setDeleted(true)
            await axios.delete(`http://localhost:3000/api/tasks/${id}`);
            router.push('/tasks');
            router.refresh();
        } catch (error) {
            setDeleted(false);
            setError(true);
        }
    };

    return (
        <>
            <button className="p-3 mr-2 mb-2 bg-yellow-900 hover:bg-amber-700 hover:cursor-pointer rounded-lg">
                <Link href='/tasks/update'>
                    <TfiPencil className="fill-current text-white"/>
                </Link>
            </button>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <button 
                        className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-amber-700 hover:cursor-pointer rounded-lg text-white'
                        disabled={deleted}
                    >
                        <FaRegTrashCan className='fill-current text-white' />
                    </button>
                </AlertDialog.Trigger>
                <AlertDialog.Content>
                    <div className="mt-5 mb-7  text-yellow-900 border-yellow-900">
                        <AlertDialog.Title>Confirm</AlertDialog.Title>
                        <AlertDialog.Description>
                            Are you sure you want to delete this task?
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
                                onClick={deleteTask}
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
                        Unable to delete task.
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

export default Buttons;

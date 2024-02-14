'use client'

import React from 'react';
import prisma from '@/prisma/client';
import { useRouter } from 'next/navigation';
import { FaCheck } from 'react-icons/fa6';

interface Props {
    id: number
    completed: boolean
}

const StatusForm = ({ id, completed }: Props) => {

    async function toggleTask() {
        'use server'
        let router = useRouter()
        await prisma.task.update({ where: { id }, data: { completed }});
        router.push('/tasks');
        router.refresh();
    }

    return (
        <div>
            <button 
                type='submit'
                className='mr-3 mt-3 p-3 bg-yellow-900 hover:bg-yellow-950 hover:cursor-pointer rounded-lg text-white'
                onSubmit={(() => toggleTask)}
            >
                <FaCheck />
            </button>  
        </div>
    )
}

export default StatusForm;

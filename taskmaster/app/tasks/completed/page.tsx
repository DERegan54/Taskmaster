import React from 'react';
import { Heading } from '@radix-ui/themes'
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';
import TaskCard from '../[id]/page';

async function getTasks (completed: boolean){
  "use server"
  return await prisma.task.findMany({
    where: { 
      completed: true,
    },
    orderBy: {
      dueOn: 'asc',
    }, 
  });
}

async function deleteAllTasks(data: FormData) {
    "use server"
    const id = data.get("id")?.valueOf();
    await prisma.task.deleteMany()
    redirect('/');
  }
  
  async function toggleTask(id: string, completed: boolean) {
    "use server"
    await prisma.task.update({ where: { id }, data: { completed }});
    redirect('/');
  }
  
  type Props = {
    completed: boolean
  }

const CompletedPage = async ({completed}: Props) => {

    const todos = await getTasks(completed)

  return (
    <div className='image-container'>
        <div className="ml-16 pt-10">
            <div className='-mb-2 ml-0 text-white'>
                <Heading size="8" as="h1">Completed Tasks:</Heading>
            </div>
            <br />
            <div className='mt-3 ml-20'>
              <button className="p-1 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
            </div> 
            <div className="ml-2 flex">   
                <ul>
                    {todos.map(todo => (
                        <TaskCard key={todo.id} {...todo} toggleTask={toggleTask} />
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default CompletedPage
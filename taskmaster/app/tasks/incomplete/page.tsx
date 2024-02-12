import React from 'react';
import { Heading } from '@radix-ui/themes'
import { redirect } from 'next/navigation';
import prisma from '@/prisma/client';
import TaskCard from '../[id]/page';

async function getIncompleteTasks (completed: boolean){
    "use server"
    return await prisma.task.findMany({where: { completed: false,}});
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
    id: string
    taskName: string
    dueOn: string
    completed: boolean
  }

const IncompletePage = async ({completed}: Props) => {

    const tasks = await getIncompleteTasks(completed)

  return (
    <div className='image-container'>
      <div>
        <div className="ml-10 pt-10">
          <div className='ml-10 text-white'>
            <Heading size="8" as="h1">To-do List:</Heading>
          </div>
        </div>
        <div className="mt-5 -ml-0">
          <form action={deleteAllTasks}>
            <button className="p-1 ml-16 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
            <button className="p-1 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline">Reset Tasks</button>
          </form>
        </div> 
      </div>
      <div className="ml-12 flex">  
        <ul>
          {tasks.map(task => (
            <TaskCard  key={task.id} {...task} toggleTask={toggleTask} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default IncompletePage;
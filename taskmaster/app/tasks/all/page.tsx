import React, { FunctionComponent } from 'react';
import { Heading } from '@radix-ui/themes';
import { redirect } from 'next/navigation';
import TaskCard from '../[id]/page';
import prisma from '@/prisma/client';

type Props = {
  id: string
  taskName: string
  dueOn: string
  completed: boolean
}

function getTasks() {
  return prisma.task.findMany({
    orderBy: {
      dueOn: 'asc',
    },
  });
}

async function toggleTask(id: string, completed: boolean) {
  'use server'
  await prisma.task.update({ where: { id }, data: { completed }});
  redirect('/tasks');
}

async function deleteTask(id: string) {
    "use server"
    await prisma.task.delete({ where: { id }});
    redirect('/tasks')
  }

const AllTasksPage: FunctionComponent<Props> = async ({id, taskName, dueOn, completed}) => {
  const tasks = await getTasks();

  if (!tasks) {
    return <p>No tasks yet.</p>
  }

  console.log('id: ', id, 'taskName: ', taskName, 'completed: ', completed)


  return (
    <div className='image-container'>
    <div>
      <div className="ml-16 pt-10">
        <div className='ml-12 text-white' >
          <Heading size="8" as="h1">All Tasks:</Heading>
        </div>
      </div> 
      <div className="p-2 mt-5 ml-32">
        <button className="p-1 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
      </div>
    </div>
    <div className="pl-4 ml-12 flex">
      <ul>
        {tasks.map(task => (
          <TaskCard key={task.id} {...task} id={task.id} taskName={task.taskName} dueOn={task.dueOn} completed={task.completed} deleteTask={deleteTask} toggleTask={toggleTask} />
        ))}
      </ul>
    </div>
  </div>

  )
}

export default AllTasksPage

import React from 'react';
import { Heading, Text, Flex, Switch } from '@radix-ui/themes';
import { redirect } from 'next/navigation';
import TaskCard from '../[id]/page';
import prisma from '@/prisma/client';

interface Props  {
  id: string
  taskName: string
  dueOn: string
  completed: boolean
  trimmedDueOn: number
}

async function getTasks() {
  'use server'
  return await prisma.task.findMany();
}

async function getAscTasks() {
  'use server'
  return await prisma.task.findMany({
    orderBy: [
      {
        dueOn: 'asc',
      }
    ]
  });
}

async function getDescTasks() {
  'use server'
  return await prisma.task.findMany({
    orderBy: [
      {
        dueOn: 'desc',
      }
    ]
  })
}
async function deleteAllTasks(data: FormData) {
  'use server'
  const id = data.get("id")?.valueOf();
  await prisma.task.deleteMany()
  redirect('/tasks');
}

async function toggleTask(id: string, completed: boolean) {
  'use server'
  await prisma.task.update({ where: { id }, data: { completed }});

  redirect('/tasks/all');
}

async function deleteTask(id: string) {
    'use server'
    await prisma.task.delete({ where: { id }});
    redirect('/tasks')
  }

const AllTasksPage = async ({trimmedDueOn, id, taskName, dueOn, completed}: Props) => {
  const ascTasks = await getAscTasks();
  const descTasks = await getDescTasks();


  if (!ascTasks || !descTasks) {
    return <p>No tasks yet.</p>
  }



  return (
    <div className='image-container'>
    <div>
      <div className="ml-16 pt-10">
        <div className='ml-12 text-white' >
          <Heading size="8" as="h1">All Tasks:</Heading>
        </div>
      </div> 
      <div className="mt-5 ml-20">
        <form action={deleteAllTasks}>
          <button className="p-1 mr-5 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline"><a href='/tasks/new'>Add a Task</a></button>
          <button className="p-1 bg-white opacity-75 border-2 border-yellow-900 hover:bg-yellow-700 rounded-xl text-yellow-950 inline">Reset Tasks</button>
        </form>

        <span className='text-white'>
          
        </span>
        <div className='p-1 mt-2 -ml-5 w-64 text-center bg-white opacity-75 border-2 border-yellow-900 rounded-xl text-yellow-950'>
          <Text size='3'>Sort Tasks by Due Date:</Text>
          <div className="ml-3">
          <Text as="label" size="3">
            <Flex gap="2">
              Ascending 
              <Switch /> 
              Descending
            </Flex>
          </Text>
          </div>
        </div>
      </div>
    </div>
    <div className="pl-4 ml-12 flex">
      <ul>
        {FormData.asc && 
          ascTasks.map((task) => (
          <TaskCard key={task.id} {...task} id={task.id} taskName={task.taskName} dueOn={task.dueOn} completed={task.completed} deleteTask={deleteTask} toggleTask={toggleTask} />
        ))}
       
      </ul>
    </div>
  </div>

  )
}

export default AllTasksPage

// let taskArr = [];

// for (let i=0; i<tasks.length; i++) {
//   taskArr.push(tasks[i])
// }
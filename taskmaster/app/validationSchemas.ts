import { ZodBoolean, z } from 'zod';

export const createTaskSchema = z.object({
    taskName: z.string().min(1, "Task name is required.").max(255),
    dueOn: z.string().min(1, "Due date is required.").max(255),
    completed: z.boolean()
});

export const updateTaskSchema = z.object({
    taskName: z.string().min(1, "Task name is required.").max(255).optional(),
    dueOn: z.string().min(1, "Due date is required").max(255).optional(),
    completed: z.boolean().optional()
})

export const updateStatusSchema = z.object({
    completed: z.boolean()
});

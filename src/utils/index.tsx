import * as objectMapper from 'object-mapper'; // Use * as syntax for default import
import { TaskType } from '../store/Task';

// Define mappings for the properties you want to include
export const updateTaskMapper = {
    // Add mappings as needed
    id: "id",
    title: "title",
    description: "description",
    dueDate: "dueDate",
    reminder: "reminder",
    isImportant: "isImportant",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    done: "isDone",
    important: "isImportant",
    taskListId: "taskListId",
};

export type UpdateTaskMapperType = {
    id: number,
    title: string,
    description: string,
    dueDate: string,
    reminder: string,
    isImportant: boolean,
    recurrencePattern: string | null,
    createdAt: string,
    updatedAt: string,
    done: boolean,
    important: boolean
    taskListId: number
}

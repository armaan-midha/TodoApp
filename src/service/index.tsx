import { TaskType } from "../store/Task";
import { UpdateTaskMapperType, updateTaskMapper } from "../utils";
import axios, { APIResponse, processPayload } from "./axios"
import { urls } from "./urls"

async function getTaskLists() {
    try {
        const response = await axios.get(urls.TASK_LISTS);
        return APIResponse.success(response.data);
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function delteTaskList(id: number) {
    try {
        await axios.delete(`${urls.TASK_LISTS}/${id}`);
        return APIResponse.success(null);
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function createTaskList(payload: { name: string }) {
    try {
        const response = await axios.post(urls.TASK_LISTS, { name: payload.name });
        return (await APIResponse.success(response.data)).data;
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function getTasks(taskListId: number) {
    try {
        const response = await axios.get(urls.TASKS, {
            params: {
                taskListId
            }
        });
        return (await APIResponse.success(response.data)).data;
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function delteTask(id: number) {
    try {
        await axios.delete(`${urls.TASKS}/${id}`);
        return APIResponse.success(null);
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function updateTask(task: Partial<TaskType>) {
    try {
        const payload = processPayload<UpdateTaskMapperType>(task, updateTaskMapper);
        
        await axios.patch(`${urls.TASKS}/${task.id}`, payload);
        
        return APIResponse.success(null);
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function createTask(task: Pick<TaskType , 'title'>) {
    try {
        const payload = processPayload<UpdateTaskMapperType>(task, updateTaskMapper);
        const response = await axios.post(urls.TASKS, payload);
        return (await APIResponse.success(response.data)).data;
    } catch (error) {
        return APIResponse.error(error);
    }
}

async function getTask(taskId: number) {
    try {
        const response = await axios.get(`${urls.TASKS}/${taskId}`);
        return (await APIResponse.success(response.data)).data;
    } catch (error) {
        return APIResponse.error(error);
    }
}


export const API = {
    getTaskLists,
    delteTaskList,
    createTaskList,
    getTasks,
    delteTask,
    updateTask,
    createTask,
    getTask
}
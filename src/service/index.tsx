import axios, { APIResponse } from "./axios"
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




export const API = {
    getTaskLists,
    delteTaskList,
    createTaskList
}
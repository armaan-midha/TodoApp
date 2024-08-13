import { appConfig } from "../config";

const TASK_LISTS = `${appConfig.urls.TODO_REST_API_SERVICE}/api/v1/task_lists`;

const TASKS = `${appConfig.urls.TODO_REST_API_SERVICE}/api/v1/tasks`;



export const urls = {
  TASK_LISTS,
  TASKS,
};
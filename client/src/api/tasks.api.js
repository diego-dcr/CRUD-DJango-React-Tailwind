import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/tasks/api/v1/tasks/'
});

export const getAllTasks = () => {
    return api.get('/');
}

export const getTask = (id) => {
    return api.get(`/${id}/`);
}


export const createTask = (task) => {
    return api.post('/', task);
}

export const deleteTask = (id) => {
    return api.delete(`/${id}/`);
}

export const updateTask = (id, task) => {
    api.put(`/${id}/`, task);
}
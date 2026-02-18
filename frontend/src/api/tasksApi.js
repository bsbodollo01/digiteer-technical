import api from "./axios";

// GET all tasks
export const getTasks = async () => {
  const response = await api.get("/tasks");
  return response.data;
};

// GET task by id
export const getTaskById = async (id) => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

// CREATE task
export const createTask = async (task) => {
  const response = await api.post("/tasks", task);
  return response.data;
};

// UPDATE task
export const updateTask = async (id, task) => {
  const response = await api.put(`/tasks/${id}`, task);
  return response.data;
};

// DELETE task
export const deleteTask = async (id) => {
  await api.delete(`/tasks/${id}`);
};

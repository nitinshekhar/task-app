import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
const authenticatedTaskStore = (set) => ({
  tasks: [],
  userId: null, // Add a userId property to store the authenticated user's identifier

  addTask: (task) => {
    const newTask = {
      id: uuidv4(),
      userId: task.userId,
      title: task.title,
      dueDate: task.dueDate,
      completed: false,
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],      
    }));
  },
  delTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => {
        return task.id !== id;
      //  return task.id !== id || task.userId !== state.userId;
      }),
    }));
  },
  handleChange: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
      //  if (task.id === id) {
        if (task.id === id && task.userId === state.userId) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    }));
  },   
  setUpdate: (updatedTitle, updatedDueDate, id, userId) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
      //  if (task.id === id) {
          if (task.id === id && task.userId === userId) {
          return {
            ...task,
            title: updatedTitle,
            dueDate: updatedDueDate,
          };
        }
        return task;
      }),
    }));
  },
});
const unauthenticatedTaskStore = (set) => ({
  tasks: [],
  addTask: (task) => {
    const newTask = {
      id: uuidv4(),
      title: task.title,
      dueDate: task.dueDate,
      completed: false,
    };
    set((state) => ({
      tasks: [...state.tasks, newTask],
    }));
  },
  delTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((task) => {
        return task.id !== id;
      }),
    }));
  },
  handleChange: (id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            completed: !task.completed,
          };
        }
        return task;
      }),
    }));
  },  
  setUpdate: (updatedTitle, updatedDueDate, id) => {
    set((state) => ({
      tasks: state.tasks.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            title: updatedTitle,
            dueDate: updatedDueDate,
          };
        }
        return task;
      }),
    }));
  },
});
export const useAuthenticatedTaskStore = create(
  persist(authenticatedTaskStore, {
        name: 'authenticatedtasks',
  })
);
export const useUnAuthenticatedTaskStore = create(
  persist(unauthenticatedTaskStore, {
    name: 'unauthenticatedtasks',
  })
);

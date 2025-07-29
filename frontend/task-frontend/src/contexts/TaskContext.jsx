import { createContext, useContext, useReducer } from 'react';

const TaskState = createContext();
const TaskDispatch = createContext();

function taskReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.tasks;
    case 'ADD':
      return [...state, action.task];
    case 'UPDATE':
      return state.map(t =>
        t.id === action.task.id ? action.task : t
      );
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

export function TaskProvider({ children }) {
  const [tasks, dispatch] = useReducer(taskReducer, []);
  return (
    <TaskState.Provider value={tasks}>
      <TaskDispatch.Provider value={dispatch}>
        {children}
      </TaskDispatch.Provider>
    </TaskState.Provider>
  );
}

export function useTasks() {
  return useContext(TaskState);
}

export function useTaskDispatch() {
  return useContext(TaskDispatch);
}

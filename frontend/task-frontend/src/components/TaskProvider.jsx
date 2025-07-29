import React from 'react';
// alias the context provider so we don’t collide on the name
import { TaskProvider as ContextProvider } from '../contexts/TaskContext';

export default function TaskProvider({ children }) {
  return <ContextProvider>{children}</ContextProvider>;
}
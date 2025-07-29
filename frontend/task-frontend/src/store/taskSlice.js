import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api/axios';

// Async thunk to fetch all tasks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async () => {
    const response = await API.get('tasks/');
    return response.data;
  }
);

// Slice definition
const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],       // list of tasks
    loading: false,  // loading flag
    error: null,     // error message
  },
  reducers: {
    // (optional) synchronous reducers you might need
  },
  extraReducers: builder => {
    builder
      .addCase(fetchTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default tasksSlice.reducer;

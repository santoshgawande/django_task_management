import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { id: null, email: null },
  reducers: {
    setUser: (state, action) => action.payload,
    clearUser: () => ({ id: null, email: null })
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;

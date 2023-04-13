import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    id: null,
    email: "",
    name: "",
    isVerified: 0,
    role: 1,
    picture: "",
  },
};

export const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.id = action.payload.id;
      state.value.email = action.payload.email;
      state.value.name = action.payload.name;
      state.value.isVerified = action.payload.isVerified;
      state.value.role = action.payload.role;
      state.value.picture = action.payload.picture;
    },
    logout: (state) => {
      state.value.id = null;
      state.value.email = null;
      state.value.name = null;
      state.value.isVerified = null;
      state.value.role = null;
      state.value.picture = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

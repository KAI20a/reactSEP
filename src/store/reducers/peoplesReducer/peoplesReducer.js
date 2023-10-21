import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingPeople: false,
  peoples: [],
};

export const peoplesSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    addPeoplesToStore: (state, actions) => {
      const { peoples, loaded } = actions.payload;
      state.peoples = peoples;
      state.isLoadingPeople = loaded;
    },
  },
});

export const { addPeoplesToStore } = peoplesSlice.actions;
export default peoplesSlice.reducer;

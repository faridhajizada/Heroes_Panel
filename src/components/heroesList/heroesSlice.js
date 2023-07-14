import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesFetching(state, action) {
      state.heroesLoadingStatus = "loading";
    },
    heroesFetched(state, action) {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    },
    heroesFetchingError(state, action) {
      state.heroesLoadingStatus = "error";
    },
    heroesCreated(state, action) {
      state.heroes.push(action.payload);
    },
    heroesDeleted(state, action) {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesCreated,
  heroesDeleted,
} = actions;

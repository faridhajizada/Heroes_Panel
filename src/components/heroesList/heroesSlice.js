import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3005/heroes");
    }
);

const heroesSlice = createSlice({
  name: "heroes",
  initialState,
  reducers: {
    heroesCreated(state, action) {
      state.heroes.push(action.payload);
    },
    heroesDeleted(state, action) {
      state.heroes = state.heroes.filter((item) => item.id !== action.payload);
    },
  },
  //createAsyncThunk
  extraReducers: {
    [fetchHeroes.pending]: (state, action) => {
      state.heroesLoadingStatus = "loading";
    },
    [fetchHeroes.fulfilled]: (state, action) => {
      state.heroes = action.payload;
      state.heroesLoadingStatus = "idle";
    },
    [fetchHeroes.rejected]: (state, action) => {
      state.heroesLoadingStatus = "error";
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

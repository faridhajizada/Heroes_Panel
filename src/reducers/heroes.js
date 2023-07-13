import { createReducer } from "@reduxjs/toolkit";
import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroesCreated,
  heroesDeleted,
} from "../actions";

const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
};

const heroes = createReducer(
  initialState,
  {
    [heroesFetching]: (state, action) => {state.heroesLoadingStatus = "loading";},
    [heroesFetched]: (state, action) => {state.heroes = action.payload;state.heroesLoadingStatus = "idle";},
    [heroesFetchingError]: (state, action) => {  state.heroesLoadingStatus = "error";},
    [heroesCreated]: (state, action) => {state.heroes.push(action.payload)},
    [heroesDeleted]: (state, action) => { state.heroes = state.heroes.filter((item) => item.id !== action.payload);},
  },
  [],
  (state) => state
);

// const heroes = createReducer(initialState,builder=>{
//   builder
//   .addCase(heroesFetching,(state,action)=>{
//     state.heroesLoadingStatus="loading"
//   })
//   .addCase(heroesFetched,(state,action)=>{
//     state.heroes=action.payload
//     state.heroesLoadingStatus="idle"
//   })
//   .addCase(heroesFetchingError,(state,action)=>{
//     state.heroesLoadingStatus="error"
//   })
//   .addCase(heroesCreated,(state,action)=>{
//     state.heroes.push(action.payload)
//   })
//   .addCase(heroesDeleted,(state,action)=>{
//     state.heroes=state.heroes.filter((item)=>item.id!==action.payload)
//   })
//   .addDefaultCase(()=>{});
// } )

// const heroes = (state = initialState, action) => {
//   switch (action.type) {
//     case "HEROES_FETCHING":
//       return {
//         ...state,
//         heroesLoadingStatus: "loading",
//       };
//     case "HEROES_FETCHED":
//       return {
//         ...state,
//         heroes: action.payload,
//         heroesLoadingStatus: "idle",
//       };
//     case "HEROES_FETCHING_ERROR":
//       return {
//         ...state,
//         heroesLoadingStatus: "error",
//       };

//     case "HEROES_CREATED":
//       // Формируем новый массив

//       return {
//         ...state,
//         heroes: [...state.heroes, action.payload],
//         // Фильтруем новые данные по фильтру, который сейчас применяется
//       };
//     case "HEROES_DELETED":
//       // Формируем новый массив

//       return {
//         ...state,
//         heroes: state.heroes.filter((item) => item.id !== action.payload),
//         // Фильтруем новые данные по фильтру, который сейчас применяется
//       };
//     default:
//       return state;
//   }
// };

export default heroes;

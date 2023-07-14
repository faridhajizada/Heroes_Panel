import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";

export const fetchHeroes = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3005/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
  dispatch(filtersFetching());
  request("http://localhost:3005/filters")
    .then((data) => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()));
};


// export const heroesFetching = createAction("HEROES_FETCHING");
// export const heroesFetched = createAction("HEROES_FETCHED");
// export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");
export const filtersFetching = createAction("FILTERS_FETCHING");
export const filtersFetched = createAction("FILTERS_FETCHED");
export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");
export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");
// export const heroesCreated = createAction("HEROES_CREATED");
// export const heroesDeleted = createAction("HEROES_DELETED");

const React = require('react');
const { render, screen, waitFor } = require('@testing-library/react');
const { Provider } = require('react-redux');
const configureStore = require('redux-mock-store');
const { fetchMovies, fetchMovieDetails } = require('./movieSlice');
const axios = require('axios');

jest.mock('axios');

const middlewares = [require('redux-thunk').default];
const mockStore = configureStore(middlewares);

describe('movieSlice', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      movies: {
        items: [],
        loading: false,
        error: null,
      },
    });
  });

  it('should return the initial state', () => {
    const initialState = {
      items: [],
      loading: false,
      error: null,
    };
    expect(require('./movieSlice').default(undefined, {})).toEqual(initialState);
  });

  describe('fetchMovies', () => {
    it('should handle fetchMovies.pending', () => {
      const action = { type: fetchMovies.pending.type };
      const state = require('./movieSlice').default(undefined, action);
      expect(state.loading).toBe(true);
    });

    it('should handle fetchMovies.fulfilled', async () => {
      const movies = [{ id: 1, title: 'Movie 1' }];
      axios.get.mockResolvedValueOnce({ data: { results: movies } });

      const action = await store.dispatch(fetchMovies());
      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchMovies.pending.type);
      expect(actions[1].type).toBe(fetchMovies.fulfilled.type);
      expect(actions[1].payload).toEqual(movies);
    });

    it('should handle fetchMovies.rejected', async () => {
      const errorMessage = 'Fetching failed';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const action = await store.dispatch(fetchMovies());
      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchMovies.pending.type);
      expect(actions[1].type).toBe(fetchMovies.rejected.type);
      expect(actions[1].error.message).toBe(errorMessage);
    });
  });

  describe('fetchMovieDetails', () => {
    it('should handle fetchMovieDetails.pending', () => {
      const action = { type: fetchMovieDetails.pending.type };
      const state = require('./movieSlice').default(undefined, action);
      expect(state.loading).toBe(true);
    });

    it('should handle fetchMovieDetails.fulfilled', async () => {
      const movieDetails = { id: 1, title: 'Movie 1' };
      axios.get.mockResolvedValueOnce({ data: movieDetails });

      const action = await store.dispatch(fetchMovieDetails(1));
      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchMovieDetails.pending.type);
      expect(actions[1].type).toBe(fetchMovieDetails.fulfilled.type);
    });

    it('should handle fetchMovieDetails.rejected', async () => {
      const errorMessage = 'Fetching failed';
      axios.get.mockRejectedValueOnce(new Error(errorMessage));

      const action = await store.dispatch(fetchMovieDetails(1));
      const actions = store.getActions();

      expect(actions[0].type).toBe(fetchMovieDetails.pending.type);
      expect(actions[1].type).toBe(fetchMovieDetails.rejected.type);
      expect(actions[1].error.message).toBe(errorMessage);
    });
  });
});
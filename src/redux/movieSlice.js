import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from "../constants";
import { API_KEY } from "../constants";


export const fetchMovies = createAsyncThunk('movies/fetchMovies', async () => {
  try{
    const response = await axios.get(`${BASE_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
  }  catch (error) {
    console.error('Fetching movies failed: ', error);
  }
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (id) => {
  try{
    const response = await axios.get(`${BASE_URL}/${id}?api_key=${API_KEY}&language=en-US`);
    return response;
  }  catch (error) {
    console.error('Fetching movies failed: ', error);
  }
});


const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;

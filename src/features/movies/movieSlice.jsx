import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../common/apis/movieApi";
import { APIKey } from "../../common/apis/MovieApiKey";

export const fetchAsyncMovies = createAsyncThunk(
'movies/fetchAsyncMovies', 
async (term) => {
    // const movieText = "Harry";
    const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=movie`)
    return response.data;
})

export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
    async (term) => {
        // const seriesText = "Friends";
        const response = await movieApi.get(`?apiKey=${APIKey}&s=${term}&type=series`)
        return response.data;
})

 export const fetchAsyncMoviesOrShowDetail = createAsyncThunk(
        'movies/fetchAsyncMoviesOrShowDetail', 
        async (id) => {
            const response = await movieApi.get(`?apiKey=${APIKey}&i=${id}&Plot=full`)
            return response.data;
        })

const initialState = {
    movies: {},
    shows: {},
    selectedMoviesOrShow: {},
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        addMovies: (state, { payload }) => {
            state.movies = payload;
        },
        removeSelectedMovieOrShow: (state) => {
            state.selectedMoviesOrShow = {};
        }
    },
    extraReducers: {
        [fetchAsyncMovies.pending]: () => {
            console.log("pending");
        },
        [fetchAsyncMovies.fulfilled]: (state, {payload})  => {
            console.log("fetched Successfully");
            return { ...state, movies: payload};
        },
        [fetchAsyncMovies.rejected]: () => {
            console.log("Rejected");
        },
        [fetchAsyncShows.fulfilled]: (state, {payload})  => {
            console.log("fetched Successfully");
            return { ...state, shows: payload};
        },
        [fetchAsyncMoviesOrShowDetail.fulfilled]: (state, {payload})  => {
            console.log("fetched Successfully");
            return { ...state, selectedMoviesOrShow: payload};
        },
    },
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectorMovieOrShow = (state) => state.movies.selectedMoviesOrShow;
export default movieSlice.reducer;
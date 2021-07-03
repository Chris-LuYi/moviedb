import {
  createSlice,
  createSelector,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import request, { extend } from 'umi-request';

const globalTimeout = global.setTimeout;
export const sleep = async (timeout = 0) => {
  await new Promise((resolve) => globalTimeout(resolve, timeout));
};

const adapter = createEntityAdapter<any>();

const initialState = adapter.getInitialState({
  status: 'idle',
  entities: {},
});
export const getMovie = createAsyncThunk('movie/query', async ({ id }: any) => {
  return request(
    `/3/movie/${id}?language=en-US&append_to_response=release_dates,credits`,
  );
});
export const slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovie.pending, (state, action) => {
        state.status = 'processing';
        adapter.setAll(state, {});
      })
      .addCase(getMovie.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(getMovie.fulfilled, (state, action) => {
        state.status = 'idle';
        console.log(action);
        //@ts-ignore
        adapter.setAll(state, {
          data: action.payload,
        });
      });
  },
});

export default slice.reducer;

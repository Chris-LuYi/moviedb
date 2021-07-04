import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'umi-request';
import { getReduxAsyncBuilder, getReduxInitialState } from '@/utils/redux';

export const getMovie = createAsyncThunk(
  'movie/query',
  async ({ id, type = 'movie' }: any) => {
    return request(
      `/3/${type}/${id}?language=en-US&append_to_response=release_dates,credits,content_ratings,videos`,
    );
  },
);

const { initialState, adapter } = getReduxInitialState();
export const slice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: getReduxAsyncBuilder({
    thunk: getMovie,
    onStart: (state: any) => adapter.setAll(state, {}),
    onComplete: (state: any, action: any) =>
      adapter.setAll(state, {
        data: action.payload,
      }),
  }),
});

export default slice.reducer;

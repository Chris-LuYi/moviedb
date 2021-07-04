import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'umi-request';
import { getReduxAsyncBuilder, getReduxInitialState } from '@/utils/redux';

export const searchMulti = createAsyncThunk(
  'search/query',
  async ({ query }: any) => {
    return request(
      `/3/search/multi?language=en-US&page=1,2&include_adult=false&query=${query}`,
    );
  },
);

const { initialState, adapter } = getReduxInitialState();
export const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: getReduxAsyncBuilder({
    thunk: searchMulti,
    onStart: (state: any) => adapter.setAll(state, {}),
    onComplete: (
      state,
      {
        meta: {
          arg: { query },
        },
        payload,
      },
    ) => {
      const current = state.entities[query];
      adapter.setOne(state, {
        id: query,
        ...current,
        data: payload,
      });
    },
  }),
});

export default slice.reducer;

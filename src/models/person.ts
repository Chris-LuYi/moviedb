import { getReduxAsyncBuilder, getReduxInitialState } from '@/utils/redux';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'umi-request';

export const getSingle = createAsyncThunk(
  'person/query',
  async ({ id }: any) => {
    return request(
      `/3/person/${id}?language=en-US&append_to_response=movie_credits,tv_credits`,
    );
  },
);

const { initialState, adapter } = getReduxInitialState();
export const slice = createSlice({
  name: 'person',
  initialState: initialState,
  reducers: {},
  extraReducers: getReduxAsyncBuilder({
    thunk: getSingle,
    onStart: (state: any) => adapter.setAll(state, {}),
    onComplete: (state: any, action: any) =>
      adapter.setAll(state, {
        data: action.payload,
      }),
  }),
});

export default slice.reducer;

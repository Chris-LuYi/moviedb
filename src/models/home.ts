import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import request from 'umi-request';
import { getReduxAsyncBuilder, getReduxInitialState } from '@/utils/redux';

const defaultItems: Record<string, number>[] = [];
for (let index = 0; index < 20; index++) {
  defaultItems.push({ id: index });
}
export const getTrendingList = createAsyncThunk(
  'home/query',
  async ({ type, category, platform }: any) => {
    // await sleep(100000);
    switch (category) {
      case 'trending':
        return request('/3/trending/all/' + type);
      case 'popular':
        return request('/3/' + platform + '/popular');

      default:
        break;
    }
  },
);

const { initialState, adapter } = getReduxInitialState({
  status: {
    trending: 'idle',
    popular: 'idle',
  },
  entities: {
    trending: {
      id: 'trending',
      data: [],
    },
    popular: {
      id: 'popular',
      data: [],
    },
  },
});

export const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: getReduxAsyncBuilder({
    thunk: getTrendingList,
    onStart: (
      state,
      {
        meta: {
          arg: { category },
        },
      },
    ) => {
      state.status[category] = 'processing';
      const current = state.entities[category];
      adapter.setOne(state, {
        ...current,
        data: defaultItems,
      });
    },
    onReject: (
      state,
      {
        meta: {
          arg: { category },
        },
      },
    ) => {
      state.status[category] = 'idle';
    },
    onComplete: (
      state,
      {
        meta: {
          arg: { category },
        },
        payload,
      },
    ) => {
      state.status[category] = 'idle';
      const current = state.entities[category];
      //@ts-ignore
      adapter.setOne(state, {
        ...current,
        data: payload.results,
      });
    },
  }),
});

export default slice.reducer;

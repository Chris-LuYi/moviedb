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

const trendingAdapter = createEntityAdapter<MoviePostInfo>();

const defaultItems = [];
for (let index = 0; index < 20; index++) {
  defaultItems.push({ id: index });
}
const initialState = trendingAdapter.getInitialState({
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
export const getTrendingList = createAsyncThunk(
  'home/query',
  async ({ type, category, platform }: any) => {
    // await sleep(100000);
    switch (category) {
      case 'trending':
        return request('/3/trending/movie/' + type);
      case 'popular':
        return request('/3/' + platform + '/popular');

      default:
        break;
    }
  },
);
export const slice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        getTrendingList.pending,
        (
          state,
          {
            meta: {
              arg: { category },
            },
            payload,
          },
        ) => {
          state.status[category] = 'processing';
          const current = state.entities[category];
          trendingAdapter.setOne(state, {
            ...current,
            data: defaultItems,
          });
        },
      )
      .addCase(
        getTrendingList.rejected,
        (
          state,
          {
            meta: {
              arg: { category },
            },
            payload,
          },
        ) => {
          state.status[category] = 'idle';
        },
      )
      .addCase(
        getTrendingList.fulfilled,
        (
          state,
          {
            meta: {
              arg: { category },
            },
            payload,
          },
        ) => {
          console.log(category);
          state.status[category] = 'idle';
          const current = state.entities[category];
          //@ts-ignore
          trendingAdapter.setOne(state, {
            ...current,
            data: payload.results,
          });
        },
      );
  },
});

export default slice.reducer;

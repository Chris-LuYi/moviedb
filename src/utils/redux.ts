import { createEntityAdapter } from '@reduxjs/toolkit';

export const getReduxInitialState = <T>(defaultState?: Record<string, any>) => {
  const adapter = createEntityAdapter<T>();

  const initialState = adapter.getInitialState({
    status: 'idle',
    entities: {},
    ...defaultState,
  });

  return { initialState, adapter };
};

export const getReduxAsyncBuilder = ({
  thunk,
  onStart,
  onReject,
  onComplete,
}: {
  thunk: any;
  onStart?: (state: any, action: any) => void;
  onReject?: (state: any, action: any) => void;
  onComplete?: (state: any, action: any) => void;
}) => {
  return (builder: any) => {
    builder
      .addCase(thunk.pending, (state: any, action: any) => {
        if (typeof state.status === 'string') state.status = 'processing';
        onStart?.(state, action);
      })
      .addCase(thunk.rejected, (state: any, action: any) => {
        if (typeof state.status === 'string') state.status = 'idle';
        onReject?.(state, action);
      })
      .addCase(thunk.fulfilled, (state: any, action: any) => {
        if (typeof state.status === 'string') state.status = 'idle';
        onComplete?.(state, action);
      });
  };
};

import { configureStore } from '@reduxjs/toolkit';
import { consumptionApi } from './redux/services/consumption';
import userReducer from './redux/features/user/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    [consumptionApi.reducerPath]: consumptionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(consumptionApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

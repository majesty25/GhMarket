import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    // Add the RTK Query reducer under its `reducerPath`
    [api.reducerPath]: api.reducer,
  },
  // Ensure the RTK Query middleware is added
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

// Optional: derive RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

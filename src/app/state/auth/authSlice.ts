import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {RootState} from '../store';

interface InitialStateProps {
  userId: string;
}

const initialState: InitialStateProps = {
  userId: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUserId: (
      state,
      action: PayloadAction<InitialStateProps['userId']>,
    ) => {
      state.userId = action.payload;
    },
  },
});

// export selectors
export const selectUserId = (state: RootState) => state.auth.userId;

// export actions
export const {updateUserId} = authSlice.actions;

// export reducer
export default authSlice.reducer;

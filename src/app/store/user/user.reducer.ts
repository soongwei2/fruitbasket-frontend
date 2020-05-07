import { createReducer, on } from '@ngrx/store';
import { RootState } from '..';

import { User } from 'src/app/shared/models/user';
import { UpdateUser, DeleteUser } from './user.action';

export interface UserState extends User{
  
}
export const initialState: UserState = {
  email: null,
  password: null,
  deleted: null,
};

export const userReducer = createReducer(initialState,
  on(UpdateUser, (state, action) => { return { ...state, ...action.user } }),
  on(DeleteUser, (state, action) => { return { ...state, ...initialState }}),
);


//SELECTORS
export const selectUser = {
  user: (state: RootState) => state.user,
}


import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/shared/models/user';

export const UpdateUser = createAction('[User] updateUser', props<{ user: User }>());
export const DeleteUser = createAction('[User] DeleteUser');

export const loginUser = createAction('[user-service] loginUser', props<{ user: User }>());
export const createUser = createAction('[user-service] createUser', props<{ user: User }>());
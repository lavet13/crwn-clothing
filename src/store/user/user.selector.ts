import { UserState } from './user.reducer';

export const selectCurrentUser = (state): UserState => state.user.currentUser;

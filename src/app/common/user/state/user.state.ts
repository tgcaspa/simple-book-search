export interface UserState {
  username: string;
}

export const createInitialUserState = (): UserState => ({
  username: ''
});

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
    { id: "1", name: "Carlos Daniel", email: "carlos@example.com", github: "CalitoTech" },
    { id: "2", name: "John Doe", email: "john@example.com", github: "johndoe" },
    { id: "3", name: "Jane Smith", email: "jane@example.com", github: "jsmith" },
];

export type UserId = string;

export interface User {
    name: string;
    email: string;
    github: string;
}

export interface UserWithId extends User {
    id: UserId;
}

const initialState: UserWithId[] = (() => {
    const persistedState = localStorage.getItem("__redux__state__");
    return persistedState ? JSON.parse(persistedState).users : DEFAULT_STATE;
})();

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addNewUser: (state, action: PayloadAction<User>) => {
            const id = crypto.randomUUID();
            return [...state, { id, ...action.payload }];
        },
        deleteUserById: (state, action: PayloadAction<UserId>) => {
            const id: UserId = action.payload;
            return state.filter(user => user.id !== id);
        },
        rollbackUser: (state, action: PayloadAction<UserWithId>) => {
            const isUserAlreadyDefined = state.some(user => user.id === action.payload.id);
            if (!isUserAlreadyDefined) {
                return [...state, action.payload];
            }
        },
    },
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
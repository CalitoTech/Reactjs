import { configureStore, type Middleware } from "@reduxjs/toolkit";
import usersReducer, { rollbackUser } from "./users/slice";
import { toast } from "sonner";


const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
    next(action);
    const state = store.getState();
    localStorage.setItem("__redux__state__", JSON.stringify(state));
}

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
    const { type, payload } = action;
    const previousState = store.getState();
    next(action)

    if (type === "users/deleteUserById") {
        const userIdToRemove = payload;
        const userToRemove = previousState.users.find((user) => user.id === userIdToRemove);

        fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (response.ok) toast.success(`Usuario ${userIdToRemove} eliminado de la base de datos.`);
            throw new Error("Error al eliminar el usuario");
        })
        .catch(error => {
            toast.error(`Error al eliminar el ${userIdToRemove} de la base de datos.`);
            if (userToRemove) store.dispatch(rollbackUser(userToRemove));
            console.log("Error:", error);
        });
    }
}
        

export const store = configureStore({
    reducer: {
        users: usersReducer,
    },
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
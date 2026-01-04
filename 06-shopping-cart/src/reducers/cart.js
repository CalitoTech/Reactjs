export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []

export const updateLocalStorage = (cart) => {
    window.localStorage.setItem('cart', JSON.stringify(cart))
}

export const CART_ACTION_TYPES = {
    ADD_TO_CART: 'ADD_TO_CART',
    REMOVE_FROM_CART: 'REMOVE_FROM_CART',
    CLEAR_CART: 'CLEAR_CART'
}

export const cartReducer = (state, action) => {
    const { type:actionType, payload: actionPayload } = action
    switch (actionType) {
        case CART_ACTION_TYPES.ADD_TO_CART: {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex((item) => item.id === id)
            if (productInCartIndex >= 0) {
                // opcion 1, posibilidad bajo rendimiento pero facil
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                
                // opcion 2 con map
                // const newState = state.map(item => {
                //     if (item.id === id) {
                //         return {
                //             ...item,
                //             quantity: item.quantity + 1
                //         }
                //     }
                //     return item
                // })

                // opcion 3 con spreadOperator y slice (la mas rapida)
                // const newState = [
                //     ...state.slice(0, productInCartIndex),
                //     {
                //         ...state[productInCartIndex],
                //         quantity: state[productInCartIndex].quantity + 1
                //     },
                //     ...state.slice(productInCartIndex + 1)
                // ]

                updateLocalStorage(newState)
                return newState
            }
            const newState = [
                ...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
            ]
            updateLocalStorage(newState)
            return newState
        }
        
        case CART_ACTION_TYPES.REMOVE_FROM_CART: {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState
        }

        case CART_ACTION_TYPES.CLEAR_CART: {
            updateLocalStorage(cartInitialState)
            return cartInitialState
        }
    }

    return state
}
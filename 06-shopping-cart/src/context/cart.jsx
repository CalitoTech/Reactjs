import { useReducer, createContext } from "react";
import { cartReducer, cartInitialState, CART_ACTION_TYPES } from "../reducers/cart.js";

export const CartContext = createContext()

// testeando reducer para añadir un producto al carrito
// expect(
//     reducer([], { type: 'ADD_TO_CART', payload: { id: 1 } })
// ).toEqual([{ id: 1, quantity: 1}])

function useCartProvided () {
    const [state, dispatch] = useReducer(cartReducer, cartInitialState)

    const addToCart = (product) => {
        dispatch({ type: CART_ACTION_TYPES.ADD_TO_CART, payload: product })
    }

    const removeFromCart = (product) => {
        dispatch({ type: CART_ACTION_TYPES.REMOVE_FROM_CART, payload: product })
    }

    const clearCart = () => {
        dispatch({ type: CART_ACTION_TYPES.CLEAR_CART })
    }
    return {
        state,
        addToCart,
        removeFromCart,
        clearCart
    }
}

export function CartProvider ({ children }) {
    const { state, addToCart, removeFromCart, clearCart } = useCartProvided()
    return (
        <CartContext.Provider value={{
            cart: state,
            addToCart,
            clearCart,
            removeFromCart
        }}>
            {children}
        </CartContext.Provider>
    )
}

// Version de context sin Reducer

// import { createContext, useState } from "react";

// export const CartContext = createContext()

// export function CartProvider ({ children }) {
//     const [cart, setCart] = useState([])

//     const addToCart = (product) => {
//         // opcion 1
//         // setCart([...cart, product])

//         const productInCartIndex = cart.findIndex((item) => item.id === product.id)
//         // opcion 2 con structuredClone, posiblemente pesado pero eficiente sin usar estados
//         if (productInCartIndex >= 0) {
//             const newCart = structuredClone(cart)
//             newCart[productInCartIndex].quantity += 1
//             return setCart(newCart)
//         }
//         setCart(prevState => ([
//             ...prevState,
//             {
//                 ...product,
//                 quantity: 1
//             }
//         ]))
//     }

//     const removeFromCart = product => {
//        setCart(prevState => prevState.filter(item => item.id !== product.id))
//     }

//     const clearCart = () => {
//         setCart([])
//     }

//     return (
//         <CartContext.Provider value={{
//             cart,
//             addToCart,
//             clearCart,
//             removeFromCart
//         }}>
//             {children}
//         </CartContext.Provider>
//     )
// }
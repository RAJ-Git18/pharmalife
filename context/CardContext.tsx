"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

// 1. Define the context type
type CartContextType = {
    cartCount: number;
    setCartCount: (count: number) => void;
};

// 2. Create the context
const CartContext = createContext<CartContextType | undefined>(undefined);

// 3. Create provider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartCount, setCartCount] = useState(0)

    useEffect(() => {
        const count = localStorage.getItem('cartCount')
        if (count === null) {
            setCartCount(0)
            return
        }
        setCartCount(parseInt(count, 10))

    }, [])


    // useEffect(() => {
    //     if (cartCount !== null) {
    //         localStorage.setItem('cartCount', cartCount.toString())
    //     }
    // }, [cartCount])


    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

// 4. Custom hook to use the cart context
export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
};

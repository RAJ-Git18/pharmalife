"use client";

import React, { createContext, useState, useContext, useEffect } from "react";

type CartContextType = {
    cartCount: number;
    setCartCount: (count: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    // Initialize state with value from localStorage or default to 0
    const [cartCount, setCartCount] = useState<number>(() => {
        if (typeof window !== 'undefined') {
            const count = localStorage.getItem('cartCount');
            return count ? parseInt(count, 10) : 0;
        }
        return 0;
    });

    // Save to localStorage whenever cartCount changes
    useEffect(() => {
        localStorage.setItem('cartCount', cartCount.toString());
    }, [cartCount]);

    return (
        <CartContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
};
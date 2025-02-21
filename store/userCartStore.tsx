// store/useCartStore.ts
import { create } from 'zustand';

interface CartState {
    cartCount: number;
    addToCart: () => void;
}

const useCartStore = create<CartState>((set: (arg0: (state: any) => { cartCount: any; }) => any) => ({
    cartCount: 0,
    addToCart: () => set((state: { cartCount: number; }) => ({ cartCount: state.cartCount + 1 })),
}));

export default useCartStore;

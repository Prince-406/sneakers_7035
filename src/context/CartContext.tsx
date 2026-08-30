'use client';

import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { CartContextType, CartItem, Product } from '@/types';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; quantity: number; size: number; color: string } }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; size: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; size: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartState {
  items: CartItem[];
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'LOAD_CART':
      return { items: action.payload };

    case 'ADD_ITEM': {
      const { product, quantity, size, color } = action.payload;
      const existing = state.items.find(
        (i) => i.product.id === product.id && i.size === size
      );
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { product, quantity, size, color }] };
    }

    case 'REMOVE_ITEM':
      return {
        items: state.items.filter(
          (i) => !(i.product.id === action.payload.productId && i.size === action.payload.size)
        ),
      };

    case 'UPDATE_QUANTITY': {
      const { productId, size, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => !(i.product.id === productId && i.size === size)
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.id === productId && i.size === size ? { ...i, quantity } : i
        ),
      };
    }

    case 'CLEAR_CART':
      return { items: [] };

    default:
      return state;
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const stored = localStorage.getItem('sneakers-cart');
      if (stored) {
        const parsed = JSON.parse(stored) as CartItem[];
        dispatch({ type: 'LOAD_CART', payload: parsed });
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sneakers-cart', JSON.stringify(state.items));
    } catch {
      // ignore storage errors
    }
  }, [state.items]);

  const addItem = (product: Product, quantity: number, size: number, color: string) =>
    dispatch({ type: 'ADD_ITEM', payload: { product, quantity, size, color } });

  const removeItem = (productId: string, size: number) =>
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, size } });

  const updateQuantity = (productId: string, size: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, size, quantity } });

  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items: state.items, addItem, removeItem, updateQuantity, clearCart, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
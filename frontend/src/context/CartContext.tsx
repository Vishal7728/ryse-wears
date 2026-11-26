'use client';

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../services/api';

interface CartItem extends Product {
  quantity: number;
  _id?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number | string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number | string; quantity: number } }
  | { type: 'CLEAR_CART' };

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: number | string) => void;
  updateQuantity: (productId: number | string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const getId = (item: CartItem) => String(item.id ?? item._id ?? '');

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const incomingId = String(action.payload.id ?? (action.payload as Product & { _id?: string })._id ?? '');
      const existing = state.items.find((item) => getId(item) === incomingId);
      const items = existing
        ? state.items.map((item) => getId(item) === incomingId ? { ...item, quantity: item.quantity + 1 } : item)
        : [...state.items, { ...action.payload, quantity: 1 }];
      return { items, total: state.total + Number(action.payload.price || 0) };
    }
    case 'REMOVE_ITEM': {
      const target = String(action.payload);
      const removed = state.items.find((item) => getId(item) === target);
      if (!removed) return state;
      return {
        items: state.items.filter((item) => getId(item) !== target),
        total: Math.max(0, state.total - Number(removed.price || 0) * removed.quantity),
      };
    }
    case 'UPDATE_QUANTITY': {
      const target = String(action.payload.id);
      const item = state.items.find((entry) => getId(entry) === target);
      if (!item) return state;
      const nextQuantity = Math.max(1, action.payload.quantity);
      const difference = nextQuantity - item.quantity;
      return {
        items: state.items.map((entry) => getId(entry) === target ? { ...entry, quantity: nextQuantity } : entry),
        total: Math.max(0, state.total + Number(item.price || 0) * difference),
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0 };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (productId: number | string) => dispatch({ type: 'REMOVE_ITEM', payload: productId });
  const updateQuantity = (productId: number | string, quantity: number) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return <CartContext.Provider value={{ ...state, addItem, removeItem, updateQuantity, clearCart }}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}

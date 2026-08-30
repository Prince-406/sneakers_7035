'use client';

import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { useCart } from '@/context/CartContext';
import { XMarkIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';

interface CartDropdownProps {
  onClose: () => void;
}

export default function CartDropdown({ onClose }: CartDropdownProps) {
  const { items, removeItem, updateQuantity, subtotal, totalItems } = useCart();

  return (
    <div className="absolute right-0 top-full mt-3 w-96 max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-2xl border border-border overflow-hidden animate-scale-in z-50">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-2">
          <ShoppingBagIcon className="w-5 h-5 text-primary" />
          <span className="font-bold text-base text-foreground">
            Cart ({totalItems})
          </span>
        </div>
        <button
          onClick={onClose}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors"
          aria-label="Close cart"
        >
          <XMarkIcon className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Items */}
      <div className="max-h-80 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-5 gap-3">
            <ShoppingBagIcon className="w-12 h-12 text-muted" />
            <p className="text-muted-foreground font-medium text-sm">Your cart is empty</p>
            <Link
              href="/collections"
              onClick={onClose}
              className="text-primary font-semibold text-sm hover:underline"
            >
              Browse collection →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="flex gap-3 p-4 cart-item-enter"
              >
                {/* Product Image */}
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-muted shrink-0">
                  <AppImage
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Size {item.size} · {item.color}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    {/* Qty Controls */}
                    <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-card transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <MinusIcon className="w-3 h-3 text-foreground" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold text-foreground">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-card transition-colors"
                        aria-label="Increase quantity"
                      >
                        <PlusIcon className="w-3 h-3 text-foreground" />
                      </button>
                    </div>
                    <span className="font-bold text-sm text-foreground">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.product.id, item.size)}
                  className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground"
                  aria-label="Remove item"
                >
                  <TrashIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {items.length > 0 && (
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground font-medium">Subtotal</span>
            <span className="font-bold text-lg text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <Link
            href="/checkout"
            onClick={onClose}
            className="block w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-center text-sm hover:bg-accent transition-colors duration-200"
          >
            Checkout · ${subtotal.toFixed(2)}
          </Link>
          <Link
            href="/collections"
            onClick={onClose}
            className="block w-full py-2.5 rounded-xl border border-border text-foreground font-semibold text-center text-sm hover:bg-muted transition-colors duration-200"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { useCart } from '@/context/CartContext';
import { CheckoutFormData } from '@/types';
import {
  CheckIcon,
  ChevronRightIcon,
  LockClosedIcon,
  TruckIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

type Step = 'cart' | 'shipping' | 'payment' | 'confirmed';

const STEPS: { key: Step; label: string }[] = [
  { key: 'cart', label: 'Cart' },
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
];

const EMPTY_FORM: CheckoutFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: 'United States',
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
};

export default function CheckoutClient() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>('cart');
  const [form, setForm] = useState<CheckoutFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<CheckoutFormData>>({});

  const shipping = subtotal >= 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleFormChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validateShipping = (): boolean => {
    const required: (keyof CheckoutFormData)[] = ['firstName', 'lastName', 'email', 'address', 'city', 'state', 'zip'];
    const newErrors: Partial<CheckoutFormData> = {};
    required.forEach((field) => {
      if (!form[field].trim()) newErrors[field] = 'Required';
    });
    if (form.email && !form.email.includes('@')) newErrors.email = 'Invalid email';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const required: (keyof CheckoutFormData)[] = ['cardNumber', 'cardName', 'expiry', 'cvv'];
    const newErrors: Partial<CheckoutFormData> = {};
    required.forEach((field) => {
      if (!form[field].trim()) newErrors[field] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validatePayment()) return;
    clearCart();
    setStep('confirmed');
  };

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  if (step === 'confirmed') {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckIcon className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-3">Order Confirmed!</h1>
        <p className="text-muted-foreground text-lg mb-2">
          Thank you, {form.firstName}! Your order is on its way.
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Confirmation sent to <strong className="text-foreground">{form.email}</strong>
        </p>
        <div className="glass rounded-2xl p-6 text-left mb-8">
          <div className="flex items-center gap-3 mb-4">
            <TruckIcon className="w-5 h-5 text-primary" />
            <p className="font-bold text-foreground">Delivery Details</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {form.address}, {form.city}, {form.state} {form.zip}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Estimated delivery: 3–5 business days
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/collections"
            className="px-8 py-4 rounded-2xl border border-border text-foreground font-bold hover:bg-muted transition-colors"
          >
            Browse More Styles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      {/* Page title */}
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground">
          {step === 'cart' ? 'Your Cart' : step === 'shipping' ? 'Shipping Info' : 'Payment'}
        </h1>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0 mb-10">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.key}>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  i < stepIndex
                    ? 'checkout-step-done'
                    : i === stepIndex
                    ? 'checkout-step-active' :'checkout-step-pending'
                }`}
              >
                {i < stepIndex ? <CheckIcon className="w-4 h-4" /> : i + 1}
              </div>
              <span
                className={`text-sm font-semibold hidden sm:block ${
                  i === stepIndex ? 'text-foreground' : 'text-muted-foreground'
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`h-px flex-1 mx-3 transition-all duration-500 ${i < stepIndex ? 'bg-foreground' : 'bg-border'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Left: Form area */}
        <div className="lg:col-span-3">
          {step === 'cart' && (
            <CartStep
              items={items}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
              onContinue={() => setStep('shipping')}
            />
          )}
          {step === 'shipping' && (
            <ShippingStep
              form={form}
              errors={errors}
              onChange={handleFormChange}
              onContinue={() => { if (validateShipping()) setStep('payment'); }}
              onBack={() => setStep('cart')}
            />
          )}
          {step === 'payment' && (
            <PaymentStep
              form={form}
              errors={errors}
              onChange={handleFormChange}
              onSubmit={handlePlaceOrder}
              onBack={() => setStep('shipping')}
            />
          )}
        </div>

        {/* Right: Order summary */}
        <div className="lg:col-span-2">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── Cart Step ─── */
function CartStep({
  items,
  removeItem,
  updateQuantity,
  onContinue,
}: {
  items: ReturnType<typeof useCart>['items'];
  removeItem: (id: string, size: number) => void;
  updateQuantity: (id: string, size: number, qty: number) => void;
  onContinue: () => void;
}) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <ShoppingBagIcon className="w-16 h-16 text-muted mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Add some sneakers to get started.</p>
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-colors"
        >
          Browse Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={`${item.product.id}-${item.size}`}
          className="flex gap-4 p-4 bg-card rounded-2xl border border-border"
        >
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-muted shrink-0">
            <AppImage
              src={item.product.images[0]}
              alt={item.product.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-bold text-sm text-foreground">{item.product.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Size {item.size} · {item.color}
                </p>
              </div>
              <button
                onClick={() => removeItem(item.product.id, item.size)}
                className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors text-muted-foreground"
                aria-label="Remove"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-1 bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-card transition-colors"
                  aria-label="Decrease"
                >
                  <MinusIcon className="w-3 h-3 text-foreground" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-foreground">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                  className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-card transition-colors"
                  aria-label="Increase"
                >
                  <PlusIcon className="w-3 h-3 text-foreground" />
                </button>
              </div>
              <div className="text-right">
                <p className="font-bold text-base text-foreground">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </p>
                {item.product.originalPrice > item.product.price && (
                  <p className="text-xs text-muted-foreground line-through">
                    ${(item.product.originalPrice * item.quantity).toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={onContinue}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-base hover:bg-accent transition-colors mt-6"
      >
        Continue to Shipping
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
}

/* ─── Shipping Step ─── */
function ShippingStep({
  form,
  errors,
  onChange,
  onContinue,
  onBack,
}: {
  form: CheckoutFormData;
  errors: Partial<CheckoutFormData>;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  onContinue: () => void;
  onBack: () => void;
}) {
  const fields: {
    id: keyof CheckoutFormData;
    label: string;
    type?: string;
    placeholder: string;
    half?: boolean;
  }[] = [
    { id: 'firstName', label: 'First Name', placeholder: 'Jordan', half: true },
    { id: 'lastName', label: 'Last Name', placeholder: 'Williams', half: true },
    { id: 'email', label: 'Email Address', type: 'email', placeholder: 'jordan@example.com' },
    { id: 'phone', label: 'Phone (optional)', type: 'tel', placeholder: '+1 (555) 000-0000' },
    { id: 'address', label: 'Street Address', placeholder: '123 Sneaker Lane' },
    { id: 'city', label: 'City', placeholder: 'New York', half: true },
    { id: 'state', label: 'State', placeholder: 'NY', half: true },
    { id: 'zip', label: 'ZIP Code', placeholder: '10001', half: true },
    { id: 'country', label: 'Country', placeholder: 'United States', half: true },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map((f) => (
          <div key={f.id} className={f.half ? '' : 'sm:col-span-2'}>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              {f.label}
            </label>
            <input
              type={f.type || 'text'}
              value={form[f.id]}
              onChange={(e) => onChange(f.id, e.target.value)}
              placeholder={f.placeholder}
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                errors[f.id] ? 'border-red-400 bg-red-50/30' : 'border-border'
              }`}
            />
            {errors[f.id] && (
              <p className="text-xs text-red-500 mt-1">{errors[f.id]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl border border-border text-foreground font-bold hover:bg-muted transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onContinue}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-colors"
        >
          Continue to Payment
          <ChevronRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ─── Payment Step ─── */
function PaymentStep({
  form,
  errors,
  onChange,
  onSubmit,
  onBack,
}: {
  form: CheckoutFormData;
  errors: Partial<CheckoutFormData>;
  onChange: (field: keyof CheckoutFormData, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}) {
  return (
    <div className="space-y-6">
      {/* Security badge */}
      <div className="flex items-center gap-2 p-3 rounded-xl bg-green-50 border border-green-200">
        <LockClosedIcon className="w-4 h-4 text-green-600 shrink-0" />
        <p className="text-xs font-semibold text-green-700">
          Your payment info is encrypted and secure. We never store card details.
        </p>
      </div>

      {/* Card fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Card Number
          </label>
          <input
            type="text"value={form.cardNumber}
            onChange={(e) => onChange('cardNumber', e.target.value)}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
              errors.cardNumber ? 'border-red-400 bg-red-50/30' : 'border-border'
            }`}
          />
          {errors.cardNumber && <p className="text-xs text-red-500 mt-1">{errors.cardNumber}</p>}
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Cardholder Name
          </label>
          <input
            type="text"
            value={form.cardName}
            onChange={(e) => onChange('cardName', e.target.value)}
            placeholder="Jordan Williams"
            className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
              errors.cardName ? 'border-red-400 bg-red-50/30' : 'border-border'
            }`}
          />
          {errors.cardName && <p className="text-xs text-red-500 mt-1">{errors.cardName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              Expiry Date
            </label>
            <input
              type="text"
              value={form.expiry}
              onChange={(e) => onChange('expiry', e.target.value)}
              placeholder="MM / YY"
              maxLength={7}
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                errors.expiry ? 'border-red-400 bg-red-50/30' : 'border-border'
              }`}
            />
            {errors.expiry && <p className="text-xs text-red-500 mt-1">{errors.expiry}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
              CVV
            </label>
            <input
              type="text"
              value={form.cvv}
              onChange={(e) => onChange('cvv', e.target.value)}
              placeholder="123"
              maxLength={4}
              className={`w-full px-4 py-3.5 rounded-xl border bg-card text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all ${
                errors.cvv ? 'border-red-400 bg-red-50/30' : 'border-border'
              }`}
            />
            {errors.cvv && <p className="text-xs text-red-500 mt-1">{errors.cvv}</p>}
          </div>
        </div>
      </div>

      {/* Accepted cards */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground font-medium">Accepted:</span>
        {['Visa', 'MC', 'Amex', 'Discover'].map((card) => (
          <span
            key={card}
            className="px-2.5 py-1 rounded-md bg-muted text-xs font-bold text-muted-foreground border border-border"
          >
            {card}
          </span>
        ))}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          onClick={onBack}
          className="flex-1 py-4 rounded-2xl border border-border text-foreground font-bold hover:bg-muted transition-colors"
        >
          ← Back
        </button>
        <button
          onClick={onSubmit}
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-primary-foreground font-bold hover:bg-accent transition-colors"
          style={{ boxShadow: '0 8px 32px rgba(224,123,57,0.25)' }}
        >
          <LockClosedIcon className="w-4 h-4" />
          Place Order
        </button>
      </div>
    </div>
  );
}

/* ─── Order Summary ─── */
function OrderSummary({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: {
  items: ReturnType<typeof useCart>['items'];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) {
  return (
    <div className="bg-card rounded-3xl border border-border overflow-hidden sticky top-24">
      <div className="px-6 py-5 border-b border-border">
        <h2 className="font-bold text-base text-foreground">Order Summary</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{items.length} item{items.length !== 1 ? 's' : ''}</p>
      </div>

      {/* Items list */}
      {items.length > 0 && (
        <div className="divide-y divide-border max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={`${item.product.id}-${item.size}`}
              className="flex items-center gap-3 px-6 py-4"
            >
              <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-muted shrink-0">
                <AppImage
                  src={item.product.images[0]}
                  alt={item.product.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{item.product.name}</p>
                <p className="text-xs text-muted-foreground">Size {item.size}</p>
              </div>
              <p className="text-sm font-bold text-foreground shrink-0">
                ${(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Totals */}
      <div className="px-6 py-5 space-y-3 border-t border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Subtotal</span>
          <span className="font-semibold text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Shipping</span>
          <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : 'text-foreground'}`}>
            {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
          </span>
        </div>
        {shipping > 0 && (
          <p className="text-xs text-muted-foreground">
            Free shipping on orders over $50
          </p>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground font-medium">Tax (8%)</span>
          <span className="font-semibold text-foreground">${tax.toFixed(2)}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-border">
          <span className="font-bold text-base text-foreground">Total</span>
          <span className="font-bold text-xl text-foreground">${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Trust */}
      <div className="px-6 pb-5">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-muted/50">
          <LockClosedIcon className="w-4 h-4 text-primary shrink-0" />
          <p className="text-xs text-muted-foreground font-medium">
            256-bit SSL encrypted checkout
          </p>
        </div>
      </div>
    </div>
  );
}
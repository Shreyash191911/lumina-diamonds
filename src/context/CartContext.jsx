import React, { createContext, useContext, useState, useEffect } from 'react';
import { startCheckout } from '/services/echo.js';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('lumina_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedDiamond, setSelectedDiamond] = useState(null);
  const [checkoutError, setCheckoutError] = useState(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('lumina_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (diamond) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === diamond.id);
      if (exists) return prev;
      return [...prev, { ...diamond, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setCheckoutError(null);
    try {
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      // Call Echo checkout flow
      await startCheckout(items, { provider: 'stripe' });
    } catch (err) {
      console.error(err);
      setCheckoutError(err.message || 'Checkout is simulated in demo mode. Connect Stripe plugin to enable live payments.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      isConsultationOpen,
      setIsConsultationOpen,
      selectedDiamond,
      setSelectedDiamond,
      handleCheckout,
      checkoutLoading,
      checkoutError,
      setCheckoutError
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}

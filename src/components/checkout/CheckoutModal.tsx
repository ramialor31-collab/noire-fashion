import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, ArrowLeft, ArrowRight, ShieldCheck, CreditCard, Lock, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import type { ShippingInfo, ShippingSpeed, PaymentMethod, CardDetails, OrderConfirmationData } from '../../types';
import { OrderConfirmation } from './OrderConfirmation';

type CheckoutStep = 'information' | 'shipping' | 'payment' | 'review' | 'confirmation';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    subtotal,
    discount,
    total,
    clearCart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    amountUntilFreeShipping,
  } = useCart();

  const [step, setStep] = useState<CheckoutStep>('information');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<OrderConfirmationData | null>(null);

  // Form States
  const [info, setInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'United States',
  });

  const [shippingSpeed, setShippingSpeed] = useState<ShippingSpeed>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [card, setCard] = useState<CardDetails>({
    number: '',
    exp: '',
    cvc: '',
    name: '',
  });

  // Pre-fill demo data shortcut for quick testing
  const handlePrefillDemo = () => {
    setInfo({
      firstName: 'Alexander',
      lastName: 'Vane',
      email: 'alexander.vane@noire-atelier.com',
      phone: '+1 (555) 019-2834',
      address: '742 Evergreen Terrace',
      apartment: 'Suite 4B',
      city: 'New York',
      postalCode: '10001',
      country: 'United States',
    });
    setCard({
      number: '4242 •••• •••• 4242',
      exp: '12/28',
      cvc: '888',
      name: 'ALEXANDER VANE',
    });
  };

  // Card formatting helpers
  const handleCardNumberChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 16);
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned;
    setCard((prev) => ({ ...prev, number: formatted }));
  };

  const handleExpChange = (val: string) => {
    const cleaned = val.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      setCard((prev) => ({ ...prev, exp: `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` }));
    } else {
      setCard((prev) => ({ ...prev, exp: cleaned }));
    }
  };

  const shippingCost = shippingSpeed === 'express' ? 25 : (amountUntilFreeShipping === 0 ? 0 : 15);
  const finalOrderTotal = total + shippingCost;

  // Process Simulated Payment
  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setProcessingStatus('INITIALIZING SECURE DEMO GATEWAY...');

    setTimeout(() => {
      setProcessingStatus('VERIFYING ENCRYPTED TOKENS...');
    }, 900);

    setTimeout(() => {
      setProcessingStatus('PAYMENT SIMULATED • ORDER AUTHORIZED');
    }, 1800);

    setTimeout(() => {
      const orderNum = `NO-${Math.floor(10000 + Math.random() * 90000)}`;
      const confirmationData: OrderConfirmationData = {
        orderId: orderNum,
        timestamp: new Date().toISOString(),
        items: [...cart],
        subtotal,
        discount,
        shipping: shippingCost,
        total: finalOrderTotal,
        shippingInfo: info,
        shippingSpeed,
        paymentMethod,
      };

      setConfirmedOrder(confirmationData);
      setIsProcessing(false);
      clearCart();
      setStep('confirmation');
    }, 2400);
  };

  if (!isCheckoutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-noir-950/85 backdrop-blur-2xl overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={() => {
          if (step !== 'confirmation' && !isProcessing) setIsCheckoutOpen(false);
        }}
      />

      {/* Checkout Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="relative w-full max-w-3xl bg-noir-900 border border-white/10 shadow-2xl rounded-none sm:rounded-sm overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col"
      >
        {/* Checkout Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-noir-950 shrink-0">
          <div className="flex items-center space-x-3">
            <span className="font-display font-extrabold text-lg text-white tracking-tight">
              NOIRÉ ATELIER
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 bg-white/10 text-noir-300 rounded uppercase">
              CHECKOUT
            </span>
          </div>

          <div className="flex items-center space-x-3">
            {step !== 'confirmation' && (
              <button
                type="button"
                onClick={handlePrefillDemo}
                className="text-[11px] font-mono text-luxe-gold hover:underline border border-luxe-gold/30 px-2 py-1 rounded-xs"
                title="Fill with simulated test data"
              >
                + PREFILL DEMO DATA
              </button>
            )}

            <button
              onClick={() => setIsCheckoutOpen(false)}
              className="p-1.5 text-noir-400 hover:text-white transition-colors"
              aria-label="Close checkout"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-step progress indicator */}
        {step !== 'confirmation' && (
          <div className="px-6 py-3 bg-noir-850/60 border-b border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-noir-400">
            <span className={step === 'information' ? 'text-white font-bold' : ''}>1. INFORMATION</span>
            <span>→</span>
            <span className={step === 'shipping' ? 'text-white font-bold' : ''}>2. SHIPPING</span>
            <span>→</span>
            <span className={step === 'payment' ? 'text-white font-bold' : ''}>3. PAYMENT</span>
            <span>→</span>
            <span className={step === 'review' ? 'text-white font-bold' : ''}>4. REVIEW</span>
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto">
          {step === 'confirmation' && confirmedOrder ? (
            <OrderConfirmation
              data={confirmedOrder}
              onContinueShopping={() => {
                setIsCheckoutOpen(false);
                setStep('information');
              }}
            />
          ) : (
            <div className="p-6 md:p-8 space-y-6">
              
              {/* Demo Safety Banner */}
              <div className="p-3 bg-noir-950 border border-white/15 rounded-xs flex items-center space-x-3 text-xs text-noir-300">
                <ShieldCheck className="w-4 h-4 text-luxe-gold shrink-0" />
                <span>
                  <strong className="text-white">PORTFOLIO DEMONSTRATION:</strong> No real payment is charged. Enter any fictional information.
                </span>
              </div>

              {/* STEP 1: INFORMATION */}
              {step === 'information' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-white">
                    CONTACT & DELIVERY DESTINATION
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={info.firstName}
                        onChange={(e) => setInfo({ ...info, firstName: e.target.value })}
                        placeholder="Alexander"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        required
                        value={info.lastName}
                        onChange={(e) => setInfo({ ...info, lastName: e.target.value })}
                        placeholder="Vane"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        value={info.email}
                        onChange={(e) => setInfo({ ...info, email: e.target.value })}
                        placeholder="client@atelier-noire.com"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        required
                        value={info.phone}
                        onChange={(e) => setInfo({ ...info, phone: e.target.value })}
                        placeholder="+1 (555) 019-2834"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                      STREET ADDRESS *
                    </label>
                    <input
                      type="text"
                      required
                      value={info.address}
                      onChange={(e) => setInfo({ ...info, address: e.target.value })}
                      placeholder="742 Evergreen Terrace"
                      className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        CITY *
                      </label>
                      <input
                        type="text"
                        required
                        value={info.city}
                        onChange={(e) => setInfo({ ...info, city: e.target.value })}
                        placeholder="New York"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        POSTAL CODE *
                      </label>
                      <input
                        type="text"
                        required
                        value={info.postalCode}
                        onChange={(e) => setInfo({ ...info, postalCode: e.target.value })}
                        placeholder="10001"
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        COUNTRY
                      </label>
                      <select
                        value={info.country}
                        onChange={(e) => setInfo({ ...info, country: e.target.value })}
                        className="w-full bg-noir-950 border border-white/10 px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-white/40 cursor-pointer font-sans"
                      >
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="Germany">Germany</option>
                        <option value="Canada">Canada</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        if (!info.firstName || !info.address || !info.email) {
                          handlePrefillDemo();
                        }
                        setStep('shipping');
                      }}
                      className="px-8 py-3.5 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors flex items-center space-x-2"
                    >
                      <span>CONTINUE TO SHIPPING</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SHIPPING */}
              {step === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-white">
                    SELECT DELIVERY SPEED
                  </h3>

                  <div className="space-y-3">
                    <label
                      onClick={() => setShippingSpeed('standard')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                        shippingSpeed === 'standard'
                          ? 'border-white bg-white/[0.05]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <span className="font-sans font-semibold text-white block">
                          Standard Tracked Courier (3–5 Business Days)
                        </span>
                        <span className="text-xs text-noir-400 font-mono">
                          Dispatched from Tokyo or Paris Central Atelier
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold text-white">
                        {amountUntilFreeShipping === 0 ? 'COMPLIMENTARY' : '$15 USD'}
                      </span>
                    </label>

                    <label
                      onClick={() => setShippingSpeed('express')}
                      className={`flex items-center justify-between p-4 border cursor-pointer transition-all ${
                        shippingSpeed === 'express'
                          ? 'border-white bg-white/[0.05]'
                          : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <div>
                        <span className="font-sans font-semibold text-white block">
                          Priority Nocturne Express (1–2 Business Days)
                        </span>
                        <span className="text-xs text-noir-400 font-mono">
                          Carbon-neutral express flight with signature release
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold text-white">
                        $25 USD
                      </span>
                    </label>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('information')}
                      className="text-xs font-mono text-noir-400 hover:text-white flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>BACK TO INFO</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStep('payment')}
                      className="px-8 py-3.5 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors flex items-center space-x-2"
                    >
                      <span>CONTINUE TO PAYMENT</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT */}
              {step === 'payment' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-white">
                    SIMULATED PAYMENT METHOD
                  </h3>

                  {/* One-Click Demo Wallets */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('apple_pay');
                        setStep('review');
                      }}
                      className="py-3 px-4 bg-black border border-white/20 hover:border-white text-white font-sans text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Pay with</span>
                      <span className="font-bold tracking-tight">Pay (Demo)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('google_pay');
                        setStep('review');
                      }}
                      className="py-3 px-4 bg-black border border-white/20 hover:border-white text-white font-sans text-xs font-semibold rounded-xs transition-colors flex items-center justify-center space-x-2"
                    >
                      <span>Pay with</span>
                      <span className="font-bold tracking-tight">G Pay (Demo)</span>
                    </button>
                  </div>

                  <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-white/10"></div>
                    <span className="flex-shrink mx-4 text-[10px] font-mono text-noir-500 uppercase">
                      OR DEMO CARD
                    </span>
                    <div className="flex-grow border-t border-white/10"></div>
                  </div>

                  {/* Card Inputs */}
                  <div className="space-y-3 bg-noir-950 p-4 border border-white/10 rounded-xs">
                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        CARD NUMBER
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={card.number}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          placeholder="4242 •••• •••• 4242"
                          className="w-full bg-noir-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40 font-mono tracking-wider"
                        />
                        <CreditCard className="w-4 h-4 text-noir-500 absolute right-3 top-3" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                          EXPIRY DATE (MM/YY)
                        </label>
                        <input
                          type="text"
                          value={card.exp}
                          onChange={(e) => handleExpChange(e.target.value)}
                          placeholder="12/28"
                          className="w-full bg-noir-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40 font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                          SECURITY CVC
                        </label>
                        <input
                          type="password"
                          maxLength={4}
                          value={card.cvc}
                          onChange={(e) => setCard({ ...card, cvc: e.target.value })}
                          placeholder="888"
                          className="w-full bg-noir-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40 font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono text-noir-400 uppercase mb-1">
                        CARDHOLDER NAME
                      </label>
                      <input
                        type="text"
                        value={card.name}
                        onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                        placeholder="ALEXANDER VANE"
                        className="w-full bg-noir-900 border border-white/10 px-3.5 py-2.5 text-xs text-white placeholder:text-noir-600 focus:outline-none focus:border-white/40 font-mono uppercase"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-xs font-mono text-noir-400 hover:text-white flex items-center space-x-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>BACK TO SHIPPING</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!card.number) handlePrefillDemo();
                        setPaymentMethod('card');
                        setStep('review');
                      }}
                      className="px-8 py-3.5 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-colors flex items-center space-x-2"
                    >
                      <span>REVIEW ORDER</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: REVIEW & PAY */}
              {step === 'review' && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-4"
                >
                  <h3 className="font-display text-xl font-bold text-white">
                    FINAL ORDER REVIEW
                  </h3>

                  {/* Summary Box */}
                  <div className="bg-noir-950 p-4 border border-white/10 rounded-xs space-y-3 text-xs font-mono">
                    <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-noir-400">RECIPIENT:</span>
                      <span className="text-white font-medium">{info.firstName} {info.lastName} ({info.email})</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-noir-400">SHIPPING TO:</span>
                      <span className="text-white font-medium">{info.address}, {info.city}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-white/[0.06]">
                      <span className="text-noir-400">PAYMENT VIA:</span>
                      <span className="text-white font-medium uppercase">{paymentMethod.replace('_', ' ')} (DEMO)</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold pt-1">
                      <span className="text-noir-200">TOTAL DUE:</span>
                      <span className="text-white font-mono">${finalOrderTotal} USD</span>
                    </div>
                  </div>

                  {/* Simulating Notice */}
                  {isProcessing && (
                    <div className="py-6 flex flex-col items-center justify-center space-y-3 bg-noir-950 border border-white/20 p-6">
                      <Loader2 className="w-6 h-6 text-white animate-spin" />
                      <span className="font-mono text-xs tracking-wider text-white">
                        {processingStatus}
                      </span>
                    </div>
                  )}

                  {!isProcessing && (
                    <div className="pt-4 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setStep('payment')}
                        className="text-xs font-mono text-noir-400 hover:text-white flex items-center space-x-1"
                      >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>CHANGE DETAILS</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSimulatePayment}
                        className="px-8 py-4 bg-white text-noir-950 text-xs font-bold font-sans tracking-widest uppercase hover:bg-luxe-smoke transition-all duration-300 flex items-center space-x-2 shadow-2xl"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        <span>PAY ${finalOrderTotal} USD (DEMO)</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

            </div>
          )}
        </div>

      </motion.div>
    </div>
  );
};

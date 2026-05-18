import React, { useState, useEffect } from 'react';
import { MenuItem } from '../types';
import { ShoppingCart, Flame, Wine, Leaf, CheckCircle2, Lock, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MenuGrid({ location }: { location: 'Rovinj' | 'Pula' }) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<{item: MenuItem, count: number}[]>([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(setItems);
  }, []);

  const filteredItems = items.filter(item => item.locations && item.locations.includes(location));

  const addToCart = (item: MenuItem) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, count: i.count + 1 } : i);
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const total = cart.reduce((acc, curr) => acc + (curr.item.price * curr.count), 0);

  const handleProcessPayment = () => {
    setIsPaying(true);
    setTimeout(() => {
      setIsPaying(false);
      setShowPayment(false);
      setIsOrdered(true);
      setCart([]);
      setTimeout(() => setIsOrdered(false), 5000);
    }, 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-serif italic text-stone-800">Istarski Jelovnik</h2>
              <p className="text-stone-500 font-medium uppercase tracking-widest text-[10px] mt-1">Okusi tradicije i inovacije</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1 text-xs font-semibold text-stone-400">
                <Leaf size={14} className="text-green-600" /> Vegansko
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-stone-400">
                <Leaf size={14} className="text-stone-600" /> Istarsko
              </div>
            </div>
          </div>

          <div className="space-y-12 italic">
            {["Hladna predjela", "Topla predjela", "Glavno jelo", "Deserti", "Vina", "Kokteli"].map((category) => {
              const categoryItems = filteredItems.filter(i => i.category === category);
              if (categoryItems.length === 0) return null;
              
              return (
                <div key={category}>
                  <h3 className="text-xl font-serif italic text-stone-700 mb-6 border-b border-stone-200 pb-2 flex justify-between items-center">
                    {category}
                    <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 not-italic">Section {category.slice(0, 3)}</span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {categoryItems.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -4 }}
                        className="bg-white p-5 rounded-2xl border border-stone-100 shadow-sm flex justify-between items-start group"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-stone-800 text-lg">{item.name}</h4>
                            <div className="flex gap-1">
                              {item.istrian && <div className="bg-stone-100 text-stone-500 p-1 rounded-md" title="Izvorni istarski proizvod"><Leaf size={12} /></div>}
                              {item.vegan && <div className="bg-green-100 text-green-600 p-1 rounded-md" title="Vegansko jelo"><Leaf size={12} /></div>}
                            </div>
                          </div>
                          <p className="text-sm text-stone-500 italic mb-3">{item.description}</p>
                          
                          {item.allergens.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-3">
                              {item.allergens.map(a => (
                                <span key={a} className="text-[9px] uppercase font-black tracking-tighter bg-stone-100 text-black px-1.5 py-0.5 rounded border border-stone-300 not-italic">
                                  {a}
                                </span>
                              ))}
                            </div>
                          )}

                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-accent whitespace-nowrap cursor-help" title="Cijena uključuje PDV i uslugu">{item.price} €</span>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(item)}
                          className="bg-stone-100 text-stone-800 p-3 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm flex-shrink-0"
                        >
                          <ShoppingCart size={20} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="w-full md:w-80 bg-stone-50 rounded-3xl p-6 border border-stone-200 h-fit sticky top-8">
          <h3 className="text-xl font-serif italic mb-6 text-stone-800 flex items-center justify-between">
            Vaša Narudžba
            {cart.length > 0 && <span className="text-[10px] bg-accent text-primary px-2 py-0.5 rounded-full not-italic">{cart.length}</span>}
          </h3>
          
          <div className="space-y-4 mb-8 max-h-60 overflow-y-auto no-scrollbar">
            {cart.length === 0 ? (
              <p className="text-sm text-stone-400 italic text-center py-8">Dodajte delicije s jelovnika...</p>
            ) : (
              cart.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2 text-stone-700">
                    <span className="font-bold text-xs opacity-60">{c.count}x</span>
                    <span className="font-medium underline decoration-stone-200 underline-offset-4">{c.item.name}</span>
                  </div>
                  <span className="font-bold text-stone-900">{(c.item.price * c.count).toFixed(2)} €</span>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-stone-200 pt-4 mb-6">
            <div className="flex justify-between items-center mb-1">
              <span className="text-stone-400 text-xs font-semibold uppercase tracking-widest">Sveukupno</span>
              <span className="text-2xl font-bold text-stone-800">{total.toFixed(2)} €</span>
            </div>
            <p className="text-[10px] text-stone-400 italic">Uključen PDV i usluga</p>
          </div>

          <button
            disabled={cart.length === 0}
            onClick={() => setShowPayment(true)}
            className="w-full bg-primary text-white py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg"
          >
            Plati i Naruči (Pre-payment)
          </button>

          <AnimatePresence>
            {isOrdered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl flex items-center gap-3 text-green-800"
              >
                <CheckCircle2 size={24} className="text-green-600" />
                <div>
                  <h5 className="font-bold text-sm">Narudžba poslana!</h5>
                  <p className="text-[10px] font-medium opacity-80 uppercase tracking-tighter">Naši kuhari već pripremaju vaš objed.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showPayment && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-md rounded-[40px] shadow-2xl overflow-hidden border border-stone-100"
            >
              <div className="p-8 bg-stone-50 border-b border-stone-200 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-primary text-white p-2 rounded-xl">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif italic text-xl text-stone-800">Sigurna Naplata</h4>
                    <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest">Istra Tech Payment Gateway</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="text-stone-400 hover:text-stone-600 transition-colors"
                >
                  Odustani
                </button>
              </div>

              <div className="p-8 space-y-6">
                <div className="bg-stone-50 p-6 rounded-3xl border border-stone-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-stone-500 uppercase font-bold tracking-widest">Iznos za uplatu</span>
                    <span className="text-2xl font-bold text-primary">{total.toFixed(2)} €</span>
                  </div>
                  <p className="text-[10px] text-stone-400 italic">Plaćanje je obvezno radi garancije rezervacije i narudžbe.</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-2 block">Broj Kartice</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="**** **** **** ****" 
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-2 block">Datum (MM/GG)</label>
                      <input 
                        type="text" 
                        placeholder="MM/GG" 
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-2 block">CVV</label>
                      <input 
                        type="text" 
                        placeholder="***" 
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleProcessPayment}
                  disabled={isPaying}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3"
                >
                  {isPaying ? (
                    <>Obrađujem... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⏳</motion.div></>
                  ) : (
                    `Izvrši uplatu ${total.toFixed(2)} €`
                  )}
                </button>
                
                <p className="text-[9px] text-center text-stone-400 uppercase tracking-widest font-bold">
                  Šifrirano 256-bitnom SSL zaštitom
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import MenuGrid from './components/MenuGrid';
import SoireeCalendar from './components/SoireeCalendar';
import { motion } from 'motion/react';
import { Utensils, Calendar, MessageSquare, Info, ChevronRight, MapPin, Phone, Instagram, Facebook, Star } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'menu' | 'soirees' | 'reserve'>('home');
  const [location, setLocation] = useState<'Rovinj' | 'Pula'>('Rovinj');

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-stone-900 font-sans selection:bg-primary selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <span className="text-3xl font-serif italic font-bold text-primary">IstraDine</span>
              <span className="text-[10px] bg-primary text-stone-100 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">AI</span>
            </div>

            <div className="flex bg-stone-100 p-1 rounded-full border border-stone-200">
              {['Rovinj', 'Pula'].map((loc) => (
                <button
                  key={loc}
                  onClick={() => setLocation(loc as any)}
                  className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                    location === loc 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Home', 'Menu', 'Soirees', 'Reserve'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item.toLowerCase() === 'soirees' ? 'soirees' : item.toLowerCase() as any)}
                className={`text-xs uppercase font-bold tracking-[0.2em] transition-all relative group h-20 flex items-center ${
                  activeTab === (item.toLowerCase() === 'soirees' ? 'soirees' : item.toLowerCase()) ? 'text-primary' : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {item === 'Soirees' ? 'Soirées' : item}
                {activeTab === (item.toLowerCase() === 'soirees' ? 'soirees' : item.toLowerCase()) && (
                  <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent" />
                )}
              </button>
            ))}
          </div>

          <button 
            className="bg-primary text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-accent hover:text-primary transition-all shadow-lg hover:shadow-xl active:scale-95"
            onClick={() => setActiveTab('reserve')}
          >
            Rezerviraj stol
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20">
        {activeTab === 'home' && (
          <>
            <div className="relative h-[85vh] overflow-hidden flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=2000" 
                alt="Luxury Istrian Restaurant" 
                className="absolute inset-0 w-full h-full object-cover brightness-75 scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              
              <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-2xl text-white"
                >
                  <h6 className="text-[10px] uppercase font-bold tracking-[0.4em] mb-4 text-white opacity-80">Gospodarstvo Istra Tech predstavlja: {location}</h6>
                  <h1 className="text-6xl md:text-8xl font-serif italic mb-8 leading-[0.9]">
                    {location === 'Rovinj' ? (
                      <>Biser <br /> Jadranske <br /> Obale</>
                    ) : (
                      <>Povijest <br /> Antičke <br /> Arene</>
                    )}
                  </h1>
                  <p className="text-lg md:text-xl text-stone-100 font-light max-w-xl mb-10 leading-relaxed italic opacity-90">
                    {location === 'Rovinj' 
                      ? "Otkrijte venecijansku eleganciju u srcu starog grada Rovinja, gdje se tradicija spaja s modernom vizijom."
                      : "Uživajte u gastronomskoj rapsodiji podno pulske Arene, u ambijentu koji odiše tisućljetnom poviješću."}
                  </p>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => setActiveTab('menu')}
                      className="bg-white text-stone-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-[#F5F5F0] transition-all flex items-center gap-2 group"
                    >
                      Istraži Jelovnik <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                      onClick={() => document.getElementById('chat-section')?.scrollIntoView({ behavior: 'smooth' })}
                      className="bg-transparent border-2 border-white/50 text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] hover:bg-white/10 transition-all"
                    >
                      Pitaj AI Asistenta
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Stats - Brutalist accent */}
              <div className="absolute bottom-12 right-12 hidden lg:flex gap-12">
                {[
                  { label: "Automatizacija", value: "70%" },
                  { label: "Jezici", value: "4+" },
                  { label: "Dostupnost", value: "24/7" }
                ].map((stat, i) => (
                  <div key={i} className="text-white">
                    <p className="text-[10px] uppercase font-bold tracking-widest opacity-60 mb-1">{stat.label}</p>
                    <p className="text-4xl font-serif italic">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Smart Communication Section */}
            <section id="chat-section" className="py-24 md:py-32 px-4 md:px-8">
              <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-1/2">
                  <h6 className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4">Modul "Smart Communication"</h6>
                  <h2 className="text-4xl md:text-5xl font-serif italic text-stone-800 mb-8 leading-tight">Vaš digitalni <br /> domaćin, uvijek budan.</h2>
                  <div className="space-y-8">
                    {[
                      { icon: <MessageSquare className="text-accent" />, title: "Prepoznavanje namjera", desc: "AI razumije preko 100 najčešćih upita o radnom vremenu, lokaciji i dječjim menijima." },
                      { icon: <Utensils className="text-accent" />, title: "Sentimentalna analiza", desc: "Zaboravite anonimne recenzije. AI uči vaše preferencije - volite li Malvaziju ili tartufe?" },
                      { icon: <Info className="text-accent" />, title: "Uvijek partner s ljudima", desc: "Jednim klikom uvijek možete zatražiti razgovor s konobarom ili menadžerom restorana." }
                    ].map((feature, i) => (
                      <div key={i} className="flex gap-6 items-start">
                        <div className="bg-white p-4 rounded-2xl shadow-sm border border-stone-100 flex-shrink-0">{feature.icon}</div>
                        <div>
                          <h4 className="font-bold text-stone-800 mb-1 uppercase tracking-wider text-sm">{feature.title}</h4>
                          <p className="text-stone-500 font-light text-sm italic">{feature.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="lg:w-1/2 w-full">
                  <ChatInterface location={location} />
                </div>
              </div>
            </section>
          </>
        )}

        {activeTab === 'menu' && (
          <section className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <MenuGrid location={location} />
          </section>
        )}

        {activeTab === 'soirees' && (
          <section className="py-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <SoireeCalendar location={location} />
          </section>
        )}

        {activeTab === 'reserve' && (
          <section className="py-24 px-4 md:px-8 flex items-center justify-center min-h-[60vh]">
            <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-2xl border border-stone-100">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-serif italic text-stone-800 mb-2">Rezervirajte Vaš stol</h2>
                <p className="text-stone-400 text-xs uppercase font-bold tracking-widest">Lokacija: <span className="text-accent underline underline-offset-4">{location}</span></p>
              </div>
              
              <div className="space-y-5">
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Restoran</label>
                  <div className="w-full bg-stone-100 rounded-xl py-4 px-4 text-sm font-bold text-stone-600 border border-stone-200">
                    IstraDine {location}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Broj gostiju</label>
                  <select className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none">
                    <option>1 Osoba</option>
                    <option>2 Osobe</option>
                    <option>4 Osobe</option>
                    <option>Više od 6 osoba</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Datum</label>
                    <input type="date" className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Vrijeme</label>
                    <input type="time" className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Tip Stola</label>
                    <select className="w-full bg-stone-50 border border-stone-200 rounded-xl py-4 px-4 text-sm focus:ring-2 focus:ring-primary outline-none appearance-none">
                      <option>Terasa (Pogled)</option>
                      <option>Unutrašnjost</option>
                      <option>Sefardova Sala</option>
                      <option>VIP Sektor</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-stone-400 tracking-widest mb-1.5 block px-1">Trajanje</label>
                    <div className="w-full bg-stone-100 rounded-xl py-4 px-4 text-sm font-bold text-stone-500 border border-stone-200 flex items-center justify-between">
                      <span>120 min</span>
                      <Info size={14} className="text-accent" />
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                  <p className="text-[10px] text-amber-800 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Star size={12} className="fill-amber-500 text-amber-500" /> Pre-payment Obavezan
                  </p>
                  <p className="text-[10px] text-amber-700 italic leading-relaxed">
                    Zbog velike potražnje, potrebna je uplata rezervacijske pristojbe (20€) koja se oduzima od završnog računa. U slučaju nedolaska, iznos nije povratan.
                  </p>
                </div>
                <button 
                  onClick={() => alert("Preusmjeravanje na sigurno plaćanje Istra Tech Gateway...")}
                  className="w-full bg-primary text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-black transition-all shadow-xl hover:shadow-2xl translate-y-4"
                >
                  Plati i rezerviraj
                </button>
              </div>
            </div>
          </section>
        )}
      </section>

      {/* Simple Footer */}
      <footer className="bg-stone-900 text-stone-500 py-20 px-4 md:px-8 border-t border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="text-center md:text-left">
             <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <span className="text-2xl font-serif italic text-white">IstraDine</span>
              <span className="text-[8px] bg-white/10 text-white px-2 py-0.5 rounded-full font-bold uppercase">AI</span>
            </div>
            <p className="text-xs max-w-xs leading-loose italic opacity-60">
              Digitalna transformacija istarskog ugostiteljstva u suradnji s Istra Tech sustavima.
            </p>
          </div>
          
          <div className="flex gap-12 text-center md:text-left">
            <div>
              <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Lokacije</h5>
              <ul className="text-xs space-y-3">
                <li className={`flex items-center gap-2 transition-colors ${location === 'Pula' ? 'text-accent font-bold' : 'opacity-60'}`}>
                  <MapPin size={12} /> Pula (Arena)
                </li>
                <li className={`flex items-center gap-2 transition-colors ${location === 'Rovinj' ? 'text-accent font-bold' : 'opacity-60'}`}>
                  <MapPin size={12} /> Rovinj (Stari Grad)
                </li>
              </ul>
            </div>
            <div>
              <h5 className="text-white text-xs font-bold uppercase tracking-widest mb-4">Kontakt</h5>
              <ul className="text-xs space-y-3">
                <li className="flex items-center gap-2"><Phone size={12} /> +385 52 123 456</li>
                <li className="flex items-center gap-2"><Instagram size={12} /> @istradine_ai</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-[10px] text-center uppercase tracking-[0.5em] opacity-30 font-bold">
          &copy; 2026 IstraDine AI Kopilot. Sva prava pridržana.
        </div>
      </footer>
    </div>
  );
}


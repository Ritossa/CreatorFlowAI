import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Send, User, Bot, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ChatMessage, MenuItem } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export default function ChatInterface({ location }: { location: 'Rovinj' | 'Pula' }) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: `Dobar dan! Ja sam IstraDine AI, vaš pametni asistent za restoran IstraDine u lokaciji: **${location}**. Kako vam mogu pomoći danas?` }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(setMenuItems);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...messages, userMessage].map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        })),
        config: {
          tools: [
            { googleSearch: {} }
          ],
          systemInstruction: `Jesi IstraDine AI, visoko stručan i gostoljubiv asistent za istarske restorane. 
          TRENUTNA LOKACIJA RAZGOVORA: ${location}. 
          Tvoj ton je elegantan, poznavatelj tradicije (IstraTech reference), ali tehnološki moderan.
          Govori na jeziku koji gost koristi (Hrvatski, Engleski, Njemački ili Talijanski). Ako ne prepoznaš jezik, koristi Hrvatski kao primarni.
          FOKUS: 
          - Rezervacije stolova (ako gost pita, pitaj za broj osoba i datum). Rezerviraš isključivo za lokaciju: ${location}.
          - Jelovnik (spominji specifičnosti poput tartufa, malvazije, pršuta, fuža). Filtiraj jelovnik za lokaciju: ${location}.
          - Alergeni i radno vrijeme (Radimo svaki dan 12:00 - 23:00).
          - Lokacije: Imamo restorane u Puli (kod Arene) i Rovinju (Stari grad). Potiči goste da posjete i drugu lokaciju ako su u blizini.
          - Specifičnosti lokacije: Pula (Arena, rimsko naslijeđe), Rovinj (Stari grad, venecijanska arhitektura).
          - Uvijek ponudi 'Razgovor s osobom' ako je upit previše složen ili emocionalno osjetljiv.
          JELOVNIK (SVE): ${JSON.stringify(menuItems)}`
        }
      });

      const aiText = response.text || "Ispričavam se, došlo je do pogreške. Možete li ponoviti?";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Žao mi je, trenutno nisam dostupan. Molim vas, povežite se s osobljem restorana." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-stone-50 border border-stone-200 rounded-2xl shadow-xl overflow-hidden font-sans">
      <div className="p-4 bg-primary text-white flex justify-between items-center shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-accent">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-semibold text-lg leading-tight italic font-serif">IstraDine AI</h3>
            <p className="text-xs text-accent uppercase tracking-widest font-bold">Luxury Kopilot</p>
          </div>
        </div>
        <button 
          onClick={() => setMessages(prev => [...prev, { role: 'model', text: 'Spajam vas s voditeljem restorana... Trenutak molim.' }])}
          className="text-xs bg-accent/20 hover:bg-accent/40 text-accent-foreground px-3 py-1.5 rounded-full transition-colors font-bold uppercase tracking-tight border border-accent/30"
        >
          Razgovor s osobom
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')]">
        <AnimatePresence>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === 'user' ? 'bg-accent text-primary' : 'bg-stone-200 text-stone-600'}`}>
                  {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                </div>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-primary text-white rounded-tr-none border border-white/10' 
                    : 'bg-white text-stone-800 border border-stone-100 rounded-tl-none'
                }`}>
                  <div className={`prose prose-sm max-w-none ${m.role === 'user' ? 'prose-invert' : 'prose-stone'}`}>
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-stone-100 shadow-sm flex items-center gap-2">
              <Loader2 size={16} className="animate-spin text-stone-400" />
              <span className="text-xs text-stone-400 font-medium italic">Asistent razmišlja...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-stone-100">
        <div className="flex gap-2 bg-stone-100 rounded-xl p-2 items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pitajte o rezervacijama, jelovniku, vinima..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm px-2 py-2 placeholder-stone-400"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="bg-primary text-white p-2 rounded-lg hover:bg-black transition-all disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['Radno vrijeme?', 'Slobodan stol za 4 osobe?', 'Dječji meni?', 'Vinska karta?'].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => {
                setInput(suggestion);
              }}
              className="text-[10px] uppercase font-bold tracking-wider whitespace-nowrap bg-stone-50 border border-stone-200 text-stone-500 py-1.5 px-3 rounded-full hover:bg-stone-100 transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

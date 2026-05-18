import React from 'react';
import { motion } from 'motion/react';
import { Music, Calendar, Clock, Star, Users } from 'lucide-react';

interface Soiree {
  id: number;
  title: string;
  instrument: string;
  day: string;
  time: string;
  description: string;
  image: string;
}

const events: Soiree[] = [
  {
    id: 1,
    title: "Twilight Jazz Quartette",
    instrument: "Jazz Evening",
    day: "Every Thursday",
    time: "20:00 - 23:00",
    description: "An intimate evening with soul-stirring jazz melodies performed by local maestros. Perfect for lovers of improvisation and classic Istrian vibes.",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Grand Piano Solitude",
    instrument: "Piano Night",
    day: "Every Friday",
    time: "19:30 - 22:30",
    description: "Experience the elegance of our Steinway & Sons piano. A journey through neoclassical compositions and modern romanticism.",
    image: "https://images.unsplash.com/photo-1552422535-c45813c61732?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Istrian Violin Echoes",
    instrument: "Violin Performance",
    day: "Every Saturday",
    time: "20:30 - 23:30",
    description: "Dramatic and virtuosic violin solos that echo the historical essence of our coastal towns. A truly sophisticated musical journey.",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80&w=800"
  }
];

export default function SoireeCalendar({ location }: { location: 'Rovinj' | 'Pula' }) {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="w-full h-[400px] rounded-[40px] overflow-hidden mb-16 relative"
      >
        <img 
          src={location === 'Rovinj' 
            ? "https://images.unsplash.com/photo-1528150177508-7cc0c36cda5c?auto=format&fit=crop&q=80&w=1600" 
            : "https://images.unsplash.com/photo-1555992828-ca4dbe893e55?auto=format&fit=crop&q=80&w=1600"
          } 
          alt="Venue Atmosphere" 
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <h6 className="text-accent text-xs font-bold uppercase tracking-[0.4em] mb-4">Curated Experiences</h6>
          <h2 className="text-4xl md:text-7xl font-serif italic text-white leading-tight mb-6">Soirées at IstraDine {location}</h2>
          <div className="w-24 h-1 bg-accent"></div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <motion.div 
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[32px] overflow-hidden border border-stone-100 shadow-xl group hover:shadow-2xl transition-all duration-500"
          >
            <div className="h-64 overflow-hidden relative">
              <img 
                src={event.image} 
                alt={event.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full flex items-center gap-2">
                <Music size={14} className="text-accent" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-800">{event.instrument}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-serif italic text-stone-800">{event.title}</h3>
                <Star size={18} className="text-accent fill-accent" />
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <Calendar size={16} className="text-accent" />
                  <span>{event.day}</span>
                </div>
                <div className="flex items-center gap-3 text-stone-500 text-sm">
                  <Clock size={16} className="text-accent" />
                  <span>{event.time}</span>
                </div>
              </div>

              <p className="text-stone-500 text-sm italic leading-relaxed mb-8">
                {event.description}
              </p>

              <button 
                onClick={() => {
                  const dateInput = document.querySelector('input[type="date"]') as HTMLInputElement;
                  if (dateInput) dateInput.scrollIntoView({ behavior: 'smooth' });
                  alert(`Please select your preferred ${event.day} in the reservation form below.`);
                }}
                className="w-full border-2 border-primary text-primary py-4 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group"
              >
                Reserve Attendance <Users size={14} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-24 p-12 bg-primary rounded-[40px] text-white flex flex-col md:flex-row items-center gap-12 border border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 md:w-2/3">
          <h4 className="text-2xl md:text-3xl font-serif italic mb-4">Private Musical Arrangements</h4>
          <p className="text-stone-300 italic font-light leading-relaxed max-w-xl">
            We offer bespoke musical arrangements for private events and ceremonial gatherings. 
            From solo cello performances to full orchestras, customize the atmosphere of your evening.
          </p>
        </div>
        <div className="relative z-10 md:w-1/3 w-full">
          <button className="w-full bg-accent text-primary font-bold py-6 rounded-2xl uppercase tracking-widest text-xs hover:bg-white transition-all shadow-xl">
            Inquire Privately
          </button>
        </div>
      </div>
    </div>
  );
}

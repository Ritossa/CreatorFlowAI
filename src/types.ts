export interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  istrian: boolean;
  vegan: boolean;
  allergens: string[];
  locations: string[];
}

export interface Reservation {
  id?: number;
  name: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  location: string;
  tableType?: string;
  durationMinutes?: number;
  totalAmount?: number;
  paymentStatus?: 'pending' | 'paid';
  status?: string;
}

export type Language = 'hr' | 'en' | 'de' | 'it';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

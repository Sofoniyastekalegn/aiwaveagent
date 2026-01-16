
export enum Industry {
  BARBER = 'Barber Shop',
  DENTAL = 'Dental Clinic',
  MEDSPA = 'Medical Spa',
  SALON = 'Beauty Salon',
  LAW = 'Law Firm',
  AGENCY = 'Creative Agency'
}

export interface TranscriptEntry {
  role: 'ai' | 'client';
  text: string;
  time: string;
}

export interface Staff {
  id: string;
  name: string;
  industry: Industry;
  role: string;
}

export interface Service {
  id: string;
  name: string;
  duration: number;
  price: number;
  industry: Industry;
}

export interface Appointment {
  id: string;
  clientName: string;
  service: string;
  staff: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface CallLog {
  id: string;
  phoneNumber: string;
  duration: string;
  status: 'Booked' | 'Follow-up' | 'Spam' | 'Interested';
  timestamp: string;
  industry: Industry;
  transcript?: TranscriptEntry[];
}

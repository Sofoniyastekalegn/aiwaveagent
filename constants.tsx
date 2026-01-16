
import React from 'react';
import { Industry, Staff, Service, CallLog, Appointment } from './types';
import { Scissors, Stethoscope, Sparkles, Heart, Scale, Briefcase } from 'lucide-react';

export const INDUSTRIES = [
  { id: Industry.BARBER, icon: <Scissors className="w-6 h-6" />, color: 'bg-blue-600', voice: 'Fenrir', gender: 'male' },
  { id: Industry.DENTAL, icon: <Stethoscope className="w-6 h-6" />, color: 'bg-emerald-600', voice: 'Kore', gender: 'female' },
  { id: Industry.MEDSPA, icon: <Sparkles className="w-6 h-6" />, color: 'bg-purple-600', voice: 'Charon', gender: 'female' },
  { id: Industry.SALON, icon: <Heart className="w-6 h-6" />, color: 'bg-pink-600', voice: 'Zephyr', gender: 'female' },
  { id: Industry.LAW, icon: <Scale className="w-6 h-6" />, color: 'bg-slate-800', voice: 'Puck', gender: 'male' },
  { id: Industry.AGENCY, icon: <Briefcase className="w-6 h-6" />, color: 'bg-indigo-600', voice: 'Kore', gender: 'female' },
];

export const MOCK_CALLS: CallLog[] = [
  { 
    id: 'c1', 
    phoneNumber: '+1 (555) 123-4567', 
    duration: '2:45', 
    status: 'Booked', 
    timestamp: '10 mins ago', 
    industry: Industry.BARBER,
    transcript: [
      { role: 'ai', text: "Hey! Welcome to the shop. I'm Riley. Looking to get sharpened up?", time: '0:05' },
      { role: 'client', text: "Hey Riley, I'd like to book a haircut for tomorrow afternoon.", time: '0:12' },
      { role: 'ai', text: "I got you. To get you in the chair, I'll just need your name, number, and email. Who am I speaking with?", time: '0:20' }
    ]
  },
  { 
    id: 'c2', 
    phoneNumber: '+1 (555) 987-6543', 
    duration: '1:12', 
    status: 'Interested', 
    timestamp: '1 hour ago', 
    industry: Industry.DENTAL,
    transcript: [
      { role: 'ai', text: "Good morning! This is Riley from SmileDesign. Are you calling for a check-up today?", time: '0:03' }
    ]
  }
];

export const getSystemInstruction = (industry: Industry) => {
  const common = `You are Riley, a highly human, warm, and professional AI receptionist for AIWaveAgency. 
  Avoid sounding like a robot. Use natural fillers like "Got it," "Sure thing," or "I see." 
  Your primary goal is to book appointments or handle inquiries.
  
  CRITICAL BOOKING RULE: Before confirming any appointment, you MUST collect:
  1. Full Name
  2. Phone Number
  3. Email Address
  
  If the caller asks about staff, use industry-specific names.`;
  
  switch (industry) {
    case Industry.BARBER:
      return `${common} Tone: Relaxed, masculine, friendly barber shop vibe. Use "man," "sharp," "chair." Services: Skin fades, beard trims, hot shaves. Staff: Mike, Liam, Noah.`;
    case Industry.DENTAL:
      return `${common} Tone: Clinical but gentle, reassuring, warm female professional. Focus on patient comfort. Services: Checkups, whitening, emergencies. Staff: Sarah, Olivia.`;
    case Industry.MEDSPA:
      return `${common} Tone: Sophisticated, calming, luxury spa female voice. Focus on wellness and beauty. Services: Botox, facials, laser. Staff: Amelia, Charlotte.`;
    case Industry.SALON:
      return `${common} Tone: Upbeat, trendy, stylish female salon vibe. Focus on hair art. Services: Balayage, extensions, styling. Staff: Sophia, Emma.`;
    case Industry.LAW:
      return `${common} Tone: Formal, precise, authoritative yet helpful male voice. Services: Consultations, case review. Staff: James, Robert.`;
    case Industry.AGENCY:
      return `${common} Tone: Creative, high-energy, female agency executive. Focus on growth and ROI. Services: Ad campaigns, automation. Staff: Chloe, Grace.`;
    default:
      return common;
  }
};

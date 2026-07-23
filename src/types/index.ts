// Contract types shared between mock handlers (MSW) and the real backend.
// Keep this file as the single source of truth for data shapes — when the
// real API is ready in week 2, it should return exactly this shape so the
// frontend swap in week 3 touches only the fetch layer, not components.

export type UserRole = 'vet' | 'admin' | 'owner';

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarInitial: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
}

export interface Allergy {
  substance: string;
  note?: string;
}

export interface Vitals {
  weightKg?: number;
  temperatureC?: number;
  sterilized?: boolean;
}

export interface VisitRecord {
  id: string;
  date: string; // ISO date
  doctorName: string;
  diagnosis: string;
  prescriptions?: string[];
}

export interface Animal {
  id: string;
  chartId: string; // e.g. "#CHART-0142"
  name: string;
  species: string;
  breed: string;
  ageYears: number;
  avatarUrl?: string;
  owner: Owner;
  status: 'active' | 'inactive';
  allergies: Allergy[];
  vitals: Vitals;
  visits: VisitRecord[];
}

export type AppointmentStatus = 'confirmed' | 'surgery' | 'attention' | 'done';

export interface Appointment {
  id: string;
  doctorId: string;
  animalId: string;
  animalName: string;
  reason: string;
  date: string; // ISO date (day)
  time: string; // "09:00"
  durationSlots: number; // number of 1-hour slots
  status: AppointmentStatus;
}

export interface NewVisitInput {
  animalId: string;
  diagnosis: string;
  weightKg?: number;
  temperatureC?: number;
  prescriptions?: string[];
}

export interface NewAnimalInput {
  name: string;
  species: string;
  breed: string;
  ageYears: number;
  ownerName: string;
  ownerPhone: string;
}

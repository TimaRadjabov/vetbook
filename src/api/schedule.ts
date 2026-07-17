import { useQuery } from '@tanstack/react-query';
import { api } from './client';
import type { Appointment, Doctor } from '../types';

export function useDoctors() {
  return useQuery({ queryKey: ['doctors'], queryFn: () => api.get<Doctor[]>('/doctors') });
}

export function useAppointments() {
  return useQuery({ queryKey: ['appointments'], queryFn: () => api.get<Appointment[]>('/appointments') });
}

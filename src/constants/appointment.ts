import type { AppointmentStatus } from '../types';

// Single source of truth for appointment status label + tone.
// Tone is a theme color key — used by Stamp, schedule grid, legends, booking.
export type StatusTone = 'scrub' | 'kraft' | 'clay' | 'ash';

export const APPOINTMENT_STATUS: Record<AppointmentStatus, { label: string; tone: StatusTone }> = {
  confirmed: { label: 'Подтверждён', tone: 'scrub' },
  surgery: { label: 'Операция', tone: 'kraft' },
  attention: { label: 'Требует внимания', tone: 'clay' },
  done: { label: 'Завершён', tone: 'ash' },
};

export const APPOINTMENT_STATUSES = Object.keys(APPOINTMENT_STATUS) as AppointmentStatus[];

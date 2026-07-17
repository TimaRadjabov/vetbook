import { http, HttpResponse } from 'msw';
import { animals, appointments, doctors, users } from './data';
import type { Animal, NewVisitInput } from '../types';

// In-memory mutation target so created visits persist for the session.
const db = { animals: animals.map((a) => ({ ...a, visits: [...a.visits], allergies: [...a.allergies] })) };

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = (await request.json()) as { email: string; password: string };
    const found = users.find((u) => u.email === body.email && u.password === body.password);
    if (!found) {
      return HttpResponse.json({ message: 'Неверный email или пароль' }, { status: 401 });
    }
    const { password: _password, email: _email, ...user } = found;
    return HttpResponse.json({ token: 'mock-token', user });
  }),

  http.get('/api/doctors', () => HttpResponse.json(doctors)),

  http.get('/api/appointments', () => HttpResponse.json(appointments)),

  http.get('/api/animals', ({ request }) => {
    const url = new URL(request.url);
    const q = url.searchParams.get('q')?.toLowerCase() ?? '';
    const results = db.animals.filter(
      (a) => a.name.toLowerCase().includes(q) || a.owner.name.toLowerCase().includes(q),
    );
    return HttpResponse.json(results);
  }),

  http.get('/api/animals/:id', ({ params }) => {
    const animal = db.animals.find((a) => a.id === params.id);
    if (!animal) return HttpResponse.json({ message: 'Не найдено' }, { status: 404 });
    return HttpResponse.json(animal);
  }),

  http.post('/api/animals/:id/visits', async ({ params, request }) => {
    const animal = db.animals.find((a) => a.id === params.id) as Animal | undefined;
    if (!animal) return HttpResponse.json({ message: 'Не найдено' }, { status: 404 });
    const input = (await request.json()) as NewVisitInput;
    animal.visits.unshift({
      id: `v-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      doctorName: 'Др. Иванов',
      diagnosis: input.diagnosis,
      prescriptions: input.prescriptions,
    });
    if (input.weightKg) animal.vitals.weightKg = input.weightKg;
    if (input.temperatureC) animal.vitals.temperatureC = input.temperatureC;
    return HttpResponse.json(animal);
  }),
];

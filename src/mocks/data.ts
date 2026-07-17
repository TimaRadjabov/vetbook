import type { Animal, Appointment, Doctor, User } from '../types';

export const doctors: Doctor[] = [
  { id: 'd1', name: 'Др. Иванов', specialty: 'Терапевт' },
  { id: 'd2', name: 'Др. Петрова', specialty: 'Хирург' },
  { id: 'd3', name: 'Др. Каримов', specialty: 'Дерматолог' },
];

export const users: (User & { email: string; password: string })[] = [
  { id: 'u1', name: 'Гулноза', role: 'admin', avatarInitial: 'Г', email: 'admin@vetflow.uz', password: 'demo' },
  { id: 'u2', name: 'Др. Иванов', role: 'vet', avatarInitial: 'И', email: 'vet@vetflow.uz', password: 'demo' },
];

export const animals: Animal[] = [
  {
    id: 'a1',
    chartId: '#CHART-0142',
    name: 'Барсик',
    species: 'Кот',
    breed: 'Британская короткошёрстная',
    ageYears: 3,
    owner: { id: 'o1', name: 'Азиза Юсупова', phone: '+998 90 123 45 67' },
    status: 'active',
    allergies: [{ substance: 'Пенициллин', note: 'Исключить из всех назначений' }],
    vitals: { weightKg: 4.2, temperatureC: 38.5, sterilized: true },
    visits: [
      { id: 'v1', date: '2026-07-02', doctorName: 'Др. Иванов', diagnosis: 'Плановый осмотр — состояние удовлетворительное' },
      { id: 'v2', date: '2026-05-18', doctorName: 'Др. Каримов', diagnosis: 'Вакцинация — комплексная прививка' },
      { id: 'v3', date: '2026-03-03', doctorName: 'Др. Петрова', diagnosis: 'Дерматит — назначен курс антигистаминных' },
    ],
  },
  {
    id: 'a2',
    chartId: '#CHART-0198',
    name: 'Мурка',
    species: 'Кошка',
    breed: 'Метис',
    ageYears: 2,
    owner: { id: 'o2', name: 'С. Каримова', phone: '+998 90 555 12 34' },
    status: 'active',
    allergies: [],
    vitals: { weightKg: 3.6, temperatureC: 38.2, sterilized: true },
    visits: [{ id: 'v4', date: '2026-06-20', doctorName: 'Др. Петрова', diagnosis: 'Профилактическая вакцинация' }],
  },
  {
    id: 'a3',
    chartId: '#CHART-0206',
    name: 'Рекс',
    species: 'Собака',
    breed: 'Немецкая овчарка',
    ageYears: 5,
    owner: { id: 'o3', name: 'Д. Ахмедов', phone: '+998 90 777 88 99' },
    status: 'active',
    allergies: [],
    vitals: { weightKg: 32, temperatureC: 38.7, sterilized: false },
    visits: [{ id: 'v5', date: '2026-06-01', doctorName: 'Др. Иванов', diagnosis: 'Обработка от блох и клещей' }],
  },
  {
    id: 'a4',
    chartId: '#CHART-0233',
    name: 'Тобик',
    species: 'Собака',
    breed: 'Дворняга',
    ageYears: 4,
    owner: { id: 'o4', name: 'Н. Раджабова', phone: '+998 90 222 33 44' },
    status: 'active',
    allergies: [{ substance: 'Куриный белок' }],
    vitals: { weightKg: 18, temperatureC: 39.1 },
    visits: [{ id: 'v6', date: '2026-06-28', doctorName: 'Др. Каримов', diagnosis: 'Дерматит, повторный осмотр назначен' }],
  },
];

const today = new Date().toISOString().slice(0, 10);

export const appointments: Appointment[] = [
  { id: 'ap1', doctorId: 'd1', animalId: 'a1', animalName: 'Барсик', reason: 'Осмотр', date: today, time: '09:00', durationSlots: 1, status: 'confirmed' },
  { id: 'ap2', doctorId: 'd1', animalId: 'a3', animalName: 'Рекс', reason: 'Вакцинация', date: today, time: '11:00', durationSlots: 1, status: 'confirmed' },
  { id: 'ap3', doctorId: 'd2', animalId: 'a2', animalName: 'Мурка', reason: 'Операция', date: today, time: '10:00', durationSlots: 2, status: 'surgery' },
  { id: 'ap4', doctorId: 'd3', animalId: 'a4', animalName: 'Тобик', reason: 'Дерматит', date: today, time: '09:00', durationSlots: 1, status: 'attention' },
  { id: 'ap5', doctorId: 'd3', animalId: 'a1', animalName: 'Луна', reason: 'Осмотр', date: today, time: '12:00', durationSlots: 1, status: 'done' },
];

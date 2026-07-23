import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import type { Animal, NewAnimalInput, NewVisitInput } from '../types';

export function useAnimals(query: string) {
  return useQuery({
    queryKey: ['animals', query],
    queryFn: () => api.get<Animal[]>(`/animals?q=${encodeURIComponent(query)}`),
    placeholderData: keepPreviousData,
  });
}

export function useAnimal(id: string | undefined) {
  return useQuery({
    queryKey: ['animal', id],
    queryFn: () => api.get<Animal>(`/animals/${id}`),
    enabled: Boolean(id),
  });
}

export function useAddVisit(animalId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewVisitInput) => api.post<Animal>(`/animals/${animalId}/visits`, input),
    onSuccess: (updated) => {
      queryClient.setQueryData(['animal', animalId], updated);
    },
  });
}

export function useCreateAnimal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (input: NewAnimalInput) => api.post<Animal>('/animals', input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}

export function useUpdateAnimal(animalId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (patch: Partial<Animal>) => api.patch<Animal>(`/animals/${animalId}`, patch),
    onSuccess: (updated) => {
      queryClient.setQueryData(['animal', animalId], updated);
      queryClient.invalidateQueries({ queryKey: ['animals'] });
    },
  });
}

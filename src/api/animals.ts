import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from './client';
import type { Animal, NewVisitInput } from '../types';

export function useAnimals(query: string) {
  return useQuery({
    queryKey: ['animals', query],
    queryFn: () => api.get<Animal[]>(`/animals?q=${encodeURIComponent(query)}`),
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

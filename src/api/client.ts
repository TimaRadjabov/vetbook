// Thin fetch wrapper. Every hook in api/*.ts goes through here, so swapping
// MSW for the real backend in week 3 means changing this file (and the base
// URL / auth header), never the components that call the hooks.

const BASE_URL = import.meta.env.PUBLIC_API_URL ?? '/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem('vetflow_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Ошибка запроса: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
};

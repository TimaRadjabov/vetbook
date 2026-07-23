// Thin fetch wrapper. Every hook in api/*.ts goes through here, so swapping
// MSW for the real backend means changing VITE_API_URL in .env, never the
// components that call the hooks.

const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

const TOKEN_KEY = 'vetflow_token';
const USER_KEY = 'vetflow_user';

function handleUnauthorized() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  if (window.location.pathname !== '/login') {
    window.location.assign('/login');
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = localStorage.getItem(TOKEN_KEY);
  const res = await fetch(`${BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    // Expired/invalid token — everywhere except the login request itself.
    if (res.status === 401 && !path.startsWith('/auth/')) {
      handleUnauthorized();
    }
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message ?? `Ошибка запроса: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, data: unknown) => request<T>(path, { method: 'POST', body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) => request<T>(path, { method: 'PATCH', body: JSON.stringify(data) }),
};

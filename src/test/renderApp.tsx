import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from 'styled-components';
import { theme } from '../theme';
import { AuthProvider } from '../auth/AuthContext';
import App from '../App';

// Авторизация как у вошедшего врача (u2 = Др. Иванов из mocks/data.ts).
export function seedAuth() {
  localStorage.setItem('vetflow_token', 'mock-token-u2');
  localStorage.setItem(
    'vetflow_user',
    JSON.stringify({ id: 'u2', name: 'Др. Иванов', role: 'vet', avatarInitial: 'И' }),
  );
}

export function renderApp(initialPath = '/') {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[initialPath]}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
}

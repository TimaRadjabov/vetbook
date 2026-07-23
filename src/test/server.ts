import { setupServer } from 'msw/node';
import { handlers } from '../mocks/handlers';

// Тот же набор хендлеров, что и в браузере, но для Node (Vitest).
export const server = setupServer(...handlers);

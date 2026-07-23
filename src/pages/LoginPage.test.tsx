import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp } from '../test/renderApp';

describe('Логин', () => {
  it('входит с демо-аккаунтом и открывает расписание', async () => {
    renderApp('/login');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    expect(await screen.findByRole('heading', { name: 'Расписание врачей' })).toBeInTheDocument();
  });

  it('показывает ошибку при неверном пароле', async () => {
    renderApp('/login');
    const password = screen.getByLabelText('Пароль');
    await userEvent.clear(password);
    await userEvent.type(password, 'wrong');
    await userEvent.click(screen.getByRole('button', { name: 'Войти' }));
    expect(await screen.findByText('Неверный email или пароль')).toBeInTheDocument();
  });
});

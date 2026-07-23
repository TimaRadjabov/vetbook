import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp, seedAuth } from '../test/renderApp';

describe('Карточка животного', () => {
  it('показывает данные, аллергии и историю визитов', async () => {
    seedAuth();
    renderApp('/patients/a1');
    expect(await screen.findByText('Барсик')).toBeInTheDocument();
    expect(screen.getByText(/3 года/)).toBeInTheDocument(); // склонение
    expect(screen.getByText(/Аллергия на пенициллин/)).toBeInTheDocument();
    expect(screen.getByText(/Плановый осмотр/)).toBeInTheDocument();
  });

  it('добавляет новый визит через модалку', async () => {
    seedAuth();
    renderApp('/patients/a2');
    await screen.findByText('Мурка');
    await userEvent.click(screen.getByRole('button', { name: /Новый приём/ }));
    await userEvent.type(screen.getByLabelText('Диагноз'), 'Тестовый диагноз');
    await userEvent.click(screen.getByRole('button', { name: 'Сохранить' }));
    expect(await screen.findByText('Тестовый диагноз')).toBeInTheDocument();
  });
});

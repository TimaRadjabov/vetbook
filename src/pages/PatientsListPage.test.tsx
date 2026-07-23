import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderApp, seedAuth } from '../test/renderApp';

describe('Список ЭМК', () => {
  it('показывает пациентов из API', async () => {
    seedAuth();
    renderApp('/patients');
    expect(await screen.findByText('Барсик')).toBeInTheDocument();
    expect(screen.getByText(/Азиза Юсупова/)).toBeInTheDocument();
    expect(screen.getByText('Рекс')).toBeInTheDocument();
  });

  it('фильтрует по поиску и показывает пустое состояние', async () => {
    seedAuth();
    renderApp('/patients');
    await screen.findByText('Барсик');
    await userEvent.type(screen.getByLabelText('Поиск животных'), 'НетТакого');
    expect(await screen.findByText(/ничего не найдено/)).toBeInTheDocument();
  });
});

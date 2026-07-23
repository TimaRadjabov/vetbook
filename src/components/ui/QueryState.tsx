import type { ReactNode } from 'react';
import styled, { keyframes } from 'styled-components';
import { MdErrorOutline, MdOutlineInbox } from 'react-icons/md';

// Единые состояния загрузки / ошибки / пустоты для всех страниц.
// Правило: страница никогда не показывает голое «Загрузка...» и никогда
// не молчит об упавшем запросе.

const pulse = keyframes`
  0%, 100% { opacity: 0.45; }
  50% { opacity: 1; }
`;

const LoadingWrap = styled.div`
  padding: ${(p) => p.theme.space(8)} 0;
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.gray};
  animation: ${pulse} 1.2s ease-in-out infinite;
`;

const ErrorWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  margin-bottom: ${(p) => p.theme.space(4)};
  background: ${(p) => p.theme.color.claySoft};
  border: 1px solid ${(p) => p.theme.color.clay};
  border-radius: ${(p) => p.theme.radius.md};
  color: ${(p) => p.theme.color.clay};
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
`;

const EmptyWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: ${(p) => p.theme.space(8)} 0;
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.gray};
`;

export function LoadingState({ label = 'Загрузка...' }: { label?: string }) {
  return <LoadingWrap role="status">{label}</LoadingWrap>;
}

export function ErrorState({ error, prefix = 'Не удалось загрузить данные' }: { error?: unknown; prefix?: string }) {
  const message = error instanceof Error ? error.message : undefined;
  return (
    <ErrorWrap role="alert">
      <MdErrorOutline size={18} />
      {prefix}
      {message ? `: ${message}` : ''}
    </ErrorWrap>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return (
    <EmptyWrap>
      <MdOutlineInbox size={18} />
      {children}
    </EmptyWrap>
  );
}

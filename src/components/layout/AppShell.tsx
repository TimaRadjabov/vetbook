import styled from 'styled-components';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

const Shell = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${(p) => p.theme.color.white};
`;

const Main = styled.main`
  flex: 1;
  min-width: 0;
`;

const Content = styled.div`
  padding: 28px;
`;

export function AppShell({ title, chartId, children }: { title: string; chartId?: string; children: ReactNode }) {
  return (
    <Shell>
      <Sidebar />
      <Main>
        <Topbar title={title} chartId={chartId} />
        <Content>{children}</Content>
      </Main>
    </Shell>
  );
}

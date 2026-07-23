import { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdChevronRight, MdAdd } from 'react-icons/md';
import { AppShell } from '../components/layout/AppShell';
import { Input } from '../components/ui/Input';
import { AnimalAvatar } from '../components/ui/AnimalAvatar';
import { Stamp } from '../components/ui/Stamp';
import { Button } from '../components/ui/Button';
import { LoadingState, ErrorState, EmptyState } from '../components/ui/QueryState';
import { NewPatientModal } from '../components/patient/NewPatientModal';
import { useAnimals } from '../api/animals';

const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
`;

const SearchWrap = styled.div`
  flex: 1;
  max-width: 360px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Row = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: ${(p) => p.theme.color.white};
  border: 1px solid ${(p) => p.theme.color.border};
  border-radius: ${(p) => p.theme.radius.md};
  cursor: pointer;
  text-align: left;
  width: 100%;

  &:hover {
    border-color: ${(p) => p.theme.color.scrub};
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.kraft};
    outline-offset: 2px;
  }
`;

const Info = styled.div`
  flex: 1;
  min-width: 0;
`;

const Name = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 15px;
  color: ${(p) => p.theme.color.ink};
`;

const Meta = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-size: 12.5px;
  color: ${(p) => p.theme.color.gray};
  margin-top: 2px;
`;

const ChartId = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.grayLight};
`;

export function PatientsListPage() {
  const [q, setQ] = useState('');
  const [newPatientOpen, setNewPatientOpen] = useState(false);
  const { data: animals, isLoading, isError, error } = useAnimals(q);
  const navigate = useNavigate();
  const theme = useTheme();

  const trimmedQ = q.trim();
  const isEmptyResult = !isLoading && !isError && animals?.length === 0;

  return (
    <AppShell title="Электронная карта животного">
      <TopRow>
        <SearchWrap>
          <Input
            placeholder="Поиск по имени животного или владельцу..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Поиск животных"
          />
        </SearchWrap>
        <Button $variant="accent" onClick={() => setNewPatientOpen(true)}>
          <MdAdd size={18} /> Новый пациент
        </Button>
      </TopRow>

      {isError && <ErrorState error={error} prefix="Не удалось загрузить список" />}

      {isLoading && <LoadingState />}
      {isEmptyResult && trimmedQ === '' && <EmptyState>Пока нет пациентов</EmptyState>}
      {isEmptyResult && trimmedQ !== '' && <EmptyState>По запросу «{trimmedQ}» ничего не найдено</EmptyState>}

      <List>
        {animals?.map((a) => (
          <Row key={a.id} onClick={() => navigate(`/patients/${a.id}`)}>
            <AnimalAvatar url={a.avatarUrl} size={48} />
            <Info>
              <Name>
                {a.name} <ChartId>{a.chartId}</ChartId>
              </Name>
              <Meta>
                {a.species} · {a.breed} · {a.owner.name}
              </Meta>
            </Info>
            {a.allergies.length > 0 && (
              <Stamp $tone="clay" $size="sm">
                Аллергия
              </Stamp>
            )}
            <MdChevronRight size={20} color={theme.color.grayLight} />
          </Row>
        ))}
      </List>

      {newPatientOpen && <NewPatientModal onClose={() => setNewPatientOpen(false)} />}
    </AppShell>
  );
}

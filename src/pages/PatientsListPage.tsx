import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { MdPets, MdChevronRight } from 'react-icons/md';
import { AppShell } from '../components/layout/AppShell';
import { Input } from '../components/ui/Input';
import { IconCircle } from '../components/ui/IconCircle';
import { Stamp } from '../components/ui/Stamp';
import { useAnimals } from '../api/animals';

const SearchWrap = styled.div`
  max-width: 360px;
  margin-bottom: 20px;
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

const Empty = styled.p`
  font-family: ${(p) => p.theme.font.body};
  color: ${(p) => p.theme.color.gray};
`;

export function PatientsListPage() {
  const [q, setQ] = useState('');
  const { data: animals, isLoading } = useAnimals(q);
  const navigate = useNavigate();

  return (
    <AppShell title="Электронная карта животного">
      <SearchWrap>
        <Input
          placeholder="Поиск по имени животного или владельцу..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Поиск животных"
        />
      </SearchWrap>

      {isLoading && <Empty>Загрузка...</Empty>}
      {!isLoading && animals?.length === 0 && <Empty>Ничего не найдено</Empty>}

      <List>
        {animals?.map((a) => (
          <Row key={a.id} onClick={() => navigate(`/patients/${a.id}`)}>
            <IconCircle icon={MdPets} color="#2F6F52" size={48} />
            <Info>
              <Name>
                {a.name} <ChartId>{a.chartId}</ChartId>
              </Name>
              <Meta>
                {a.species} · {a.breed} · {a.owner.name}
              </Meta>
            </Info>
            {a.allergies.length > 0 && <Stamp $color="#B94A3E" $size="sm">Аллергия</Stamp>}
            <MdChevronRight size={20} color="#84978C" />
          </Row>
        ))}
      </List>
    </AppShell>
  );
}

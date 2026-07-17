import { useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { MdPets, MdWarningAmber, MdMonitorWeight, MdThermostat, MdCheckCircle, MdMedication, MdAdd } from 'react-icons/md';
import { AppShell } from '../components/layout/AppShell';
import { Card, Eyebrow } from '../components/ui/Card';
import { Stamp } from '../components/ui/Stamp';
import { IconCircle } from '../components/ui/IconCircle';
import { Button } from '../components/ui/Button';
import { useAnimal } from '../api/animals';
import { NewVisitModal } from '../components/patient/NewVisitModal';

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 22px;
  align-items: start;
`;

const HeaderCard = styled(Card)`
  display: flex;
  align-items: flex-start;
  gap: 18px;
`;

const HeaderInfo = styled.div`
  flex: 1;
`;

const PetName = styled.h2`
  font-family: ${(p) => p.theme.font.display};
  font-size: 21px;
  margin: 4px 0 6px;
  color: ${(p) => p.theme.color.ink};
`;

const Meta = styled.p`
  font-family: ${(p) => p.theme.font.body};
  font-size: 12.5px;
  color: ${(p) => p.theme.color.gray};
  margin: 0 0 4px;
`;

const OwnerLine = styled.p`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.gray};
  margin: 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: 8px;
  margin: 20px 0 14px;
`;

const Tab = styled.button<{ $active?: boolean }>`
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  font-weight: ${(p) => (p.$active ? 700 : 500)};
  padding: 9px 16px;
  border-radius: 8px;
  border: none;
  cursor: ${(p) => (p.$active ? 'default' : 'pointer')};
  background: ${(p) => (p.$active ? p.theme.color.scrub : 'transparent')};
  color: ${(p) => (p.$active ? p.theme.color.white : p.theme.color.gray)};
`;

const VisitCard = styled(Card)`
  display: flex;
  gap: 16px;
  align-items: baseline;
  margin-bottom: 10px;
`;

const VisitDate = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  color: ${(p) => p.theme.color.scrub};
  min-width: 84px;
`;

const VisitBody = styled.div`
  flex: 1;
`;

const VisitDoctor = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  font-size: 13.5px;
  color: ${(p) => p.theme.color.ink};
`;

const VisitDiag = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-size: 12.5px;
  color: ${(p) => p.theme.color.gray};
  margin-top: 2px;
`;

const Side = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AllergyTitle = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  font-size: 13.5px;
  color: ${(p) => p.theme.color.clay};
  margin: 6px 0 2px;
`;

const AllergyNote = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-size: 12px;
  color: #8a3a3a;
`;

const VitalRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 12px;
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.ink};
`;

const RxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  font-family: ${(p) => p.theme.font.body};
  font-size: 12.5px;
  color: ${(p) => p.theme.color.white};
`;

const TopRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 14px;
`;

export function PatientDetailPage() {
  const { id } = useParams();
  const { data: animal, isLoading } = useAnimal(id);
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading || !animal) {
    return (
      <AppShell title="Электронная карта животного">
        <p>Загрузка...</p>
      </AppShell>
    );
  }

  return (
    <AppShell title="Электронная карта животного" chartId={animal.chartId}>
      <TopRow>
        <Button $variant="accent" onClick={() => setModalOpen(true)}>
          <MdAdd size={18} /> Новый приём
        </Button>
      </TopRow>

      <Grid>
        <div>
          <HeaderCard $tone="sage">
            <IconCircle icon={MdPets} color="#2F6F52" size={68} />
            <HeaderInfo>
              <Eyebrow>Пациент</Eyebrow>
              <PetName>{animal.name}</PetName>
              <Meta>
                {animal.species} · {animal.breed} · {animal.ageYears} года
              </Meta>
              <OwnerLine>
                {animal.owner.name} · {animal.owner.phone}
              </OwnerLine>
            </HeaderInfo>
            <Stamp $color="#2F6F52">Активен</Stamp>
          </HeaderCard>

          <Tabs>
            <Tab $active>История</Tab>
            <Tab disabled title="Скоро">Диагнозы</Tab>
            <Tab disabled title="Скоро">Назначения</Tab>
            <Tab disabled title="Скоро">Документы</Tab>
          </Tabs>

          {animal.visits.map((v) => (
            <VisitCard key={v.id}>
              <VisitDate>{new Date(v.date).toLocaleDateString('ru-RU')}</VisitDate>
              <VisitBody>
                <VisitDoctor>{v.doctorName}</VisitDoctor>
                <VisitDiag>{v.diagnosis}</VisitDiag>
              </VisitBody>
            </VisitCard>
          ))}
        </div>

        <Side>
          {animal.allergies.length > 0 && (
            <Card $tone="alert">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <MdWarningAmber size={20} color="#B94A3E" />
                <Eyebrow $color="#B94A3E">Критично</Eyebrow>
              </div>
              {animal.allergies.map((al, i) => (
                <div key={i}>
                  <AllergyTitle>Аллергия на {al.substance.toLowerCase()}</AllergyTitle>
                  {al.note && <AllergyNote>{al.note}</AllergyNote>}
                </div>
              ))}
            </Card>
          )}

          <Card $tone="sage">
            <Eyebrow>Показатели</Eyebrow>
            {animal.vitals.weightKg && (
              <VitalRow>
                <MdMonitorWeight size={20} color="#2F6F52" /> Вес: {animal.vitals.weightKg} кг
              </VitalRow>
            )}
            {animal.vitals.temperatureC && (
              <VitalRow>
                <MdThermostat size={20} color="#2F6F52" /> Температура: {animal.vitals.temperatureC}°C
              </VitalRow>
            )}
            {animal.vitals.sterilized && (
              <VitalRow>
                <MdCheckCircle size={18} color="#84978C" /> Стерилизован
              </VitalRow>
            )}
          </Card>

          <Card $tone="dark">
            <Eyebrow $color="#A9C9BA">Текущие назначения</Eyebrow>
            {(animal.visits[0]?.prescriptions ?? ['Нет активных назначений']).map((rx, i) => (
              <RxRow key={i}>
                <MdMedication size={18} color="#fff" /> {rx}
              </RxRow>
            ))}
          </Card>
        </Side>
      </Grid>

      {modalOpen && <NewVisitModal animalId={animal.id} onClose={() => setModalOpen(false)} />}
    </AppShell>
  );
}

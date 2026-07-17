import { Fragment } from 'react';
import styled from 'styled-components';
import { AppShell } from '../components/layout/AppShell';
import { Stamp } from '../components/ui/Stamp';
import { useAppointments, useDoctors } from '../api/schedule';
import type { Appointment, AppointmentStatus } from '../types';

const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00'];

const STATUS_COLOR: Record<AppointmentStatus, string> = {
  confirmed: '#2F6F52',
  surgery: '#C98A2B',
  attention: '#B94A3E',
  done: '#A9B6AE',
};

const STATUS_LABEL: Record<AppointmentStatus, string> = {
  confirmed: 'Подтверждён',
  surgery: 'Операция',
  attention: 'Требует внимания',
  done: 'Завершён',
};

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: 70px repeat(var(--cols), 1fr);
  border-top: 1px solid ${(p) => p.theme.color.border};
`;

const HeaderCell = styled.div`
  background: ${(p) => p.theme.color.ink};
  color: ${(p) => p.theme.color.white};
  padding: 12px 14px;
  border-radius: 8px;
  margin: 0 6px 10px 0;
`;

const DoctorName = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  font-size: 14px;
`;

const DoctorSpec = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-size: 11.5px;
  color: #9fb3a6;
`;

const TimeCell = styled.div`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 12px;
  color: ${(p) => p.theme.color.gray};
  padding-top: 14px;
`;

const SlotCell = styled.div`
  position: relative;
  border-top: 1px solid ${(p) => p.theme.color.border};
  min-height: 76px;
  margin-right: 6px;
`;

const Appt = styled.div<{ $color: string; $span: number }>`
  position: absolute;
  inset: 4px 4px auto 4px;
  height: ${(p) => p.$span * 76 - 8}px;
  background: ${(p) => p.$color};
  color: #fff;
  border-radius: 6px;
  padding: 8px 10px;
  font-family: ${(p) => p.theme.font.body};
  font-size: 12.5px;
  font-weight: 700;
  z-index: 1;
`;

const Legend = styled.div`
  display: flex;
  gap: 18px;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: ${(p) => p.theme.font.body};
  font-size: 12px;
  color: ${(p) => p.theme.color.gray};
`;

const Dot = styled.span<{ $color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${(p) => p.$color};
`;

export function SchedulePage() {
  const { data: doctors } = useDoctors();
  const { data: appointments } = useAppointments();

  if (!doctors || !appointments) {
    return (
      <AppShell title="Расписание врачей">
        <p>Загрузка...</p>
      </AppShell>
    );
  }

  const today = new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });

  function findAppt(doctorId: string, slotIndex: number): Appointment | undefined {
    return appointments!.find((a) => a.doctorId === doctorId && SLOTS[slotIndex] === a.time);
  }

  return (
    <AppShell title="Расписание врачей" chartId={`#SCHED-${new Date().toISOString().slice(5, 10)}`}>
      <Toolbar>
        <Stamp $color="#2F6F52">{today}</Stamp>
      </Toolbar>

      <GridWrap style={{ ['--cols' as string]: doctors.length }}>
        <div />
        {doctors.map((d) => (
          <HeaderCell key={d.id}>
            <DoctorName>{d.name}</DoctorName>
            <DoctorSpec>{d.specialty}</DoctorSpec>
          </HeaderCell>
        ))}

        {SLOTS.map((slot, si) => (
          <Fragment key={slot}>
            <TimeCell>{slot}</TimeCell>
            {doctors.map((d) => {
              const appt = findAppt(d.id, si);
              return (
                <SlotCell key={`${d.id}-${slot}`}>
                  {appt && (
                    <Appt $color={STATUS_COLOR[appt.status]} $span={appt.durationSlots}>
                      {appt.animalName} · {appt.reason}
                    </Appt>
                  )}
                </SlotCell>
              );
            })}
          </Fragment>
        ))}
      </GridWrap>

      <Legend>
        {(Object.keys(STATUS_LABEL) as AppointmentStatus[]).map((s) => (
          <LegendItem key={s}>
            <Dot $color={STATUS_COLOR[s]} /> {STATUS_LABEL[s]}
          </LegendItem>
        ))}
      </Legend>
    </AppShell>
  );
}

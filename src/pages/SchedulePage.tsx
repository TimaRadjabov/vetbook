import { Fragment } from 'react';
import styled from 'styled-components';
import { AppShell } from '../components/layout/AppShell';
import { Stamp } from '../components/ui/Stamp';
import { LoadingState, ErrorState, EmptyState } from '../components/ui/QueryState';
import { useAppointments, useDoctors } from '../api/schedule';
import { APPOINTMENT_STATUS, APPOINTMENT_STATUSES, type StatusTone } from '../constants/appointment';
import type { Appointment } from '../types';

const SLOTS = ['09:00', '10:00', '11:00', '12:00', '13:00'];

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
  color: ${(p) => p.theme.color.mist};
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

const Appt = styled.div<{ $tone: StatusTone; $span: number }>`
  position: absolute;
  inset: 4px 4px auto 4px;
  height: ${(p) => p.$span * 76 - 8}px;
  background: ${(p) => p.theme.color[p.$tone]};
  color: ${(p) => p.theme.color.white};
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

const Dot = styled.span<{ $tone: StatusTone }>`
  width: 12px;
  height: 12px;
  border-radius: 3px;
  background: ${(p) => p.theme.color[p.$tone]};
`;

export function SchedulePage() {
  const { data: doctors, isLoading: doctorsLoading, isError: doctorsError, error: dErr } = useDoctors();
  const { data: appointments, isLoading: apptsLoading, isError: apptsError, error: aErr } = useAppointments();

  const isLoading = doctorsLoading || apptsLoading;
  const isError = doctorsError || apptsError;

  if (isLoading || isError) {
    return (
      <AppShell title="Расписание врачей">
        {isError ? <ErrorState error={dErr ?? aErr} prefix="Не удалось загрузить расписание" /> : <LoadingState />}
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
        <Stamp>{today}</Stamp>
      </Toolbar>

      {doctors!.length === 0 ? (
        <EmptyState>Нет врачей в расписании</EmptyState>
      ) : (
        <GridWrap style={{ ['--cols' as string]: doctors!.length }}>
          <div />
          {doctors!.map((d) => (
            <HeaderCell key={d.id}>
              <DoctorName>{d.name}</DoctorName>
              <DoctorSpec>{d.specialty}</DoctorSpec>
            </HeaderCell>
          ))}

          {SLOTS.map((slot, si) => (
            <Fragment key={slot}>
              <TimeCell>{slot}</TimeCell>
              {doctors!.map((d) => {
                const appt = findAppt(d.id, si);
                return (
                  <SlotCell key={`${d.id}-${slot}`}>
                    {appt && (
                      <Appt $tone={APPOINTMENT_STATUS[appt.status].tone} $span={appt.durationSlots}>
                        {appt.animalName} · {appt.reason}
                      </Appt>
                    )}
                  </SlotCell>
                );
              })}
            </Fragment>
          ))}
        </GridWrap>
      )}

      <Legend>
        {APPOINTMENT_STATUSES.map((s) => (
          <LegendItem key={s}>
            <Dot $tone={APPOINTMENT_STATUS[s].tone} /> {APPOINTMENT_STATUS[s].label}
          </LegendItem>
        ))}
      </Legend>
    </AppShell>
  );
}

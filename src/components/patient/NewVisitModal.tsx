import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { Button } from '../ui/Button';
import { Input, Label, Textarea } from '../ui/Input';
import { useAddVisit } from '../../api/animals';

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(23, 36, 31, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 20px;
`;

const Panel = styled.form`
  background: ${(p) => p.theme.color.white};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: 28px;
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Title = styled.h3`
  font-family: ${(p) => p.theme.font.display};
  font-size: 18px;
  margin: 0;
  color: ${(p) => p.theme.color.ink};
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme.color.gray};
  display: flex;
`;

const Row = styled.div`
  display: flex;
  gap: 12px;
`;

const Field = styled.div`
  margin-bottom: 16px;
  flex: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 8px;
`;

const ErrorText = styled.p`
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.clay};
`;

export function NewVisitModal({ animalId, onClose }: { animalId: string; onClose: () => void }) {
  const { mutateAsync, isPending, error } = useAddVisit(animalId);
  const [diagnosis, setDiagnosis] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [temperatureC, setTemperatureC] = useState('');
  const [prescription, setPrescription] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    await mutateAsync({
      animalId,
      diagnosis,
      weightKg: weightKg ? Number(weightKg) : undefined,
      temperatureC: temperatureC ? Number(temperatureC) : undefined,
      prescriptions: prescription ? [prescription] : undefined,
    });
    onClose();
  }

  return (
    <Overlay onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Panel onSubmit={onSubmit}>
        <Header>
          <Title>Новый приём</Title>
          <CloseBtn type="button" onClick={onClose} aria-label="Закрыть">
            <MdClose size={20} />
          </CloseBtn>
        </Header>

        <Row>
          <Field>
            <Label htmlFor="weight">Вес, кг</Label>
            <Input id="weight" type="number" step="0.1" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} />
          </Field>
          <Field>
            <Label htmlFor="temp">Температура, °C</Label>
            <Input id="temp" type="number" step="0.1" value={temperatureC} onChange={(e) => setTemperatureC(e.target.value)} />
          </Field>
        </Row>

        <Field>
          <Label htmlFor="diagnosis">Диагноз</Label>
          <Textarea id="diagnosis" rows={3} required value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
        </Field>

        <Field>
          <Label htmlFor="rx">Назначение</Label>
          <Input id="rx" value={prescription} onChange={(e) => setPrescription(e.target.value)} placeholder="Например: Витаминный комплекс, 14 дней" />
        </Field>

        {error && <ErrorText>{(error as Error).message}</ErrorText>}

        <Actions>
          <Button type="button" $variant="ghost" onClick={onClose}>
            Отмена
          </Button>
          <Button type="submit" $variant="accent" disabled={isPending}>
            {isPending ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </Actions>
      </Panel>
    </Overlay>
  );
}

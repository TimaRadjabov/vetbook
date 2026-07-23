import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Input, Label, Select } from '../ui/Input';
import { useCreateAnimal } from '../../api/animals';

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

const Divider = styled.div`
  font-family: ${(p) => p.theme.font.body};
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${(p) => p.theme.color.grayLight};
  margin: 4px 0 16px;
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

const SPECIES = ['Кот', 'Кошка', 'Собака', 'Кролик', 'Попугай', 'Хомяк', 'Другое'];

export function NewPatientModal({ onClose }: { onClose: () => void }) {
  const { mutateAsync, isPending, error } = useCreateAnimal();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState(SPECIES[0]);
  const [breed, setBreed] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const animal = await mutateAsync({ name, species, breed, ageYears: Number(ageYears), ownerName, ownerPhone });
    navigate(`/patients/${animal.id}`);
  }

  return (
    <Overlay onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <Panel onSubmit={onSubmit}>
        <Header>
          <Title>Новый пациент</Title>
          <CloseBtn type="button" onClick={onClose} aria-label="Закрыть">
            <MdClose size={20} />
          </CloseBtn>
        </Header>

        <Field>
          <Label htmlFor="name">Имя животного</Label>
          <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Барсик" />
        </Field>

        <Row>
          <Field>
            <Label htmlFor="species">Вид</Label>
            <Select id="species" value={species} onChange={(e) => setSpecies(e.target.value)}>
              {SPECIES.map((s) => <option key={s}>{s}</option>)}
            </Select>
          </Field>
          <Field>
            <Label htmlFor="breed">Порода</Label>
            <Input id="breed" required value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Метис" />
          </Field>
        </Row>

        <Field>
          <Label htmlFor="age">Возраст, лет</Label>
          <Input id="age" type="number" min="0" max="50" required value={ageYears} onChange={(e) => setAgeYears(e.target.value)} />
        </Field>

        <Divider>Владелец</Divider>

        <Field>
          <Label htmlFor="ownerName">Имя</Label>
          <Input id="ownerName" required value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Азиза Юсупова" />
        </Field>

        <Field>
          <Label htmlFor="ownerPhone">Телефон</Label>
          <Input id="ownerPhone" required value={ownerPhone} onChange={(e) => setOwnerPhone(e.target.value)} placeholder="+998 90 000 00 00" />
        </Field>

        {error && <ErrorText>{(error as Error).message}</ErrorText>}

        <Actions>
          <Button type="button" $variant="ghost" onClick={onClose}>Отмена</Button>
          <Button type="submit" $variant="accent" disabled={isPending}>
            {isPending ? 'Создание...' : 'Создать карту'}
          </Button>
        </Actions>
      </Panel>
    </Overlay>
  );
}

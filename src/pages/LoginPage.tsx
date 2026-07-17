import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Button } from '../components/ui/Button';
import { Input, Label } from '../components/ui/Input';

const Screen = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.theme.color.ink};
  padding: 24px;
`;

const Panel = styled.form`
  background: ${(p) => p.theme.color.white};
  border-radius: ${(p) => p.theme.radius.lg};
  padding: 40px 36px;
  width: 100%;
  max-width: 380px;
`;

const Logo = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 26px;
  color: ${(p) => p.theme.color.ink};
  margin-bottom: 4px;
  span {
    color: ${(p) => p.theme.color.kraft};
  }
`;

const Sub = styled.p`
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.gray};
  margin: 0 0 28px;
`;

const Field = styled.div`
  margin-bottom: 18px;
`;

const ErrorText = styled.p`
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.clay};
  margin: -8px 0 18px;
`;

const Hint = styled.p`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.grayLight};
  margin-top: 20px;
  text-align: center;
`;

export function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@vetflow.uz');
  const [password, setPassword] = useState('demo');

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) navigate('/schedule');
  }

  return (
    <Screen>
      <Panel onSubmit={onSubmit}>
        <Logo>
          Vet<span>Flow</span>
        </Logo>
        <Sub>Вход в систему клиники</Sub>

        <Field>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Field>
        <Field>
          <Label htmlFor="password">Пароль</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </Field>

        {error && <ErrorText>{error}</ErrorText>}

        <Button type="submit" $variant="accent" disabled={loading} style={{ width: '100%' }}>
          {loading ? 'Входим...' : 'Войти'}
        </Button>

        <Hint>demo: admin@vetflow.uz / demo</Hint>
      </Panel>
    </Screen>
  );
}

import styled from 'styled-components';
import { MdSearch, MdLogout } from 'react-icons/md';
import { useAuth } from '../../auth/AuthContext';

const Bar = styled.header`
  height: 68px;
  background: ${(p) => p.theme.color.white};
  border-bottom: 1px solid ${(p) => p.theme.color.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 28px;
  gap: 16px;
`;

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Title = styled.h1`
  font-family: ${(p) => p.theme.font.display};
  font-size: 20px;
  font-weight: 700;
  color: ${(p) => p.theme.color.ink};
  margin: 0;
`;

const ChartId = styled.span`
  font-family: ${(p) => p.theme.font.mono};
  font-size: 11px;
  color: ${(p) => p.theme.color.gray};
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: ${(p) => p.theme.color.sage};
  border-radius: 8px;
  padding: 8px 14px;
  color: ${(p) => p.theme.color.gray};
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  width: 220px;
  flex-shrink: 0;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: ${(p) => p.theme.color.scrub};
  color: ${(p) => p.theme.color.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  font-size: 14px;
`;

const UserName = styled.span`
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  color: ${(p) => p.theme.color.gray};
`;

const LogoutBtn = styled.button`
  background: none;
  border: none;
  color: ${(p) => p.theme.color.gray};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 6px;
  border-radius: 6px;
  &:hover {
    background: ${(p) => p.theme.color.sage};
  }
`;

export function Topbar({ title, chartId }: { title: string; chartId?: string }) {
  const { user, logout } = useAuth();

  return (
    <Bar>
      <TitleBlock>
        <Title>{title}</Title>
        {chartId && <ChartId>{chartId}</ChartId>}
      </TitleBlock>
      <SearchBox>
        <MdSearch size={16} />
        Поиск...
      </SearchBox>
      <Right>
        <Avatar>{user?.avatarInitial}</Avatar>
        <UserName>{user?.name}</UserName>
        <LogoutBtn onClick={logout} title="Выйти" aria-label="Выйти">
          <MdLogout size={18} />
        </LogoutBtn>
      </Right>
    </Bar>
  );
}

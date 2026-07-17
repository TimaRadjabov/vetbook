import styled, { css } from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import {
  MdPets,
  MdCalendarToday,
  MdEventAvailable,
  MdInventory2,
  MdNotificationsActive,
  MdInsertChartOutlined,
} from 'react-icons/md';
import type { IconType } from 'react-icons';

interface NavItem {
  to: string;
  label: string;
  icon: IconType;
  enabled: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { to: '/patients', label: 'ЭМК', icon: MdPets, enabled: true },
  { to: '/schedule', label: 'Расписание', icon: MdCalendarToday, enabled: true },
  { to: '/booking', label: 'Онлайн-запись', icon: MdEventAvailable, enabled: false },
  { to: '/stock', label: 'Склад', icon: MdInventory2, enabled: false },
  { to: '/reminders', label: 'Напоминания', icon: MdNotificationsActive, enabled: false },
  { to: '/analytics', label: 'Аналитика', icon: MdInsertChartOutlined, enabled: false },
];

const Aside = styled.aside`
  width: 220px;
  flex-shrink: 0;
  background: ${(p) => p.theme.color.ink};
  min-height: 100vh;
  padding: 24px 0;
`;

const Logo = styled.div`
  font-family: ${(p) => p.theme.font.display};
  font-weight: 700;
  font-size: 20px;
  color: ${(p) => p.theme.color.white};
  padding: 0 24px;
  margin-bottom: 32px;
  span {
    color: ${(p) => p.theme.color.kraft};
  }
`;

const Item = styled(NavLink)<{ $active: boolean; $disabled: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 12px 6px;
  padding: 11px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-family: ${(p) => p.theme.font.body};
  font-size: 14px;
  font-weight: 500;
  position: relative;
  color: #84978c;

  ${(p) =>
    p.$disabled &&
    css`
      color: #4a5a51;
      cursor: default;
      pointer-events: none;
    `}

  ${(p) =>
    p.$active &&
    css`
      background: ${p.theme.color.scrub};
      color: ${p.theme.color.white};
      font-weight: 700;
    `}
`;

const Hole = styled.span<{ $active: boolean }>`
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(p) => (p.$active ? p.theme.color.kraft : p.theme.color.ink)};
  border: 1px solid ${(p) => (p.$active ? p.theme.color.kraft : '#2E4038')};
`;

const Soon = styled.span`
  margin-left: auto;
  font-size: 9px;
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #4a5a51;
`;

export function Sidebar() {
  const location = useLocation();

  return (
    <Aside>
      <Logo>
        Vet<span>Flow</span>
      </Logo>
      {NAV_ITEMS.map((item) => {
        const active = item.enabled && location.pathname.startsWith(item.to);
        return (
          <Item key={item.to} to={item.enabled ? item.to : '#'} $active={active} $disabled={!item.enabled}>
            <Hole $active={active} />
            <item.icon size={18} />
            {item.label}
            {!item.enabled && <Soon>скоро</Soon>}
          </Item>
        );
      })}
    </Aside>
  );
}

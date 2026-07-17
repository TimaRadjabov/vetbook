import styled from 'styled-components';

export const Button = styled.button<{ $variant?: 'primary' | 'accent' | 'ghost' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${(p) => p.theme.space(2)};
  font-family: ${(p) => p.theme.font.body};
  font-weight: 600;
  font-size: 14px;
  padding: 10px 18px;
  border-radius: ${(p) => p.theme.radius.sm};
  border: none;
  cursor: pointer;
  transition: filter 0.15s ease, transform 0.05s ease;

  background: ${(p) => (p.$variant === 'accent' ? p.theme.color.kraft : p.$variant === 'ghost' ? 'transparent' : p.theme.color.scrub)};
  color: ${(p) => (p.$variant === 'ghost' ? p.theme.color.ink : p.theme.color.white)};
  border: ${(p) => (p.$variant === 'ghost' ? `1px solid ${p.theme.color.border}` : 'none')};

  &:hover {
    filter: ${(p) => (p.$variant === 'ghost' ? 'none' : 'brightness(1.08)')};
  }
  &:active {
    transform: translateY(1px);
  }
  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.kraft};
    outline-offset: 2px;
  }
`;

export const IconButtonCircle = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: ${(p) => p.theme.color.sage};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${(p) => p.theme.color.scrub};
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.kraft};
    outline-offset: 2px;
  }
`;

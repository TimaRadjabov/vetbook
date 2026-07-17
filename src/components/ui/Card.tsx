import styled from 'styled-components';

export const Card = styled.div<{ $tone?: 'default' | 'sage' | 'dark' | 'alert' }>`
  background: ${(p) => {
    switch (p.$tone) {
      case 'sage':
        return p.theme.color.sage;
      case 'dark':
        return p.theme.color.scrubDark;
      case 'alert':
        return p.theme.color.claySoft;
      default:
        return p.theme.color.white;
    }
  }};
  border: ${(p) => (p.$tone === 'alert' ? `1.25px solid ${p.theme.color.clay}` : p.$tone === 'default' ? `1px solid ${p.theme.color.border}` : 'none')};
  border-radius: ${(p) => p.theme.radius.md};
  padding: ${(p) => p.theme.space(5)};
`;

export const Eyebrow = styled.div<{ $color?: string }>`
  font-family: ${(p) => p.theme.font.body};
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${(p) => p.$color ?? p.theme.color.gray};
  margin-bottom: ${(p) => p.theme.space(1)};
`;

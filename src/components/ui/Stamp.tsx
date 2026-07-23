import styled from 'styled-components';

// Semantic tones a stamp can take. Maps directly to theme colors so pages
// never pass raw hex values.
export type StampTone = 'scrub' | 'clay' | 'kraft' | 'ash' | 'ink';

// The signature status mark across the whole app: a rotated outline badge,
// like a rubber ink stamp on a paper chart. Used identically everywhere a
// state needs to be read at a glance — never a filled pill.
export const Stamp = styled.span<{ $tone?: StampTone; $size?: 'sm' | 'md' }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-3deg);
  border: 1.25px solid ${(p) => p.theme.color[p.$tone ?? 'scrub']};
  border-radius: ${(p) => p.theme.radius.sm};
  color: ${(p) => p.theme.color[p.$tone ?? 'scrub']};
  font-family: ${(p) => p.theme.font.body};
  font-weight: 700;
  font-size: ${(p) => (p.$size === 'sm' ? '10px' : '11px')};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: ${(p) => (p.$size === 'sm' ? '3px 8px' : '4px 10px')};
  white-space: nowrap;
  background: transparent;
`;

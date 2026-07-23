import styled from 'styled-components';

export const Input = styled.input`
  font-family: ${(p) => p.theme.font.body};
  font-size: 14px;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.color.border};
  background: ${(p) => p.theme.color.white};
  color: ${(p) => p.theme.color.ink};
  width: 100%;

  &::placeholder {
    color: ${(p) => p.theme.color.grayLight};
  }
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.scrub};
    outline-offset: 1px;
  }
`;

export const Label = styled.label`
  display: block;
  font-family: ${(p) => p.theme.font.body};
  font-size: 13px;
  font-weight: 600;
  color: ${(p) => p.theme.color.ink};
  margin-bottom: ${(p) => p.theme.space(1.5)};
`;

export const Select = styled.select`
  font-family: ${(p) => p.theme.font.body};
  font-size: 14px;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.color.border};
  background: ${(p) => p.theme.color.white};
  color: ${(p) => p.theme.color.ink};
  width: 100%;
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.scrub};
    outline-offset: 1px;
  }
`;

export const Textarea = styled.textarea`
  font-family: ${(p) => p.theme.font.body};
  font-size: 14px;
  padding: 10px 12px;
  border-radius: ${(p) => p.theme.radius.sm};
  border: 1px solid ${(p) => p.theme.color.border};
  background: ${(p) => p.theme.color.white};
  color: ${(p) => p.theme.color.ink};
  width: 100%;
  resize: vertical;
  font-family: inherit;

  &:focus-visible {
    outline: 2px solid ${(p) => p.theme.color.scrub};
    outline-offset: 1px;
  }
`;

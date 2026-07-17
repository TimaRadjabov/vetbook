import styled from 'styled-components';
import type { IconType } from 'react-icons';

const Circle = styled.div<{ $bg: string; $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  background: ${(p) => p.$bg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
`;

interface Props {
  icon: IconType;
  color: string;
  size?: number;
}

export function IconCircle({ icon: Icon, color, size = 44 }: Props) {
  return (
    <Circle $bg={color} $size={size}>
      <Icon size={size * 0.52} />
    </Circle>
  );
}

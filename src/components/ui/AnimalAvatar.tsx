import { useRef } from 'react';
import styled from 'styled-components';
import { MdPets, MdCameraAlt } from 'react-icons/md';
import { IconCircle } from './IconCircle';

const Wrap = styled.div<{ $size: number; $clickable: boolean }>`
  position: relative;
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  flex-shrink: 0;
  cursor: ${(p) => (p.$clickable ? 'pointer' : 'default')};
`;

const Img = styled.img<{ $size: number }>`
  width: ${(p) => p.$size}px;
  height: ${(p) => p.$size}px;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  color: #fff;
  transition: opacity 0.15s;
  ${Wrap}:hover & {
    opacity: 1;
  }
`;

interface Props {
  url?: string;
  size?: number;
  onUpload?: (dataUrl: string) => void;
}

export function AnimalAvatar({ url, size = 44, onUpload }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onUpload?.(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  return (
    <Wrap $size={size} $clickable={!!onUpload} onClick={() => onUpload && inputRef.current?.click()}>
      {url ? (
        <Img src={url} $size={size} alt="Фото животного" />
      ) : (
        <IconCircle icon={MdPets} size={size} />
      )}
      {onUpload && (
        <>
          <Overlay>
            <MdCameraAlt size={size * 0.32} />
          </Overlay>
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleFile} />
        </>
      )}
    </Wrap>
  );
}

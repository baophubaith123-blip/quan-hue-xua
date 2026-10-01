// Nut.tsx — Nút tái sử dụng (props + children)
import type { ReactNode, MouseEvent } from 'react';
import './Nut.css';

interface NutProps {
  loai?: 'chinh' | 'phu' | 'nguy-hiem';
  kichThuoc?: 'nho' | 'vua' | 'lon';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  children: ReactNode;
}

export function Nut({
  loai = 'chinh',
  kichThuoc = 'vua',
  onClick,
  disabled = false,
  type = 'button',
  children,
}: NutProps) {
  return (
    <button
      type={type}
      className={`nut nut--${loai} nut--${kichThuoc}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
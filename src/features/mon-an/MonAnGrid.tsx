// MonAnGrid.tsx — Lưới món ăn (presentational)
import type { MonAn } from './types';
import { MonAnCard } from './MonAnCard';

interface MonAnGridProps {
  danhSach: MonAn[];
  onThemVaoGio: (mon: MonAn) => void;
  onXemChiTiet: (mon: MonAn) => void;
}

export function MonAnGrid({ danhSach, onThemVaoGio, onXemChiTiet }: MonAnGridProps) {
  return (
    <div className="mon-an-grid">
      {danhSach.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          onThemVaoGio={onThemVaoGio}
          onXemChiTiet={onXemChiTiet}
        />
      ))}
    </div>
  );
}
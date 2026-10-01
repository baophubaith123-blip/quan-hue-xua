import type { MonAn } from './types';
import { MonAnCard } from './MonAnCard';

interface MonAnGridProps {
  danhSach: MonAn[];
  idDangChon: string | null;
  onChon: (id: string) => void;
  onDat: (id: string) => void;
  onXemChiTiet: (mon: MonAn) => void;
}

export function MonAnGrid({
  danhSach,
  idDangChon,
  onChon,
  onDat,
  onXemChiTiet,
}: MonAnGridProps) {
  return (
    <div className="mon-an-grid">
      {danhSach.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={mon.id === idDangChon}
          onChon={onChon}
          onDat={onDat}
          onXemChiTiet={onXemChiTiet}
        />
      ))}
    </div>
  );
}
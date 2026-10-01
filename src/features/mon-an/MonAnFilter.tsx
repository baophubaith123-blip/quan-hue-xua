// MonAnFilter.tsx — Bộ lọc món ăn (presentational)
import type { MonAnFilter as FilterState, LoaiMon } from './types';
import { Nut } from '../../components/Nut';

interface MonAnFilterProps {
  boLoc: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
  onReset: () => void;
}

const CAC_LOAI: Array<{ value: LoaiMon | 'tat-ca'; label: string }> = [
  { value: 'tat-ca', label: 'Tất cả' },
  { value: 'bun', label: 'Bún' },
  { value: 'com', label: 'Cơm' },
  { value: 'banh', label: 'Bánh' },
  { value: 'che', label: 'Chè' },
  { value: 'nem', label: 'Nem' },
];

export function MonAnFilter({ boLoc, onChange, onReset }: MonAnFilterProps) {
  return (
    <div className="mon-an-filter">
      <label className="mon-an-filter__field">
        <span>Loại món</span>
        <select
          value={boLoc.loai}
          onChange={(e) =>
            onChange({ loai: e.target.value as LoaiMon | 'tat-ca' })
          }
        >
          {CAC_LOAI.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </label>

      <label className="mon-an-filter__field">
        <span>Giá tối đa: {boLoc.giaToiDa.toLocaleString('vi-VN')}đ</span>
        <input
          type="range"
          min={10000}
          max={100000}
          step={5000}
          value={boLoc.giaToiDa}
          onChange={(e) => onChange({ giaToiDa: Number(e.target.value) })}
        />
      </label>

      <Nut loai="phu" kichThuoc="vua" onClick={onReset}>
        Đặt lại bộ lọc
      </Nut>
    </div>
  );
}
// useDanhSachMon.ts — Custom Hook quản lý danh sách món
import { useState, useMemo } from 'react';
import type { MonAn, MonAnFilter } from './types';

const BO_LOC_MAC_DINH: MonAnFilter = {
  tuKhoa: '',
  loai: 'tat-ca',
  giaToiDa: 100000,
};

export function useDanhSachMon(dataGoc: MonAn[]) {
  const [boLoc, setBoLoc] = useState<MonAnFilter>(BO_LOC_MAC_DINH);

  // ✅ useMemo: chỉ lọc lại khi boLoc đổi
  const danhSachHienThi = useMemo(() => {
    const tuKhoaNorm = boLoc.tuKhoa.trim().toLowerCase();
    return dataGoc.filter((m) => {
      if (tuKhoaNorm && !m.ten.toLowerCase().includes(tuKhoaNorm)) return false;
      if (boLoc.loai !== 'tat-ca' && m.loai !== boLoc.loai) return false;
      if (m.gia > boLoc.giaToiDa) return false;
      return true;
    });
  }, [dataGoc, boLoc]);

  const capNhatBoLoc = (patch: Partial<MonAnFilter>) => {
    setBoLoc((prev) => ({ ...prev, ...patch }));
  };

  const resetBoLoc = () => setBoLoc(BO_LOC_MAC_DINH);

  return { danhSachHienThi, boLoc, capNhatBoLoc, resetBoLoc };
}
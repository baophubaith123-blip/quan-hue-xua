// useDanhSachMon.ts — Custom Hook lọc món ăn (hỗ trợ tìm không dấu)
import { useState, useMemo } from 'react';
import type { MonAn, MonAnFilter } from './types';

const BO_LOC_MAC_DINH: MonAnFilter = {
  tuKhoa: '',
  loai: 'tat-ca',
  giaToiDa: 100000,
};

// ✅ Hàm bỏ dấu tiếng Việt — quan trọng để tìm không dấu
function boDau(str: string): string {
  return str
    .normalize('NFD')                  // Tách ký tự gốc + dấu thành 2 phần
    .replace(/[\u0300-\u036f]/g, '')   // Xóa các dấu
    .replace(/đ/g, 'd')                // Chữ đ → d
    .replace(/Đ/g, 'D')                // Chữ Đ → D
    .toLowerCase();
}

export function useDanhSachMon(dataGoc: MonAn[]) {
  const [boLoc, setBoLoc] = useState<MonAnFilter>(BO_LOC_MAC_DINH);

  const danhSachHienThi = useMemo(() => {
    const tuKhoaNorm = boDau(boLoc.tuKhoa.trim());

    return dataGoc.filter((m) => {
      // ✅ Lọc theo từ khoá — so khớp KHÔNG DẤU
      if (tuKhoaNorm && !boDau(m.ten).includes(tuKhoaNorm)) return false;

      // Lọc theo loại
      if (boLoc.loai !== 'tat-ca' && m.loai !== boLoc.loai) return false;

      // Lọc theo giá tối đa
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
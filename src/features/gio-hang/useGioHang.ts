// useGioHang.ts — Custom Hook quản lý giỏ hàng
import { useState, useCallback } from 'react';
import type { MonAn } from '../mon-an/types';

export interface GioHangItem {
  mon: MonAn;
  soLuong: number;
}

export function useGioHang() {
  const [gioHang, setGioHang] = useState<GioHangItem[]>([]);

  // ✅ useCallback: hàm ổn định qua các lần render
  const themVaoGio = useCallback((mon: MonAn) => {
    setGioHang((prev) => {
      const daCo = prev.find((item) => item.mon.id === mon.id);
      if (daCo) {
        return prev.map((item) =>
          item.mon.id === mon.id
            ? { ...item, soLuong: item.soLuong + 1 }
            : item
        );
      }
      return [...prev, { mon, soLuong: 1 }];
    });
  }, []);

  const giamSoLuong = useCallback((id: string) => {
    setGioHang((prev) =>
      prev
        .map((item) =>
          item.mon.id === id
            ? { ...item, soLuong: item.soLuong - 1 }
            : item
        )
        .filter((item) => item.soLuong > 0)
    );
  }, []);

  const xoaKhoiGio = useCallback((id: string) => {
    setGioHang((prev) => prev.filter((item) => item.mon.id !== id));
  }, []);

  const xoaTatCa = () => setGioHang([]);

  const tongTien = gioHang.reduce(
    (sum, item) => sum + item.mon.gia * item.soLuong,
    0
  );
  const tongSoMon = gioHang.reduce((sum, item) => sum + item.soLuong, 0);

  return {
    gioHang,
    themVaoGio,
    giamSoLuong,
    xoaKhoiGio,
    xoaTatCa,
    tongTien,
    tongSoMon,
  };
}
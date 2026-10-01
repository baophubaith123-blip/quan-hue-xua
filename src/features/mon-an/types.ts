// types.ts — Kiểu dữ liệu cho module Món ăn
export type LoaiMon = 'bun' | 'com' | 'banh' | 'che' | 'nem';

export interface MonAn {
  id: string;
  ten: string;
  loai: LoaiMon;
  gia: number;
  moTa: string;
  hinh: string;
  hot?: boolean;
}

export interface MonAnFilter {
  tuKhoa: string;
  loai: LoaiMon | 'tat-ca';
  giaToiDa: number;
}
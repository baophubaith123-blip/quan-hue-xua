// useLocalStorage.ts — Hook lưu state vào localStorage
import { useState, useEffect } from 'react';

export default function useLocalStorage<T>(
  khoa: string,
  giaTriDau: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  // ✅ Khởi tạo lười — chỉ chạy 1 lần
  const [giaTri, setGiaTri] = useState<T>(() => {
    try {
      const luu = localStorage.getItem(khoa);
      if (luu === null) return giaTriDau;
      return JSON.parse(luu) as T;
    } catch {
      // ✅ Dữ liệu hỏng → dùng giá trị đầu, không sập app
      return giaTriDau;
    }
  });

  // ✅ Ghi lại mỗi khi giá trị đổi
  useEffect(() => {
    try {
      localStorage.setItem(khoa, JSON.stringify(giaTri));
    } catch {
      // Bỏ qua lỗi (ví dụ: hết dung lượng)
    }
  }, [khoa, giaTri]);

  return [giaTri, setGiaTri];
}
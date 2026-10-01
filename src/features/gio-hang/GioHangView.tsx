// GioHangView.tsx — View giỏ hàng
// Gap 4: useMemo tính tổng tiền, format đúng đề kiểm tra
// INT.7.18 — Web FrontEnd nâng cao

import { useMemo } from 'react';
import type { MonAn } from '../mon-an/types';

export interface GioItem {
  id: string;
  soLuong: number;
}

interface GioHangViewProps {
  gio: GioItem[];
  dsMon: MonAn[];
  onThem: (id: string) => void;
  onGiam: (id: string) => void;
  onXoa: (id: string) => void;
  onQuayLai?: () => void;
}

export function GioHangView({
  gio,
  dsMon,
  onThem,
  onGiam,
  onXoa,
  onQuayLai,
}: GioHangViewProps) {
  // ✅ useMemo tính tổng tiền
  const tongTien = useMemo(() => {
    return gio.reduce((sum, item) => {
      const mon = dsMon.find((m) => m.id === item.id);
      return mon ? sum + mon.gia * item.soLuong : sum;
    }, 0);
  }, [gio, dsMon]);

  // ============================================================
  // Empty state — ĐỔI TEXT để tránh lỗi font dấu kết hợp
  // ============================================================
  if (gio.length === 0) {
    return (
      <div className="gio-hang-empty" data-testid="gio-hang">
        <div className="gio-hang-empty__icon">🛒</div>

        {/* ✅ Đổi text: "Chưa có món nào" — không có ký tự kết hợp phức tạp */}
        <h3 className="gio-hang-empty__title">Giỏ hàng trống</h3>

        <p className="gio-hang-empty__desc">
          Hãy khám phá thực đơn và thêm những món
          <br />
          ngon xứ Huế vào giỏ nhé!
        </p>

        {onQuayLai && (
          <button
            type="button"
            className="gio-hang-empty__btn"
            onClick={onQuayLai}
          >
            🍽 Khám phá thực đơn
          </button>
        )}
      </div>
    );
  }

  // ============================================================
  // Có món — hiện danh sách
  // ============================================================
  return (
    <div data-testid="gio-hang">
      <ul className="gio-hang-list">
        {gio.map((item) => {
          const mon = dsMon.find((m) => m.id === item.id);
          if (!mon) return null;

          const thanhTien = mon.gia * item.soLuong;

          return (
            <li key={item.id} className="gio-hang-item">
              <img src={mon.hinh} alt={mon.ten} />

              <div className="gio-hang-item__info">
                <h4>
                  {mon.ten} × {item.soLuong}
                </h4>
                <p>{mon.gia.toLocaleString('vi-VN')} đ</p>
              </div>

              <div className="gio-hang-item__controls">
                <button
                  type="button"
                  onClick={() => onGiam(item.id)}
                  aria-label={`Giảm ${mon.ten}`}
                >
                  −
                </button>
                <span>{item.soLuong}</span>
                <button
                  type="button"
                  onClick={() => onThem(item.id)}
                  aria-label={`Tăng ${mon.ten}`}
                >
                  +
                </button>
                <button
                  type="button"
                  className="gio-hang-item__xoa"
                  onClick={() => onXoa(item.id)}
                  aria-label={`Xóa ${mon.ten}`}
                >
                  🗑
                </button>
              </div>

              <div className="gio-hang-item__tong">
                {thanhTien.toLocaleString('vi-VN')} đ
              </div>
            </li>
          );
        })}
      </ul>

      {/* ✅ Tổng tiền */}
      <div className="gio-hang-tong" data-testid="tong-tien">
        <span>Tổng cộng:</span>
        <strong>{tongTien.toLocaleString('vi-VN')} đ</strong>
      </div>
    </div>
  );
}
// GioHangView.tsx — View giỏ hàng (presentational)
import type { GioHangItem } from './useGioHang';

interface GioHangViewProps {
  gioHang: GioHangItem[];
  tongTien: number;
  onThem: (mon: any) => void;
  onGiam: (id: string) => void;
  onXoa: (id: string) => void;
}

export function GioHangView({
  gioHang,
  tongTien,
  onThem,
  onGiam,
  onXoa,
}: GioHangViewProps) {
  if (gioHang.length === 0) {
    return (
      <p className="empty-state">
        🛒 Giỏ hàng trống. Hãy quay lại menu để chọn món!
      </p>
    );
  }

  return (
    <div className="gio-hang-view">
      <ul className="gio-hang-list">
        {gioHang.map((item) => (
          <li key={item.mon.id} className="gio-hang-item">
            <img src={item.mon.hinh} alt={item.mon.ten} />
            <div className="gio-hang-item__info">
              <h4>{item.mon.ten}</h4>
              <p>{item.mon.gia.toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="gio-hang-item__controls">
              <button onClick={() => onGiam(item.mon.id)}>−</button>
              <span>{item.soLuong}</span>
              <button onClick={() => onThem(item.mon)}>+</button>
              <button
                className="gio-hang-item__xoa"
                onClick={() => onXoa(item.mon.id)}
              >
                🗑
              </button>
            </div>
            <div className="gio-hang-item__tong">
              {(item.mon.gia * item.soLuong).toLocaleString('vi-VN')}đ
            </div>
          </li>
        ))}
      </ul>

      <div className="gio-hang-tong">
        <span>Tổng cộng:</span>
        <strong>{tongTien.toLocaleString('vi-VN')}đ</strong>
      </div>
    </div>
  );
}
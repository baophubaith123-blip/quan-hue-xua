// Header.tsx — Thanh tiêu đề trên cùng
// Có slot hanhDong để nhét nút bất kỳ (VD: nút "Quay lại menu")
// INT.7.18 — Web FrontEnd nâng cao

import type { ReactNode } from 'react';
import './Header.css';

const TEN_QUAN = import.meta.env.VITE_TEN_QUAN ?? 'Quán Huế Xưa';

interface HeaderProps {
  tongPhan: number;
  onClickGioHang: () => void;
  hanhDong?: ReactNode;   // ✅ Slot cho nút bên cạnh giỏ hàng
}

export function Header({ tongPhan, onClickGioHang, hanhDong }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        {/* ===== Logo ===== */}
        <div className="header__logo">
          <div className="header__logo-icon">🍜</div>
          <div className="header__logo-text">
            <h1 className="header__ten">{TEN_QUAN}</h1>
            <p className="header__slogan">Hương vị cố đô</p>
          </div>
        </div>

        {/* ===== Khu vực bên phải: nút quay lại + giỏ hàng ===== */}
        <div className="header__actions">
          {hanhDong}

          <button
            className="header__cart"
            onClick={onClickGioHang}
            type="button"
          >
            <span className="header__cart-icon">🛒</span>
            <div className="header__cart-info">
              <span className="header__cart-label">Giỏ hàng</span>
              <span
                className="header__cart-count"
                data-testid="tong-phan"
              >
                {tongPhan} phần
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
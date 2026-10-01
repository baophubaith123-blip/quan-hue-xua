// Header.tsx — Thanh tiêu đề trên cùng
import './Header.css';

interface HeaderProps {
  tongSoMon: number;
  onClickGioHang: () => void;
}

export function Header({ tongSoMon, onClickGioHang }: HeaderProps) {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <div className="header__logo-icon">🍜</div>
          <div className="header__logo-text">
            <h1 className="header__ten">Món Ngon Huế</h1>
            <p className="header__slogan">Hương vị cố đô</p>
          </div>
        </div>

        <button className="header__cart" onClick={onClickGioHang}>
          <span className="header__cart-icon">🛒</span>
          <div className="header__cart-info">
            <span className="header__cart-label">Giỏ hàng</span>
            <span className="header__cart-count">{tongSoMon} món</span>
          </div>
        </button>
      </div>
    </header>
  );
}
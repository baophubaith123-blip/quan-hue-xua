// HeroBanner.tsx — Banner lớn đầu trang
import './HeroBanner.css';

export function HeroBanner() {
  return (
    <section className="hero">
      <div className="hero__decor hero__decor--1"></div>
      <div className="hero__decor hero__decor--2"></div>
      <div className="hero__decor hero__decor--3"></div>

      <div className="hero__content">
        <div className="hero__badge">
          <span className="hero__badge-flag">🇻🇳</span>
          <span>Đặc sản cố đô</span>
        </div>

        <h2 className="hero__title">
          Khám phá món ngon
          <span className="hero__title-highlight"> xứ Huế</span>
        </h2>

        <p className="hero__desc">
          Tìm kiếm và thưởng thức những món ăn mang đậm hương vị truyền thống
          của vùng đất kinh kỳ.
        </p>

        <div className="hero__actions">
          <button className="hero__btn hero__btn--primary">
            🍽 Xem thực đơn
          </button>
          <button className="hero__btn hero__btn--outline">
            📖 Câu chuyện ẩm thực
          </button>
        </div>
      </div>
    </section>
  );
}
// MonAnCard.tsx — Thẻ món ăn
// Gap 1+2: Có nhãn "Hết món", class "dang-chon", nút "Thêm" + "Chi tiết"
// INT.7.18 — Web FrontEnd nâng cao

import type { MonAn } from './types';

interface MonAnCardProps {
  mon: MonAn;
  dangChon?: boolean;
  onChon?: (id: string) => void;
  onDat?: (id: string) => void;
  onXemChiTiet?: (mon: MonAn) => void;
}

export function MonAnCard({
  mon,
  dangChon = false,
  onChon,
  onDat,
  onXemChiTiet,
}: MonAnCardProps) {
  // ✅ Kiểm tra hết món — cast any vì đề có thể chưa có trường này
  const daHet = (mon as any).daHet === true;

  return (
    <article
      className={`mon-an-card ${dangChon ? 'dang-chon' : ''}`}
      onClick={() => onChon?.(mon.id)}
    >
      <div className="mon-an-card__anh-wrapper">
        <img className="mon-an-card__anh" src={mon.hinh} alt={mon.ten} />
        {mon.hot && <span className="mon-an-card__hot">HOT</span>}
      </div>

      <div className="mon-an-card__than">
        <h3 className="mon-an-card__ten">{mon.ten}</h3>
        <p className="mon-an-card__mo-ta">{mon.moTa}</p>

        {/* ✅ Nhãn "Hết món" */}
        {daHet && <span className="het-mon">Hết món</span>}

        <p className="mon-an-card__gia">
          {mon.gia.toLocaleString('vi-VN')} đ
        </p>

        <div className="mon-an-card__hanh-dong">
          {/* ✅ Nút "Thêm" — đỏ cam filled */}
          <button
            type="button"
            className="nut-them"
            disabled={daHet}
            onClick={(e) => {
              e.stopPropagation();
              onDat?.(mon.id);
            }}
          >
            🛒 Thêm
          </button>

          {/* ✅ Nút "Chi tiết" — viền cam, nền trắng */}
          <button
            type="button"
            className="nut-chi-tiet"
            onClick={(e) => {
              e.stopPropagation();
              onXemChiTiet?.(mon);
            }}
          >
            Chi tiết
          </button>
        </div>
      </div>
    </article>
  );
}
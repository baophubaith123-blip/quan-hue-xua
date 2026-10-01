// MonAnCard.tsx — Thẻ món ăn (presentational)
import type { MonAn } from './types';
import { Nut } from '../../components/Nut';

interface MonAnCardProps {
  mon: MonAn;
  onThemVaoGio: (mon: MonAn) => void;
  onXemChiTiet: (mon: MonAn) => void;
}

export function MonAnCard({ mon, onThemVaoGio, onXemChiTiet }: MonAnCardProps) {
  return (
    <article
      className="mon-an-card"
      onClick={() => onXemChiTiet(mon)}
    >
      <div className="mon-an-card__anh-wrapper">
        <img className="mon-an-card__anh" src={mon.hinh} alt={mon.ten} />
        {mon.hot && <span className="mon-an-card__hot">HOT</span>}
      </div>

      <div className="mon-an-card__than">
        <h3 className="mon-an-card__ten">{mon.ten}</h3>
        <p className="mon-an-card__mo-ta">{mon.moTa}</p>
        <p className="mon-an-card__gia">{mon.gia.toLocaleString('vi-VN')}đ</p>

        <div className="mon-an-card__hanh-dong">
          <Nut
            loai="chinh"
            kichThuoc="nho"
            onClick={(e) => {
              e.stopPropagation();
              onThemVaoGio(mon);
            }}
          >
            🛒 Thêm
          </Nut>
          <Nut
            loai="phu"
            kichThuoc="nho"
            onClick={(e) => {
              e.stopPropagation();
              onXemChiTiet(mon);
            }}
          >
            Chi tiết
          </Nut>
        </div>
      </div>
    </article>
  );
}
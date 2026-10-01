// App.tsx — Quán Huế Xưa
// Ứng dụng đặt món ăn Huế — Kiểm tra giữa kỳ
// INT.7.18 — Web FrontEnd nâng cao

import { useState } from 'react';
import { danhSachMonAn } from './data/monAn';
import { useDanhSachMon } from './features/mon-an/useDanhSachMon';
import { useGioHang } from './features/gio-hang/useGioHang';
import { MonAnGrid } from './features/mon-an/MonAnGrid';
import { MonAnFilter } from './features/mon-an/MonAnFilter';
import { SearchBox } from './features/mon-an/SearchBox';
import { GioHangView } from './features/gio-hang/GioHangView';
import { DatMonForm } from './features/gio-hang/DatMonForm';
import { PageLayout } from './components/PageLayout';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import './App.css';

type Trang = 'menu' | 'gio-hang';

function App() {
  const [trang, setTrang] = useState<Trang>('menu');

  // ===== Custom Hook: danh sách món + lọc =====
  const { danhSachHienThi, boLoc, capNhatBoLoc, resetBoLoc } =
    useDanhSachMon(danhSachMonAn);

  // ===== Custom Hook: giỏ hàng =====
  const {
    gioHang,
    themVaoGio,
    giamSoLuong,
    xoaKhoiGio,
    xoaTatCa,
    tongTien,
    tongSoMon,
  } = useGioHang();

  // ===== Xử lý đặt hàng =====
  async function handleDatHang(duLieu: {
    hoTen: string;
    soDienThoai: string;
    diaChi: string;
    ghiChu: string;
  }) {
    // Giả lập gọi API 1,2 giây
    await new Promise((r) => setTimeout(r, 1200));

    console.log('Đặt hàng:', { duLieu, gioHang, tongTien });

    // ✅ Xóa giỏ hàng sau khi đặt thành công
    xoaTatCa();

    // ✅ Hiện thông báo xác nhận
    alert(
      `Cảm ơn ${duLieu.hoTen}!\n\n` +
        `Đơn hàng trị giá ${tongTien.toLocaleString('vi-VN')}đ ` +
        `đã được tiếp nhận.\n\n` +
        `Chúng tôi sẽ liên hệ qua số ${duLieu.soDienThoai} để xác nhận.`
    );
  }

  // ===== Xử lý xem chi tiết món =====
  function handleXemChiTiet(mon: { ten: string; moTa: string; gia: number }) {
    alert(
      `${mon.ten}\n\n${mon.moTa}\n\nGiá: ${mon.gia.toLocaleString('vi-VN')}đ`
    );
  }

  return (
    <>
      {/* ===== Header (sticky) ===== */}
      <Header
        tongSoMon={tongSoMon}
        onClickGioHang={() => setTrang('gio-hang')}
      />

      {trang === 'menu' ? (
        <>
          {/* ===== Hero Banner ===== */}
          <HeroBanner />

          {/* ===== Trang Menu — Danh sách món ===== */}
          <PageLayout
            header={
              <>
                <h2 className="section-title">🍽 Thực đơn hôm nay</h2>
                <SearchBox
                  value={boLoc.tuKhoa}
                  onChange={(v) => capNhatBoLoc({ tuKhoa: v })}
                  placeholder="Tìm món ăn (VD: Bún bò, Bánh, Chè...)"
                />
              </>
            }
            sidebar={
              <>
                <h2>Bộ lọc</h2>
                <MonAnFilter
                  boLoc={boLoc}
                  onChange={capNhatBoLoc}
                  onReset={resetBoLoc}
                />
              </>
            }
            main={
              <>
                <p className="filter-summary">
                  Hiển thị <strong>{danhSachHienThi.length}</strong> /{' '}
                  {danhSachMonAn.length} món
                </p>
                {danhSachHienThi.length === 0 ? (
                  <p className="empty-state">
                    Không có món nào phù hợp. Hãy thử bộ lọc khác!
                  </p>
                ) : (
                  <MonAnGrid
                    danhSach={danhSachHienThi}
                    onThemVaoGio={themVaoGio}
                    onXemChiTiet={handleXemChiTiet}
                  />
                )}
              </>
            }
          />
        </>
      ) : (
        /* ===== Trang Giỏ hàng ===== */
        <div className="gio-hang-page">
          <div className="gio-hang-page__header">
            <button
              className="gio-hang-page__back"
              onClick={() => setTrang('menu')}
            >
              ← Quay lại menu
            </button>
            <h1>🛒 Giỏ hàng của bạn</h1>
          </div>

          <GioHangView
            gioHang={gioHang}
            tongTien={tongTien}
            onThem={themVaoGio}
            onGiam={giamSoLuong}
            onXoa={xoaKhoiGio}
          />

          {gioHang.length > 0 && (
            <DatMonForm tongTien={tongTien} onDatHang={handleDatHang} />
          )}
        </div>
      )}
    </>
  );
}

export default App;
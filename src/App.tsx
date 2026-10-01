// App.tsx — Quán Huế Xưa
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
import './App.css';

type Trang = 'menu' | 'gio-hang';

function App() {
  const [trang, setTrang] = useState<Trang>('menu');

  const { danhSachHienThi, boLoc, capNhatBoLoc, resetBoLoc } =
    useDanhSachMon(danhSachMonAn);

  const {
    gioHang,
    themVaoGio,
    giamSoLuong,
    xoaKhoiGio,
    xoaTatCa,        // ✅ Import hàm xóa tất cả
    tongTien,
    tongSoMon,
  } = useGioHang();

  // ✅ Hàm xử lý đặt hàng
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

    // ✅ Hiện thông báo
    alert(
      `Cảm ơn ${duLieu.hoTen}!\n\n` +
        `Đơn hàng trị giá ${tongTien.toLocaleString('vi-VN')}đ ` +
        `đã được tiếp nhận.\n\n` +
        `Chúng tôi sẽ liên hệ qua số ${duLieu.soDienThoai} để xác nhận.`
    );

    // ✅ Sau khi đặt xong, chuyển về trang Menu (tuỳ chọn)
    // setTrang('menu');
  }

  return (
    <>
      {/* ===== Top Nav ===== */}
      <nav className="top-nav">
        <div className="top-nav__brand">🍜 Quán Huế Xưa</div>
        <div className="top-nav__tabs">
          <button
            className={trang === 'menu' ? 'is-active' : ''}
            onClick={() => setTrang('menu')}
          >
            Menu
          </button>
          <button
            className={trang === 'gio-hang' ? 'is-active' : ''}
            onClick={() => setTrang('gio-hang')}
          >
            🛒 Giỏ hàng
            {tongSoMon > 0 && (
              <span className="top-nav__badge">{tongSoMon}</span>
            )}
          </button>
        </div>
      </nav>

      {trang === 'menu' ? (
        <PageLayout
          header={
            <>
              <h1>Khám phá ẩm thực Huế</h1>
              <SearchBox
                value={boLoc.tuKhoa}
                onChange={(v) => capNhatBoLoc({ tuKhoa: v })}
                placeholder="Tìm món ăn (VD: Bún bò)..."
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
                  onXemChiTiet={(mon) =>
                    alert(
                      `${mon.ten}\n\n${mon.moTa}\n\nGiá: ${mon.gia.toLocaleString('vi-VN')}đ`
                    )
                  }
                />
              )}
            </>
          }
        />
      ) : (
        <div className="gio-hang-page">
          <h1>🛒 Giỏ hàng của bạn</h1>

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
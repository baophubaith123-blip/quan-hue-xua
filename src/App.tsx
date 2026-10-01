// App.tsx — Quán Huế Xưa
// Ứng dụng đặt món ăn Huế — Kiểm tra giữa kỳ
// INT.7.18 — Web FrontEnd nâng cao

import { useState, useEffect } from 'react';
import { danhSachMonAn } from './data/monAn';
import { useDanhSachMon } from './features/mon-an/useDanhSachMon';
import { MonAnGrid } from './features/mon-an/MonAnGrid';
import { MonAnFilter } from './features/mon-an/MonAnFilter';
import { SearchBox } from './features/mon-an/SearchBox';
import { GioHangView } from './features/gio-hang/GioHangView';
import { FormDatMon } from './features/gio-hang/DatMonForm';
import { PageLayout } from './components/PageLayout';
import { Khung } from './components/Khung';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import useLocalStorage from './hooks/useLocalStorage';
import type { MonAn } from './features/mon-an/types';
import './App.css';

type Trang = 'menu' | 'gio-hang';

// ✅ Kiểu dữ liệu cho item trong giỏ — chỉ id + số lượng
interface GioItem {
  id: string;
  soLuong: number;
}

// ✅ Đọc tên quán từ biến môi trường
const TEN_QUAN = import.meta.env.VITE_TEN_QUAN ?? 'Quán Huế Xưa';

function App() {
  const [trang, setTrang] = useState<Trang>('menu');

  // ===== Custom Hook: danh sách món + lọc =====
  const { danhSachHienThi, boLoc, capNhatBoLoc, resetBoLoc } =
    useDanhSachMon(danhSachMonAn);

  // ✅ Gap 3: Giỏ hàng dùng useLocalStorage
  const [gio, setGio] = useLocalStorage<GioItem[]>('gio-hang', []);

  // ✅ Gap 2: State chọn thẻ
  const [idDangChon, setIdDangChon] = useState<string | null>(null);

  // ✅ Gap 6: Thông báo + key để reset form
  const [thongBao, setThongBao] = useState('');
  const [formKey, setFormKey] = useState(0);

  // ✅ Gap 2: Tính tongPhan trực tiếp — KHÔNG tạo state riêng
  const tongPhan = gio.reduce((sum, item) => sum + item.soLuong, 0);

  // ✅ Gap 3: Cập nhật document.title
  useEffect(() => {
    document.title = tongPhan > 0 ? `(${tongPhan}) ${TEN_QUAN}` : TEN_QUAN;
  }, [tongPhan]);

  // ===== Helper: tìm món theo id — DÙNG trong datMon =====
  function timMon(id: string): MonAn | undefined {
    return danhSachMonAn.find((m) => m.id === id);
  }

  // ===== Gap 2: Đặt món vào giỏ — cập nhật bất biến =====
  function datMon(id: string) {
    // ✅ Dùng timMon để validate món tồn tại
    const mon = timMon(id);
    if (!mon) return;

    setGio((truoc) => {
      const daCo = truoc.find((item) => item.id === id);
      if (daCo) {
        // Đã có → tăng số lượng
        return truoc.map((item) =>
          item.id === id ? { ...item, soLuong: item.soLuong + 1 } : item
        );
      }
      // Chưa có → thêm mới
      return [...truoc, { id, soLuong: 1 }];
    });
  }

  // ===== Giảm số lượng =====
  function giamSoLuong(id: string) {
    setGio((truoc) =>
      truoc
        .map((item) =>
          item.id === id ? { ...item, soLuong: item.soLuong - 1 } : item
        )
        .filter((item) => item.soLuong > 0)
    );
  }

  // ===== Xóa 1 món khỏi giỏ =====
  function xoaKhoiGio(id: string) {
    setGio((truoc) => truoc.filter((item) => item.id !== id));
  }

  // ===== Gap 6: Xóa toàn bộ giỏ =====
  function xoaTatCa() {
    setGio([]);
    setThongBao('');
  }

  // ===== Gap 6: Xử lý gửi đơn =====
  function guiDon(duLieu: {
    hoTen: string;
    soDienThoai: string;
    ghiChu: string;
  }) {
    // ✅ Chuỗi chính xác theo đề
    setThongBao(`Đã nhận đơn của ${duLieu.hoTen}`);

    // ✅ Xóa giỏ
    setGio([]);

    // ✅ Reset form bằng đổi key
    setFormKey((k) => k + 1);

    console.log('Đặt hàng:', duLieu);
  }

  // ===== Xem chi tiết món =====
  function handleXemChiTiet(mon: MonAn) {
    alert(
      `${mon.ten}\n\n${mon.moTa}\n\nGiá: ${mon.gia.toLocaleString('vi-VN')} đ`
    );
  }

  return (
    <>
      {/* ===== Header (sticky) — có nút Quay lại khi ở trang Giỏ ===== */}
      <Header
        tongPhan={tongPhan}
        onClickGioHang={() => setTrang('gio-hang')}
        hanhDong={
          trang === 'gio-hang' ? (
            <button
              type="button"
              className="header__back"
              onClick={() => setTrang('menu')}
            >
              ← Quay lại menu
            </button>
          ) : undefined
        }
      />

      {trang === 'menu' ? (
        <>
          {/* ===== Hero Banner ===== */}
          <HeroBanner />

          {/* ===== Trang Menu ===== */}
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
                    idDangChon={idDangChon}
                    onChon={setIdDangChon}
                    onDat={datMon}
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
          {/* ✅ Heading căn giữa — KHÔNG còn nút quay lại ở đây */}
          <div className="gio-hang-page__header">
            <h1 className="gio-hang-page__title">
              <span className="gio-hang-page__title-icon">🛒</span>
              <span>Giỏ hàng của bạn</span>
            </h1>
          </div>

          {/* ✅ Gap 6: Khung "Giỏ hàng" */}
          <Khung
            tieuDe="Giỏ hàng"
            hanhDong={
              gio.length > 0 ? (
                <button onClick={xoaTatCa}>Xóa giỏ hàng</button>
              ) : undefined
            }
          >
            <GioHangView
              gio={gio}
              dsMon={danhSachMonAn}
              onThem={datMon}
              onGiam={giamSoLuong}
              onXoa={xoaKhoiGio}
              onQuayLai={() => setTrang('menu')}
            />
          </Khung>

          {/* ✅ Gap 5 + 6: Form đặt món */}
          {gio.length > 0 && (
            <Khung tieuDe="Thông tin đặt món">
              <FormDatMon
                key={formKey}
                onGui={guiDon}
                choPhepGui={gio.length > 0}
              />
            </Khung>
          )}

          {/* ✅ Gap 6: Thông báo thành công */}
          {thongBao && (
            <p className="thong-bao-thanh-cong" role="status">
              ✓ {thongBao}
            </p>
          )}
        </div>
      )}
    </>
  );
}

export default App;
// DatMonForm.tsx — Form đặt món (controlled + validation)
import { useState } from 'react';
import type { FormEvent, ChangeEvent, FocusEvent } from 'react';
import { Nut } from '../../components/Nut';

export interface DuLieuDatMon {
  hoTen: string;
  soDienThoai: string;
  diaChi: string;
  ghiChu: string;
}

const GIA_TRI_BAN_DAU: DuLieuDatMon = {
  hoTen: '',
  soDienThoai: '',
  diaChi: '',
  ghiChu: '',
};

function kiemChung(d: DuLieuDatMon): Record<string, string> {
  const loi: Record<string, string> = {};
  if (!d.hoTen.trim()) loi.hoTen = 'Vui lòng nhập họ tên.';
  if (!/^[0-9]{10,11}$/.test(d.soDienThoai))
    loi.soDienThoai = 'SĐT phải có 10-11 chữ số.';
  if (!d.diaChi.trim()) loi.diaChi = 'Vui lòng nhập địa chỉ.';
  return loi;
}

interface DatMonFormProps {
  tongTien: number;
  onDatHang: (duLieu: DuLieuDatMon) => Promise<void>;
}

export function DatMonForm({ tongTien, onDatHang }: DatMonFormProps) {
  const [duLieu, setDuLieu] = useState<DuLieuDatMon>(GIA_TRI_BAN_DAU);
  const [daCham, setDaCham] = useState<Record<string, boolean>>({});
  const [dangGui, setDangGui] = useState(false);
  const [thanhCong, setThanhCong] = useState(false);

  const loi = kiemChung(duLieu);

  function xuLyThayDoi(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDuLieu((prev) => ({ ...prev, [name]: value }));
  }

  function xuLyRoiO(e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setDaCham((prev) => ({ ...prev, [e.target.name]: true }));
  }

  function loiCuaO(ten: string): string | undefined {
    return daCham[ten] ? loi[ten] : undefined;
  }

  async function xuLyGui(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // ✅ Chặn tải lại trang

    const tatCa: Record<string, boolean> = {};
    Object.keys(GIA_TRI_BAN_DAU).forEach((k) => (tatCa[k] = true));
    setDaCham(tatCa);

    if (Object.keys(kiemChung(duLieu)).length > 0) return;

    setDangGui(true);
    try {
      await onDatHang(duLieu);
      setThanhCong(true);
      setDuLieu(GIA_TRI_BAN_DAU);
      setDaCham({});
      setTimeout(() => setThanhCong(false), 3000);
    } finally {
      setDangGui(false);
    }
  }

  return (
    <form className="dat-mon-form" onSubmit={xuLyGui} noValidate>
      <h3>📝 Thông tin đặt món</h3>

      <div className="truong">
        <label>Họ tên *</label>
        <input
          name="hoTen"
          value={duLieu.hoTen}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="Nguyễn Văn A"
          aria-invalid={loiCuaO('hoTen') ? true : undefined}
        />
        {loiCuaO('hoTen') && <p className="thong-bao-loi">{loiCuaO('hoTen')}</p>}
      </div>

      <div className="truong">
        <label>Số điện thoại *</label>
        <input
          name="soDienThoai"
          value={duLieu.soDienThoai}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="0912345678"
          aria-invalid={loiCuaO('soDienThoai') ? true : undefined}
        />
        {loiCuaO('soDienThoai') && (
          <p className="thong-bao-loi">{loiCuaO('soDienThoai')}</p>
        )}
      </div>

      <div className="truong">
        <label>Địa chỉ giao hàng *</label>
        <input
          name="diaChi"
          value={duLieu.diaChi}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="Số 12 Lê Lợi, TP Huế"
          aria-invalid={loiCuaO('diaChi') ? true : undefined}
        />
        {loiCuaO('diaChi') && (
          <p className="thong-bao-loi">{loiCuaO('diaChi')}</p>
        )}
      </div>

      <div className="truong">
        <label>Ghi chú</label>
        <textarea
          name="ghiChu"
          rows={3}
          value={duLieu.ghiChu}
          onChange={xuLyThayDoi}
          placeholder="Ít cay, thêm rau..."
        />
      </div>

      {thanhCong && (
        <p className="thong-bao-thanh-cong" role="status">
          ✓ Đã đặt hàng thành công!
        </p>
      )}

      <Nut loai="chinh" kichThuoc="lon" type="submit" disabled={dangGui}>
        {dangGui
          ? 'Đang gửi...'
          : `Đặt hàng · ${tongTien.toLocaleString('vi-VN')}đ`}
      </Nut>
    </form>
  );
}
// DatMonForm.tsx — Form đặt món
// Gap 5: Controlled form + validation + useRef focus
// INT.7.18 — Web FrontEnd nâng cao

import { useState, useRef, useEffect } from 'react';
import type { FormEvent, ChangeEvent, FocusEvent } from 'react';

export interface DuLieuForm {
  hoTen: string;
  soDienThoai: string;
  ghiChu: string;
}

interface LoiForm {
  hoTen?: string;
  soDienThoai?: string;
}

const GIA_TRI_BAN_DAU: DuLieuForm = {
  hoTen: '',
  soDienThoai: '',
  ghiChu: '',
};

// ✅ Hàm kiểm tra — chuỗi chính xác theo đề
function kiemTra(d: DuLieuForm): LoiForm {
  const loi: LoiForm = {};

  // "Họ tên cần ít nhất 2 ký tự"
  if (d.hoTen.trim().length < 2) {
    loi.hoTen = 'Họ tên cần ít nhất 2 ký tự';
  }

  // "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0"
  if (!/^0\d{9}$/.test(d.soDienThoai.trim())) {
    loi.soDienThoai = 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0';
  }

  return loi;
}

interface FormDatMonProps {
  onGui: (duLieu: DuLieuForm) => void;
  choPhepGui: boolean;
}

export function FormDatMon({ onGui, choPhepGui }: FormDatMonProps) {
  const [duLieu, setDuLieu] = useState<DuLieuForm>(GIA_TRI_BAN_DAU);
  const [loi, setLoi] = useState<LoiForm>({});

  // ✅ useRef + useEffect tự focus ô "Họ tên"
  const inputHoTenRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputHoTenRef.current?.focus();
  }, []);

  function xuLyThayDoi(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setDuLieu((prev) => ({ ...prev, [name]: value }));
  }

  function xuLyRoiO(e: FocusEvent<HTMLInputElement>) {
    const { name } = e.target;
    const loiMoi = kiemTra(duLieu);
    setLoi((prev) => ({
      ...prev,
      [name]: loiMoi[name as keyof LoiForm],
    }));
  }

  function xuLyGui(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const loiMoi = kiemTra(duLieu);
    setLoi(loiMoi);

    if (Object.keys(loiMoi).length > 0) return;

    onGui({
      hoTen: duLieu.hoTen.trim(),
      soDienThoai: duLieu.soDienThoai.trim(),
      ghiChu: duLieu.ghiChu.trim(),
    });
  }

  return (
    <form className="dat-mon-form" onSubmit={xuLyGui} noValidate>
      {/* ===== Ô 1: Họ tên ===== */}
      <div className="truong">
        <label htmlFor="hoTen">Họ tên</label>
        <input
          id="hoTen"
          name="hoTen"
          ref={inputHoTenRef}
          value={duLieu.hoTen}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="Nguyễn Văn A"
          aria-invalid={loi.hoTen ? true : undefined}
        />
        {loi.hoTen && (
          <p className="loi" role="alert">
            {loi.hoTen}
          </p>
        )}
      </div>

      {/* ===== Ô 2: Số điện thoại ===== */}
      <div className="truong">
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input
          id="soDienThoai"
          name="soDienThoai"
          value={duLieu.soDienThoai}
          onChange={xuLyThayDoi}
          onBlur={xuLyRoiO}
          placeholder="0912345678"
          aria-invalid={loi.soDienThoai ? true : undefined}
        />
        {loi.soDienThoai && (
          <p className="loi" role="alert">
            {loi.soDienThoai}
          </p>
        )}
      </div>

      {/* ===== Ô 3: Ghi chú ===== */}
      <div className="truong">
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea
          id="ghiChu"
          name="ghiChu"
          rows={3}
          value={duLieu.ghiChu}
          onChange={xuLyThayDoi}
          placeholder="Ít cay, thêm rau..."
        />
      </div>

      {/* ✅ Nút "Đặt món" — đẹp như nút "Thêm" trong card */}
       <button
        type="submit"
        className="nut-dat-mon"
        disabled={!choPhepGui}
      >
        <span className="nut-dat-mon__icon">🛒</span>
        <span>Gửi đơn</span>
      </button>
    </form>
  );
}


export default FormDatMon;
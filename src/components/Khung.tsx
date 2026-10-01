// Khung.tsx — Khung 1 khối có tiêu đề + hành động
// Gap 6: Đúng theo đề kiểm tra giữa kỳ
import type { ReactNode } from 'react';
import './Khung.css';

interface KhungProps {
  tieuDe: string;
  hanhDong?: ReactNode;
  children: ReactNode;
}

export function Khung({ tieuDe, hanhDong, children }: KhungProps) {
  return (
    <section className="khung">
      <div className="khung__dau">
        <h2 className="khung__tieu-de">{tieuDe}</h2>
        {hanhDong && <div className="khung__hanh-dong">{hanhDong}</div>}
      </div>
      <div className="khung__than">{children}</div>
    </section>
  );
}

export default Khung;
// monAn.ts — Dữ liệu 10 món ăn Huế (4 món HOT)
import type { MonAn } from '../features/mon-an/types';

export const danhSachMonAn: MonAn[] = [
  {
    id: 'm01',
    ten: 'Bún bò Huế',
    loai: 'bun',
    gia: 45000,
    moTa: 'Nước dùng cay nồng, sả và mắm ruốc đặc trưng.',
    hinh: '/images/bun-bo.jpg',
    hot: true,        // 🔥 HOT
  },
  {
    id: 'm02',
    ten: 'Cơm hến',
    loai: 'com',
    gia: 25000,
    moTa: 'Hến xào, rau sống, bánh tráng nướng giòn.',
    hinh: '/images/com-hen.jpg',
  },
  {
    id: 'm03',
    ten: 'Bánh bèo',
    loai: 'banh',
    gia: 30000,
    moTa: 'Bánh bèo chén, tôm cháy, mỡ hành thơm phức.',
    hinh: '/images/banh-beo.jpg',
    hot: true,        // 🔥 HOT
  },
  {
    id: 'm04',
    ten: 'Bánh khoái',
    loai: 'banh',
    gia: 35000,
    moTa: 'Bánh khoái giòn rụm, nước lèo đậu phộng.',
    hinh: '/images/banh-khoai.jpg',
    hot: true,        // 🔥 HOT
  },
  {
    id: 'm05',
    ten: 'Bánh lọc',
    loai: 'banh',
    gia: 30000,
    moTa: 'Bánh lọc trong suốt, tôm thịt đậm đà.',
    hinh: '/images/banh-loc.jpg',
  },
  {
    id: 'm06',
    ten: 'Bánh nậm',
    loai: 'banh',
    gia: 28000,
    moTa: 'Bánh nậm gói lá chuối, nhân tôm thịt.',
    hinh: '/images/banh-nam.jpg',
  },
  {
    id: 'm07',
    ten: 'Chè hạt sen',
    loai: 'che',
    gia: 20000,
    moTa: 'Chè hạt sen bùi, ngọt thanh, mát lành.',
    hinh: '/images/che-hat-sen.jpg',
  },
  {
    id: 'm08',
    ten: 'Nem lụi',
    loai: 'nem',
    gia: 40000,
    moTa: 'Nem nướng than hồng, cuốn bánh tráng chấm nước lèo.',
    hinh: '/images/nem-lui.jpg',
    hot: true,        // 🔥 HOT
  },
  {
    id: 'm09',
    ten: 'Bún thịt nướng',
    loai: 'bun',
    gia: 40000,
    moTa: 'Bún tươi, thịt nướng thơm, rau sống tươi mát.',
    hinh: '/images/bun-thit-nuong.jpg',
  },
  {
    id: 'm10',
    ten: 'Bánh canh Nam Phổ',
    loai: 'bun',
    gia: 35000,
    moTa: 'Bánh canh tôm thịt, nước dùng ngọt thanh.',
    hinh: '/images/banh-canh.jpg',
  },
];
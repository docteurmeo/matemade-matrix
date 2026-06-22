# MateMade Brand Territory Matrix

Công cụ bản đồ định vị (territory map) tương tác cho thương hiệu túi xách **MateMade** (Gen Z, Việt Nam).
Single-file vanilla JS, chạy offline — **double-click `matemade-matrix.html`** là chạy (không cần server/npm).

## Chạy app

1. Mở `matemade-matrix.html` bằng trình duyệt (double-click hoặc kéo vào browser).
2. Đổi/thêm ảnh brand: thả ảnh vào `research-brands/<slug>/` → chạy `gen-research-manifest.ps1` → F5.

## Cấu trúc thư mục

```
matemade-matrix.html        ← APP chính (runtime)
research-manifest.js        ← map slug → ảnh (sinh tự động, app đọc qua window.BRAND_IMAGES)
research-brands/<slug>/      ← thư viện ảnh 29 brand (120 ảnh)
gen-research-manifest.ps1    ← script quét research-brands/ → sinh lại research-manifest.js
PROJECT_LOG.md               ← nhật ký dự án (nguồn sự thật về tiến độ & quyết định)

docs/                        ← tài liệu nghiên cứu & logic (không ảnh hưởng runtime)
  logic/        — logic Tier × Territory × Modifier (v2.0) + các bản đề xuất/so sánh
  positions/    — kiểm chứng tọa độ 21 brand (Claude vs ChatGPT) + audit + reconcile
  expansion/    — research & visual audit 8 brand mở rộng Nhật/Hàn/Thái
  strategy/     — white-space strategy beta, advisory, recap phiên làm việc

inputs/                      ← nguồn dữ liệu gốc (PDF tư vấn, DNA sản phẩm, data seed)
archive/                     ← tài sản cũ/không thuộc runtime
  brand-matrix-intl-scraper/ — toolkit scraper 81 brand quốc tế (legacy, có node_modules)
  audit-contact-sheets-v1/   — contact sheet visual audit đợt 21 brand
  audit-contact-sheets-v13/  — contact sheet visual audit đợt 29 brand
```

## Lưu ý quan trọng

- **Không di chuyển** `matemade-matrix.html`, `research-manifest.js`, `research-brands/` ra khỏi cùng một thư mục — app nạp ảnh qua đường dẫn **tương đối**.
- Mọi thay đổi ảnh phải chạy lại `gen-research-manifest.ps1` thì app mới thấy.
- Dữ liệu định vị là ước lượng research — xem `docs/positions/` để truy nguồn từng brand.

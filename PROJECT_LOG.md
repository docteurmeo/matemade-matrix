# MateMade Brand Territory Matrix — Project Log

**Dự án:** Công cụ bản đồ định vị (territory map) tương tác cho thương hiệu túi xách MateMade (Gen Z, Việt Nam).
**Mục tiêu:** Trực quan hóa vị trí tương quan của MateMade và **29 brand** đối thủ/tham chiếu trên hệ trục 2 chiều, lấy "Mass Feminine Việt Nam" làm tâm, nhằm tìm vùng định vị chiến lược.
**Trạng thái:** Prototype hoạt động (local, mở bằng `file://`). 29 brand · 120 ảnh; đã kiểm chứng tọa độ + visual audit; có Semantic + Lens Mode, Research sources, heatmap mượt, white-space strategy beta. Từ 2026-06-21/22: thêm lớp nghiên cứu kể chuyện (`research/`) + hệ thống phản biện đa nhân cách (`personas/` — Researcher/Debator/PM) đã chạy thật, có báo cáo cuối gắn nhãn độ tin cậy.
**Cập nhật gần nhất:** 2026-06-22.

---

## 1. Tổng quan kiến trúc

| Thành phần | File | Vai trò |
|---|---|---|
| Ứng dụng ma trận | `matemade-matrix.html` | Single-file app, **vanilla JS thuần** (không framework/CDN), chạy offline qua `file://` |
| Manifest ảnh | `research-manifest.js` | Map `slug → [đường dẫn ảnh]`, sinh tự động. App đọc qua `window.BRAND_IMAGES` |
| Script sinh manifest | `gen-research-manifest.ps1` | Quét `research-brands/<slug>/` → ghi lại `research-manifest.js` |
| Thư viện ảnh research | `research-brands/<slug>/` | 29 folder, mỗi brand 1 folder ảnh sản phẩm |
| Request nghiên cứu vị trí | `docs/positions/BRAND_POSITION_RESEARCH_REQUEST.md` | Brief giao cho AI agent khác kiểm chứng tọa độ định vị |
| **Logic chuẩn cuối** | `docs/logic/MATRIX_LOGIC_FINAL.md` | **v2.0 — nguồn sự thật cho logic Tier × Territory × Modifier** (đã áp vào app) |
| Tài liệu logic (Claude) | `docs/logic/MATRIX_LOGIC_PROPOSAL.md` | Bản phân tích/đề xuất của Claude (input cho v2.0) |
| Tài liệu logic (ChatGPT) | `docs/logic/matemade_orbit_logic_specialized.md` | Bản chuyên môn hóa của ChatGPT (input cho v2.0) |
| So sánh 2 bản (ChatGPT) | `docs/logic/matemade_matrix_logic_comparison_synthesis.md` | Bản so sánh/tổng hợp của ChatGPT (input cho v2.0) |
| Request logic cho ChatGPT | `docs/logic/LOGIC_REQUEST_FOR_CHATGPT.md` | Brief đã feed cho ChatGPT để lấy bản so sánh |
| Kiểm chứng tọa độ | `docs/positions/positions-*.md/.json` | Claude vs ChatGPT + reconcile + audit (xem Changelog v0.7/v1.0) |
| Research 8 brand mở rộng | `docs/expansion/EXPANSION_BRANDS_JP_KR_TH_RESEARCH.md` | Nguồn + first-pass placement 8 brand Nhật/Hàn/Thái (v1.3) |
| Visual audit brand mở rộng | `docs/expansion/EXPANSION_BRANDS_VISUAL_AUDIT.md` | Audit ảnh 8 brand mới → chỉnh tọa độ (v1.4) |
| Chiến lược white-space | `docs/strategy/MATEMADE_WHITESPACE_STRATEGY_BETA.md` | Phân tích 4 vùng trống + hướng định vị (beta, v1.6) |
| Advisory (ChatGPT) | `docs/strategy/MATRIX_REVIEW_AND_SEMANTIC_LAYERS_ADVICE.md` | Tư vấn ma trận + semantic layers (input v1.0/v1.1) |
| Recap phiên Codex | `docs/strategy/TODAY_WORK_RECAP_FOR_CLAUDE.md` | Nhật ký chi tiết phiên 2026-06-18 (v1.3→v1.6) |
| Hướng dẫn nhanh | `README.md` | Cách chạy app + giải thích cấu trúc thư mục |
| Phương pháp & tiến trình nghiên cứu | `research/RESEARCH_METHODOLOGY.md` | Tường thuật toàn bộ phương pháp luận + 7 giai đoạn research, viết lại từ góc nhìn researcher |
| Nhân cách Researcher | `personas/researcher/BACKGROUND.md` | Hồ sơ "Đặng Hoài Thư" — tác giả chính của pipeline nghiên cứu định vị |
| Nhân cách Debator | `personas/debator/BACKGROUND.md` + `DEBATE_RESULT.md` | Hồ sơ "Vũ Đan Khanh" — phản biện độc lập; kết quả debate vòng 1 trên `RESEARCH_METHODOLOGY.md` |
| Nhân cách PM | `personas/pm/BACKGROUND.md` | Hồ sơ "Trần Bảo Long" — trọng tài điều phối tranh luận Researcher↔Debator |
| Log tranh luận đa round | `personas/pm/COLLABORATION_LOG.md` | Biên bản Researcher vs Debator, 2 round, 8 điểm phân loại (a)/(b)/(c) |
| Báo cáo cuối đa vai | `personas/pm/FINAL_REPORT.md` | Bản research đã qua phản biện, gắn nhãn độ tin cậy Cao/Trung bình/Thấp cho từng kết luận |
| Debate chuyên đề tọa độ | `personas/pm/COORDINATE_DEBATE.md` | Phản biện trực tiếp trên `FINAL_POS` của 28 brand đối thủ (không phải MateMade) — 2 round |

### Nguồn dữ liệu chiến lược (input gốc) — thư mục `inputs/`
- `inputs/RIO x MateMade _ Tư vấn định vị chiến lược.pdf` (= `inputs/strategy.pdf` bản trùng md5, `inputs/strategy.txt` bản text) — bản tư vấn định vị nền tảng.
- `inputs/matemade_product_matrix_research.md` — tài liệu tổng hợp chiến lược + data seed (axes, rings, 21 brand với tọa độ x/y, territory, summary). **Đây là nguồn sự thật cho dữ liệu định vị ban đầu.**
- `inputs/MateMade_Phan_tich_DNA_san_pham.docx` — phân tích DNA sản phẩm.

### Quyết định kỹ thuật cốt lõi
1. **Vanilla JS, không CDN.** Phiên bản React+Babel qua CDN đầu tiên bị **trắng trang** khi mở `file://` (Babel không biên dịch được khi mạng chặn). Viết lại toàn bộ bằng vanilla JS + DOM API → chạy offline 100%.
2. **Tách thư viện ảnh.** `research-brands/` (21 brand research) tách riêng khỏi `brand-matrix/images/` (81 brand quốc tế đã tồn tại trước đó) để dễ quản lý, tránh lẫn.
3. **Manifest sinh tự động.** Vì `file://` không cho JS liệt kê thư mục, dùng script PowerShell quét folder → sinh `research-manifest.js`. Đổi ảnh chỉ cần chạy lại script + F5.
4. **Pan/zoom bằng CSS transform** trên một "world" div cố định kích thước (2600×2600px), không scale bitmap (xem mục lỗi #2).

---

## 2. Hệ tọa độ & quy ước

- **Trục x:** `-1.45` (Cute / Sweet / Playful) → `+1.45` (Cool / Minimal / Polished)
- **Trục y:** `-1.45` (Daily / Utility / Value) → `+1.45` (Statement / Design / Craft)
- **Tâm (0,0):** Mass Feminine Việt Nam.
- **7 metrics (0–5):** sweetness, coolness, utility, craft, statement, maturity, identity.
- **World geometry:** `WORLD=2600`, tâm `WC=1300`, `U=760px/đơn vị`. Hàm `wx/wy` hỗ trợ dời tâm (`ox,oy`) để đổi map sang MateMade-centered.
- **Logic định danh v2.0 (thay cho orbit cũ):** mỗi brand = `Tier × Territory × Modifier`.
  - **Tier** (bán kính, cường độ định vị, 5 bậc): Neutral Mass · Elevated Mass · Coded-Accessible · Aesthetic-Led · Niche Specialist. ≠ giá.
  - **Territory** (góc, 8 sector phong cách): W Sweet/Kawaii · SW Soft Casual Cute · S Functional/Value · SE Sport/Street · E Seoul Cool · NE Editorial Cool · N Design/Craft · NW Romantic/Coquette. Độ rõ tăng theo bán kính (`territory_strength`).
  - **Modifier** + flags: `category_adjacent`, `signature_type` (trend-extreme), `coord_check`.
  - Chi tiết & gán nhãn 21 brand: xem `MATRIX_LOGIC_FINAL.md`. Dữ liệu sống trong app ở object `LOGIC` (matemade-matrix.html).

---

## 3. Tính năng hiện có

### Tab 1 — Orbit Map (tâm Mass Feminine)
- Canvas toàn màn hình kiểu Google Maps: **scroll = zoom về con trỏ**, **kéo = pan**, HUD `+ / − / ⤢ (fit) / 👁`.
- Mỗi brand = **collage masonry 2 cột** (tới 8 ảnh, giữ đúng tỉ lệ, không crop). MateMade viền hồng nổi bật.
- Brand chưa có ảnh → placeholder (mã màu orbit + chữ cái đầu tên).
- Click collage → **panel chi tiết** trượt phải: ảnh sản phẩm (tới 9), product code, 7 metrics dạng bar, độ liên quan với MateMade, orbit.
- Legend orbit + nhãn vòng góc trên trái.

### Tab 2 — MateMade Proximity (tâm MateMade)
- Cùng cơ chế pan/zoom/collage nhưng **dời tâm về MateMade**; vòng = khoảng cách gần/xa quanh MateMade (Lõi → Rất gần → Gần → Có định hướng rõ → Xa hơn).

### Tab 3 — Brand Comparison (radar)
- Chọn 2–4 brand, overlay radar 7 metrics.

### Tab 4 — Strategic Opportunity
- Orbit Map + highlight **vùng cơ hội** "Modular Candy Utility" (góc trái-dưới mở rộng).

### Nút bật/tắt ảnh 👁
- 👁 = hiện collage · 🙈 = chỉ còn dot màu orbit + tên + territory (xem vị trí tương quan không bị ảnh che). **Giữ nguyên zoom/pan** khi bật tắt.

---

## 4. Trạng thái thư viện ảnh (research-brands/)

| 21 brand gốc (91 ảnh) | 8 brand mở rộng (29 ảnh) | |
|---|---|---|
| matemade 15 · carlyn 6 · samantha-vega 6 | pipatchara 6 · vunque 5 | osoi 4 · marge-sherwood 4 |
| stand-oil 5 · ther-gab 5 · spoiled 5 · vascara 5 | lyn 4 · jelly-bunny 4 | aeta 3 · minitmute 3 |
| chau-fifth 4 · hapas 4 · juno 4 · vanwalk 4 | | |
| lesac 3 · karatta 3 · camelia 3 · floral-punk 3 | | |
| mossdoom 3 · ngaos 3 · oui 3 · yuumy 3 · saigon-swagger 3 · toutou 1 | | |

**29/29 brand đã có ảnh** — tổng **120 ảnh** (91 cho 21 brand gốc + 29 cho 8 brand mở rộng Nhật/Hàn/Thái). Không còn folder rỗng. Contact sheet audit lưu ở `.audit-contact-sheets-v13/`.

### Cập nhật ảnh
```powershell
# 1. Thả ảnh (.jpg/.png/.webp) vào: research-brands\<slug>\
# 2. Chạy:
D:\WORK\2606\MateMade\gen-research-manifest.ps1
# 3. F5 lại app
```

---

## 5. Changelog theo phiên

### v0.1 — Khởi tạo (React CDN) — *lỗi*
- Dựng app React + Babel standalone qua unpkg, 4 view, data 21 brand từ research doc.
- **Sự cố:** trắng trang khi mở `file://` (Babel/CDN không load). → bỏ hướng này.

### v0.2 — Viết lại vanilla JS
- Loại bỏ hoàn toàn React/Babel/CDN. Render bằng DOM API thuần (`el()` cho SVG, `h()` cho HTML).
- 4 tab: Orbit Map (SVG vòng đồng tâm) · MateMade Proximity (territory SVG) · Brand Comparison (radar) · Strategic Opportunity.
- Chạy offline ổn định.

### v0.3 — Bản đồ collage pan/zoom + thư viện ảnh
- Yêu cầu: tận dụng tối đa màn hình, zoom kiểu Google Map, brand thể hiện bằng collage ảnh sản phẩm.
- Phát hiện **mismatch dữ liệu:** folder ảnh có ~66–81 brand quốc tế, nhưng research doc chỉ 21 brand Việt/Á; chỉ 5 brand trùng & có ảnh.
- **Quyết định (theo user):** giữ 21 brand research; brand có ảnh → collage, chưa có → placeholder + tạo folder rỗng. Brand mới (nếu thêm sau) Claude tự đề xuất tọa độ.
- Dựng world pan/zoom (CSS transform), collage lưới 2×2, HUD zoom, panel chi tiết, manifest tự sinh (`brand-matrix/manifest.js` — 81 brand).

### v0.4 — Tách folder, fix mờ, masonry, proximity collage
- **Tách thư viện:** tạo `research-brands/` riêng cho 21 brand, copy 5 brand có ảnh sang. Manifest mới `research-manifest.js` (21 brand) + script `gen-research-manifest.ps1`.
- **Fix mờ khi zoom:** gỡ `will-change:transform` trên world (thủ phạm ép cache bitmap → mờ chữ & ảnh khi phóng to). Nay chữ/viền sắc nét mọi mức zoom.
- **Collage giữ tỉ lệ:** đổi từ lưới 2×2 crop vuông → **masonry 2 cột** `height:auto`, không cắt ảnh, hiển thị tới 8 ảnh.
- **Proximity nâng cấp:** từ SVG territory tĩnh → bản đồ collage pan/zoom dời tâm về MateMade.

### v0.5 — Toggle ảnh + request nghiên cứu
- Thêm nút 👁 bật/tắt ảnh (dot mode để xem vị trí tương quan).
- Tạo `BRAND_POSITION_RESEARCH_REQUEST.md`: brief kiểm chứng định vị 21 brand cho AI agent độc lập.
- Viết `PROJECT_LOG.md` (file này).

### v0.6 — Tái cấu trúc logic Orbit (Tier × Territory × Modifier) *(hiện tại)*
- **Vấn đề:** tên orbit cũ ("gần trung tâm / lệch rõ / có tính cách / khác hệ") mơ hồ — dùng *một* đại lượng (bán kính) để gọi tên *hai* thứ khác bản chất.
- **Quy trình:** Claude (`MATRIX_LOGIC_PROPOSAL.md`) + ChatGPT (`matemade_orbit_logic_specialized.md`) + bản so sánh ChatGPT (`matemade_matrix_logic_comparison_synthesis.md`) → tổng hợp thành `MATRIX_LOGIC_FINAL.md` **v2.0**.
- **Chốt logic 3 lớp:** `Tier` (cường độ, bán kính) × `Territory` (8 sector phong cách, góc) × `Modifier` (sắc thái). Tách rõ "mức độ" khỏi "phong cách".
  - Tier: Neutral Mass → Elevated Mass → Coded-Accessible → Aesthetic-Led → Niche Specialist (trung lập, ≠ giá).
  - Territory: 8 sector (W Sweet → SE Sport), độ rõ tăng theo bán kính (`territory_strength`).
  - Flags: `category_adjacent`, `signature_type` (trend-extreme), `coord_check`.
- **App áp dụng:** vòng = Tier; nan quạt mờ + nhãn rìa = Territory; node tô màu theo Territory (nút **T/#** đổi sang tô theo Tier); panel chi tiết hiện Tier/Territory/Modifier/flags/note; Proximity Map: vòng = Strategic Adjacency, nan quạt = 8 vector tiến hóa của MateMade.
- **Cảnh báo gắn cờ:** Toutou = trend-extreme; Vanwalk = coord_check (nghi tọa độ x quá xa → đưa sang research vị trí).

### v0.7 — Kiểm chứng tọa độ (Claude vs ChatGPT) + áp vào app *(hiện tại)*
- **Request:** `POSITION_VERIFICATION_REQUEST.md` (gắn khung v2.0) feed cho ChatGPT.
- **Hai bản độc lập:** Claude (`positions-verified-claude.md`, web-researched 16 search) vs ChatGPT (`positions-verified-chatgpt.json` + report).
- **Kết quả:** 17/21 brand hội tụ (chênh < 0.15). 4 bất đồng phân xử trong `positions-final-reconciled.md`:
  - Karatta: x −0.55→−0.25 (minimal-design hơn, nghiêng ChatGPT).
  - Floralpunk: y 0.80→0.68 (lùi một phần về ChatGPT — BST gần đây design hơn).
  - Carlyn: giữ tier 2 (signature puffer = coded aesthetic; bác đề xuất hạ tier 1 của ChatGPT).
  - Spoiled: `category_adjacent` true→false (accessory bag ≠ carry-system, theo ChatGPT).
- **Đã áp vào app:** bảng `FINAL_POS` override tọa độ 21 brand; gỡ cờ coord_check (Vanwalk — xác nhận tier 2, brand nội địa Trung); gỡ category_adjacent của Spoiled; cập nhật modifier Karatta/Floralpunk/Vanwalk.

### v0.8 — Từ điển phong cách + thẻ brand giàu thông tin *(hiện tại)*
- Mục tiêu: ma trận hữu ích hơn, cung cấp định nghĩa phong cách + thông tin.
- **A. Territory Dossier** (`DOSSIER`): click nan quạt / nhãn phong cách / dòng legend → hồ sơ 8 lãnh thổ + CORE: định nghĩa, aesthetic codes, persona, "MateMade học gì", phân biệt với territory kế bên, danh sách brand trong lãnh thổ (bấm để mở brand).
- **B. Thẻ brand giàu thông tin** (`BRAND_INFO`): panel chi tiết thêm giá (VND), origin, category, sản phẩm signature, persona, "MateMade học được gì", độ tin cậy dữ liệu; nút "📖 Xem định nghĩa phong cách" mở dossier territory tương ứng.
- Panel chi tiết giờ render 2 chế độ: **brand** hoặc **territory dossier**.

### v0.9 — Lớp phân tích chiến lược (C) *(hiện tại)*
- **Nút 📊 (HUD)** → panel Phân tích: (1) **đối thủ gần MateMade nhất** (xếp theo khoảng cách Euclid, bar + click mở brand), (2) **khoảng trống thị trường** (findGaps — quét lưới, lọc theo mật độ thấp & vùng reachable, mô tả bằng territory+tier), (3) **mật độ theo lãnh thổ** (đếm brand/territory).
- **Nút 🔥 (HUD)** → **heatmap mật độ** phủ lên bản đồ (kernel Gaussian) + khoanh **vùng "trống"** (dashed xanh). Giữ trạng thái khi đổi tab/zoom.
- Helpers: `densityAt`, `nearestToMate`, `findGaps`, `tierOf`, `sectorKeyOf`, `describePoint`.

### v1.0 — Visual audit toàn bộ ảnh + tinh chỉnh tọa độ *(hiện tại)*
- **Bổ sung ảnh:** user cập nhật toàn bộ nguồn ảnh → **91 ảnh / 21 brand** (mọi brand đã có ảnh). Regenerate `research-manifest.js`.
- **Visual audit 91 ảnh** (`positions-audit-report.md`): đối chiếu hình ảnh thực tế với định vị đã phân tích, bảng citation + ma trận coverage. Phát hiện lệch & chỉnh 4 tọa độ:
  - **Yuumy** → feminine daily (không phải utility canvas): `x 0.01, y −0.38`; metrics m[0] 2→2.5, m[2] 3.8→3.0.
  - **Vanwalk** → kawaii mạnh hơn MateMade: `x −0.88, y −0.46`; m[0] 4.5→4.8.
  - **Ngaos** → full pink/coquette boudoir: `x −0.52, y 0.87`; m[0] 3→4.2, m[3] 4.5→3.5.
  - **Spoiled** → fashion accessory có cấu trúc (không sporty/utility): `x 0.60, y −0.38`; m[2] 4→2.8, m[4] 3→3.5.
- **Sửa lỗi nguồn gốc Mossdoom:** từ "Thai/CN" → xác nhận **Indonesia (Bandung, 2009)**. Cập nhật BRAND_INFO + LOGIC + report.
- Đối chiếu thêm tư vấn ChatGPT (`MATRIX_REVIEW_AND_SEMANTIC_LAYERS_ADVICE.md`) — hội tụ phần lớn, giữ 4 chỉnh tọa độ theo bằng chứng visual trực tiếp.

### v1.1 — Semantic Layers + Lens Mode *(hiện tại)*
- **Dữ liệu semantic** cho 21 brand: `emotional_codes` (8), `shape_language` (6), `outfit_role` (5), `benchmark_type`, `evidence_strength` (object `SEM_RAW` → `SEM`, gán vào `b.sem`).
- **Semantic profile** trong panel chi tiết (sau Metrics): benchmark type, vai trò outfit trội, top-3 cảm xúc, top-3 hình khối, dòng evidence (nền tảng + SKU mẫu + độ tin cậy).
- **Lens Mode** — thanh "LENS" nổi giữa-trên map: 6 lens (Vị trí · Cảm xúc · Hình khối · Vai trò outfit · Benchmark · Độ tin cậy). Đổi **màu node** theo lớp ngữ nghĩa mà không động vào tọa độ gốc (`state.lens` + `lensColor()` + `buildLensBar()`); legend cập nhật theo lens.
- **Radar (Brand Comparison):** đồng bộ metrics `m[]` với 4 tọa độ đã chỉnh để radar khớp vị trí mới.

### v1.2 — Fix bug click không mở panel *(hiện tại)*
- **Triệu chứng:** click brand không mở panel chi tiết, nhưng **mở DevTools (F12) thì lại được** — flaky.
- **Nguyên nhân:** `vpEl.setPointerCapture()` gọi ngay lúc `pointerdown` → viewport chiếm con trỏ, sự kiện `click` bị chuyển hướng khỏi node nên `onclick` brand không chạy. Mở F12 chỉ làm lệch timing nên đôi khi lọt qua.
- **Sửa:** chỉ `setPointerCapture` khi **đã thật sự kéo** (>3px), và `releasePointerCapture` ở `pointerup`. Click thường không còn bị nuốt → panel mở ổn định, không cần F12.

### v1.3 — Mở rộng brand Nhật/Hàn/Thái *(hiện tại)*
- **Request:** bổ sung nghiên cứu đầy đủ và đưa vào ma trận 8 brand mới:
  - Nhật: **Aeta**
  - Hàn: **OSOI**, **Vunque**, **Marge Sherwood**, **minitmute**
  - Thái: **LYN**, **Pipatchara**, **Jelly Bunny**
- **Research report:** `EXPANSION_BRANDS_JP_KR_TH_RESEARCH.md` — tóm tắt nguồn official/retailer/press, lý do tọa độ, tier, territory, semantic profile.
- **Đã áp vào app:** thêm brand rows vào `BRANDS`, `LOGIC`, `FINAL_POS`, `BRAND_INFO`, `SEM_RAW`; Lens Mode và panel chi tiết hoạt động với 29 brand.
- **Manifest:** tạo 8 folder mới trong `research-brands/` và regenerate `research-manifest.js` → hiện có **29 brand folders**. 8 brand mới chưa có ảnh nên hiện placeholder.
- **First-pass placement:**
  - Aeta `(0.35, 1.02)` — N / Quiet Japanese craft minimal.
  - OSOI `(0.85, 0.82)` — NE / Sculptural Seoul minimal.
  - Vunque `(0.70, 0.32)` — E / Polished Korean leather.
  - Marge Sherwood `(0.62, 0.58)` — NE / 90s downtown soft leather.
  - minitmute `(0.72, 0.05)` — E / Compact minimal daily cool.
  - LYN `(0.35, -0.05)` — CORE / Accessible Thai polished high-street.
  - Pipatchara `(0.10, 1.22)` — N / Sustainable craft art piece.
  - Jelly Bunny `(-0.30, -0.42)` — SW / Cute accessible Thai daily.

### v1.4 — Visual audit 8 brand mở rộng + áp chỉnh tọa độ *(hiện tại)*
- **Ảnh mới:** user bổ sung ảnh cho 8 brand mở rộng; tổng thư viện hiện **120 ảnh / 29 brand**.
- **Audit report:** `EXPANSION_BRANDS_VISUAL_AUDIT.md` — đối chiếu visual thật với first-pass placement.
- **Đã áp chỉnh sau user duyệt:**
  - **Aeta** `(0.35, 1.02)` → `(0.30, 0.88)` — quiet/slouchy craft-minimal, ít art-statement hơn dự đoán.
  - **OSOI** `(0.85, 0.82)` → `(0.82, 0.78)` — giữ NE, hạ rất nhẹ theo visual pop/editorial.
  - **Vunque** `(0.70, 0.32)` → `(0.78, 0.50)` — nâng lên NE border vì shell/rounded structured + campaign statement hơn daily leather.
  - **Marge Sherwood** `(0.62, 0.58)` → `(0.48, 0.58)` — bớt cool, thêm playful/feminine/color.
  - **minitmute** `(0.72, 0.05)` → `(0.45, -0.02)` — soft compact daily, pastel/cute hơn cool-minimal lạnh.
  - **Jelly Bunny** `(-0.30, -0.42)` → `(-0.55, -0.35)` — cute/IP/pastel rõ hơn, gần W/SW.
- **Đồng bộ app:** cập nhật `BRANDS`, `LOGIC`, `FINAL_POS`, `BRAND_INFO`, `SEM_RAW`; regenerate `research-manifest.js`.

### v1.5 — Research sources trong brand detail *(hiện tại)*
- **Mục tiêu:** user cần kiểm tra lại nguồn nghiên cứu ngay trong panel brand detail.
- **Đã thêm:** object `BRAND_SOURCES` cho 29 brand, gồm link official / marketplace / social / press / retailer tùy brand.
- **UI:** panel Brand detail có section **Research sources** với link mở tab mới, hiển thị loại nguồn (`official`, `market`, `social`, `press`, `retail`, `review`).
- **Lưu ý:** đây là nguồn audit/desk research để kiểm chứng định vị; visual placement vẫn nên được review lại khi thay ảnh hoặc brand đổi BST.

### v1.6 — Polish UI + wording + white-space strategy *(hiện tại)*
- **Màu & nền Territory:** tăng saturation 8 sector + CORE; phóng dot label 9→11px, legend dot 11→12px, thêm border sáng. Nền sector tinh chỉnh 3 lần → trạng thái chốt: `fill-opacity 0.10`, `stroke-opacity 0.22`, stroke `1.25`.
- **Tên Territory sang English trên map/legend/tag/analysis**; panel Territory dossier giữ **dòng chính English + subtitle tiếng Việt** (`info.vn||info.en`).
- **Review logic liền kề Territory:** xác nhận thứ tự vòng (E→NE→N→NW→W→SW→S→SE→E) hợp lý, **không đổi vị trí**; chỉ chỉnh wording 3 sector cho rõ vai trò cầu nối:
  - N: "Design Statement / Craft Heritage" → **Design Object / Craft Statement**.
  - S: "Functional / Value Utility" → **Everyday Function / Practical Utility** (bỏ chữ "Value" gây hiểu nhầm giá rẻ).
  - SE: "Sport / Tech-Utility / Street" → **Urban Sport / Street Utility** (nối tự nhiên với E).
- **Wording Tier** tự nhiên hơn (Đại chúng trung tính → Cực tính & thể nghiệm).
- **Wording vòng MateMade Proximity** rõ nghĩa: `PROX_LABELS` = MateMade hiện tại · Đối thủ gần nhất · Lân cận có thể mở rộng · Hình mẫu nâng cấp · Khác hệ, học chọn lọc.
- **Brand Comparison:** thêm phụ đề tiếng Việt cho 7 metrics (`METRIC_LABELS_VN`), radar hiển thị 2 dòng EN/VN + hint dưới chart.
- **MateMade dot mode** → ngôi sao hồng lớn có glow (`clip-path` polygon, 34px).
- **Heatmap mượt:** thay grid ô vuông (pixelate) bằng SVG `radialGradient` blob mỗi brand; vùng "trống" vẫn giữ dashed circle xanh + label.
- **White-space strategy beta:** `MATEMADE_WHITESPACE_STRATEGY_BETA.md` — phân tích 4 vùng trống (geometric white-space từ `findGaps()`) + hướng định vị từng vùng; core đề xuất **"Modular Candy Daily"**.
- **Kiểm tra kỹ thuật:** sau mỗi chỉnh chạy JS syntax check (`new Function(scriptSrc)`) — `script 0/1 syntax ok`.
- *Thực hiện cùng Codex trong phiên 2026-06-18. Recap đầy đủ: `TODAY_WORK_RECAP_FOR_CLAUDE.md`.*

### v1.7 — Tài liệu phương pháp + hệ thống phản biện đa nhân cách (Researcher/Debator/PM) *(hiện tại)*
- **Bối cảnh:** sau nhiều vòng deep-dive/audit (v0.6–v1.6, Giai đoạn 0–7 trong `research/RESEARCH_METHODOLOGY.md`), cần (1) viết lại toàn bộ phương pháp luận thành 1 tài liệu kể chuyện thay vì rải rác trong `docs/`, và (2) có cơ chế phản biện độc lập có thể lặp lại nhiều round trước khi giao kết luận cho user.
- **A. `research/RESEARCH_METHODOLOGY.md`:** tường thuật 9 mục — bài toán nghiên cứu, triết lý phương pháp, 7 giai đoạn tiến trình, khung Tier×Territory×Modifier, tiêu chuẩn nguồn/bằng chứng, quản lý version tọa độ, kết quả chiến lược, hạn chế, bản đồ tài liệu nguồn.
- **B. Hệ thống nhân cách `personas/`:**
  - `personas/researcher/` — **Đặng Hoài Thư**, tác giả pipeline nghiên cứu, background data analyst → brand insight → research lead dùng multi-agent AI. Biết tự nhận gap dữ liệu thay vì bảo vệ kết luận cũ.
  - `personas/debator/` — **Vũ Đan Khanh**, phản biện độc lập, background merchandiser/buyer → brand strategist (Vascara/Juno — chính brand trong ma trận) → 5 năm Seoul → brand auditor tự do "red team". Khung 4 câu hỏi bắt buộc: đại diện mẫu, độc lập kiểm chứng, ổn định qua thời gian, kết luận có vượt dữ liệu không.
  - `personas/pm/` — **Trần Bảo Long**, trọng tài điều phối, cố ý không có chuyên môn sâu thời trang/thống kê để tránh thiên vị; phân loại mỗi điểm tranh luận thành (a) đã đủ bằng chứng chốt / (b) cần dữ liệu chưa có (action item) / (c) bất đồng quan điểm PM tự quyết.
- **C. Đã chạy thật 1 phiên tranh luận đầy đủ:** Debator viết `DEBATE_RESULT.md` (8 điểm phản biện trên methodology) → Researcher trả lời từng điểm trong `personas/pm/COLLABORATION_LOG.md` Round 1 (tự nhận 2 gap dữ liệu thật: tiêu chí chọn mẫu 29 brand là thuận tiện, "20 SP" MateMade chỉ là danh sách minh họa không phải toàn bộ catalog) → Debator phản hồi giữ áp lực ở 2 điểm (độc lập tam giác hóa, ổn định tọa độ MateMade) → Round 2 chốt cách diễn đạt + quy tắc dừng audit (2 lần đo liên tiếp delta<0.10 mới coi là chốt) → PM tổng hợp `FINAL_REPORT.md`.
- **Phát hiện quan trọng từ phiên tranh luận:** tọa độ MateMade đã đổi 3 lần trong 3 ngày (−0.78→−0.48→−0.55) — 2 điểm dữ liệu liên tiếp chưa đủ để khẳng định hội tụ thật, nên `FINAL_REPORT.md` dán nhãn tọa độ này "tạm thời/Trung bình" thay vì coi là chốt cứng. Cũng phát hiện mục "3 gap chiến lược" trong methodology bỏ sót lập luận chi tiết hơn đã có sẵn trong `docs/strategy/MATEMADE_WHITESPACE_STRATEGY_BETA.md` — cần hợp nhất 2 luồng khi viết brief chính thức.
- **Output cuối cho user:** `personas/pm/FINAL_REPORT.md` — mọi kết luận chiến lược được viết lại kèm nhãn độ tin cậy (Cao/Trung bình/Thấp) + 4 action item cụ thể (tiêu chí mẫu, dữ liệu catalog/bestseller thật, validate nhu cầu khách hàng cho white space, audit từ bên thứ 3 hoàn toàn độc lập).

---

## 6. Việc đang chờ / hướng tiếp theo

- [x] **Tái cấu trúc logic Orbit** → v2.0 (Tier × Territory × Modifier), đã áp vào app.
- [x] **Kiểm chứng tọa độ:** đã hòa giải Claude vs ChatGPT (`positions-final-reconciled.md`) + visual audit 91 ảnh (`positions-audit-report.md`); áp `FINAL_POS` + chỉnh 4 brand.
- [x] **Bổ sung ảnh:** 21/21 brand đã có ảnh (91 ảnh).
- [x] **Semantic Layers + Lens Mode** (v1.1).
- [x] **Fix bug click không mở panel** (v1.2 — pointer-capture).
- [x] **Mở rộng 8 brand Nhật/Hàn/Thái** (v1.3 — first-pass research placement).
- [x] **Bổ sung ảnh + visual audit** cho 8 brand mở rộng mới; áp chỉnh tọa độ (v1.4).
- [x] **Research sources** trong brand detail (v1.5); **polish UI + wording + heatmap mượt** (v1.6).
- [x] **White-space strategy beta** (`MATEMADE_WHITESPACE_STRATEGY_BETA.md`, v1.6).
- [x] **Tài liệu phương pháp `research/` + hệ thống phản biện đa nhân cách `personas/`** (v1.7) — báo cáo cuối: `personas/pm/FINAL_REPORT.md`.
- [x] **Debate chuyên đề tọa độ 28 brand đối thủ** (`COORDINATE_DEBATE.md`, 2026-06-22) — rà toàn bộ `FINAL_POS` theo 4 tiêu chí (bước nhảy lớn chưa đo lại, chỉ 1 nguồn nghiên cứu, tọa độ rìa trục, brand category-adjacent lẫn vào phép tính khoảng cách). Phát hiện: Stand Oil có Δx=0.57 — bước nhảy lớn nhất toàn ma trận, chưa từng dán nhãn tạm thời; 10/28 brand (36%) chỉ có 1 nguồn nghiên cứu duy nhất; toàn bộ 28/28 brand không có công thức quy đổi định lượng (giới hạn cấu trúc, không riêng case nào).
- [x] **Gộp COORD_HISTORY v1+v2** (2026-06-22) → còn 3 mốc: v0 "Ban đầu" → v1 "Sau deep-dive 28 đối thủ + MateMade (trước Codex audit)" → "Hiện tại".
- [x] **Deep-dive vòng "Photography Vibe" (2026-06-22)** — góc nhìn mới: chỉ dựa trên đặc điểm sản phẩm có thể không đủ khách quan vì brand hay "mass hóa" sản phẩm để dễ bán; điểm phân hóa thật nằm ở **phong cách hình ảnh chính thống** (model/casting, bối cảnh, góc máy, color grading, art direction). Scan 29 brand qua `BRAND_SOURCES`, 5 nhóm research song song qua WebFetch/WebSearch.
  - **Hạn chế lớn phát hiện được:** công cụ không "nhìn" được ảnh thật (Instagram/Facebook chặn bot) → 17/29 brand (59%) chỉ đạt độ tin cậy Thấp, giữ nguyên tọa độ.
  - **12 brand có phát hiện thật:** MateMade, Hapas, Camelia, Ther Gab, Chautfifth, Vanwalk, Saigon Swagger, Stand Oil, Marge Sherwood, LYN, Pipatchara, Jelly Bunny.
  - **2 tension quan trọng (chưa đổi số, đã ghi `coordEvidence`):** Stand Oil (sản phẩm playful vs PR/hình ảnh "quiet luxury" — ngược hướng, ưu tiên audit cao nhất) và Hapas (campaign Châu Bùi vs La Muse, thiếu dữ liệu reach để cân).
  - **Phát hiện độc lập:** Chautfifth có mâu thuẫn rõ giữa "design philosophy" chính thức (quiet/minimal) và campaign thực tế gây tranh cãi (cinemagraph, bị chỉ trích, phải xin lỗi) — bằng chứng trực tiếp cho giả thuyết gốc của user.
  - **Lỗi data đã sửa:** `BRAND_SOURCES.camelia` trỏ sai sang trang spa Colombia → sửa thành `camelia.vn`. Pipatchara: thêm caveat "Dubai re-verify, Paris/NY/London chưa re-verify lần này", không xóa claim cũ.
  - Xem `research/PHOTOGRAPHY_VIBE_DEEP_DIVE.md` + `personas/pm/PHOTOGRAPHY_VIBE_DEBATE.md`.
- [x] **Tìm ra cách xem ảnh thật (2026-06-22, cùng ngày)** — user phản hồi đúng: vòng trên chỉ là "deep-dive trên văn bản nói về ảnh", không phải xem ảnh thật, nên "vô giá trị" nếu không sửa. **Đã giải:** `curl` lấy HTML thô của trang chính thống (KHÔNG dùng WebFetch — nó convert mất hết `<img src>`) → lọc URL ảnh thật từ CDN (`cdn.hstatic.net`, `*.myshopify.com/cdn/shop` — các CDN này KHÔNG chặn bot, khác Instagram/Facebook) → download → xem bằng tool `Read` (đọc ảnh thật bằng model multimodal). Method ghi đầy đủ ở `research/VISUAL_RESEARCH_METHOD.md`.
  - **Verify thành công 3 brand:** MateMade (3 ảnh: hero Tết campaign + 2 catalog), Stand Oil (6 ảnh lookbook), Hapas (2 ảnh campaign Châu Bùi).
  - **Stand Oil — tension giải:** ảnh thật là styling surreal/playful (bóng bay, bánh sinh nhật, tie-dye sặc sỡ), bác bỏ claim "quiet luxury muted earth" của báo chí (vốn chỉ suy luận từ text) → xác nhận đúng hướng playful của Giai đoạn 6, không đổi tọa độ, hạ ưu tiên audit.
  - **Hapas — tension vẫn mở nhưng nâng độ tin cậy:** ảnh campaign Châu Bùi thật xác nhận đầu tư editorial chuyên nghiệp (không phải suy luận yếu) — vẫn thiếu data reach để cân với La Muse.
- [x] **Áp dụng method cho toàn bộ 17 brand còn "Thấp" (2026-06-22, cùng ngày)** — xem ảnh thật cho tất cả. Kết quả: **15 brand nâng độ tin cậy lên Cao** (Vascara, Juno, Yuumy, Lesac, Oui, Toutou, Ngaos, OSOI, Vunque, minitmute, Samantha Vega, Aeta, Carlyn, Mossdoom — đa số xác nhận đúng, một số cho thấy editorial/nghệ thuật hơn dự kiến).
  - 🚩 **Karatta — phát hiện mâu thuẫn nghiêm trọng nhất toàn dự án:** trang chủ live hiện tại (campaign biển đen-trắng editorial + dòng "Belt Bag" tối giản) hoàn toàn không khớp evidence cũ (lace/hoa/lollipop tag, tọa độ NW `(-0.45,0.55)`). Đã hạ độ tin cậy về Trung bình, gắn lại `coordCheck`, đặt **ưu tiên audit cao nhất toàn ma trận** (vượt cả Stand Oil/Hapas).
  - **Spoiled — tension nhẹ hơn:** ảnh thật (Citroën cổ, Paris, tông trắng/kem/nâu sang trọng) khác mô tả "màu rực" mà Codex audit dùng để kéo tọa độ — kết luận: brand có ≥2 đăng ký hình ảnh song song (sporty-utility vs travel-chic), không phải Codex sai, giữ nguyên tọa độ + ghi note.
  - **Floralpunk:** nuance nhỏ — tên gợi "floral" nhưng catalog hiện tại toàn đen/nâu, nghiêng "punk" hơn.
  - ⚠️ **Đính chính (2026-06-22, cùng ngày):** dòng trên đã SAI khi nói "29/29 brand". Đếm lại chính xác: **chỉ 20/29 brand được fetch ảnh thật**, trung bình ~2.6 ảnh/brand (N nhỏ, chủ yếu 1 trang/1 thời điểm) — KHÔNG đủ để gắn nhãn "Cao" như đã làm. 9 brand (Camelia, Vanwalk, Ther Gab, Chautfifth, Saigon Swagger, Marge Sherwood, LYN, Pipatchara, Jelly Bunny) vẫn ở N=0, chưa hề xem ảnh thật. Xem `research/VISUAL_RESEARCH_METHOD.md` mục "vấn đề cỡ mẫu".
- [x] **Phát hiện kỹ thuật mạnh hơn: đọc `sitemap_products_1.xml`** (toàn bộ catalog thật, N=toàn bộ SKU đang bán, thay vì chọn ảnh tay) — áp dụng thử cho Karatta (N=65 SKU): phát hiện dòng FLOWER TAG/AIRBAG FLOWER **vẫn còn trong catalog** (không "biến mất" như kết luận N=3 trước), nhưng chỉ là ~9-15% catalog, phần lớn (~85%) là túi tối giản màu đất. **Kết luận đúng nằm GIỮA** 2 cực đoan (không phải "toàn playful" của Giai đoạn 6, không phải "toàn minimal" của round N=3) — minh chứng rõ N nhỏ có thể sai theo cả 2 hướng.
- [x] **Lọc category sai (giày/quần áo lẫn vào):** user phát hiện Juno/Jelly Bunny lẫn giày dép/quần áo. Viết bộ lọc keyword (`research/_pick_bags_only.js`) loại giày/quần áo, chỉ giữ túi+phụ kiện da nhỏ; áp dụng lại cho 6 brand bị lẫn (Stand Oil, Minitmute, Chau Fifth, Floral Punk, Yuumy, Hapas) — Minitmute lọc ra tới 69% là giày/quần áo.
- [x] **Duyệt Instagram THẬT qua Chrome cho 26/29 brand (2026-06-22, cuối ngày)** — sau khi xác nhận không có cách lưu file ảnh Instagram (hệ thống chặn base64-extraction có chủ ý), đã duyệt trực tiếp + phân tích ngay (gộp Giai đoạn 1+2 cho phần Instagram). 3 brand không tìm được account chính chủ (Toutou, Yuumy, LYN) — tự nó là phát hiện: gần như không tồn tại trên Instagram.
  - **Phát hiện "đa đăng ký nội dung" mới (brand có ≥2-3 tầng hình ảnh khác nhau, ngoài Stand Oil/Hapas/MateMade đã biết):** Juno (glam editorial kịch tính, khác hẳn web+text), Hapas (Instagram hiện tại chủ yếu là TRANG SỨC, không phải túi), Spoiled (thêm tầng du lịch tài liệu "Hidden Island"), Saigon Swagger (collab CeraVe skincare).
  - **Xác nhận đúng & nâng độ tin cậy Cao thật** (quan sát trực tiếp): MateMade, Karatta, Ngaos, Floralpunk, Aeta, OSOI, Vunque, Marge Sherwood, Carlyn, Mossdoom, Vanwalk, Pipatchara, Jelly Bunny, Camelia, Lesac, Ther Gab, Chautfifth, Vascara, Samantha Vega, Oui, Minitmute, Stand Oil.
  - Xem `research/PHOTOGRAPHY_VIBE_DEEP_DIVE.md` mục 9 cho chi tiết đầy đủ.
- [x] **Debate áp dụng phát hiện vào tọa độ (`personas/pm/COORDINATE_CHANGE_DEBATE.md`)** — rà 3 brand tension (Juno, Karatta, Hapas) + 9 brand điều chỉnh nhẹ. Debator phát hiện: vòng Instagram cũng mắc lỗi N nhỏ (1 screenshot ~5-10 bài/brand) — đúng loại lỗi dự án đã tự sửa ở vòng trước. Quy tắc mới: chỉ đổi số nếu có ≥2 nguồn evidence độc lập hội tụ.
  - **Karatta: ĐÃ ĐỔI SỐ** (đủ 3 nguồn độc lập hội tụ: Giai đoạn 6 + sitemap N=65 + Instagram) — tọa độ (-0.45,0.55) → **(-0.30,0.32)**. COORD_HISTORY có thêm mốc "v2" trước khi đổi.
  - **Juno: KHÔNG đổi số** — chỉ có 1 nguồn (Instagram N nhỏ), nhưng là brand benchmark CORE nên cần chuẩn cao hơn. Gắn `coordCheck`, ưu tiên audit cao nhất.
  - **Hapas + 9 brand Nhóm B: giữ nguyên**, không đủ điều kiện đổi số.
- [x] **#7 — Sửa code `densityAt()`/`nearestToMate()`** để loại trừ brand có cờ `catAdj:true` (Saigon Swagger) khỏi tính mật độ/khoảng trống/"gần MateMade nhất" (2026-06-22, đã kiểm tra syntax JS ok).
- [x] **#8 — Stand Oil tension đã giải** bằng phương pháp xem ảnh thật (2026-06-22), không cần audit độc lập riêng nữa.
- [x] **#11 — Karatta:** KHÔNG còn là "mâu thuẫn toàn bộ" sau khi đọc full sitemap (N=65) — dòng hoa/lace vẫn tồn tại nhưng là thiểu số. Đề xuất tạm y=0.20-0.30 (giảm từ 0.55), cần debate Round 4 để chốt số chính xác.
- [ ] **#13 (MỚI) — Nâng N cho 19 brand đã xem ảnh** (hiện N=2-6/brand) lên mức "đọc toàn bộ sitemap catalog" như đã làm với Karatta — đặc biệt Spoiled, Floralpunk vì đã có tension/kết luận mạnh dựa trên N nhỏ.
- [ ] **#14 (MỚI) — Fetch ảnh thật cho 9 brand N=0:** Camelia, Vanwalk, Ther Gab, Chautfifth, Saigon Swagger, Marge Sherwood, LYN, Pipatchara, Jelly Bunny.
- [ ] Action items còn lại từ `FINAL_REPORT.md`: (1) tiêu chí chọn mẫu 29 brand dựa trên market-share/social-listening thật; (2) dữ liệu catalog/bestseller thật của MateMade; (3) validate nhu cầu khách hàng cho white space trước khi đầu tư lớn; (4) audit độc lập 5 brand quan trọng nhất; (5) ưu tiên audit 10 brand chỉ có 1 nguồn nghiên cứu; (10) thêm cờ `imageProductTension` (Hapas, MateMade, Spoiled) — cần thiết kế UI trước.
- [ ] 6 brand cần research sâu thêm (xem `positions-audit-report.md`): coverage còn mỏng.
- [ ] (Cân nhắc) Nới khung / scale riêng cho MateMade Proximity — brand xa (OSOI, Stand Oil, Aeta, Pipatchara, SGS) bị đẩy lọt khỏi map.
- [ ] (Tùy chọn) Biến white-space strategy beta thành tab/section trong app.
- [ ] (Cân nhắc) Tinh chỉnh hiển thị nan quạt territory nếu nhãn chồng nhãn trục.
- [ ] (Tùy chọn) Mở rộng tập brand ngoài 21 brand research — cần bổ sung vào request brief.
- [ ] (Tùy chọn) Phát triển lâu dài: chuyển sang Vite + React đa file, hoặc deploy web chia sẻ link.

---

## 7. Lưu ý vận hành

- App là **single-file**, không cần server/npm — double-click `matemade-matrix.html` là chạy.
- Ảnh nạp qua đường dẫn **tương đối** (`research-brands/...`), nên giữ nguyên cấu trúc thư mục khi di chuyển dự án.
- Mọi thay đổi ảnh **phải** chạy lại `gen-research-manifest.ps1` thì app mới thấy.
- Dữ liệu định vị (tọa độ, metrics) hiện là **ước lượng ban đầu** — chưa qua kiểm chứng thực tế.

# MateMade Brand Territory Matrix — Phương pháp & Tiến trình Nghiên cứu

**Vai trò:** Tài liệu này được viết lại từ góc nhìn researcher phụ trách dự án, tổng hợp toàn bộ phương pháp luận, quy trình, nguồn dữ liệu và các quyết định nghiên cứu đã thực hiện cho ma trận định vị thương hiệu MateMade.
**Phạm vi:** Từ lúc nhận brief RIO Consulting đến phiên Codex audit gần nhất (2026-06-22).
**Vị trí file:** `research/RESEARCH_METHODOLOGY.md` — đây là tài liệu **tường thuật phương pháp**, khác với `PROJECT_LOG.md` (log tính năng/kỹ thuật app) và `docs/` (raw research artifacts từng phiên). Coi đây là "lời kể lại" có thể đưa cho người ngoài đọc để hiểu *vì sao* ma trận trông như hiện tại.

---

## 1. Bài toán nghiên cứu

**Câu hỏi cốt lõi:** MateMade — brand túi xách nữ Việt Nam, định vị nội bộ là "Sincere Girlhood" (cute/charm-heavy) — đang đứng ở đâu trong thị trường túi xách nữ, và còn **vùng định vị trống (white space)** nào để brand phát triển mà không bị hòa tan vào đại trà hoặc nhảy sai phân khúc khách hàng?

**Input gốc:**
- `inputs/RIO x MateMade _ Tư vấn định vị chiến lược.pdf` — brief tư vấn định vị từ agency RIO.
- `inputs/matemade_product_matrix_research.md` — tài liệu seed: 2 trục, các vòng (rings), 21 brand kèm tọa độ x/y ước lượng ban đầu.
- `inputs/MateMade_Phan_tich_DNA_san_pham.docx` — phân tích DNA sản phẩm nội bộ.

**Quyết định khung phân tích:** dựng **bản đồ định vị 2 trục** (territory map) — trục x = Cute/Sweet/Playful ↔ Cool/Minimal/Polished, trục y = Daily/Utility/Value ↔ Statement/Design/Craft — với tâm (0,0) là "Mass Feminine Việt Nam". Đặt MateMade và brand đối thủ/tham chiếu (VN + quốc tế) lên cùng một mặt phẳng để nhìn được khoảng cách tương đối, không chỉ liệt kê đặc điểm rời rạc.

---

## 2. Triết lý phương pháp

Ba nguyên tắc xuyên suốt toàn bộ quá trình, được rút ra và *củng cố lại nhiều lần* qua các vòng research:

1. **Không tin giá trị cũ chỉ vì nó đã có trong file.** Mỗi tọa độ trong ma trận đều có thể sai vì 3 lý do thường gặp: (a) ước lượng ban đầu mang tính chủ quan/thủ công, (b) brand đổi bộ sưu tập theo thời gian, (c) lỗi copy/live-edit không chủ ý. → Quy tắc vận hành: **mọi tọa độ phải có evidence trace lại được** (sản phẩm cụ thể, nguồn cụ thể), không chấp nhận "ước lượng cảm tính" làm điểm dừng.
2. **Tam giác hóa nguồn (triangulation).** Với các quyết định quan trọng (logic phân loại, tọa độ gây tranh cãi), không dừng ở 1 AI agent/1 nguồn — luôn đối chiếu ít nhất 2 nguồn độc lập (Claude vs ChatGPT, hoặc desk research vs visual audit) rồi hòa giải (reconcile) có ghi lý do.
3. **Tách "mức độ" khỏi "phong cách".** Sai lầm ban đầu là dùng một đại lượng duy nhất (bán kính / orbit) để gọi tên hai thứ bản chất khác nhau: cường độ định vị (premium vs mass) và hướng phong cách (cute vs cool). Điều này dẫn đến mô hình `Tier × Territory × Modifier` ở mục 4.

---

## 3. Tiến trình nghiên cứu theo từng giai đoạn

### Giai đoạn 0 — Dựng nền (trước log v1.0)
- Trích xuất 21 brand + tọa độ x/y ước lượng ban đầu từ `matemade_product_matrix_research.md`.
- Dựng app vanilla JS hiển thị ma trận (không phụ thuộc tọa độ — đây là lớp trình bày, tách biệt khỏi lớp dữ liệu nghiên cứu).

### Giai đoạn 1 — Tái cấu trúc logic phân loại (`docs/logic/`)
- Phát hiện vấn đề: orbit cũ (gần tâm / lệch rõ / có tính cách / khác hệ) lẫn 2 chiều khác nhau vào 1 thước đo.
- Quy trình 3 bước: (1) Claude viết đề xuất logic mới (`MATRIX_LOGIC_PROPOSAL.md`), (2) ChatGPT viết bản chuyên môn hóa độc lập (`matemade_orbit_logic_specialized.md`) + bản so sánh hai đề xuất (`matemade_matrix_logic_comparison_synthesis.md`), (3) tổng hợp thành chuẩn cuối `MATRIX_LOGIC_FINAL.md` v2.0.
- **Kết quả:** mô hình `Tier × Territory × Modifier` (chi tiết mục 4) — vẫn là khung phân loại đang dùng tới hiện tại.

### Giai đoạn 2 — Kiểm chứng tọa độ vòng 1: Claude vs ChatGPT (`docs/positions/`)
- Brief kiểm chứng: `BRAND_POSITION_RESEARCH_REQUEST.md` → `POSITION_VERIFICATION_REQUEST.md`.
- Hai bản độc lập: Claude (`positions-verified-claude.md`, 16 lượt web search) và ChatGPT (`positions-verified-chatgpt.json` + report kèm).
- **Kết quả tam giác hóa:** 17/21 brand hội tụ (chênh lệch < 0.15 — coi là đồng thuận, không cần xử lý thêm). 4 bất đồng được phân xử thủ công trong `positions-final-reconciled.md`, mỗi trường hợp có lý do cụ thể (Karatta dịch về phía ChatGPT vì minimal-design hơn ước lượng; Floralpunk lùi nhẹ vì BST gần đây design hơn; Carlyn giữ tier vì signature puffer là coded aesthetic; Spoiled bỏ cờ category_adjacent).

### Giai đoạn 3 — Visual audit (đối chiếu hình ảnh thực tế)
- Khi đã có đủ ảnh sản phẩm (91 ảnh / 21 brand), chạy audit đối chiếu **bằng chứng hình ảnh trực tiếp** với tọa độ đã chốt ở Giai đoạn 2 (`positions-audit-report.md`).
- Đây là lớp kiểm tra độc lập với desk research — vì mô tả bằng văn bản/SEO copy của brand có thể khác catalog thực tế. Phát hiện 4 lệch (Yuumy, Vanwalk, Ngaos, Spoiled) + 1 lỗi origin (Mossdoom: "Thai/CN" sai → Indonesia, Bandung 2009).
- **Bài học phương pháp:** mô tả thương hiệu tự viết (brand copy) và sản phẩm thực bán ra **không phải luôn khớp** — luôn cần ít nhất 1 lớp kiểm tra bằng catalog/ảnh thật.

### Giai đoạn 4 — Mở rộng phạm vi: 8 brand Nhật/Hàn/Thái (`docs/expansion/`)
- Research mới hoàn toàn cho Aeta (Nhật), OSOI/Vunque/Marge Sherwood/minitmute (Hàn), LYN/Pipatchara/Jelly Bunny (Thái) — `EXPANSION_BRANDS_JP_KR_TH_RESEARCH.md`.
- Quy trình 2 bước: first-pass placement (dựa trên nguồn official/retailer/press) → visual audit khi có ảnh (`EXPANSION_BRANDS_VISUAL_AUDIT.md`) → chỉnh tọa độ theo bằng chứng hình ảnh thật (6/8 brand bị chỉnh sau audit — tỷ lệ cao, củng cố thêm lý do vì sao audit ảnh là bước bắt buộc, không phải optional).

### Giai đoạn 5 — Lớp ngữ nghĩa & nguồn minh bạch
- Semantic Layers: gắn `emotional_codes`, `shape_language`, `outfit_role`, `benchmark_type`, `evidence_strength` cho từng brand — cho phép xem ma trận qua nhiều lăng kính (Lens Mode) mà không phải đổi tọa độ gốc.
- `BRAND_SOURCES`: gắn link nguồn (official/marketplace/social/press/retail/review) trực tiếp vào panel chi tiết từng brand — nguyên tắc minh bạch: **mọi claim phải trỏ được về nguồn**, không phải tin vào trí nhớ của agent.

### Giai đoạn 6 — Deep-dive toàn diện, không kế thừa giá trị cũ (2026-06-21)
- **Lý do khởi động:** phát hiện file ma trận có vài giá trị "lạ", nghi do live-edit ngoài quy trình chuẩn (qua Launch preview). User yêu cầu rõ: *"research kĩ càng và đưa ra kết quả"* — tức **research lại từ đầu, không neo vào số cũ**.
- Research độc lập cho toàn bộ 13 brand VN + 14 brand quốc tế trong ma trận (28 brand đối thủ, cộng MateMade là 29). Mỗi brand gắn block `coordEvidence` ngay trong code/app để bất kỳ ai mở panel chi tiết cũng truy được lý do tọa độ.
- **Phát hiện đáng kể nhất giai đoạn này:** MateMade (chính brand chủ thể) — tọa độ cũ đặt quá sâu vào cực "ngọt" (gần Toutou/Vanwalk), nhưng catalog thật trên matemade.vn (20 SP) chủ đạo màu **neutral/earth** (kem/tan/nâu/burgundy/đen/navy/xám), không phải candy-kawaii cực đoan. Charm chỉ là quà tặng kèm. → Tọa độ được kéo về gần tâm hơn đáng kể.
- **Insight chiến lược nảy ra từ phát hiện kỹ thuật này:** ngôn ngữ branding nội bộ ("kẹo ngọt", "Sincere Girlhood", "Modular Candy Utility") đang **ngọt hơn sản phẩm thực tế bán ra**. Đây là ví dụ cho thấy nghiên cứu định vị không chỉ phục vụ vẽ bản đồ — nó lộ ra độ lệch giữa narrative marketing và catalog thật, một input quan trọng cho chiến lược.

### Giai đoạn 7 — Codex audit phản biện (2026-06-22, phiên gần nhất)
- User đưa một bản audit độc lập khác (Codex/second-pass, `docs/positions/positions-deep-dive-codex-consult-for-claude.md`) với yêu cầu rõ: *đọc tham khảo, không ép theo, đánh giá khách quan như chuyên gia, phản biện nếu cần.*
- Đây là lần áp dụng tường minh nguyên tắc "tam giác hóa nguồn" ở quy mô toàn bộ ma trận: một reviewer thứ hai chấm lại *toàn bộ* `FINAL_POS` đã chốt ở Giai đoạn 6.
- **Kết quả đánh giá:** audit xác nhận đúng đa số tọa độ (Stand Oil, Carlyn, Karatta, Floralpunk, minitmute, và 20+ brand khác — không đổi). Trong 5 đề xuất sửa, **chấp nhận 4** (đều có evidence cụ thể, không phải overcorrection ngược chiều phi lý):
  - MateMade: x −0.48 → −0.55 (cân bằng lại — deep-dive trước có thể đã sửa hơi quá tay về phía neutral, bỏ qua lớp tên sản phẩm/màu vẫn còn ngọt: Charm, Cloudy No, Valentine, Tết, hồng/đỏ/plum).
  - Hapas: y 0.15 → 0.03 (La Muse evidence là mass-conversion/giftability, không phải design/craft language — hạ về sát core).
  - Lesac: y 0.15 → 0.00 (minimal direction đúng nhưng overstate "statement" — Lesac chưa có signature design như Stand Oil).
  - Spoiled: (0.48,−0.15) → (0.52,−0.28) (trang quốc tế cho thấy lớp sporty/travel/utility rõ hơn ước tính trước).
  - Vanwalk: giữ tọa độ, sửa **wording** (không phải số) — note cũ khẳng định quá chắc "Taiwan brand", thực tế nhiều nguồn ghi "made in mainland China" → đổi thành: bán qua storefront Taiwan, sản xuất Trung Quốc đại lục, origin pháp lý chưa xác minh.
- **Bài học phương pháp quan trọng từ giai đoạn này:** chấp nhận phản biện có chọn lọc — không phải "đồng ý tất cả vì có audit mới", mà đánh giá từng đề xuất theo evidence độc lập trước khi áp dụng. Tỷ lệ chấp nhận 4/5 cho thấy quy trình ở Giai đoạn 6 đã khá vững, audit chỉ tinh chỉnh biên, không đảo ngược kết luận lớn.

---

## 4. Khung phân loại: Tier × Territory × Modifier

Đây là "đơn vị đo" dùng xuyên suốt mọi giai đoạn nghiên cứu kể từ Giai đoạn 1 — bất kỳ brand mới thêm vào đều được gán theo khung này trước khi có tọa độ x/y cụ thể.

- **Tier** (bán kính trên bản đồ = cường độ định vị, KHÔNG phải mức giá): Neutral Mass · Elevated Mass · Coded-Accessible · Aesthetic-Led · Niche Specialist.
- **Territory** (góc = 1 trong 8 hướng phong cách): W Sweet/Kawaii · SW Soft Casual Cute · S Functional/Value · SE Sport/Street · E Seoul Cool · NE Editorial Cool · N Design/Craft · NW Romantic/Coquette.
- **Modifier + flags:** `category_adjacent` (gần category nhưng không cùng hệ), `signature_type` (trend-extreme, dễ lỗi thời), `coord_check` (tọa độ cần research thêm — cờ cảnh báo nội bộ, không phải kết luận).

Việc tách rõ 2 chiều này giải quyết được lỗi gốc của bản đồ v0.1–v0.5: brand "đắt nhưng cool" và brand "đắt nhưng cute" trước đây bị gộp nhầm vào cùng 1 thước đo bán kính.

---

## 5. Tiêu chuẨn nguồn & bằng chứng (evidence standards)

Thứ tự ưu tiên nguồn, rút ra từ thực tế các lần phải sửa tọa độ:

1. **Catalog/ảnh sản phẩm thật** (trọng số cao nhất) — đã nhiều lần đánh bại mô tả brand tự viết (MateMade, Yuumy, Vanwalk, Ngaos, Spoiled, 6/8 brand mở rộng JP/KR/TH đều bị chỉnh sau khi có ảnh thật).
2. **Nguồn official đa dạng** (trang chủ, các thị trường khác nhau — ví dụ Spoiled: trang VN vs trang quốc tế spoiledworldwide.com cho hình ảnh khác nhau về mức độ "sporty").
3. **Brand self-description / SEO copy** (trọng số thấp nhất, dễ lệch so với sản phẩm thực — bài học MateMade: ngôn ngữ "kẹo ngọt" ngọt hơn catalog thật).
4. **Origin/xuất xứ pháp lý** cần phân biệt rõ "bán qua đâu" (storefront) với "sản xuất ở đâu" — case Vanwalk: bán qua Pinkoi Taiwan nhưng sản xuất Trung Quốc đại lục là 2 sự thật khác nhau, không nên gộp thành 1 câu khẳng định.

Mỗi tọa độ trong ma trận đều mang theo block `coordEvidence` (kèm `old`/`now` khi có thay đổi) ngay trong dữ liệu app — đây là cách "footnote" hóa nghiên cứu để không bị thất lạc lý do qua nhiều vòng sửa.

---

## 6. Quản lý phiên bản nghiên cứu (Coord Version History)

Vì tọa độ bị sửa nhiều lần qua các giai đoạn, app có cơ chế `COORD_HISTORY` — đóng băng từng mốc tọa độ trước khi áp giá trị mới, cho phép so sánh "trước/sau" bất kỳ lúc nào (UI: tab so sánh + chip switch trên bản đồ). Hiện có 4 mốc: v0 Ban đầu (2026-06-19) → v1 Sau deep-dive 28 brand đối thủ → v2 Sau deep-dive MateMade (trước Codex audit) → Hiện tại (live, đã gồm Codex audit). Nguyên tắc: **không bao giờ sửa đè tọa độ mà không snapshot lại trạng thái trước đó** — đây là kỷ luật bắt buộc để giữ traceability nghiên cứu qua thời gian, tương tự version control cho code.

---

## 7. Kết quả chiến lược chính (output của toàn bộ quá trình)

- **Định vị hiện tại của MateMade:** "Sincere Girlhood" — nhưng catalog thật cho thấy nền tảng đã là neutral/earthy hơn ngôn ngữ marketing, tạo dư địa nâng cấp mà không cần đổi sản phẩm, chỉ cần đồng bộ truyền thông.
- **Hướng đề xuất:** "Sincere Girlhood with Global Vocabulary" — giữ Mass Feminine làm nền, dùng Stand Oil (đã xác nhận là youthful-playful affordable, KHÔNG phải "quá cool sai khách hàng" như nhận định ban đầu) và Carlyn làm aspiration ref gần; Sandy Liang + Cou Cou Intimates làm aspiration ref xa hơn.
- **3 gap cần lấp theo thứ tự ưu tiên:** (1) Material elevation — hero material/craft story, (2) Cultural narrative export — đóng khung "Vietnamese girlhood" thành điểm tự hào, (3) Editorial legitimacy — 1 campaign đủ mạnh.
- **White space dài hạn chưa brand nào trong 29 brand khảo sát chiếm:** *"Sincere Southeast Asian Girlhood" như một ngôn ngữ thẩm mỹ có thể đọc được toàn cầu* (globally legible aesthetic).

---

## 8. Hạn chế đã biết & việc cần làm tiếp

- Script vision-analysis (Script 2 trong `archive/brand-matrix-intl-scraper/`) vẫn đang chạy ở chế độ `manual-fashion-expert` cho 67 brand mở rộng (chưa dùng Claude vision API thật) — cần ~$1–2 credit để chạy lại.
- 7 VN brand trong tập 67-brand scraper còn thiếu ảnh cached, cần bổ sung thủ công.
- ~15 VN brand đã research trong `matemade-matrix.html` (Karatta, Ngaos, Vanwalk, Oui, Lesac, Mossdoom, Spoiled, Saigon Swagger, Toutou, Samantha Vega, Carlyn...) chưa được đưa vào `brands.json` của pipeline scraper riêng — 2 tập dữ liệu (matrix app vs scraper pipeline) hiện chưa đồng bộ hoàn toàn.
- 6 brand được đánh giá "coverage còn mỏng" trong `positions-audit-report.md` ban đầu — nên rà soát lại xem deep-dive Giai đoạn 6 đã bù đắp đủ chưa.

---

## 9. Bản đồ tài liệu nguồn (để truy ngược)

| Giai đoạn | Tài liệu gốc |
|---|---|
| Logic Tier×Territory×Modifier | `docs/logic/MATRIX_LOGIC_FINAL.md` |
| Kiểm chứng tọa độ vòng 1 | `docs/positions/positions-final-reconciled.md` |
| Visual audit 21 brand gốc | `docs/positions/positions-audit-report.md` |
| Mở rộng 8 brand JP/KR/TH | `docs/expansion/EXPANSION_BRANDS_JP_KR_TH_RESEARCH.md`, `EXPANSION_BRANDS_VISUAL_AUDIT.md` |
| Chiến lược white-space | `docs/strategy/MATEMADE_WHITESPACE_STRATEGY_BETA.md` |
| Codex audit phản biện | `docs/positions/positions-deep-dive-codex-consult-for-claude.md` |
| Log kỹ thuật/tính năng app | `PROJECT_LOG.md` (gốc dự án) |
| Dữ liệu sống (tọa độ hiện tại) | `matemade-matrix.html` → object `FINAL_POS`, `LOGIC`, `COORD_HISTORY` |

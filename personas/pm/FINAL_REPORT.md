# Báo cáo cuối — MateMade Brand Territory Matrix (sau phản biện đa vai)

**Bàn giao bởi:** Trần Bảo Long (PM), tổng hợp từ tranh luận giữa Đặng Hoài Thư (researcher) và Vũ Đan Khanh (debator) — xem [COLLABORATION_LOG.md](COLLABORATION_LOG.md) cho toàn bộ diễn biến.
**Cơ sở:** [research/RESEARCH_METHODOLOGY.md](../../research/RESEARCH_METHODOLOGY.md) + [personas/debator/DEBATE_RESULT.md](../debator/DEBATE_RESULT.md)
**Ngày:** 2026-06-22
**Cách đọc báo cáo này:** mỗi kết luận có nhãn độ tin cậy — **Cao** (đa nguồn, đã qua ≥2 vòng kiểm chứng độc lập đủ mạnh), **Trung bình** (có evidence nhưng quy trình kiểm chứng còn hạn chế — vd cùng khung tham chiếu, hoặc mới qua 1 vòng đo), **Thấp** (suy luận hợp lý nhưng chưa có dữ liệu xác nhận trực tiếp). Đây là khác biệt quan trọng nhất so với bản methodology gốc, nơi mọi kết luận được trình bày với cùng một giọng văn chắc chắn.

---

## 1. Những gì đã đứng vững qua phản biện (Cao)

- **Khung phân loại Tier × Territory × Modifier** — tách đúng "cường độ định vị" khỏi "hướng phong cách", sửa lỗi gốc của bản đồ v0.1–v0.5. Không bị Khanh phản biện thêm.
- **Nguyên tắc ưu tiên catalog/ảnh thật hơn brand self-description** — đã chứng minh hiệu quả qua việc bắt đúng 10/29 brand bị lệch tọa độ khi có ảnh thật (Yuumy, Vanwalk, Ngaos, Spoiled + 6/8 brand mở rộng JP/KR/TH).
- **Cơ chế traceability (`coordEvidence`, `COORD_HISTORY`)** — kỷ luật ghi lại lý do + lịch sử mọi lần sửa tọa độ, không có cơ chế này thì chính cuộc tranh luận này (vd điểm 3.1) sẽ không thể thực hiện được vì không có gì để đối chiếu.
- **Codex audit Giai đoạn 7 chấp nhận chọn lọc 4/5 đề xuất** — dấu hiệu thật của tư duy phản biện, không phải đồng thuận máy móc.

## 2. Những gì đã được tinh chỉnh lại sau tranh luận (Trung bình)

- **"Tam giác hóa nguồn" (Claude vs ChatGPT, Giai đoạn 2):** kết luận gốc (17/21 brand hội tụ) **không sai**, nhưng cách diễn đạt "tam giác hóa" phóng đại tính độc lập — cả 2 model dùng cùng brief và cùng khung Tier×Territory×Modifier, nên một phần hội tụ là hiệu ứng "cùng khung tham chiếu", không phải 2 chuyên gia hoàn toàn tách biệt đồng ý nhau. Tín hiệu độc lập thật vẫn tồn tại (4 bất đồng có lý do cụ thể khác nhau), nhưng **nên gọi đây là "đối chiếu 2 mô hình cùng khung + 1 lớp audit độc lập hơn (Codex)"**, không phải tam giác hóa đầy đủ.
- **Tọa độ MateMade (x = −0.55 hiện tại):** đã đổi 3 lần trong 3 ngày (−0.78 → −0.48 → −0.55). 2 điểm dữ liệu liên tiếp **chưa đủ** để khẳng định đây là hội tụ thật chứ không phải dao động ngẫu nhiên đang trùng hợp giảm dần. **Quy tắc dừng mới được chốt trong tranh luận này:** một tọa độ chỉ được dán nhãn "đã chốt/Cao" khi 2 lần audit liên tiếp cho delta < 0.10 trên cả 2 trục. MateMade hiện **chưa đạt** điều kiện này → dán nhãn **"tạm thời, độ tin cậy Trung bình"**. Bất kỳ brief nào dùng tọa độ MateMade để quyết định đầu tư (campaign, sản xuất) nên ghi rõ nhãn này.

## 3. Action items — cần dữ liệu chưa có trong phạm vi dự án (Thấp / cần xác nhận thêm)

| # | Việc cần làm | Vì sao cần | Mức ưu tiên |
|---|---|---|---|
| 1 | Xác định lại tiêu chí chọn mẫu 29 brand — dựa trên market-share/social-listening thật, không chỉ "brand researcher biết tới" | Mẫu thuận tiện hiện tại không chứng minh được "thị trường trống", chỉ chứng minh "trong nhóm 29 brand này, chưa ai chiếm vùng X" | Cao |
| 2 | Lấy số liệu catalog/bestseller thật của MateMade (tổng SKU đang bán + ranking doanh số) thay vì danh sách minh họa 20 SP | "20 SP" trong `coordEvidence` là ví dụ, không phải toàn bộ catalog — tọa độ MateMade đang dựa trên subset chưa xác nhận đại diện | Cao |
| 3 | Validate nhu cầu khách hàng cho white space "Sincere Southeast Asian Girlhood" (social listening, search trend, hoặc test capsule nhỏ) trước khi đầu tư campaign lớn | Hiện tại đây là suy luận từ khoảng trống hình học trên bản đồ 29 brand, chưa có bằng chứng nhu cầu thật — khoảng trống không tự động nghĩa là có cầu | Cao |
| 4 | Mời 1 bên audit hoàn toàn độc lập (không tiếp xúc trước với kết luận của Thư) chấm lại ít nhất 5 brand quan trọng nhất (MateMade, Stand Oil, Carlyn, Hapas, Lesac) | Mọi vòng kiểm chứng tới giờ đều cùng 1 hệ thống/operator vận hành nối tiếp (trừ Codex, mới có 1 lần) — chưa đủ để loại trừ thiên kiến lặp lại | Trung bình |
| 5 | Ưu tiên audit độc lập cho **10/28 brand chỉ có 1 nguồn nghiên cứu duy nhất** (Karatta, Ngaos, Samantha Vega, Oui, Vanwalk, Saigon Swagger, Mossdoom, Ther Gab, Floralpunk, Chautfifth) | Phát hiện từ [COORDINATE_DEBATE.md](COORDINATE_DEBATE.md): 36% tổng số brand đối thủ chưa từng qua nguồn thứ 2, dù note mô tả bằng chữ "✅ Xác nhận đúng" — dùng từ sai, dễ gây hiểu lầm đã kiểm chứng | Cao |
| 6 | Đo lại Stand Oil 1 lần nữa, dán nhãn "tạm thời/Trung bình" ngay | Bước nhảy tọa độ Stand Oil (Δx=0.57) lớn hơn MateMade (Δx=0.23) gấp 2.5 lần nhưng chưa từng bị dán nhãn tạm thời — đây là case lệch nhất toàn ma trận, chưa có lần đo thứ 2 | Cao |
| 7 | ✅ **Đã sửa (2026-06-22)** — `densityAt()`/`nearestToMate()` trong `matemade-matrix.html` giờ loại trừ brand có cờ `catAdj:true` (hiện tại: Saigon Swagger) khỏi tính mật độ/khoảng trống và "gần MateMade nhất" | Cờ category-adjacent đã có trong dữ liệu nhưng chưa được hàm tính đọc tới — đã kiểm tra syntax JS sau khi sửa, ok | Trung bình — đã xong |

**Giới hạn cấu trúc cần ghi nhớ khi đọc mọi tọa độ trong ma trận (áp dụng cho 28/28 brand, không riêng case nào):** không brand nào trong ma trận có công thức quy đổi định lượng từ đặc điểm sản phẩm sang x/y (ví dụ: đếm % SKU theo nhóm rồi tính tuyến tính) — mọi tọa độ đều là **ước lượng định tính được số hóa để minh họa vị trí tương đối**, không phải phép đo chính xác tới 2 chữ số thập phân. Đây là phát hiện từ [COORDINATE_DEBATE.md](COORDINATE_DEBATE.md) Round 2, mở rộng từ nhận định ban đầu của debator (3 brand rìa trục) sau khi researcher quét lại toàn bộ.

## 3b. Vòng deep-dive "Photography Vibe" (2026-06-22) — xem [PHOTOGRAPHY_VIBE_DEEP_DIVE.md](../../research/PHOTOGRAPHY_VIBE_DEEP_DIVE.md) + [PHOTOGRAPHY_VIBE_DEBATE.md](PHOTOGRAPHY_VIBE_DEBATE.md)

**Giả thuyết user đặt ra:** sản phẩm bị "mass hóa" để dễ bán nên không đủ khách quan — điểm phân hóa thật nằm ở phong cách hình ảnh chính thống (model/casting, bối cảnh, góc máy, color grading, art direction). Đã research 29 brand qua nguồn chính thống.

**Hạn chế quan trọng phải biết:** công cụ research hiện có (WebFetch/WebSearch) không thể "nhìn" ảnh thật — Instagram/Facebook chặn bot hoàn toàn. Kết quả: **17/29 brand (59%) chỉ đạt độ tin cậy Thấp** (giữ nguyên tọa độ, không đổi). 12 brand còn lại có phát hiện cụ thể từ báo chí/campaign thật (Trung bình), trong đó 2 case quan trọng:

- **Stand Oil [Tin cậy: Cao — TENSION ĐÃ GIẢI cùng ngày 2026-06-22]:** đã tìm ra cách xem ảnh thật (curl + Read, xem `VISUAL_RESEARCH_METHOD.md`) — 6 ảnh lookbook chính thức cho thấy styling surreal/playful/maximalist-prop (bóng bay, bánh sinh nhật sparkler, tie-dye sặc sỡ), **bác bỏ claim "quiet luxury muted earth" của báo chí** (vốn chỉ là suy luận từ text). Xác nhận đúng hướng playful của Giai đoạn 6 — không đổi tọa độ (0.42, 0.20), không còn cần audit ưu tiên cao.
- **Hapas [Tin cậy: lớp "cool" nâng lên Cao, nhưng tension vẫn mở]:** đã xem trực tiếp ảnh campaign Châu Bùi thật — xác nhận đây là 1 shoot editorial chuyên nghiệp (street style, denim thô, túi mirror/chrome), không phải nội dung nhỏ lẻ. Vẫn thiếu dữ liệu reach so với La Muse (18.2k đã bán) để cân trọng số — chưa đổi tọa độ.
- **Chautfifth — phát hiện độc lập, không phải tension tọa độ:** mâu thuẫn rõ giữa "design philosophy" chính thức (quiet/restrained) và campaign thực tế 8/3/2026 gây tranh cãi (cinemagraph cận cảnh, bị chỉ trích, brand phải xin lỗi) — bằng chứng thật cho giả thuyết gốc của user (brand "nói" minimal nhưng "làm" campaign khác hẳn).
- **Lỗi dữ liệu đã sửa ngay:** `BRAND_SOURCES.camelia` trỏ sai sang 1 trang spa Colombia không liên quan → đã sửa thành `camelia.vn`.

**Action items mới từ vòng này:**

| # | Việc cần làm | Vì sao | Ưu tiên |
|---|---|---|---|
| 8 | ✅ **Đã xong (2026-06-22)** — Stand Oil: tension giải bằng cách xem ảnh thật, không cần audit độc lập nữa | Xem mục 3b | Đã xong |
| 9 | ⚠️ **Đã làm nhưng KHÔNG đủ — N quá nhỏ (2026-06-22)** — áp dụng `curl`+`Read` cho 17 brand, nhưng chỉ lấy ~2-3 ảnh/brand từ 1 trang/1 thời điểm. User chất vấn đúng: N nhỏ không đủ khách quan. Đã hạ mọi nhãn "Cao" gắn cho 20 brand đã xem ảnh (kể cả MateMade/Stand Oil/Hapas ở vòng trước) xuống **Trung bình** — chỉ brand đã đọc full sitemap catalog (hiện chỉ Karatta) mới giữ "Cao" | Xem mục 7-8 trong `PHOTOGRAPHY_VIBE_DEEP_DIVE.md` và `VISUAL_RESEARCH_METHOD.md` | Đã làm, cần làm lại đúng cách |
| 11 | **Karatta — KHÔNG còn là "mâu thuẫn toàn bộ" sau khi đọc full sitemap (N=65 SKU thật)** | Round N=3 kết luận sai "không còn hoa/lace" → sau khi đọc toàn bộ `sitemap_products_1.xml`: dòng FLOWER TAG/AIRBAG FLOWER **vẫn tồn tại** (~9-15% catalog), nhưng phần lớn (~85%) là túi tối giản màu đất. Sự thật nằm GIỮA 2 kết luận cực đoan (Giai đoạn 6 "toàn playful" vs round N=3 "toàn minimal"). y=0.55 hiện tại overstate — đề xuất tạm 0.20-0.30, cần debate Round 4 chốt số | Cao (N=65, đáng tin hơn mọi case khác trong dự án) |
| 12 | Spoiled — ghi nhận brand có ≥2 đăng ký hình ảnh song song, nhưng **dựa trên N=3, cần đọc sitemap để xác nhận tỷ trọng thật** giữa dòng sporty-utility vs travel-chic | Chưa làm — N=3 không đủ để khẳng định tỷ trọng 2 dòng | Trung bình, cần làm thêm |
| 13 | ✅ **Đã làm (2026-06-22)** — đọc sitemap cho nhiều brand + duyệt Instagram thật qua Chrome cho 26/29 brand | Xem `research/PHOTOGRAPHY_VIBE_DEEP_DIVE.md` mục 9 | Đã xong |
| 14 | ✅ **Đã làm** — fetch ảnh/duyệt Instagram cho toàn bộ brand còn N=0 (trừ Toutou/Yuumy/LYN — không tìm được account chính chủ, tự nó là phát hiện) | — | Đã xong |
| 15 | **Karatta — ĐÃ ĐỔI SỐ qua debate** (-0.45,0.55)→(-0.30,0.32) | 3 nguồn evidence độc lập hội tụ (Giai đoạn 6 + sitemap N=65 + Instagram) — đủ điều kiện theo quy tắc "≥2 nguồn hội tụ mới đổi số". Xem `personas/pm/COORDINATE_CHANGE_DEBATE.md` | Đã xong |
| 16 | **Juno — audit Instagram sâu hơn, ưu tiên cao nhất** | Phát hiện glam editorial kịch tính khác hẳn "mass feminine an toàn", nhưng chỉ dựa 1 screenshot N nhỏ — không đủ để đổi tọa độ 1 brand benchmark CORE. Cần scroll nhiều bài, nhiều thời điểm trước khi quyết số | Cao |
| 17 | 9 brand Nhóm B (Vascara, Carlyn, Ther Gab, Floralpunk, Aeta, OSOI, Vunque, Mossdoom, Lesac) — không đổi số, cần audit sâu hơn nếu muốn xác nhận | Tất cả chỉ dựa 1 screenshot/brand — cùng loại lỗi N nhỏ đã tự phát hiện và sửa ở vòng trước | Trung bình |
| 10 | (Kỹ thuật, hoãn) Thêm cờ `imageProductTension` cho brand có 2 lớp evidence (sản phẩm vs hình ảnh PR) ngược hướng — hiện đủ điều kiện: Stand Oil, Hapas, MateMade | Khác bản chất với `coordCheck` ("tọa độ có thể sai") — đây là "brand tự nó không đồng nhất giữa 2 lớp truyền thông", cần UI riêng để hiển thị đúng | Thấp — cần thiết kế UI trước |

## 4. Lỗi tổng hợp đã phát hiện và sửa trong phiên này

`research/RESEARCH_METHODOLOGY.md` mục 7 trích "3 gap cần lấp" (Material elevation, Cultural narrative, Editorial legitimacy) từ luồng phân tích gốc (RIO brief), nhưng **bỏ sót** một luồng phân tích khác đã có lập luận chi tiết hơn và thứ tự ưu tiên rõ ràng: `docs/strategy/MATEMADE_WHITESPACE_STRATEGY_BETA.md` — 4 vùng trống hình học, với khuyến nghị rõ **"Modular Candy Daily" (vùng 1, tọa độ (-0.6,-0.9)) là core chiến lược số 1**, các vùng còn lại (Romantic Candy Craft, Feminine Practical Daily, Cute On-the-Go System) là capsule/thử nghiệm, không phải hướng đi ngang hàng.

**Khuyến nghị:** khi viết brief chiến lược chính thức cho MateMade, dùng cấu trúc ưu tiên của `MATEMADE_WHITESPACE_STRATEGY_BETA.md` mục 6 (core + capsule) làm khung chính, không dùng danh sách "3 gap" rời rạc của methodology mục 7 — 2 luồng cần được hợp nhất, không trích dẫn riêng lẻ.

## 5. Kết luận chiến lược — viết lại với độ tin cậy đúng mức

> MateMade hiện định vị tại vùng W↔SW (Charmable Soft Daily), tọa độ **tạm thời** (−0.55, −0.08) [độ tin cậy Trung bình — chưa qua đủ vòng đo để chốt cứng]. Catalog thật có nền **neutral/earth** rõ hơn ngôn ngữ marketing "kẹo ngọt" hiện tại [độ tin cậy Cao — xác nhận qua nhiều lần đọc catalog độc lập]. Hướng đi core nên là **"Modular Candy Daily"** (theo `MATEMADE_WHITESPACE_STRATEGY_BETA.md`) — cute utility hằng ngày có thể cá nhân hóa qua hệ charm/module, gần DNA nhất, rủi ro thấp nhất trong 4 vùng trống đã xác định [độ tin cậy Trung bình — đúng hướng theo khoảng trống hình học, nhưng **chưa có xác nhận nhu cầu khách hàng thật**, xem Action item #3]. Stand Oil và Carlyn vẫn là aspiration reference gần nhất đã được xác minh qua nhiều vòng [độ tin cậy Cao].

**Điều quan trọng nhất cần nói rõ với người ra quyết định:** đây là bản đồ tốt nhất hiện có với dữ liệu hiện có, **không phải bản đồ đã được xác nhận bằng dữ liệu khách hàng thật**. Trước khi rót ngân sách lớn (campaign, sản xuất hero product mới), nên thực hiện tối thiểu Action item #2 và #3 ở trên — cả hai đều khả thi trong thời gian ngắn (đọc dữ liệu bán hàng nội bộ MateMade đã có sẵn, không cần nghiên cứu mới từ đầu).

# Debate chuyên đề — Độ tin cậy tọa độ 28 brand đối thủ

**Điều phối:** Trần Bảo Long (PM)
**Tham gia:** Đặng Hoài Thư (researcher) vs Vũ Đan Khanh (debator)
**Phạm vi:** Khác với [COLLABORATION_LOG.md](COLLABORATION_LOG.md) (debate về *phương pháp luận chung*), phiên này debate **trực tiếp trên từng con số `FINAL_POS`** của 28 brand đối thủ (không tính MateMade — đã debate riêng ở vòng 1).
**Nguồn dữ liệu:** `matemade-matrix.html` → object `LOGIC` (coordEvidence) + `FINAL_POS` (đọc trực tiếp dòng 274–283).
**Ngày:** 2026-06-22

---

## Round 1

### Debator (Khanh) mở debate — 4 nhóm vấn đề tìm thấy khi rà toàn bộ 28 tọa độ

**A. Stand Oil có bước nhảy lớn hơn cả MateMade, nhưng không bị dán nhãn "tạm thời"**

So sánh 2 case côi cứng vào số:

| Brand | Tọa độ cũ | Tọa độ hiện tại | Δx | Δy |
|---|---|---|---|---|
| MateMade | (−0.78, −0.06) | (−0.55, −0.08) | 0.23 | 0.02 |
| **Stand Oil** | **(0.99, 0.37)** | **(0.42, 0.20)** | **0.57** | **0.17** |

Stand Oil đổi **0.57 đơn vị trên trục x** — gấp 2.5 lần bước nhảy của MateMade (0.23) — nhưng MateMade được phiên debate vòng 1 dán nhãn "tạm thời/Trung bình", còn Stand Oil thì không, dù cùng cơ chế: 1 lần deep-dive duy nhất thay đổi từ ước lượng cũ, **chưa có lần đo thứ 2 xác nhận**. Quy tắc dừng (delta < 0.10, 2 lần liên tiếp) mà chính Thư đề xuất ở vòng 1 — nếu áp đúng — Stand Oil phải bị dán nhãn tạm thời còn rõ hơn MateMade.

**B. 8 brand "fresh:true" chưa từng qua kiểm chứng nguồn thứ 2**

Rà cờ `coordEvidence` trong code: Karatta, Ngaos, Samantha Vega, Oui, Vanwalk, Saigon Swagger là `fresh:true` — tức đây là **lần research duy nhất** trong Giai đoạn 6 (deep-dive "không kế thừa giá trị cũ"), không có Claude-vs-ChatGPT như Giai đoạn 2, không nằm trong 5 brand được Codex audit ở Giai đoạn 7. Văn bản note vẫn dùng chữ "✅ Xác nhận đúng" hoặc tương đương — nhưng "xác nhận" so với cái gì, nếu không có nguồn thứ 2 để so?

**C. Tọa độ chạm/vượt rìa trục đã công bố**

Trục được định nghĩa biên ±1.45 (`PROJECT_LOG.md` mục 2). 3 brand đang ở rất gần hoặc thực tế đã đẩy ra rìa:
- **Saigon Swagger**: y = −1.15 (79% chiều dài nửa trục) — category_adjacent (carry-system, không phải túi nữ tính).
- **Pipatchara**: y = 1.35 (93% chiều dài nửa trục) — gần sát rìa trên.
- **Toutou**: x = −1.20 (83%) — đã gắn cờ signature_type trend-extreme.

Câu hỏi: 3 con số này có đến từ phép đo tinh (so với brand láng giềng) hay là **suy luận theo logic "brand này cực đoan nên đẩy ra rìa cho dễ minh họa"**? Nếu là cách 2, đây là dữn lỗi anchoring — quyết định trước kết luận ("brand này extreme") rồi gán số sau, thay vì đo rồi mới biết extreme tới đâu.

**D. Saigon Swagger category-adjacent có nên tính vào cùng phép đo khoảng cách không?**

`findGaps()` và "nearest to MateMade" (theo `PROJECT_LOG.md` mục 3.9) dùng khoảng cách Euclid trên cùng 1 mặt phẳng cho tất cả 29 brand, gồm cả Saigon Swagger — một carry-system streetwear unisex, tự nhận `catAdj:true` (khác category với túi nữ tính MateMade). Đưa nó vào phép tính mật độ/khoảng trống có thể làm lệch kết quả "vùng trống" (nó kéo 1 điểm dữ liệu vào vùng SE cực, làm vùng đó trông "có người" trong khi thực ra là brand khác category hoàn toàn).

---

### Researcher (Thư) trả lời Round 1

**Về A (Stand Oil):** Đồng ý hoàn toàn, đây là điểm tôi bỏ sót khi áp quy tắc dừng ở vòng 1 — tôi chỉ áp cho MateMade vì đó là chủ thể chính đang được debate, nhưng **logic phải áp đều cho mọi brand có 1 lần đổi tọa độ lớn chưa được đo lại**. Kiểm tra thêm 2 trường hợp khác có bước nhảy tương đương: Carlyn (Δx=0.16), Spoiled (Δx=0.04, Δy=−0.13), Hapas (Δy=−0.12) — đều nhỏ hơn Stand Oil đáng kể. **Stand Oil là case lệch nhất trong toàn bộ 28 brand, đáng phải dán nhãn "tạm thời" rõ nhất, kể cả hơn MateMade.**

**Về B (8 brand fresh:true):** Đồng ý đây là gap thật. Lý do kỹ thuật: Giai đoạn 7 (Codex audit) chỉ review lại `FINAL_POS` *sau khi* Giai đoạn 6 đã hoàn tất toàn bộ 28 brand, nhưng Codex chỉ đưa ra 5 đề xuất sửa (tự nó chọn brand nào đáng nghi, không phải rà toàn bộ với độ sâu bằng nhau) — nên 6 brand `fresh:true` này đơn giản là **không nằm trong tập Codex chọn để xem lại**, không phải vì chúng "ổn hơn" brand khác. Dùng chữ "✅ Xác nhận đúng" trong note là **dùng từ sai** — không có gì được xác nhận lại bởi nguồn thứ 2, chỉ là 1 lần research duy nhất tự đánh giá là hợp lý với chính nó.

**Về C (tọa độ rìa trục):** Tôi kiểm tra lại quy trình suy ra 3 số này — với Saigon Swagger và Pipatchara, ghi chú trong `coordEvidence` mô tả đặc điểm brand trước (carry-system function-led / macramé sustainable art-piece) rồi mới gán tọa độ, không có bước đo định lượng trung gian (ví dụ: so sánh % sản phẩm utility vs decorative để suy ra y một cách có công thức). **Đồng ý: cách gán số hiện tại là suy luận định tính rồi quy đổi sang số, không phải phép đo có thể lặp lại bởi người khác và ra cùng kết quả.** Đây là rủi ro thật — 2 researcher khác nhau đọc cùng evidence có thể chọn y=1.20 hoặc y=1.40 cho Pipatchara mà cả hai đều "thấy hợp lý".

**Về D (Saigon Swagger trong phép tính khoảng cách):** Đồng ý có rủi ro, nhưng phản biện một phần: bản thân brand đã được gắn `catAdj:true` chính là để cảnh báo người đọc panel chi tiết "brand này khác category" — vấn đề là cờ này **không được dùng để loại trừ khỏi `findGaps()`/heatmap**, chỉ hiển thị trong UI. Đây là lỗi tích hợp giữa lớp dữ liệu (đã có cờ đúng) và lớp tính toán (chưa đọc cờ đó) — sửa được mà không cần research thêm, chỉ cần code lại hàm `findGaps`/`nearestToMate` để loại trừ `catAdj:true` hoặc giảm trọng số.

---

### Debator (Khanh) phản hồi Round 1

Ghi nhận Thư xác nhận cả 4 điểm là vấn đề thật, không có điểm nào bị bác lại bằng phản biện ngược — đây là tín hiệu tốt nhưng cũng đặt câu hỏi ngược: nếu rà sâu thêm, liệu còn bao nhiêu case tương tự A/B/C chưa được phát hiện? Khanh đề nghị PM yêu cầu Thư làm 1 việc cụ thể trước khi chốt: **quét lại toàn bộ 28 `coordEvidence` theo đúng 3 tiêu chí A/B/C** (không chỉ nói "đồng ý là vấn đề thật" cho 1-2 case mẫu) để có danh sách đầy đủ, không phải danh sách Khanh tự chọn ra để minh họa.

---

## Round 2

### Researcher (Thư) — quét lại toàn bộ 28 brand theo 3 tiêu chí

**Tiêu chí A — bước nhảy tọa độ lớn (|Δ| ≥ 0.20 trên ít nhất 1 trục) chưa có lần đo thứ 2 xác nhận:**

| Brand | Δx | Δy | Đã có lần đo thứ 2? |
|---|---:|---:|---|
| **Stand Oil** | 0.57 | 0.17 | Không |
| Carlyn | 0.16 | 0.08 | Không |
| Hapas | 0.05 | 0.12 | Không (Codex là lần đo thứ 2 duy nhất, nhưng đây chính là lần đó — chưa có lần thứ 3) |
| Spoiled | 0.04 | 0.13 | Không (tương tự Hapas — Codex = lần 2, chưa có lần 3) |
| Vanwalk | 0 | 0 | N/A — chỉ sửa wording, không phải số |

→ **Stand Oil là case duy nhất vượt ngưỡng |Δ|≥0.20 và hoàn toàn chưa qua lần đo thứ 2 nào.** Hapas/Spoiled đã qua đúng 1 lần đo thứ 2 (Codex) nên gần đạt điều kiện "2 lần liên tiếp" hơn — chỉ cần 1 lần đo thứ 3 ổn định là đủ điều kiện chốt cứng theo quy tắc đã thống nhất ở vòng 1.

**Tiêu chí B — brand chỉ có 1 lần research, chưa từng có nguồn thứ 2 (`fresh:true`, không nằm trong 5 brand Codex chọn):**
Karatta, Ngaos, Samantha Vega, Oui, Vanwalk (chỉ wording), Saigon Swagger, Mossdoom, Ther Gab, Floralpunk, Chautfifth — **10 brand**, tức **hơn 1/3 tổng số 28 brand đối thủ** đang đứng ở mức tin cậy "1 nguồn duy nhất", cao hơn số Khanh nêu ban đầu (Khanh chỉ liệt kê 6 ví dụ minh họa, không phải con số rà soát đầy đủ).

**Tiêu chí C — tọa độ gán bằng suy luận định tính, không có công thức quy đổi trung gian:**
Sau khi đọc lại toàn bộ note, tôi xác nhận **không brand nào trong 28 brand có công thức định lượng trung gian** (ví dụ: đếm % SKU theo nhóm rồi quy đổi tuyến tính ra x/y) — toàn bộ 28 tọa độ, không riêng Saigon Swagger/Pipatchara/Toutou, đều là **ước lượng định tính rồi gán số trực tiếp**, chỉ khác nhau ở mức độ rõ ràng của evidence hỗ trợ phía sau, không khác nhau về "có công thức hay không". Đây là giới hạn cấu trúc của toàn bộ phương pháp, không phải lỗi riêng của 3 brand rìa trục.

---

### Debator (Khanh) — phản hồi Round 2

Con số 10/28 brand ở mức "1 nguồn duy nhất" (tiêu chí B) và xác nhận **toàn bộ 28/28 brand không có công thức quy đổi định lượng** (tiêu chí C, mở rộng hơn nhận định ban đầu của Khanh) là phát hiện đáng kể hơn những gì Khanh tự tìm ra một mình — đúng giá trị của việc yêu cầu rà soát toàn bộ thay vì dừng ở case mẫu. Khanh chốt: không cần round 3, nhưng yêu cầu PM ghi rõ trong báo cáo: **tiêu chí C là giới hạn của toàn bộ phương pháp** (không chỉ 3 brand rìa trục) — đây phải là 1 dòng cảnh báo ở mức tổng (toàn hệ thống), không phải action item riêng lẻ cho từng brand.

---

## PM (Long) chốt phiên

| Vấn đề | Trạng thái | Việc cần làm |
|---|---|---|
| A — Stand Oil chưa có lần đo 2 sau bước nhảy lớn nhất toàn bộ ma trận | (a) chốt — cần hành động | Dán nhãn "tạm thời/Trung bình" cho Stand Oil, ưu tiên cao hơn MateMade vì Δ lớn hơn |
| A (phụ) — Hapas, Spoiled đã có 1/2 lần đo cần thiết | (b) action item | Cần 1 lần đo thứ 3 (không phải đo lại từ đầu) để đủ điều kiện chốt cứng theo quy tắc delta<0.10 |
| B — 10/28 brand (36%) chỉ có 1 nguồn nghiên cứu | (b) action item | Ưu tiên audit độc lập (Action item #4 trong `FINAL_REPORT.md`) cho nhóm 10 brand này trước, vì đây là nhóm rủi ro cao nhất chưa được biết tới trước phiên này |
| C — Không brand nào có công thức quy đổi định lượng (giới hạn toàn hệ thống) | (c) PM ghi nhận, không block | Đây là giới hạn cấu trúc đã biết của phương pháp định tính-sang-tọa độ — không sửa được bằng 1 action item, cần ghi rõ trong mọi báo cáo dùng tọa độ cho quyết định tiền: **toạ độ là ước lượng định tính được số hóa để minh họa, không phải phép đo khoa học chính xác đến 2 chữ số thập phân** |
| D — `findGaps()`/`nearestToMate()` không loại trừ brand category-adjacent | (a) chốt — sửa kỹ thuật rõ ràng, không cần research thêm | Action item kỹ thuật: cập nhật code để loại trừ hoặc giảm trọng số brand có `catAdj:true` (hiện chỉ Saigon Swagger) khi tính mật độ/khoảng trống |

**Tổng kết quan trọng nhất của phiên này:** việc Khanh chỉ đưa 4 case mẫu nhưng yêu cầu Thư quét lại toàn bộ đã lộ ra quy mô thật của vấn đề lớn hơn nhiều so với case mẫu ban đầu — 10/28 brand (không phải 6), và tiêu chí C áp dụng cho 28/28 brand (không phải 3). **Đây là lý do quy trình debate nhiều round có giá trị hơn 1 lần phản biện duy nhất: vòng 2 thường lộ ra quy mô thật, vòng 1 chỉ lộ ra sự tồn tại của vấn đề.**

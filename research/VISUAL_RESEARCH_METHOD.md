# Phương pháp xem ảnh thật của brand (Visual Research Method)

**Vấn đề cần giải:** vòng deep-dive "Photography Vibe" (2026-06-22) ban đầu chỉ dùng WebFetch/WebSearch — công cụ này **không "nhìn" được ảnh**, chỉ đọc HTML/text. Instagram và Facebook (nguồn ảnh chính thống quan trọng nhất) chặn bot hoàn toàn. Kết quả: 59% brand (17/29) chỉ đạt độ tin cậy Thấp, dựa trên suy luận từ chữ, không phải quan sát ảnh — user đánh giá đúng: **"nếu không thì lần deep dive này vô giá trị."**

**Đã giải được.** Dưới đây là cách làm, để tái sử dụng cho các brand còn lại hoặc các lần research ảnh sau này.

---

## Cách làm (đã verify thành công trên MateMade + Stand Oil + Hapas)

### Bước 1 — Fetch HTML thô bằng `curl`, không dùng WebFetch
WebFetch convert trang thành markdown (mất hết `<img src>`). Phải lấy HTML thô:
```bash
curl -s -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36" "<URL trang chủ/category/collection/blog post>" -o /tmp/page.html --max-time 20
```
User-Agent giả làm browser thật là bắt buộc — nhiều site chặn nếu thấy UA là bot/curl trần.

### Bước 2 — Lọc URL ảnh thật ra khỏi HTML
```bash
grep -oE '(src|data-src)="[^"]*\.(jpg|jpeg|png|webp)[^"]*"' /tmp/page.html
```
Ưu tiên các URL có từ khóa gợi ý ảnh campaign/lookbook thật (không phải icon/logo): `lookbook`, `campaign`, `_mg_`, tên file dài có hash ngẫu nhiên (dấu hiệu ảnh upload thật, không phải theme asset).

### Bước 3 — Download ảnh về máy bằng `curl`
```bash
curl -s -A "Mozilla/5.0" -o ten_file.jpg "<URL ảnh, thêm https: nếu URL bắt đầu bằng //>"
```
**Mẹo quan trọng:** nhiều CDN (Shopify) trả URL kiểu `srcset` (nhiều width nối bằng dấu phẩy) khi regex không đủ chặt — phải `grep -oE` với pattern dừng đúng ở `?v=[0-9]+`, không lấy cả chuỗi sau dấu phẩy.

### Bước 4 — Xem ảnh bằng tool `Read`
```
Read({file_path: "C:\Users\...\page.jpg"})
```
**Bắt buộc dùng đường dẫn Windows tuyệt đối** — `/tmp/...` (đường dẫn Git Bash) không hoạt động với `Read`, phải convert bằng `cygpath -w` hoặc biết trước `/tmp` map sang `C:\Users\<user>\AppData\Local\Temp\`.

---

## Vì sao cách này hoạt động mà Instagram/Facebook không

| Nguồn | Chặn bot? | Lý do |
|---|---|---|
| Instagram, Facebook | Có, hoàn toàn | Yêu cầu JS render + login wall, server trả về shell rỗng cho request không phải browser thật |
| Trang chủ brand (HTML tĩnh/Shopify/hstatic) | Thường không | Server-render HTML đầy đủ ngay từ request đầu, ảnh nằm trên CDN public (không cần auth) |
| CDN ảnh (`cdn.hstatic.net`, `*.myshopify.com/cdn/shop`, v.v.) | Không | CDN chỉ phục vụ file tĩnh, không có logic chặn bot như app chính |

**Kết luận thực dụng:** brand nào dùng nền tảng e-commerce phổ biến (Shopify, Haravan/hstatic — rất phổ biến ở VN) đều có thể áp dụng được. Brand chỉ tồn tại qua Instagram/Facebook thuần (không có website riêng) sẽ vẫn bị giới hạn — nhóm này mới cần đến Chrome MCP/browser thật.

---

## Kết quả đã verify (2026-06-22)

- **MateMade:** xem 3 ảnh thật — 1 ảnh hero campaign Tết (2 mẫu mặc áo dài lam, nền hồng pastel, bàn đỏ bánh kẹo, biểu cảm hài hước) + 2 ảnh sản phẩm catalog (nền kem trung tính, sạch). **Xác nhận đúng 2 tầng đã suy luận trước đó:** catalog sản phẩm neutral, nhưng content campaign/KOL ngọt hơn.
- **Stand Oil:** xem 6 ảnh lookbook thật — styling surreal/playful (bóng bay, bánh sinh nhật sparkler, đồ chơi lặt vặt), màu tie-dye sặc sỡ. **Bác bỏ claim "quiet luxury muted earth" của báo chí phương Tây** (vốn chỉ là suy luận từ text ở vòng research trước) — xác nhận đúng hướng playful của Giai đoạn 6.
- **Hapas:** xem 2 ảnh campaign Châu Bùi thật — street style đô thị, denim thô, túi mirror/chrome, đầu tư editorial rõ. **Củng cố thêm (không bác bỏ)** lớp cool/edgy đã nghi ngờ ở vòng trước — nay có bằng chứng ảnh thật, không chỉ suy luận.

→ Cả 3 case đã nâng độ tin cậy lên **Cao** (quan sát ảnh trực tiếp), thay vì Trung bình/Thấp (suy luận từ text) như vòng research ban đầu.

## Việc nên làm tiếp (nếu muốn mở rộng)
Áp dụng đúng quy trình 4 bước trên cho 17 brand còn "Thấp" trong `PHOTOGRAPHY_VIBE_DEEP_DIVE.md` mục 2 — ưu tiên brand có website riêng (Vascara, Juno, Yuumy, Lesac, Karatta, Ngaos, Floralpunk, Toutou, Oui, Spoiled, Mossdoom — đều có domain riêng theo `BRAND_SOURCES`). Brand Hàn/Nhật/Thái (OSOI, Vunque, minitmute, Samantha Vega, Aeta, Carlyn) cũng có website official, nên khả thi tương tự.

---

## CẬP NHẬT 2026-06-22 (cùng ngày) — vấn đề cỡ mẫu (N) và kỹ thuật mạnh hơn: đọc sitemap thay vì ảnh ngẫu nhiên

**Câu hỏi user đặt ra sau khi nhận báo cáo:** *"Mỗi brand fetch được bao nhiêu ảnh? Nếu không đủ nhiều thì không đủ khách quan."* — **Đúng, và đây là lỗi thật đã xảy ra.**

### Sự thật về N đã dùng (đếm lại chính xác)
Số ảnh thật đã `Read` (xem trực tiếp) mỗi brand trong vòng Photography Vibe, tính tới thời điểm bị hỏi:

| Brand | N ảnh | Brand | N ảnh | Brand | N ảnh |
|---|---:|---|---:|---|---:|
| matemade | 3 | lesac | 2 | minitmute | 2 |
| standoil | 6 | karatta | 3 | samanthavega | 3 |
| hapas | 4 (2 liên quan) | ngaos | 3 | aeta | 2 |
| vascara | 2 | floralpunk | 2 | carlyn | 3 |
| juno | 2 | toutou | 3 | | |
| yuumy | 1 | spoiled | 3 | | |
| oui | 2 | mossdoom | 3 | | |
| | | osoi | 3 | | |
| | | vunque | 2 | | |

**Trung bình ~2.6 ảnh/brand, lấy chủ yếu từ 1 trang (thường là homepage) tại 1 thời điểm.** Đây là cỡ mẫu quá nhỏ để gọi là "Cao" về độ tin cậy — tôi đã gắn nhãn quá tay trong báo cáo trước.

**Nghiêm trọng hơn:** tài liệu cuối còn viết sai "29/29 brand đã xem ảnh thật" — **thực tế chỉ 20/29 brand được fetch ảnh trong vòng visual**. 9 brand sau **chưa hề được xem ảnh thật**: Camelia, Vanwalk, Ther Gab, Chautfifth, Saigon Swagger, Marge Sherwood, LYN, Pipatchara, Jelly Bunny — kết luận về các brand này vẫn chỉ dựa trên research bằng text (5 agent ban đầu).

### Bằng chứng cụ thể N nhỏ gây sai: case Karatta
Round đầu chỉ xem 3 ảnh (homepage hero + 2 sản phẩm "Belt Bag") → kết luận vội "không còn lace/hoa nào" → coi là mâu thuẫn TOÀN BỘ với evidence cũ. Sau đó đọc **toàn bộ sitemap sản phẩm thật** (`sitemap_products_1.xml`, N=65 SKU — xem mục dưới) → phát hiện dòng FLOWER TAG + AIRBAG FLOWER **vẫn tồn tại**, chỉ là **thiểu số** (~9-15% catalog) trong khi phần lớn catalog là túi tối giản. Kết luận đúng nằm **giữa** 2 cực đoan mà cả round N=3 và evidence cũ N=? (lookbook, không rõ cỡ mẫu) đều đưa ra. **N nhỏ có thể sai theo CẢ HAI hướng, không chỉ thiếu sót 1 chiều.**

### Kỹ thuật mạnh hơn: đọc sitemap XML thay vì chọn ảnh ngẫu nhiên
Hầu hết website Shopify/Haravan có `sitemap.xml` (chỉ mục) → `sitemap_products_1.xml` (toàn bộ sản phẩm, kèm `<image:title>` = tên SKU, `<image:loc>` = URL ảnh, `<lastmod>` = ngày cập nhật). Đây là **cỡ mẫu N = toàn bộ catalog thật đang bán**, không phải N nhỏ chọn tay.

```bash
curl -s -A "Mozilla/5.0" "https://<domain>/sitemap.xml" -o sitemap_index.xml   # tìm link sitemap_products_*.xml
curl -s -A "Mozilla/5.0" "https://<domain>/sitemap_products_1.xml" -o products.xml
grep -oE '<image:title>[^<]*' products.xml   # toàn bộ tên SKU — đếm tỷ trọng theo từ khóa (màu, motif, decoration...)
```

**Quy trình đề xuất cho mỗi brand (thay thế cách chọn 2-3 ảnh ngẫu nhiên):**
1. Đọc toàn bộ tên SKU qua sitemap → đếm tỷ trọng định lượng (vd: bao nhiêu % tên SKU có từ khóa "flower/lace/hoa" vs màu trung tính).
2. Chỉ download/xem ảnh thật (`Read`) cho 1 SKU đại diện mỗi nhóm tỷ trọng lớn — để xác nhận tên SKU khớp với ảnh thật (tên có thể đánh lừa, như đã thấy ở Floralpunk).
3. Brand không có sitemap (Instagram/Facebook-only) thì quay lại cách chọn ảnh thủ công, nhưng phải lấy từ ≥3 trang khác nhau (homepage + 1 category + 1 bestseller) để giảm rủi ro N nhỏ từ 1 nguồn duy nhất.

### Việc cần làm để báo cáo thực sự khách quan
- [ ] Áp dụng kỹ thuật sitemap cho 19 brand còn lại đã xem ảnh (hiện N=2-6, cần nâng lên N=toàn catalog) — ưu tiên các brand có tension/kết luận mạnh (Spoiled, Floralpunk).
- [ ] Fetch ảnh thật cho 9 brand đang ở N=0 (Camelia, Vanwalk, Ther Gab, Chautfifth, Saigon Swagger, Marge Sherwood, LYN, Pipatchara, Jelly Bunny).
- [ ] Hạ mọi nhãn "Cao" đã gắn cho 19 brand N=2-6 xuống "Trung bình" cho tới khi có sitemap/N lớn hơn xác nhận.

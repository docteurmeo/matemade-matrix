# Yêu cầu cho ChatGPT — Tái dựng & chuyên môn hóa logic Orbit của ma trận định vị MateMade

> Bối cảnh: Trước đây tôi và bạn (ChatGPT) đã cùng xây một bản đồ định vị (territory map) cho thương hiệu túi xách MateMade. Kết quả được tổng hợp thành 1 file markdown, nhưng khi đưa cho một AI khác triển khai, **cách gọi tên các "orbit" bị đánh giá là mơ hồ, thiếu chuyên môn** (ví dụ: "gần trung tâm", "lệch rõ", "có tính cách rõ", "xa/khác hệ" — không nói được đó là *phong cách thời trang gì*).
>
> Tôi cần bạn **tái dựng lại tư duy gốc một cách chi tiết và chuyên môn hơn**, vì có thể bản markdown đã rút gọn quá nhiều so với quá trình trao đổi thật. Output của bạn sẽ được **đặt cạnh một đề xuất độc lập khác để tôi so sánh và chọn**.

---

## 1. Hệ trục & dữ liệu hiện có (giữ nguyên để output so sánh được)

- **Trục x:** `-1.45` Cute/Sweet/Playful → `+1.45` Cool/Minimal/Polished
- **Trục y:** `-1.45` Daily/Utility/Value → `+1.45` Statement/Design/Craft
- **Tâm (0,0):** "Mass Feminine Việt Nam" (gu phổ thông nữ Việt).
- **Orbit hiện tại:** `√(x²+y²)`, chia 5 vòng (0→4) đang gọi tên là: Core Mass Feminine / Gần trung tâm / Lệch rõ — vẫn đại trà / Có tính cách rõ / Xa — khác hệ.

21 brand đang dùng (tọa độ x, y, orbit hiện tại):

| id | name | x | y | orbit |
|---|---|--:|--:|:-:|
| matemade | MateMade | -0.75 | -0.05 | 2 |
| vascara | Vascara | 0.30 | -0.10 | 0 |
| juno | Juno | 0.10 | -0.15 | 0 |
| hapas | Hapas | 0.20 | 0.00 | 0 |
| yuumy | Yuumy | 0.00 | -0.55 | 1 |
| camelia | Camelia | 0.25 | -0.75 | 1 |
| lesac | Lesac | 0.40 | -0.20 | 1 |
| toutou | Toutou bag | -1.15 | -0.05 | 3 |
| vanwalk | Vanwalk | -0.95 | -0.35 | 2 |
| oui | Oui The Brand | -0.85 | -0.25 | 2 |
| samantha_vega | Samantha Vega | -0.80 | 0.25 | 2 |
| carlyn | Carlyn | -0.45 | -0.10 | 1 |
| karatta | Karatta | -0.55 | 0.65 | 2 |
| ngaos | Ngaos | -0.35 | 0.85 | 3 |
| thergab | Ther Gab / R.Gab | -0.05 | 0.95 | 3 |
| floralpunk | Floralpunk | 0.25 | 0.80 | 3 |
| chautfifth | Chautfifth | 0.45 | 1.05 | 3 |
| standoil | Stand Oil | 1.00 | 0.35 | 3 |
| mossdoom | Mossdoom | 0.75 | -0.35 | 2 |
| spoiled | Spoiled | 0.75 | -0.75 | 3 |
| saigonswagger | Saigon Swagger | 0.65 | -1.10 | 4 |

---

## 2. Câu hỏi cốt lõi bạn PHẢI trả lời

1. **Bán kính (orbit) thật ra đang đo đại lượng gì?** Hãy gọi tên rõ cái "dimension" mà khoảng cách-tới-tâm mã hóa. (Gợi ý phản biện: nếu bán kính đo *mức độ lệch khỏi gu phổ thông*, thì nó là *cường độ*, không phải *phong cách* — vậy có nên đặt tên phong cách cho nó không, hay nên tách hướng (góc) ra để gọi tên phong cách?)
2. **Có nên tách "mức độ" và "phong cách" thành 2 hệ định danh riêng không?** Nếu có, hãy đặt tên chuyên môn cho:
   - Thang **mức độ** theo bán kính (dùng ngôn ngữ chiến lược thương hiệu thật: mass / masstige / premium / niche / signature / designer… tùy bạn lập luận).
   - Các **lãnh thổ phong cách** theo hướng/góc (đặt tên phong cách thời trang thật: kawaii, coquette, Seoul minimal, quiet luxury, gorpcore/utility, editorial… tùy bạn).
3. **Nếu KHÔNG tách**, hãy bảo vệ một cách gọi tên orbit khác đủ chuyên môn để mỗi vòng tự nói được nó là gì.

---

## 3. ĐỊNH DẠNG OUTPUT (bắt buộc — để tôi so sánh 2 bản)

Trả lời theo đúng 4 phần sau:

### Phần A — Chẩn đoán
Bán kính đang đo gì; orbit hiện tại sai/thiếu ở đâu; có tách 2 hệ định danh không và vì sao.

### Phần B — Thang "mức độ" (đổi tên 5 orbit)
Bảng 5 bậc, mỗi bậc gồm: **Tên (EN) | Tên (VN) | Định nghĩa | Tiêu chí phân biệt đo được (khách cần gì / ý đồ sản phẩm / độ thay thế / liên hệ giá)**.

### Phần C — "Lãnh thổ phong cách" (nếu có)
Bảng các lãnh thổ theo hướng, mỗi lãnh thổ gồm: **Hướng | Tên VN | Tên EN | Mã sản phẩm đặc trưng | Brand mẫu trong 21**.

### Phần D — Gán nhãn 21 brand
Bảng: mỗi brand → **(Tier mới, Territory mới)** + ghi chú nếu brand nằm ranh giới.

### Phần E — JSON để nạp lại app
```json
[
  { "id": "matemade", "tier": 2, "tier_name_en": "...", "tier_name_vn": "...",
    "territory_en": "...", "territory_vn": "...", "note": "..." }
]
```

### Phần F — Áp dụng cho MateMade Proximity Map
Map thứ 2 lấy MateMade làm tâm. Hãy đặt tên 5 vòng theo **quan hệ chiến lược với MateMade** (đối thủ trực tiếp / kề cận / tham chiếu / khác hệ…) và đặt tên cho **các hướng = nước đi tiến hóa** của MateMade (đi về phía nào nghĩa là gì, cơ hội/rủi ro).

---

## 4. Ràng buộc

- Dùng **thuật ngữ ngành thời trang/định vị thương hiệu có thật**, không bịa khái niệm mơ hồ.
- Mỗi tên phải **phân biệt được với tên kế bên** bằng tiêu chí cụ thể (không chồng lấn).
- Giữ nguyên `id` và hệ trục để so sánh.
- Nêu rõ chỗ nào bạn **không chắc** và cần thêm dữ liệu sản phẩm thật.
- Ưu tiên **chiều sâu lập luận**: giải thích *vì sao* đặt tên vậy, đừng chỉ liệt kê.

---

## 5. (Quan trọng) Nếu trong hội thoại gốc bạn từng có cách phân loại chi tiết hơn bản markdown

Hãy **tái hiện lại đầy đủ** logic đó — kể cả các tầng phân loại, keyword galaxy, vòng gần-xa, product code mà bản tổng hợp có thể đã lược bớt. Tôi muốn so sánh phiên bản chi tiết nhất của bạn với một đề xuất độc lập.

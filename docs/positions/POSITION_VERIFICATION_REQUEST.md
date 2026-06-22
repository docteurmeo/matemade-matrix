# Request cho ChatGPT — Nghiên cứu sản phẩm & định vị để KIỂM CHỨNG vị trí 21 brand trên ma trận MateMade

> Mục tiêu: dựa trên **nghiên cứu sản phẩm thật + định vị thật** (website, sàn TMĐT, social, giá, dòng sản phẩm), **xác minh và hiệu chỉnh** vị trí của 21 brand trên ma trận định vị túi xách. Output sẽ được đặt cạnh một bản độc lập khác để so sánh, rồi nạp lại vào app.
>
> Đây là vòng kiểm chứng cho **logic v2.0** (Tier × Territory × Modifier). Bản này thay thế request cũ chỉ kiểm x/y.

---

## 1. Hệ trục & quy ước (PHẢI giữ nguyên để output so sánh được)

- **Trục x:** `-1.45` Cute/Sweet/Playful → `+1.45` Cool/Minimal/Polished
- **Trục y:** `-1.45` Daily/Utility/Value → `+1.45` Statement/Design/Craft
- **Tâm (0,0):** "Mass Feminine Việt Nam" (gu phổ thông nữ Việt: dễ dùng, dễ đẹp, nữ tính vừa phải, giá vừa tầm, ít tuyên ngôn).
- Tọa độ là **tương đối** — quan trọng là thứ tự & khoảng cách giữa các brand hợp lý, không cần con số tuyệt đối.

### Mô hình định danh 3 lớp (cần xác minh từng lớp)
- **Tier** (suy ra từ bán kính = cường độ lệch khỏi gu phổ thông; KHÔNG phải giá):
  `0 Neutral Mass · 1 Elevated Mass · 2 Coded-Accessible · 3 Aesthetic-Led · 4 Niche Specialist`
- **Territory** (suy ra từ góc = loại phong cách), 8 sector:
  `W Sweet/Playful/Kawaii · SW Soft Casual Cute · S Functional/Value · SE Sport/Street · E Seoul Cool/Minimal · NE Editorial Cool · N Design/Craft Heritage · NW Romantic/Coquette` (gần tâm thì territory mờ → ghi `territory_strength`: faint/medium/strong).
- **Modifier**: nhãn tinh phân biệt brand cùng territory; mang cả *lý do* brand ở vị trí đó.
- **Flags**: `category_adjacent` (đã rời handbag-feminine sang street/balo/unisex), `signature_type` (authentic | trend-extreme), `confidence` (high/medium/low).

---

## 2. Dữ liệu HIỆN TẠI cần kiểm chứng (đừng mặc định là đúng)

| id | name | origin | x | y | tier hiện tại | territory hiện tại | modifier hiện tại |
|---|---|---|--:|--:|:-:|---|---|
| matemade | MateMade | VN | -0.75 | -0.05 | 2 | Sweet/Playful/Kawaii (W) | Charmable Self-expression |
| vascara | Vascara | VN | 0.30 | -0.10 | 0 | Mass Polished Feminine (core) | Soft professional mass |
| juno | Juno | VN | 0.10 | -0.15 | 0 | Mass Polished Feminine (core) | Safe mass feminine |
| hapas | Hapas | VN | 0.20 | 0.00 | 0 | Mass Polished Feminine (core) | Mass aspiration |
| yuumy | Yuumy | VN | 0.00 | -0.55 | 1 | Functional/Value (S) | Affordable synthetic utility |
| camelia | Camelia | VN | 0.25 | -0.75 | 1 | Functional/Value (S) | Minimal canvas utility |
| lesac | Lesac | VN | 0.40 | -0.20 | 1 | Seoul Cool/Minimal (E) | Young minimal daily |
| toutou | Toutou bag | VN/Shopee | -1.15 | -0.05 | 3 | Sweet/Playful/Kawaii (W) | Trend-extreme / IP-borrowed |
| vanwalk | Vanwalk | VN | -0.95 | -0.35 | 2 | Soft Casual Cute (SW) | Campus cute utility |
| oui | Oui The Brand | VN | -0.85 | -0.25 | 2 | Soft Casual Cute (SW) | Japanese-lite daily charm |
| samantha_vega | Samantha Vega | JP | -0.80 | 0.25 | 2 | Romantic/Coquette (NW) | Kawaii-chic / Cute Mode |
| carlyn | Carlyn | KR | -0.45 | -0.10 | 2 | Soft Casual Cute (SW) | Soft puffer daily |
| karatta | Karatta | VN | -0.55 | 0.65 | 2 | Design/Craft (N) | Playful visual design |
| ngaos | Ngaos | VN | -0.35 | 0.85 | 3 | Romantic/Coquette (NW) | Embroidered romantic craft |
| thergab | Ther Gab / R.Gab | VN | -0.05 | 0.95 | 3 | Design/Craft (N) | VN heritage self-expression |
| floralpunk | Floralpunk | VN | 0.25 | 0.80 | 3 | Editorial Cool (NE) | Urban feminine polish |
| chautfifth | Chautfifth | VN | 0.45 | 1.05 | 3 | Editorial Cool (NE) | Restrained statement |
| standoil | Stand Oil | KR | 1.00 | 0.35 | 3 | Seoul Cool/Minimal (E) | Restraint-led daily |
| mossdoom | Mossdoom | KR? | 0.75 | -0.35 | 2 | Seoul Cool/Minimal (E) | Affordable Korean minimal |
| spoiled | Spoiled | VN | 0.75 | -0.75 | 3 | Sport/Street (SE) | Street sporty accessory |
| saigonswagger | Saigon Swagger | VN | 0.65 | -1.10 | 4 | Sport/Street (SE) | Category-adjacent carry system |

---

## 3. Việc cần làm cho TỪNG brand

1. **Nghiên cứu thật:** website/Instagram/TikTok/Shopee, dải giá (VND), dòng sản phẩm chủ lực, shape/chất liệu đặc trưng, kiểu styling/campaign, tệp khách hàng & độ tuổi, xuất xứ.
2. **Xác minh x:** brand thiên Cute/Sweet/Playful hay Cool/Minimal/Polished? → giá trị [-1.45, +1.45].
3. **Xác minh y:** thiên Daily/Utility/Value hay Statement/Design/Craft? → [-1.45, +1.45].
4. **Suy ra lại Tier & Territory** từ tọa độ mới; gán **Modifier** + **flags**.
5. **So với bảng hiện tại:** nêu rõ brand nào nên **dịch chuyển** và **bao nhiêu**, vì sao.
6. **Confidence + nguồn** cho mỗi brand. Thiếu dữ liệu → ghi `low`, đừng đoán bừa.

### Các điểm NGHI VẤN cần soi kỹ (ưu tiên)
- **Vanwalk:** tọa độ x (-0.95) có quá xa không? Brand này vẫn rất đại trà/accessible hay đã thành signature? → quyết định tier 2 hay 3.
- **Toutou:** là *brand* có bản sắc riêng hay chỉ là *keyword/shop trend* trên Shopee bán đồ mượn IP (Hello Kitty/Kuromi)? Ảnh hưởng signature_type.
- **Carlyn:** tier 1 hay 2 (tùy tỉ trọng dòng puffer iconic).
- **Karatta:** "Design Object" thật hay chỉ playful accessible?
- **Floralpunk:** Editorial Cool hay Urban Feminine Polish?
- **Mossdoom & Spoiled:** xuất xứ và mức độ category-adjacent (street vs túi nữ daily).
- **Hapas vs Vascara vs Juno:** có thật sự đều ở core, hay 1 trong 3 đã lệch?

---

## 4. ĐỊNH DẠNG OUTPUT (bắt buộc)

### Phần A — JSON (giữ nguyên `id`)
```json
[
  {
    "id": "matemade",
    "x": -0.75, "y": -0.05,
    "tier": 2,
    "territory_key": "W",
    "territory_en": "Sweet / Playful / Kawaii",
    "territory_strength": "strong",
    "modifier": "Charmable Self-expression",
    "category_adjacent": false,
    "signature_type": "authentic",
    "confidence": "high",
    "sources": ["https://...", "..."],
    "rationale": "Vì sao đặt tọa độ/tier/territory này; khác gì giá trị hiện tại."
  }
]
```

### Phần B — Changelog dịch chuyển
Bảng: brand | (x,y) cũ → mới | tier cũ → mới | territory cũ → mới | lý do. Sắp theo brand dịch chuyển NHIỀU nhất.

### Phần C — Cảnh báo
Brand nào dữ liệu yếu / dễ tranh cãi / cần thêm nghiên cứu.

---

## 5. Ràng buộc
- Dùng dữ liệu sản phẩm **thật, có nguồn**. Phân biệt rõ *điều tra được* vs *suy đoán*.
- Tọa độ tương đối nhất quán (Toutou phải ngọt hơn MateMade; Stand Oil phải cool hơn Carlyn; v.v.).
- Giữ `id` và hệ trục. Lưu file kết quả tên `positions-verified-chatgpt.json` + phần B/C kèm theo.

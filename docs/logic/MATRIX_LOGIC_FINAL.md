# Logic Orbit — Bản chuẩn cuối v2.0

> Tổng hợp 3 nguồn: Claude (`MATRIX_LOGIC_PROPOSAL.md`), ChatGPT (`matemade_orbit_logic_specialized.md`) và bản so sánh-tổng hợp của ChatGPT (`matemade_matrix_logic_comparison_synthesis.md`). v2.0 thay thế v1.0. Đây là logic chốt để nạp vào app.

---

## 0. Vì sao v2.0 (thay đổi gì so với v1.0)

Bản so sánh của ChatGPT cải tiến v1.0 ở 3 điểm — đã tiếp thu:
1. **Thêm lớp Modifier** → mô hình 3 lớp `Tier × Territory × Modifier`, thay cho hệ "flags" rời của v1.0. Giải quyết được "territory quá rộng không phân biệt nổi brand cùng hướng".
2. **8 sector (hình học) + Modifier (chính xác)** thay 12 territory trực tiếp → dễ visualize hơn mà không mất độ tinh.
3. **Tier 4 trung lập**: bỏ "Signature Niche" (thiên vị tích cực) và cũng không dùng "Category-Adjacent" (trộn trục) → đặt tên trung lập, lý do-xa đẩy vào Modifier.

v2.0 giữ lại 2 thứ chỉ có ở bản Claude: trường **`territory_strength`** (territory mờ dần về tâm) và cờ **`coord_check`** (bất đồng tier hé lộ tọa độ có thể sai → đưa sang research vị trí).

**Đồng thuận nền (cả 3 nguồn):** *Bán kính đo cường độ lệch khỏi gu phổ thông, KHÔNG đo phong cách. Phong cách đọc bằng góc.*

---

## 1. Nguyên lý đọc — 3 lớp

```text
Brand = Tier (cường độ, bán kính) × Territory (hướng phong cách, góc) × Modifier (sắc thái chiến lược)
```

- **Tier** = mức mã hóa thẩm mỹ / độ kén khách. KHÔNG phải giá, KHÔNG phải phong cách.
- **Territory** = 1 trong 8 sector phong cách (theo góc). Độ rõ tăng theo bán kính (`territory_strength`).
- **Modifier** = nhãn tinh phân biệt các brand cùng territory, và mang *lý do brand ở vị trí đó* (vd "trend-extreme", "category-adjacent", "charmable self-expression").

Ví dụ:
```text
MateMade  = Tier 2 Coded-Accessible × Sweet/Playful/Kawaii × "Charmable Self-expression"
Toutou    = Tier 3 Aesthetic-Led    × Sweet/Playful/Kawaii × "Trend-extreme / IP-borrowed"
Stand Oil = Tier 3 Aesthetic-Led    × Seoul Cool Minimal   × "Restraint-led daily"
Saigon Swagger = Tier 4 Niche Specialist × Sport/Street × "Category-adjacent carry system"
Vascara   = Tier 0 Neutral Mass × Mass Polished Feminine (faint) × "Soft professional mass"
```

---

## 2. TIER (5 bậc, thuần cường độ) — Tier ≠ giá

| Tier | Tên EN | Tên VN | Định nghĩa | Tiêu chí đo được |
|:-:|---|---|---|---|
| 0 | **Neutral Mass** | Phổ thông trung lập | Gu nữ tính phổ thông, ít tuyên ngôn, không đòi khách có gu | Dễ phối/mua/thay; giá-value quan trọng |
| 1 | **Elevated Mass** | Đại chúng có hướng | Vẫn mass nhưng lệch nhẹ: trẻ/tiện/minimal/Korean/soft hơn | Có "flavor" nhẹ, chưa tạo cộng đồng thẩm mỹ |
| 2 | **Coded-Accessible** | Có mã thẩm mỹ, vẫn đại chúng | Có product code nhận diện được, mua vì mood/identity, vẫn accessible | **Vùng MateMade**: volume + bắt đầu có bản sắc |
| 3 | **Aesthetic-Led** | Dẫn dắt bằng thẩm mỹ | Chọn vì gu/aesthetic/philosophy/signature rõ | Khó thay thế; cần khách có gu nền |
| 4 | **Niche Specialist** | Chuyên biệt – tệp hẹp | Cường độ định vị cực cao / đã rời handbag-feminine core. **Trung lập — xa ≠ tốt hơn** | Không cạnh tranh trực tiếp túi nữ đại trà |

> **Tier 4 trung lập:** "xa tâm" có thể vì (a) cult/designer thật, (b) khác category (street/carry-system), hoặc (c) trend-extreme rỗng lõi. *Lý do nào* → ghi ở **Modifier**, không nhét vào tên tier. Legend app phải ghi rõ: *"Distance = taste specificity, NOT price/quality."*

---

## 3. TERRITORY (8 sector) + Modifier gợi ý

> Độ rõ territory: Tier 0–1 = faint (chỉ là tín hiệu nhẹ); Tier 2+ = medium→strong.

| Hướng | Territory EN | Territory VN | Product code | Modifier thường gặp |
|:-:|---|---|---|---|
| W | **Sweet / Playful / Kawaii** | Ngọt – vui – kawaii | pastel, charm, bow, heart, glossy PU, shape mềm | Candy Playful, Charmable Self-expression, Trend-extreme |
| SW | **Soft Casual Cute / Daily Charm** | Cute đời thường mềm | puffer, quilting, nylon, tote/balo cute, milk tone | Campus Cute, Soft Puffer Daily, Japanese-lite Daily |
| S | **Functional / Value Utility** | Công năng – giá trị | canvas, nhiều ngăn, bền, giá mềm, daily | Value-led Daily, Minimal Canvas Utility |
| SE | **Sport / Tech-Utility / Street** | Thể thao – street – tiện ích | sling, bumbag, backpack, PU/PVC, hardware, unisex | Street Utility, Sporty Accessory, Carry System |
| E | **Seoul Cool / Polished Minimal** | Cool Hàn – tối giản chỉn chu | neutral, clean shape, logo nhỏ, leather-like | Seoul Minimal, Urban Daily Minimal |
| NE | **Editorial Cool / Architectural Minimal** | Cool biên tập – tối giản kiến trúc | shape lạ tiết chế, muted, design-led | Restrained Statement, Urban Feminine Polish |
| N | **Design Statement / Craft Heritage** | Tuyên ngôn thiết kế – thủ công/heritage | sculptural, woven, handmade, cultural story | Design Object, Craft Heritage, Visual Statement |
| NW | **Romantic / Coquette / Girlish Craft** | Lãng mạn – coquette – thủ công ngọt | thêu, hoa, ribbon, pearl, bead, nostalgia | Romantic Craft, Kawaii-chic / Cute Mode |

---

## 4. GÁN NHÃN 21 BRAND (chốt v2.0)

| Brand | Tier | Territory (sector) | Modifier | strength | flags |
|---|:-:|---|---|:-:|---|
| Vascara | 0 Neutral Mass | Mass Polished Feminine | Soft professional mass | faint | |
| Juno | 0 Neutral Mass | Mass Polished Feminine | Safe mass feminine | faint | |
| Hapas | 0 Neutral Mass | Mass Polished Feminine | Mass aspiration | faint | |
| Yuumy | 1 Elevated Mass | Functional / Value | Affordable synthetic utility | faint | |
| Camelia | 1 Elevated Mass | Functional / Value | Minimal canvas utility | faint | |
| Lesac | 1 Elevated Mass | Seoul Cool / Polished Minimal | Young minimal daily | faint | |
| Carlyn | 2 Coded-Accessible | Soft Casual Cute | Soft puffer daily | medium | tier 1–2 |
| **MateMade** | **2 Coded-Accessible** | **Sweet / Playful / Kawaii** | **Charmable Self-expression** | strong | |
| Vanwalk | 2 Coded-Accessible | Soft Casual Cute | Campus cute utility | medium | `coord_check` |
| Oui | 2 Coded-Accessible | Soft Casual Cute | Japanese-lite daily charm | medium | |
| Samantha Vega | 2 Coded-Accessible | Romantic / Girlish Craft | Kawaii-chic / Cute Mode | medium | |
| Karatta | 2 Coded-Accessible | Design Statement / Craft | Playful visual design | medium | |
| Mossdoom | 2 Coded-Accessible | Seoul Cool / Polished Minimal | Affordable Korean minimal | medium | |
| Toutou | 3 Aesthetic-Led | Sweet / Playful / Kawaii | **Trend-extreme / IP-borrowed** | strong | `signature: trend-extreme`; cần data bán |
| Ngaos | 3 Aesthetic-Led | Romantic / Girlish Craft | Embroidered romantic craft | strong | |
| Ther Gab | 3 Aesthetic-Led | Design Statement / Craft Heritage | VN heritage self-expression | strong | |
| Floralpunk | 3 Aesthetic-Led | Editorial Cool / Architectural | Urban feminine polish | strong | |
| Chautfifth | 3 Aesthetic-Led | Editorial Cool / Architectural | Restrained statement | strong | |
| Stand Oil | 3 Aesthetic-Led | Seoul Cool / Polished Minimal | Restraint-led daily | strong | |
| Spoiled | 3 Aesthetic-Led | Sport / Tech-Utility / Street | Street sporty accessory | strong | `category_adjacent` |
| Saigon Swagger | 4 Niche Specialist | Sport / Tech-Utility / Street | Category-adjacent carry system | strong | `category_adjacent` |

---

## 5. MateMade Proximity Map (tâm = MateMade)

### 5.1. Vòng = Strategic Adjacency
| Vòng | EN | VN | Brand ví dụ |
|:-:|---|---|---|
| 0 | Current Core | Lõi hiện tại | MateMade |
| 1 | Direct Substitute Set | Đối thủ thay thế trực tiếp | Toutou, Vanwalk, Oui, Carlyn (phần puffer) |
| 2 | Credible Adjacency | Kề cận có thể tiến tới | Samantha Vega, Carlyn, Karatta, Lesac |
| 3 | Aspirational Reference Set | Tham chiếu nâng cấp | Stand Oil, Chautfifth, Floralpunk, Ngaos, Ther Gab, Mossdoom |
| 4 | Different System / Selective Learning | Khác hệ / học chọn lọc | Saigon Swagger, Spoiled, Camelia, Yuumy, (Vascara/Juno/Hapas) |

### 5.2. 8 vector tiến hóa
| Hướng | Nước đi | Cơ hội | Rủi ro | Benchmark |
|---|---|---|---|---|
| W | Deeper Candy | Viral, social, hợp Gen Z | Trend shop, rỗng lõi (vùng Toutou) | Toutou, Vanwalk, Oui |
| E | Toward Restraint | Nâng perception, trưởng thành | Mất khách thật, va Stand Oil | Stand Oil, Mossdoom, Carlyn |
| N | Toward Signature | Brand memory, premium | Khó SX, dễ niche | Karatta, Ngaos, Ther Gab, Chautfifth |
| S | Toward Function | Volume, repeat | Mất mood, thành mass utility | Camelia, Yuumy, Saigon Swagger |
| NW | Romantic Candy Craft | Nữ tính có chiều sâu, khác Shopee | Dễ sến, cần tiết chế | Ngaos, Samantha Vega |
| SW | Cute Daily Utility | Gần khách hiện tại, thương mại cao | Cạnh tranh trực diện Vanwalk/Oui | Vanwalk, Oui, Carlyn |
| NE | Restrained Signature | Nâng brand, tạo icon | Xa khách nhất, mất volume | Chautfifth, Stand Oil |
| SE | Urban Functional Minimal | Mở line đi làm trẻ | Trôi vào Lesac/Camelia/Mossdoom | Lesac, Mossdoom, Camelia |

### 5.3. Kết luận (cả 3 nguồn trùng — chốt)
> **Đừng đổi hướng — hãy đào sâu bậc.** `Generic Sweet → Coded Sweet → Modular Candy Utility`. Biến charm-heavy thành *hệ sản phẩm có logic* (charm/strap/pouch/seasonal kit/colorway architecture). Đủ ngọt để gần khách thật, đủ hệ thống để không rơi xuống trend shop.

---

## 6. Triển khai app

1. Rings = **Tier** (5 vòng). Outline/size node = Tier.
2. 8 nan quạt + nhãn rìa = **Territory**. Node color = Territory.
3. Toggle màu: *by Territory* / *by Tier* / *highlight competitors* / *highlight aspirational refs*.
4. Tooltip = **Modifier + note**; nhãn territory đậm/nhạt theo `territory_strength`.
5. Legend cảnh báo: *"Distance = taste specificity, not price/quality"*; Toutou = trend-extreme.
6. Brand có `coord_check` → đánh dấu để vòng research vị trí kiểm chứng tọa độ.

---

## 7. JSON schema v2.0

```json
[
  {
    "id": "matemade",
    "x": -0.75, "y": -0.05,
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Sweet / Playful / Kawaii",
    "territory_vn": "Ngọt – vui – kawaii",
    "territory_strength": "strong",
    "modifier_en": "Charmable Self-expression",
    "modifier_vn": "Kẹo ngọt cá nhân hóa qua charm/phụ kiện",
    "category_adjacent": false,
    "signature_type": "authentic",
    "coord_check": false,
    "note": "Vùng chiến lược chính: đào sâu tier trong territory Sweet (Modular Candy Utility)."
  }
]
```
> `territory_strength`: faint | medium | strong. `signature_type`: authentic | trend-extreme. `coord_check`: true nếu tọa độ cần research lại (vd Vanwalk).

---

## 8. Cần research kiểm chứng (nối sang BRAND_POSITION_RESEARCH_REQUEST)

| Brand | Chưa chắc | Cần data |
|---|---|---|
| Carlyn | Tier 1 hay 2 | Tỉ trọng dòng puffer/icon; perception khách Việt |
| Toutou | Brand hay keyword-item | Cấu trúc shop, brand equity riêng |
| **Vanwalk** | **Tier 2 hay 3 — nghi tọa độ x quá xa** | Nhận diện riêng ngoài campus cute → **research lại (x,y)** |
| Karatta | Design statement hay playful accessible | Portfolio, giá, signature system |
| Floralpunk | Editorial cool hay urban feminine polish | Dòng chủ lực, collection gần đây |
| Spoiled | Aesthetic-led hay category-adjacent | Tỉ trọng street vs túi nữ daily |

---

## 9. Tóm tắt 1 dòng
> **Tier (mức mã hóa thẩm mỹ) × Territory (8 hướng phong cách) × Modifier (sắc thái).** MateMade = *Coded-Accessible × Sweet/Playful × Charmable Self-expression*; hướng đi = **Modular Candy Utility** ("đừng đổi hướng, đào sâu bậc").

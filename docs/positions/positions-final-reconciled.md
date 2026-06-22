# Hòa giải 2 bản kiểm chứng vị trí — Bản cuối để nạp app

> So khớp `positions-verified-claude` vs `positions-verified-chatgpt`. 17/21 brand hội tụ (chênh < 0.15 → chốt trung bình). 4 brand có bất đồng thật → phân xử dưới đây.

---

## 1. Bốn điểm bất đồng & phán xử

### 1.1. Karatta — bất đồng LỚN NHẤT (Δx ≈ 0.60)
- **Claude:** x −0.55 (playful/cute design, giữ gần vị trí cũ).
- **ChatGPT:** x +0.05 (nguồn Mosia mô tả "tối giản, đa năng, chất lượng" → kéo về trung tính).
- **Phán xử:** ChatGPT có lý — sản phẩm thật (Loli/Belt Tote: PU mịn, minimalist, belt detail) thiên **design tối giản**, tên thì playful nhưng *form* không kẹo. Nhưng kéo tới +0.05 (sang nửa cool) là **quá tay** — Karatta vẫn là túi thiết kế Việt có chất playful-visual, không phải cool-minimal. → **Chốt x = −0.25**, y 0.62, tier 2, Territory N (Design Object). *Trung dung, nghiêng về ChatGPT.*

### 1.2. Carlyn — bất đồng TIER (1 vs 2)
- **Claude:** tier 2 (signature puffer mạnh, celeb Hàn, sell-out = codified aesthetic).
- **ChatGPT:** tier 1 (official Fabric Line vẫn daily/accessible), nhưng tự ghi "nếu xét puffer icon thì tier 2".
- **Phán xử:** Theo đúng định nghĩa tier 2 = "có **mã nhận diện** được, vẫn accessible" — Carlyn nổi tiếng **chính nhờ** signature puffer (đó là codified aesthetic). Nhận diện của brand đến từ một mã thiết kế rõ → **đúng tier 2**, không phải tier 1. → **Chốt tier 2**, x −0.42, y −0.05. *Giữ Claude, ghi nhận ranh 1–2.*

### 1.3. Floralpunk — bất đồng HƯỚNG y (statement cao hay thấp)
- **Claude:** y 0.55 (phụ kiện trendy accessible, không phải craft-statement).
- **ChatGPT:** y 0.82 (bằng chứng mới: Ivy Chain/suede/belt bag "minimal, refined, subtly statement-making").
- **Phán xử:** ChatGPT fetch được bằng chứng sản phẩm **gần đây** cho thấy Floralpunk đã lên design hơn tôi tưởng (không chỉ canvas tote trendy). Nhưng "subtly statement" ≠ craft-heavy như Chautfifth/Ngaos. → **Chốt y = 0.68** (trung dung, nghiêng ChatGPT), x 0.30, tier 3, NE. *Lùi một phần về phía ChatGPT.*

### 1.4. Spoiled — bất đồng cờ `category_adjacent`
- **Claude:** true (sporty/street, thiên utility).
- **ChatGPT:** false ("vẫn là fashion accessory bag — League tote/bowling/charm, không phải carry-system như Saigon Swagger").
- **Phán xử:** ChatGPT phân biệt sắc hơn: `category_adjacent` chỉ nên bật khi brand **rời sang carry-system** (balo/laptop/utility) như Saigon Swagger. Spoiled vẫn là **accessory bag thời trang** dù sporty. → **Chốt category_adjacent = FALSE.** *Theo ChatGPT.*

---

## 2. Brand hội tụ (chốt trung bình 2 bản)
MateMade, Vascara, Juno, Hapas, Yuumy, Camelia, Lesac, Toutou, Vanwalk, Oui, Samantha Vega, Ngaos, Ther Gab, Chautfifth, Stand Oil, Mossdoom, Saigon Swagger — cả hai gần như trùng, lấy trung bình.

**Ghi chú giữ cờ:** Toutou `signature_type: trend-extreme`, confidence **low** (cả 2 đồng ý đây là cụm keyword/IP-borrowed, không phải brand benchmark). Saigon Swagger `category_adjacent: true`.

---

## 3. JSON CUỐI (positions-final.json)

```json
[
  {"id":"matemade","x":-0.78,"y":-0.06,"tier":2,"territory_key":"W","modifier":"Charmable self-expression / modular candy cue","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"vascara","x":0.29,"y":-0.09,"tier":0,"territory_key":"CORE","modifier":"Soft professional mass","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"juno","x":0.11,"y":-0.16,"tier":0,"territory_key":"CORE","modifier":"Safe mass feminine","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"hapas","x":0.23,"y":0.01,"tier":0,"territory_key":"CORE","modifier":"Mass aspiration / giftable polished","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"yuumy","x":0.01,"y":-0.58,"tier":1,"territory_key":"S","modifier":"Affordable synthetic utility","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"camelia","x":0.22,"y":-0.76,"tier":1,"territory_key":"S","modifier":"Minimal canvas utility","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"lesac","x":0.39,"y":-0.21,"tier":1,"territory_key":"E","modifier":"Young minimal daily","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"toutou","x":-1.20,"y":-0.10,"tier":3,"territory_key":"W","modifier":"Trend-extreme / IP-borrowed (Sanrio)","category_adjacent":false,"signature_type":"trend-extreme","confidence":"low"},
  {"id":"vanwalk","x":-0.78,"y":-0.46,"tier":2,"territory_key":"SW","modifier":"Campus cute utility (CN domestic)","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"oui","x":-0.68,"y":-0.28,"tier":2,"territory_key":"SW","modifier":"Japanese-lite leather daily charm","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"samantha_vega","x":-0.79,"y":0.30,"tier":2,"territory_key":"NW","modifier":"Kawaii-chic / Cute Mode","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"carlyn","x":-0.42,"y":-0.05,"tier":2,"territory_key":"SW","modifier":"Signature puffer daily (ranh tier 1–2)","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"karatta","x":-0.25,"y":0.62,"tier":2,"territory_key":"N","modifier":"Playful visual design, minimal-leaning","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"ngaos","x":-0.35,"y":0.87,"tier":3,"territory_key":"NW","modifier":"Embroidered romantic craft","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"thergab","x":-0.05,"y":0.97,"tier":3,"territory_key":"N","modifier":"VN heritage self-expression","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"floralpunk","x":0.30,"y":0.68,"tier":3,"territory_key":"NE","modifier":"Urban feminine polish / subtly statement","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"chautfifth","x":0.50,"y":1.07,"tier":3,"territory_key":"NE","modifier":"Shapeshifting / restrained statement","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"standoil","x":0.99,"y":0.37,"tier":3,"territory_key":"E","modifier":"Restraint-led daily / sculptural practicality","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"mossdoom","x":0.70,"y":-0.42,"tier":2,"territory_key":"E","modifier":"Korean-look mass (Thai/CN origin)","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"spoiled","x":0.77,"y":-0.68,"tier":3,"territory_key":"SE","modifier":"Street sporty premium accessory","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"saigonswagger","x":0.70,"y":-1.15,"tier":4,"territory_key":"SE","modifier":"Category-adjacent carry system","category_adjacent":true,"signature_type":"authentic","confidence":"high"}
]
```

---

## 4. Thay đổi đáng chú ý so với bản app hiện tại
| Brand | Đổi gì | Nguồn phán xử |
|---|---|---|
| Karatta | x −0.55→**−0.25** (bớt cute, design-minimal hơn) | nghiêng ChatGPT |
| Floralpunk | y 0.80→**0.68**, x 0.25→0.30 | trung dung |
| Vanwalk | x −0.95→**−0.78**, y −0.35→**−0.46**, tier→2 (gỡ coord_check) | cả 2 đồng ý |
| Oui | x −0.85→**−0.68** (daily hơn) | cả 2 đồng ý |
| Carlyn | giữ **tier 2** (không hạ 1), x→−0.42 | giữ Claude |
| Toutou | x −1.15→**−1.20**, confidence→**low** | nghiêng ChatGPT |
| Mossdoom/Spoiled/SGS | tinh chỉnh y; Spoiled `category_adjacent=false` | theo ChatGPT |

> `coord_check` của Vanwalk đã được **giải quyết** (cả 2 bản xác nhận tier 2, accessible) → gỡ cờ.

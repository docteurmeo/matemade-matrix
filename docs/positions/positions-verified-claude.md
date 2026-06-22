# Kiểm chứng vị trí 21 brand — Bản độc lập của Claude (web-researched)

> Phương pháp: nghiên cứu web thật (website/Shopee/social/sàn quốc tế) tháng 6/2026 cho các brand chưa chắc; kết hợp kiến thức nền cho brand đã biết rõ. Mỗi brand ghi **confidence** + **nguồn**. Đặt cạnh bản ChatGPT để so sánh, rồi nạp vào app.
> Hệ trục & khung Tier×Territory×Modifier theo `POSITION_VERIFICATION_REQUEST.md`.

---

## 1. Phát hiện chính (khác biệt so với dữ liệu hiện tại)

| # | Brand | Phát hiện từ research | Đề xuất dịch chuyển |
|---|---|---|---|
| 1 | **Vanwalk** | Là brand **nội địa Trung** (balo nữ sinh, đa năng/chống nước, 800k–1.3M), rất accessible — KHÔNG phải signature | Tier 3→**2**; x −0.95→**−0.70** (bớt cực sweet), y −0.35→**−0.50** (utility hơn). **Gỡ cờ coord_check** |
| 2 | **Carlyn** | Brand Hàn, signature **puffer quilted** mạnh, celeb endorsed (Red Velvet/SNSD), sell-out, "NYC essence" — identity cao hơn dự kiến, hơi cool | Tier giữ **2** nhưng identity↑; x −0.45→**−0.35** (bớt sweet) |
| 3 | **Floralpunk** | Phụ kiện trendy HCMC (Downtown Shopper mesh+pearl chain), cho student/đi làm — **accessible polish**, không phải craft-statement | y 0.80→**0.55** (bớt statement); Tier 3→**2–3**; Territory: Urban Feminine Polish (ranh NE) |
| 4 | **Saigon Swagger** | VN 2014, balo, **400k followers, rất mainstream**, giá hợp lý, ra Nhật | Giữ vị trí + tier 4 nhưng **lý do "xa" = khác category, KHÔNG phải taste-intensity cao**. `category_adjacent` |
| 5 | **Spoiled** | VN 2022, accessory sporty/League streetwear, "accessible...without breaking bank" | Tier 3→**2–3** (accessible hơn); `category_adjacent` |
| 6 | **Mossdoom** | Korean-**look** nhưng origin **Thái/Trung**, bán eBay/SEA, PU minimal giá mềm | Tier 2→**1–2** (mass/affordable hơn) |
| 7 | **Oui The Brand** | HCMC 2017, da minimalism + naming Nhật (Haruki/Chizuko) + charm, **rẻ hơn Hapas/MateMade** | x −0.85→**−0.65** (daily/neutral hơn, bớt kẹo) |
| 8 | **Toutou** | Xác nhận: **Hello Kitty/Sanrio collab**, 150–300k, Shopee/Shein/Temu | Giữ tier 3 + **signature_type: trend-extreme** (đúng) |
| 9 | **Hapas** | Mid-price (đắt hơn Oui), nữ tính nâng cấp nhẹ | x 0.20→**0.25**, có thể nhích tier 0→ranh 0–1 |

Các brand còn lại (MateMade, Vascara, Juno, Yuumy, Camelia, Lesac, Samantha Vega, Karatta, Ngaos, Ther Gab, Chautfifth, Stand Oil) — research **xác nhận** vị trí hiện tại hợp lý.

---

## 2. Bảng đầy đủ 21 brand (đề xuất)

| Brand | x cũ→mới | y cũ→mới | Tier | Territory | Modifier | Conf |
|---|---|---|:-:|---|---|:-:|
| MateMade | −0.75 | −0.05 | 2 | W Sweet/Playful | Charmable Self-expression | high |
| Vascara | 0.30 | −0.10 | 0 | core Mass Polished Fem | Soft professional mass | high |
| Juno | 0.10 | −0.15 | 0 | core Mass Polished Fem | Safe mass feminine | high |
| Hapas | 0.20→**0.25** | 0.00→**0.05** | 0–1 | core Mass Polished Fem | Mass aspiration (mid-price) | med |
| Yuumy | 0.00 | −0.55 | 1 | S Functional/Value | Affordable synthetic utility | med |
| Camelia | 0.25 | −0.75 | 1 | S Functional/Value | Minimal canvas utility | med |
| Lesac | 0.40 | −0.20 | 1 | E Seoul Cool (nhạt) | Young minimal daily | med |
| Toutou | −1.15 | −0.05 | 3 | W Sweet/Kawaii (cực đoan) | **Trend-extreme / IP-borrowed (Sanrio)** | high |
| **Vanwalk** | −0.95→**−0.70** | −0.35→**−0.50** | **2** | SW→S Campus utility | Campus cute utility *(brand nội địa Trung)* | high |
| Oui | −0.85→**−0.65** | −0.25→**−0.20** | 2 | SW Soft Casual Cute | Japanese-lite daily charm (leather minimal) | high |
| Samantha Vega | −0.80 | 0.25 | 2 | NW Romantic/Kawaii-chic | Kawaii-chic / Cute Mode | med |
| **Carlyn** | −0.45→**−0.35** | −0.10→**0.00** | 2 | SW Soft Puffer | **Signature puffer daily (identity cao)** | high |
| Karatta | −0.55 | 0.65 | 2 | N Design Object | Playful visual design (PU) | med |
| Ngaos | −0.35 | 0.85 | 3 | NW Romantic Craft | Embroidered romantic craft *(Hanoi 2015)* | high |
| Ther Gab | −0.05 | 0.95 | 3 | N Craft Heritage | VN heritage self-expression *(global: HBX/SG)* | high |
| **Floralpunk** | 0.25→**0.20** | 0.80→**0.55** | **2–3** | NE Urban Feminine Polish | Trendy accessory polish | high |
| Chautfifth | 0.45 | 1.05 | 3 | NE Restrained Statement | Shapeshifting / edgy minimal *(slow fashion)* | high |
| Stand Oil | 1.00 | 0.35 | 3 | E Seoul Cool Minimal | Restraint-led daily | high |
| **Mossdoom** | 0.75→**0.65** | −0.35→**−0.30** | **1–2** | E Seoul Cool (affordable) | Korean-look mass *(origin Thái/Trung)* | med |
| **Spoiled** | 0.75→**0.70** | −0.75→**−0.65** | **2–3** | SE Sport/Street | Accessible sporty accessory `cat-adj` | med |
| Saigon Swagger | 0.65 | −1.10 | 4 | SE Street Utility | Mainstream carry system `cat-adj` *(far vì khác category)* | high |

---

## 3. Cảnh báo & điểm yếu dữ liệu

- **"Xa tâm" ≠ "taste-intensity cao":** Saigon Swagger & Spoiled mainstream/accessible nhưng nằm xa vì **khác category** (street/balo). App đã xử lý đúng bằng cờ `category_adjacent` + legend "distance = taste specificity, not price/quality". Khi research, nên cân nhắc: với brand category-adjacent, **tier nên đọc theo cường độ TRONG category của nó**, không theo bán kính tuyệt đối.
- **Mossdoom:** "Korean" chỉ là *phong cách/marketing*, origin thực Thái/Trung, bán đại trà eBay → gần mass hơn aesthetic-led.
- **Vanwalk nội địa Trung:** nếu tiêu chí ma trận là "brand Việt/cạnh tranh tại VN" thì vẫn giữ; nhưng bản chất là mass campus utility, không signature.
- **Toutou:** ranh giới *brand* vs *shop bán đồ IP*. Bản sắc tự thân yếu → đúng là `trend-extreme`, dùng làm **cảnh báo** cho MateMade, không phải hình mẫu.
- **Confidence thấp/med:** Hapas, Yuumy, Camelia, Lesac, Samantha Vega, Karatta, Mossdoom, Spoiled — cần thêm dữ liệu giá/portfolio chi tiết để chốt tier ranh giới.

---

## 4. JSON (positions-verified-claude.json)

```json
[
  {"id":"matemade","x":-0.75,"y":-0.05,"tier":2,"territory_key":"W","modifier":"Charmable Self-expression","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"vascara","x":0.30,"y":-0.10,"tier":0,"territory_key":"CORE","modifier":"Soft professional mass","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"juno","x":0.10,"y":-0.15,"tier":0,"territory_key":"CORE","modifier":"Safe mass feminine","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"hapas","x":0.25,"y":0.05,"tier":0,"territory_key":"CORE","modifier":"Mass aspiration (mid-price)","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"yuumy","x":0.00,"y":-0.55,"tier":1,"territory_key":"S","modifier":"Affordable synthetic utility","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"camelia","x":0.25,"y":-0.75,"tier":1,"territory_key":"S","modifier":"Minimal canvas utility","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"lesac","x":0.40,"y":-0.20,"tier":1,"territory_key":"E","modifier":"Young minimal daily","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"toutou","x":-1.15,"y":-0.05,"tier":3,"territory_key":"W","modifier":"Trend-extreme / IP-borrowed (Sanrio)","category_adjacent":false,"signature_type":"trend-extreme","confidence":"high"},
  {"id":"vanwalk","x":-0.70,"y":-0.50,"tier":2,"territory_key":"S","modifier":"Campus cute utility (CN domestic)","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"oui","x":-0.65,"y":-0.20,"tier":2,"territory_key":"SW","modifier":"Japanese-lite daily charm (leather minimal)","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"samantha_vega","x":-0.80,"y":0.25,"tier":2,"territory_key":"NW","modifier":"Kawaii-chic / Cute Mode","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"carlyn","x":-0.35,"y":0.00,"tier":2,"territory_key":"SW","modifier":"Signature puffer daily","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"karatta","x":-0.55,"y":0.65,"tier":2,"territory_key":"N","modifier":"Playful visual design","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"ngaos","x":-0.35,"y":0.85,"tier":3,"territory_key":"NW","modifier":"Embroidered romantic craft","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"thergab","x":-0.05,"y":0.95,"tier":3,"territory_key":"N","modifier":"VN heritage self-expression","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"floralpunk","x":0.20,"y":0.55,"tier":3,"territory_key":"NE","modifier":"Trendy accessory polish","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"chautfifth","x":0.45,"y":1.05,"tier":3,"territory_key":"NE","modifier":"Shapeshifting / edgy minimal","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"standoil","x":1.00,"y":0.35,"tier":3,"territory_key":"E","modifier":"Restraint-led daily","category_adjacent":false,"signature_type":"authentic","confidence":"high"},
  {"id":"mossdoom","x":0.65,"y":-0.30,"tier":2,"territory_key":"E","modifier":"Korean-look mass (Thai/CN origin)","category_adjacent":false,"signature_type":"authentic","confidence":"medium"},
  {"id":"spoiled","x":0.70,"y":-0.65,"tier":3,"territory_key":"SE","modifier":"Accessible sporty accessory","category_adjacent":true,"signature_type":"authentic","confidence":"medium"},
  {"id":"saigonswagger","x":0.65,"y":-1.10,"tier":4,"territory_key":"SE","modifier":"Mainstream carry system (far = different category)","category_adjacent":true,"signature_type":"authentic","confidence":"high"}
]
```

---

## 5. Nguồn (chọn lọc)
- Vanwalk: [matoc.com.vn](https://matoc.com.vn/balo-noi-dia-trung-quoc/), Shopee/Tiki Vanwalk store
- Oui: [mosia.io/oui-thebrand](https://mosia.io/oui-thebrand/), [instagram @oui.thebrand](https://www.instagram.com/oui.thebrand/)
- Karatta: [karattaofficial.com](https://karattaofficial.com/products/loli-bag-m-black-1), [mosia.io](https://mosia.io/karatta-thuong-hieu-tui-xach-thiet-ke-viet-nam/)
- Ngaos: [mosia.io/ngaos](https://mosia.io/ngaos/), [SR Fashion Awards 2022](https://style-republik.com/sr-fashion-awards-2022-cong-bo-de-cu-thuong-hieu-tui-xach/)
- Ther Gab: [Inside Retail Asia](https://insideretail.asia/2024/10/15/the-story-behind-the-emerging-vietnamese-bag-label-ther-gab/), [HBX](https://hbx.com/women/brands/ther-gab)
- Chautfifth: [chautfifth.com](https://chautfifth.com/en), [The Luxury Reports](https://theluxuryreports.id/get-to-know-chautfifth-local-brand-asal-vietnam-yang-edgy/)
- Mossdoom: eBay listings (origin Thailand/China)
- Saigon Swagger: [Vietcetera](https://vietcetera.com/en/saigon-swagger-hustle-and-bustle-in-a-bag)
- Carlyn: [W Concept](https://www.wconcept.com/brand/CARLYN/4155.html), Beauty Box Korea
- Floralpunk: [floralpunk.com](https://floralpunk.com/products/downtown-shopper)
- Spoiled: [spoiled.vn/en/about-us](https://spoiled.vn/en/about-us-2/)
- Toutou: [toutoubag.com](https://toutoubag.com/), Shopee/TikTok Sanrio collabs

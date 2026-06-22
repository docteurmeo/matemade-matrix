# Tái dựng & chuyên môn hóa logic Orbit cho ma trận định vị MateMade

> Mục tiêu: chuyển hệ “vòng gần-xa” quanh **Mass Feminine Việt Nam** từ cách gọi cảm tính sang một framework đủ chuyên môn để nạp lại vào app/visualization.

---

## Phần A — Chẩn đoán

### A1. Bán kính đang đo gì?

Với hệ trục hiện tại:

- **Trục x:** `-1.45` Cute/Sweet/Playful → `+1.45` Cool/Minimal/Polished
- **Trục y:** `-1.45` Daily/Utility/Value → `+1.45` Statement/Design/Craft
- **Tâm (0,0):** Mass Feminine Việt Nam

Bán kính `r = √(x²+y²)` **không đo phong cách**. Nó đo:

> **Mức độ lệch khỏi gu nữ tính phổ thông của thị trường Việt Nam**, hay nói chuyên môn hơn là **degree of taste specificity / positioning intensity**.

Nói cách khác, bán kính trả lời câu hỏi:

> Một thương hiệu còn nằm gần nhu cầu đại trà nữ tính — dễ dùng, dễ phối, ít tuyên ngôn — hay đã đi xa hơn để phục vụ một gu cụ thể, một cộng đồng cụ thể, một product code cụ thể?

Bán kính là **cường độ định vị**, không phải **loại phong cách**.

Hai brand có thể cùng orbit nhưng hoàn toàn khác phong cách:

- **Toutou bag** và **Stand Oil** cùng có thể nằm orbit 3.
- Nhưng Toutou đi xa vì **hyper-cute / kawaii trend intensity**.
- Stand Oil đi xa vì **Seoul cool minimal / restraint / fashion-aware identity**.

Vì vậy, nếu chỉ đặt tên orbit là “có tính cách rõ” hay “xa/khác hệ”, tên đó đúng về logic khoảng cách nhưng thiếu chuyên môn để hiểu đó là **loại gu thời trang nào**.

### A2. Orbit hiện tại sai/thiếu ở đâu?

Các tên cũ như:

- Core Mass Feminine
- Gần trung tâm
- Lệch rõ — vẫn đại trà
- Có tính cách rõ
- Xa — khác hệ

có ba vấn đề:

1. **Đúng về cường độ nhưng không mô tả phong cách.**  
   “Lệch rõ” không nói lệch sang kawaii, craft, Seoul minimal, street utility hay statement object.

2. **Dễ bị hiểu nhầm rằng orbit càng xa thì càng premium.**  
   Không đúng. Toutou có thể rất xa về gu cute nhưng không premium; Saigon Swagger có thể xa vì khác category logic; Chautfifth xa vì design-led.

3. **Không đủ để code UI/filter.**  
   Nếu app chỉ dùng orbit label, người dùng không biết vì sao brand ở vòng đó. Cần tách `tier` và `territory`.

### A3. Có nên tách “mức độ” và “phong cách” không?

**Có. Bắt buộc nên tách.**

Framework nên có 2 hệ định danh độc lập:

1. **Radial Tier / Distance Tier**  
   Đo **mức độ lệch khỏi Mass Feminine Core**: từ mainstream đến style-specific, niche, category-adjacent.

2. **Angular Territory / Style Territory**  
   Đo **hướng lệch**: cute/kawaii, Seoul minimal, romantic craft, statement design, street utility, polished mass, value utility...

Công thức đọc một brand nên là:

```text
Brand = Tier intensity + Style territory
```

Ví dụ:

```text
MateMade = Tier 2 / Aspirational Trend-led + Cute Playful Self-expression
Stand Oil = Tier 3 / Signature Fashion-led + Seoul Cool Minimal
Saigon Swagger = Tier 4 / Category-adjacent Specialist + Street Utility
Vascara = Tier 0 / Mass Feminine Core + Polished Soft Professional
```

---

## Phần B — Thang “mức độ” theo bán kính

| Tier | Tên EN | Tên VN | Định nghĩa | Tiêu chí phân biệt đo được |
|---:|---|---|---|---|
| 0 | **Mass Feminine Core** | **Lõi nữ tính đại trà** | Vùng gu phổ thông nữ Việt: dễ dùng, dễ đẹp, nữ tính vừa đủ, ít tuyên ngôn, phục vụ nhiều dịp. | **Khách cần:** túi an toàn, dễ phối, hợp đi làm/đi chơi. **Ý đồ sản phẩm:** form quen, màu trung tính/nude/đen/nâu, ít thử nghiệm. **Độ thay thế:** cao, dễ thay bằng brand mass khác. **Giá:** entry-mid, value-driven. |
| 1 | **Mainstream Variation** | **Biến thể đại trà** | Vẫn phục vụ mass market nhưng có một độ lệch nhẹ: trẻ hơn, utility hơn, minimal hơn, Korean hơn, canvas hơn, soft hơn. | **Khách cần:** vẫn dễ dùng nhưng muốn một “flavor” nhẹ. **Ý đồ sản phẩm:** thêm mood cụ thể nhưng không cực đoan. **Độ thay thế:** còn cao. **Giá:** entry-mid; premium chủ yếu đến từ cảm giác thương hiệu/tiện ích. |
| 2 | **Aspirational Trend-led** | **Đại trà có xu hướng / có gu dẫn dắt nhẹ** | Đã có flavor rõ hơn và được mua một phần vì mood/identity, nhưng vẫn còn đủ accessible để bán đại trà. Đây là vùng masstige/local-fashion dễ tăng trưởng. | **Khách cần:** túi giúp outfit có mood, có ảnh đẹp, có cảm giác “tôi có gu hơn”. **Ý đồ sản phẩm:** màu/shape/charm/material có chủ đích hơn. **Độ thay thế:** trung bình; có thể thay nhưng mất mood. **Giá:** mid; có thể premium nhẹ nếu brand code đủ rõ. |
| 3 | **Signature Fashion-led** | **Gu riêng / định vị thời trang rõ** | Brand đã có product code hoặc aesthetic rõ; khách mua vì nhận diện/gu/câu chuyện chứ không chỉ vì công năng. Có thể là premium designer, craft niche, hyper-cute niche, Seoul minimal hoặc street accessory. | **Khách cần:** khẳng định gu hoặc thuộc về một thẩm mỹ cụ thể. **Ý đồ sản phẩm:** signature shape, craft, campaign/aesthetic code rõ. **Độ thay thế:** thấp hơn; thay brand sẽ đổi cảm giác outfit. **Giá:** mid-high tới premium; nhưng cũng có brand giá thấp nếu cực trend/niche. |
| 4 | **Category-adjacent Specialist** | **Chuyên biệt khác hệ** | Đã rời khỏi handbag feminine core để sang streetwear, utility carry system, unisex/balo, technical/street subculture hoặc category logic khác. | **Khách cần:** công năng/subculture/lifestyle rõ hơn nhu cầu nữ tính phổ thông. **Ý đồ sản phẩm:** bag system, backpack, sling, bumbag, nylon, tactical/utility detail. **Độ thay thế:** thay bằng brand cùng subculture hơn là brand túi nữ. **Giá:** biến thiên; price logic theo công năng/subculture. |

### Ghi chú quan trọng về Tier

Tier **không đồng nghĩa với giá**.

- Tier 3 có thể là **Chautfifth**: design-led, premium hơn.
- Tier 3 cũng có thể là **Toutou bag**: hyper-cute trend, giá thấp hơn nhưng lệch rất xa gu phổ thông.
- Vì vậy tier nên hiểu là **positioning intensity**, không phải price tier.

---

## Phần C — Lãnh thổ phong cách theo hướng/góc

Dưới đây là hệ territory nên dùng song song với tier.

| Hướng trong ma trận | Tên VN | Tên EN | Mã sản phẩm đặc trưng | Brand mẫu trong 21 |
|---|---|---|---|---|
| Gần tâm, hơi +x / gần 0y | **Nữ tính phổ thông / công sở mềm** | **Mass Polished Feminine** | shoulder bag, tote, crossbody, màu đen/nâu/be/nude/hồng nhạt, form quen, ít chi tiết cực đoan | Vascara, Juno, Hapas |
| Gần tâm, -y | **Nữ tính tiện dụng / giá trị hằng ngày** | **Value-led Daily Feminine** | túi da tổng hợp, canvas, tote, balo basic, nhiều ngăn, chống nước, giá dễ tiếp cận | Yuumy, Camelia |
| -x, -y | **Cute daily / campus utility** | **Kawaii Utility / Campus Cute** | balo, tote, mini bag, charm, màu pastel, waterproof/canvas/nylon, dùng đi học/đi chơi | Vanwalk, Oui The Brand, Toutou bag |
| -x, gần 0y | **Kẹo ngọt / charmable self-expression** | **Candy Playful Self-expression** | pastel, bow, heart, puffer, charm, keychain, strap đổi, shape mềm, social-friendly | MateMade, Toutou bag |
| -x, +y nhẹ | **Kawaii-chic / cute-mode** | **Kawaii-chic / Cute Mode** | cute nhưng có cấu trúc thời trang hơn: mini shoulder, top handle, charm tiết chế, collaboration character, polish cao hơn | Samantha Vega, Carlyn một phần |
| -x, +y mạnh | **Lãng mạn thủ công / coquette craft** | **Romantic Craft / Coquette Handmade** | thêu, hoa, nơ, bead, crochet/woven, handmade feeling, limited drop, feminine nostalgic | Ngaos, Ther Gab một phần |
| y cao, x gần 0 | **Thiết kế thị giác / túi như object** | **Design Object / Visual Statement** | sculptural silhouette, odd shape, signature name, bag là điểm nhấn outfit, campaign concept | Karatta, Chautfifth một phần |
| +x, +y | **Tối giản có tuyên ngôn / contemporary designer** | **Restrained Statement / Contemporary Minimal** | clean structure, restraint, hardware tinh, black/neutral, mỗi đường nét có lý do, ít decoration | Chautfifth, Stand Oil một phần |
| +x, 0 đến +y nhẹ | **Seoul cool minimal** | **Seoul Cool Minimal** | shoulder/hobo/bowling bag, black/ivory/silver/brown, vegan leather/nylon, casual cool, ít ngọt | Stand Oil, Mossdoom, Carlyn một phần |
| +x, -y | **Tối giản tiện dụng / urban daily** | **Functional Minimal / Urban Daily** | tote, bucket, hobo, nhiều ngăn, lightweight, practical, màu trung tính, casual work-to-play | Mossdoom, Lesac, Camelia một phần |
| +x, -y mạnh | **Street sporty utility** | **Street / Sporty Utility** | sling, backpack, bumbag, tactical/nylon/PU/PVC, logo patch, black, unisex, sporty | Spoiled, Saigon Swagger |
| +x, +y nhẹ / mature edge | **Urban feminine polish** | **Urban Feminine Polish** | downtown tote, suede, chain, belt bag, canvas shopper, polished local fashion | Floralpunk |

---

## Phần D — Gán nhãn 21 brand

| id | Brand | Tier mới | Territory mới | Ghi chú |
|---|---|---|---|---|
| matemade | MateMade | 2 — Aspirational Trend-led / Đại trà có xu hướng | Candy Playful Self-expression / Kẹo ngọt cá nhân hóa | Vẫn gần mass feminine nhưng lệch rõ về cute/charm/playful. Chưa đủ signature nên không nên đẩy lên tier 3. |
| vascara | Vascara | 0 — Mass Feminine Core | Mass Polished Feminine | Đại diện gu nữ tính phổ thông, công sở mềm, dễ thay thế. |
| juno | Juno | 0 — Mass Feminine Core | Mass Polished Feminine | Mass market, nữ tính an toàn, giá vừa. |
| hapas | Hapas | 0 — Mass Feminine Core | Mass Polished Feminine | Mass aspiration, nữ tính vừa đủ, gần tâm nhất. |
| yuumy | Yuumy | 1 — Mainstream Variation | Value-led Daily Feminine | Lệch nhẹ xuống daily/value, nhiều mẫu, da tổng hợp, thực dụng. |
| camelia | Camelia | 1 — Mainstream Variation | Functional Minimal / Urban Daily | Minimal canvas, tiện dụng, lifestyle đơn giản. |
| lesac | Lesac | 1 — Mainstream Variation | Functional Minimal / Urban Daily | Minimal young lifestyle; hơi nghiêng cool/polished nhưng chưa quá xa. |
| toutou | Toutou bag | 3 — Signature Fashion-led | Kawaii Utility / Campus Cute | Rất xa tâm vì hyper-cute/kawaii trend intensity, không phải vì premium. Cần dữ liệu bán hàng để xác định có phải brand hay chỉ keyword item. |
| vanwalk | Vanwalk | 2 — Aspirational Trend-led | Kawaii Utility / Campus Cute | Cute + campus/daily utility; vẫn đại trà nhưng có flavor rõ. |
| oui | Oui The Brand | 2 — Aspirational Trend-led | Kawaii Utility / Campus Cute | Japanese-lite naming, charm, tote/balo/ví; gần MateMade ở cute daily. |
| samantha_vega | Samantha Vega | 2 — Aspirational Trend-led | Kawaii-chic / Cute Mode | Cute nhưng polish hơn; có thể là reference để nâng MateMade từ candy sang cute-mode. |
| carlyn | Carlyn | 1 — Mainstream Variation | Kawaii-chic / Cute Mode | Soft puffer/Korean daily; gần mass hơn Stand Oil, bớt cực đoan. Nếu xét các dòng puffer icon, có thể lên tier 2. |
| karatta | Karatta | 2 — Aspirational Trend-led | Design Object / Visual Statement | Playful visual design, shape/name có signature, nhưng vẫn accessible. |
| ngaos | Ngaos | 3 — Signature Fashion-led | Romantic Craft / Coquette Handmade | Thêu/handmade/romantic rõ; khách mua vì chi tiết craft và gu. |
| thergab | Ther Gab / R.Gab | 3 — Signature Fashion-led | Romantic Craft / Coquette Handmade | Heritage/culture/self-expression; nằm ranh giữa craft heritage và design statement. |
| floralpunk | Floralpunk | 3 — Signature Fashion-led | Urban Feminine Polish | Local fashion polish, downtown feminine, xa mass hơn Juno/Vascara. |
| chautfifth | Chautfifth | 3 — Signature Fashion-led | Restrained Statement / Contemporary Minimal | Design philosophy rõ, restraint, object-like; benchmark về cách có gu mà không quá decoration. |
| standoil | Stand Oil | 3 — Signature Fashion-led | Seoul Cool Minimal | Cool girl, clean shape, fashion-aware; không nên làm direct model cho MateMade hiện tại. |
| mossdoom | Mossdoom | 2 — Aspirational Trend-led | Functional Minimal / Urban Daily | Affordable Seoul/Korean minimal utility; gần mass hơn Stand Oil. |
| spoiled | Spoiled | 3 — Signature Fashion-led | Street / Sporty Utility | Accessory bag street/sporty; khác cảm xúc MateMade nhưng đáng học functional shape. |
| saigonswagger | Saigon Swagger | 4 — Category-adjacent Specialist | Street / Sporty Utility | Balo/tote/sling/bumbag system; khác category logic so với túi xách nữ tính. |

---

## Phần E — JSON để nạp lại app

```json
[
  {
    "id": "matemade",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Candy Playful Self-expression",
    "territory_vn": "Kẹo ngọt cá nhân hóa",
    "note": "Vẫn gần mass feminine nhưng lệch rõ về cute/charm/playful. Chưa đủ signature nên không nên đẩy lên tier 3."
  },
  {
    "id": "vascara",
    "tier": 0,
    "tier_name_en": "Mass Feminine Core",
    "tier_name_vn": "Lõi nữ tính đại trà",
    "territory_en": "Mass Polished Feminine",
    "territory_vn": "Nữ tính phổ thông / công sở mềm",
    "note": "Đại diện gu nữ tính phổ thông, công sở mềm, dễ thay thế."
  },
  {
    "id": "juno",
    "tier": 0,
    "tier_name_en": "Mass Feminine Core",
    "tier_name_vn": "Lõi nữ tính đại trà",
    "territory_en": "Mass Polished Feminine",
    "territory_vn": "Nữ tính phổ thông / công sở mềm",
    "note": "Mass market, nữ tính an toàn, giá vừa."
  },
  {
    "id": "hapas",
    "tier": 0,
    "tier_name_en": "Mass Feminine Core",
    "tier_name_vn": "Lõi nữ tính đại trà",
    "territory_en": "Mass Polished Feminine",
    "territory_vn": "Nữ tính phổ thông / công sở mềm",
    "note": "Mass aspiration, nữ tính vừa đủ, gần tâm nhất."
  },
  {
    "id": "yuumy",
    "tier": 1,
    "tier_name_en": "Mainstream Variation",
    "tier_name_vn": "Biến thể đại trà",
    "territory_en": "Value-led Daily Feminine",
    "territory_vn": "Nữ tính tiện dụng / giá trị hằng ngày",
    "note": "Lệch nhẹ xuống daily/value, nhiều mẫu, da tổng hợp, thực dụng."
  },
  {
    "id": "camelia",
    "tier": 1,
    "tier_name_en": "Mainstream Variation",
    "tier_name_vn": "Biến thể đại trà",
    "territory_en": "Functional Minimal / Urban Daily",
    "territory_vn": "Tối giản tiện dụng / urban daily",
    "note": "Minimal canvas, tiện dụng, lifestyle đơn giản."
  },
  {
    "id": "lesac",
    "tier": 1,
    "tier_name_en": "Mainstream Variation",
    "tier_name_vn": "Biến thể đại trà",
    "territory_en": "Functional Minimal / Urban Daily",
    "territory_vn": "Tối giản tiện dụng / urban daily",
    "note": "Minimal young lifestyle; hơi nghiêng cool/polished nhưng chưa quá xa."
  },
  {
    "id": "toutou",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Kawaii Utility / Campus Cute",
    "territory_vn": "Cute daily / campus utility",
    "note": "Rất xa tâm vì hyper-cute/kawaii trend intensity, không phải vì premium. Cần dữ liệu bán hàng để xác định có phải brand hay chỉ keyword item."
  },
  {
    "id": "vanwalk",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Kawaii Utility / Campus Cute",
    "territory_vn": "Cute daily / campus utility",
    "note": "Cute + campus/daily utility; vẫn đại trà nhưng có flavor rõ."
  },
  {
    "id": "oui",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Kawaii Utility / Campus Cute",
    "territory_vn": "Cute daily / campus utility",
    "note": "Japanese-lite naming, charm, tote/balo/ví; gần MateMade ở cute daily."
  },
  {
    "id": "samantha_vega",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Kawaii-chic / Cute Mode",
    "territory_vn": "Kawaii-chic / cute-mode",
    "note": "Cute nhưng polish hơn; có thể là reference để nâng MateMade từ candy sang cute-mode."
  },
  {
    "id": "carlyn",
    "tier": 1,
    "tier_name_en": "Mainstream Variation",
    "tier_name_vn": "Biến thể đại trà",
    "territory_en": "Kawaii-chic / Cute Mode",
    "territory_vn": "Kawaii-chic / cute-mode",
    "note": "Soft puffer/Korean daily; gần mass hơn Stand Oil, bớt cực đoan. Nếu xét các dòng puffer icon, có thể lên tier 2."
  },
  {
    "id": "karatta",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Design Object / Visual Statement",
    "territory_vn": "Thiết kế thị giác / túi như object",
    "note": "Playful visual design, shape/name có signature, nhưng vẫn accessible."
  },
  {
    "id": "ngaos",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Romantic Craft / Coquette Handmade",
    "territory_vn": "Lãng mạn thủ công / coquette craft",
    "note": "Thêu/handmade/romantic rõ; khách mua vì chi tiết craft và gu."
  },
  {
    "id": "thergab",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Romantic Craft / Coquette Handmade",
    "territory_vn": "Lãng mạn thủ công / coquette craft",
    "note": "Heritage/culture/self-expression; nằm ranh giữa craft heritage và design statement."
  },
  {
    "id": "floralpunk",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Urban Feminine Polish",
    "territory_vn": "Urban feminine polish",
    "note": "Local fashion polish, downtown feminine, xa mass hơn Juno/Vascara."
  },
  {
    "id": "chautfifth",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Restrained Statement / Contemporary Minimal",
    "territory_vn": "Tối giản có tuyên ngôn / contemporary designer",
    "note": "Design philosophy rõ, restraint, object-like; benchmark về cách có gu mà không quá decoration."
  },
  {
    "id": "standoil",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Seoul Cool Minimal",
    "territory_vn": "Seoul cool minimal",
    "note": "Cool girl, clean shape, fashion-aware; không nên làm direct model cho MateMade hiện tại."
  },
  {
    "id": "mossdoom",
    "tier": 2,
    "tier_name_en": "Aspirational Trend-led",
    "tier_name_vn": "Đại trà có xu hướng / có gu dẫn dắt nhẹ",
    "territory_en": "Functional Minimal / Urban Daily",
    "territory_vn": "Tối giản tiện dụng / urban daily",
    "note": "Affordable Seoul/Korean minimal utility; gần mass hơn Stand Oil."
  },
  {
    "id": "spoiled",
    "tier": 3,
    "tier_name_en": "Signature Fashion-led",
    "tier_name_vn": "Gu riêng / định vị thời trang rõ",
    "territory_en": "Street / Sporty Utility",
    "territory_vn": "Street sporty utility",
    "note": "Accessory bag street/sporty; khác cảm xúc MateMade nhưng đáng học functional shape."
  },
  {
    "id": "saigonswagger",
    "tier": 4,
    "tier_name_en": "Category-adjacent Specialist",
    "tier_name_vn": "Chuyên biệt khác hệ",
    "territory_en": "Street / Sporty Utility",
    "territory_vn": "Street sporty utility",
    "note": "Balo/tote/sling/bumbag system; khác category logic so với túi xách nữ tính."
  }
]
```

---

## Phần F — Áp dụng cho MateMade Proximity Map

Map thứ 2 không lấy **Mass Feminine Việt Nam** làm tâm nữa, mà lấy **MateMade** làm tâm. Lúc này bán kính không còn là “lệch khỏi gu phổ thông”, mà là:

> **Strategic proximity to MateMade** — mức độ gần/xấu/xa về khách hàng, occasion, product code, price logic và aesthetic.

### F1. Đặt tên 5 vòng quanh MateMade

| Vòng | Tên EN | Tên VN | Định nghĩa | Brand thường rơi vào |
|---:|---|---|---|---|
| 0 | **Current Core** | **Lõi hiện tại** | MateMade hiện tại: sweet, playful, charm-heavy, Gen Z, vẫn accessible. | MateMade |
| 1 | **Direct Substitute Set** | **Đối thủ thay thế trực tiếp** | Khách có thể chọn thay MateMade ngay vì cùng occasion, giá, cảm giác cute/daily/charm hoặc soft young feminine. | Vanwalk, Oui, Toutou bag, Carlyn một phần |
| 2 | **Adjacent Growth Set** | **Kề cận để tăng trưởng** | Vẫn gần khách hàng trẻ nữ nhưng có một năng lực MateMade có thể học để tiến hóa: cute-mode, puffer daily, playful design, young minimal. | Samantha Vega, Carlyn, Karatta, Lesac |
| 3 | **Aspirational Reference Set** | **Tham chiếu nâng cấp** | Không phải đối thủ trực tiếp, nhưng có thể học về product philosophy, restraint, craft, identity, campaign hoặc signature system. | Stand Oil, Chautfifth, Floralpunk, Ngaos, Ther Gab, Mossdoom |
| 4 | **Category-adjacent Learning Set** | **Khác hệ để học chọn lọc** | Khác cảm xúc hoặc category logic; chỉ nên học về cấu trúc sản phẩm/công năng/subculture, không nên copy định vị. | Saigon Swagger, Spoiled, Camelia, Yuumy, Vascara/Juno/Hapas tùy góc nhìn |

### F2. Các hướng tiến hóa của MateMade

| Hướng đi | Nghĩa là gì | Cơ hội | Rủi ro | Brand benchmark |
|---|---|---|---|---|
| Đi thêm về **-x / Hyper Cute** | Ngọt hơn, kawaii hơn, nhiều charm, nhiều bow/heart/icon hơn | Dễ viral, dễ social, hợp Gen Z đang thử style | Rơi vào Shopee trend / “đồ xinh nhưng dễ thay” | Toutou, Vanwalk, Oui |
| Đi về **+x / Seoul Cool Minimal** | Bớt kẹo, bớt charm, shape sạch hơn, màu neutral hơn | Nâng perception, trưởng thành hơn, dễ styling | Lệch khỏi khách thật; có thể rối như vấn đề Stand Oil trong brief | Stand Oil, Mossdoom, Carlyn |
| Đi về **+y / Design & Craft Elevation** | Giữ tính nữ nhưng thêm shape/craft/story/signature system | Tạo brand memory, tăng premium, bớt chung chung | Khó sản xuất, dễ niche, cần creative direction mạnh | Karatta, Ngaos, Ther Gab, Chautfifth |
| Đi về **-y / Utility & Value** | Tăng công năng, dung tích, nhiều ngăn, daily practicality | Tăng volume, tăng repeat purchase, hợp đi học/đi làm | Mất mood, dễ thành túi tiện dụng phổ thông | Camelia, Yuumy, Saigon Swagger |
| Đi **-x + +y / Romantic Candy Craft** | Từ kẹo ngọt sang coquette/romantic/craft | Tạo nữ tính có chiều sâu hơn, khác Shopee trend | Dễ sến, cần tiết chế vật liệu/visual | Ngaos, Samantha Vega, Sandy Liang-like territory |
| Đi **-x + -y / Cute Daily Utility** | Từ kẹo ngọt sang túi daily cute có công năng | Rất gần khách hiện tại, cơ hội thương mại cao | Cạnh tranh trực diện Vanwalk/Oui/Toutou | Vanwalk, Oui, Carlyn |
| Đi **+x + +y / Restrained Signature** | Từ cute sang contemporary, có gu, ít decoration | Nâng brand mạnh, có thể tạo icon product | Xa khách hiện tại nhất, dễ mất volume | Chautfifth, Stand Oil |
| Đi **+x + -y / Urban Functional Minimal** | Bớt cute, tăng tiện dụng và clean | Có thể mở line cho người đi làm trẻ | Dễ trôi vào Lesac/Camelia/Mossdoom | Lesac, Mossdoom, Camelia |

### F3. Đề xuất chiến lược cho MateMade

MateMade không nên chọn một hướng cực đoan ngay. Đường đi hợp lý nhất là:

```text
Generic Candy Sweet
→ Charmable Self-expression
→ Modular Candy Utility
```

Nghĩa là:

- Không bỏ “kẹo ngọt”, vì đó là thứ gần khách hàng thật.
- Không trượt xuống “cute trend item”, vì sẽ bị thay thế.
- Không copy Stand Oil, vì khách hàng thực tế không phải cool girl có gu ổn định.
- Nên biến “charm-heavy” thành một **hệ sản phẩm có logic**: charm system, strap system, pouch system, seasonal kit, colorway architecture.

Câu định vị sản phẩm tạm thời có thể là:

> MateMade là thương hiệu túi xách playful dành cho nữ Gen Z Việt đang thử nghiệm phong cách — giúp họ làm gu trung bình trở nên vui hơn, cá nhân hơn và dễ thay đổi mỗi ngày mà không cần trở thành fashion girl quá sắc nét.

# MateMade Product Positioning Matrix — So sánh 2 bản logic & đề xuất tổng hợp cuối

> Mục đích: Lưu lại tư duy nhận định, so sánh và kết quả đề xuất cuối cùng về logic ma trận định vị sản phẩm túi xách MateMade. File này có thể dùng làm tài liệu đầu vào cho Claude Code hoặc các bước triển khai app/visualization tiếp theo.

---

## 1. Kết luận tổng quan

Sau khi so sánh 2 bản đề xuất logic Orbit:

- **Bản 2 tốt hơn về tư duy khung / conceptual framework.**
- **Bản 1 tốt hơn về tính triển khai app, độ chi tiết territory và brand note.**

Vì vậy, không nên chọn nguyên xi một bản. Đề xuất cuối nên lấy:

```text
Xương sống khái niệm của Bản 2
+
Độ chi tiết product code / territory / brand note của Bản 1
```

Cả hai bản đều đúng ở điểm nền:

> **Bán kính không đo phong cách. Bán kính đo mức độ lệch khỏi gu phổ thông. Phong cách phải đọc bằng hướng/góc.**

Do đó, mỗi thương hiệu nên được đọc bằng một cấu trúc nhiều lớp, thay vì chỉ gắn một nhãn orbit chung chung.

---

## 2. Chẩn đoán lỗi gốc của hệ Orbit cũ

Hệ cũ dùng bán kính `r = √(x² + y²)` để chia 5 vòng quanh tâm **Mass Feminine Việt Nam**.

Các orbit cũ được gọi kiểu:

- Core Mass Feminine
- Gần trung tâm
- Lệch rõ — vẫn đại trà
- Có tính cách rõ
- Xa — khác hệ

Vấn đề không chỉ là tên gọi thiếu hay, mà là **lỗi khái niệm**.

### 2.1. Bán kính thật ra đo gì?

Với hệ trục:

- Trục x: `-1.45` Cute / Sweet / Playful → `+1.45` Cool / Minimal / Polished
- Trục y: `-1.45` Daily / Utility / Value → `+1.45` Statement / Design / Craft
- Tâm `(0,0)`: Mass Feminine Việt Nam

Bán kính không đo style. Nó đo:

> **Degree of taste specificity / positioning intensity**  
> Mức độ mã hóa thẩm mỹ / mức độ lệch khỏi gu nữ tính phổ thông của thị trường Việt Nam.

Nói đơn giản:

> Brand còn gần nhu cầu đại trà nữ tính — dễ dùng, dễ phối, ít tuyên ngôn — hay đã đi xa hơn để phục vụ một gu cụ thể, một cộng đồng cụ thể, một product code cụ thể?

### 2.2. Vì sao không thể gọi orbit bằng tên phong cách?

Hai brand có thể cùng bán kính nhưng khác hoàn toàn về style:

```text
Toutou bag = xa tâm vì hyper-cute / kawaii trend intensity
Stand Oil  = xa tâm vì Seoul cool minimal / restraint / fashion-aware identity
```

Cả hai đều có thể ở orbit xa, nhưng một bên là **cực ngọt**, một bên là **cực cool/tối giản**.

Vì vậy:

```text
Radius = cường độ định vị
Angle  = hướng phong cách
```

Nếu cố dùng orbit để mô tả cả hai, map sẽ mơ hồ.

---

## 3. Đề xuất framework cuối: 3 lớp định danh

Framework cuối nên đọc mỗi brand bằng 3 lớp:

```text
Brand = Tier + Territory + Modifier
```

Trong đó:

1. **Tier**  
   Mức độ mã hóa thẩm mỹ / mức độ lệch khỏi Mass Feminine.

2. **Territory**  
   Hướng phong cách chính, đọc theo góc trên ma trận.

3. **Modifier**  
   Sắc thái chiến lược phụ, giúp phân biệt các brand cùng territory nhưng khác bản chất.

Ví dụ:

```text
MateMade
= Tier 2: Coded-Accessible
+ Territory: Sweet / Playful / Kawaii
+ Modifier: Charmable Self-expression
```

```text
Toutou
= Tier 3: Aesthetic-Led
+ Territory: Sweet / Playful / Kawaii
+ Modifier: Trend-extreme / IP-borrowed cute
```

```text
Stand Oil
= Tier 3: Aesthetic-Led
+ Territory: Seoul Cool / Polished Minimal
+ Modifier: Restraint-led daily bag
```

Cách này cho phép app/visualization đọc được cả:

- Brand **lệch khỏi gu phổ thông bao xa**.
- Brand **lệch về hướng phong cách nào**.
- Brand **đáng học/cảnh báo ở điểm nào**.

---

## 4. So sánh 2 bản đề xuất

### 4.1. Bản 1 — điểm mạnh

Bản 1 mạnh ở **tính triển khai**.

| Điểm mạnh | Vì sao đáng giữ |
|---|---|
| Có cấu trúc đầy đủ A–F | Dễ feed lại cho app / Claude Code |
| Có JSON sẵn | App có thể nạp ngay |
| Territory chi tiết hơn | Có các nhánh như `Candy Playful Self-expression`, `Kawaii Utility`, `Urban Feminine Polish`, `Restrained Statement` |
| Brand note thực dụng | Ghi rõ brand nào ranh giới, brand nào nên học cái gì |
| MateMade Proximity Map rõ | Có chia đối thủ trực tiếp / kề cận / tham chiếu / khác hệ |

### 4.2. Bản 1 — điểm yếu

- Tên tier chưa sắc bằng bản 2.
- `Aspirational Trend-led` dễ bị hiểu là trend ngắn hạn, trong khi bản chất tier 2 không nhất thiết chỉ là trend.
- Bản 1 hơi gắn territory quá mạnh cho cả những brand gần tâm như Vascara/Juno/Hapas, trong khi các brand này chủ yếu là mass core, không có style territory rõ.

---

### 4.3. Bản 2 — điểm mạnh

Bản 2 mạnh hơn về **tư duy chiến lược**.

| Điểm mạnh | Vì sao đáng giữ |
|---|---|
| Tách khái niệm rất sạch | Radius = tier, angle = territory |
| Tên tier tốt hơn | `Neutral Mass`, `Elevated Mass`, `Coded-Accessible`, `Aesthetic-Led`, `Signature Niche` đọc chuyên môn hơn |
| Có insight “càng gần tâm, hướng càng vô nghĩa” | Rất đúng về nghiên cứu định vị |
| 8 territory theo sector dễ visualize | Phù hợp để vẽ nan quạt trên ma trận |
| Cảnh báo Toutou là trend-extreme | Đây là điểm rất đắt cho chiến lược MateMade |
| Kết luận chiến lược sắc | “Đừng đổi hướng — hãy đào sâu bậc” là insight quan trọng |

### 4.4. Bản 2 — điểm yếu

- Hơi gọn nếu đưa vào app/phân tích sản phẩm sâu.
- Một số territory quá rộng, ví dụ `Sweet / Playful / Kawaii` chưa phân biệt được MateMade với Toutou, Vanwalk, Samantha Vega.
- `Signature Niche` dùng cho tier 4 hơi tích cực quá. Không phải brand xa tâm nào cũng là niche/designer tốt. Có brand xa vì khác category logic, street utility, hoặc trend-extreme.
- Một số placement như Vanwalk lên tier 3 có thể hơi cao, vì Vanwalk vẫn là cute daily/campus utility khá đại trà.

---

## 5. Thang Tier cuối cùng đề xuất

Dùng xương sống tên của Bản 2, nhưng chỉnh tier 4 để trung lập và chính xác hơn.

| Tier | Tên EN đề xuất | Tên VN đề xuất | Định nghĩa | Tiêu chí phân biệt |
|---:|---|---|---|---|
| 0 | **Neutral Mass** | **Phổ thông trung lập** | Gu nữ tính phổ thông, ít tuyên ngôn, không đòi hỏi khách có gu riêng | Dễ phối, dễ mua, dễ thay thế; giá/value quan trọng |
| 1 | **Elevated Mass** | **Đại chúng có hướng** | Vẫn mass, nhưng có một hướng nhẹ: trẻ hơn, tiện hơn, minimal hơn, mềm hơn, Korean hơn | Có “flavor” nhẹ nhưng chưa tạo cộng đồng thẩm mỹ |
| 2 | **Coded-Accessible** | **Có mã thẩm mỹ, vẫn đại chúng** | Có product code nhận ra được, khách mua vì mood/identity, nhưng vẫn accessible | Đây là vùng đẹp nhất cho MateMade: có volume + bắt đầu có bản sắc |
| 3 | **Aesthetic-Led** | **Dẫn dắt bằng thẩm mỹ** | Brand được chọn vì gu, aesthetic, product philosophy hoặc signature rõ | Khó thay thế hơn; cần khách có gu nền hoặc nhu cầu biểu đạt rõ |
| 4 | **Specialist / Category-Adjacent** | **Chuyên biệt / khác hệ** | Đã rời khỏi handbag feminine core sang subculture, utility system, streetwear, designer/cult hoặc category logic khác | Không còn cạnh tranh trực tiếp với túi nữ đại trà; học chọn lọc hơn là copy |

### 5.1. Vì sao đổi tier 4?

Không dùng `Signature Niche` làm tên tier 4 chính vì nó quá tích cực.

Tier 4 có thể bao gồm:

- Signature/designer niche thật.
- Streetwear/carry system khác hệ.
- Utility category-adjacent.
- Trend-extreme nhưng không có lõi bền.

Vì vậy, tên **Specialist / Category-Adjacent** trung lập hơn và tránh ngộ nhận rằng cứ xa tâm là tốt hơn, premium hơn, hoặc có bản sắc hơn.

---

## 6. Style Territory cuối cùng đề xuất

Dùng khung 8 hướng của Bản 2, nhưng thêm subterritory chi tiết từ Bản 1 để dùng trong tooltip/filter.

| Hướng | Territory EN | Territory VN | Product code chính | Subterritory gợi ý |
|---|---|---|---|---|
| W | **Sweet / Playful / Kawaii** | **Ngọt – vui – kawaii** | pastel, charm, bow, heart, glossy PU, shape mềm, social-friendly | Candy Playful, Kawaii Trend, Charmable Self-expression |
| SW | **Soft Casual Cute / Daily Charm** | **Cute đời thường mềm** | puffer, quilting, nylon, tote/balo cute, charm nhẹ, milk tone | Campus Cute, Soft Puffer Daily, Japanese-lite Daily |
| S | **Functional / Value Utility** | **Công năng – giá trị hằng ngày** | canvas, nhiều ngăn, bền, chống nước, giá mềm, daily tote/balo | Value-led Daily, Minimal Canvas Utility |
| SE | **Sport / Tech-Utility / Street** | **Thể thao – street – tiện ích** | sling, bumbag, backpack, PU/PVC, nylon, hardware, black, unisex | Street Utility, Sporty Accessory, Carry System |
| E | **Seoul Cool / Polished Minimal** | **Cool Hàn – tối giản chỉn chu** | neutral, black/ivory/brown, clean shape, logo nhỏ, leather-like | Seoul Minimal, Urban Daily Minimal |
| NE | **Editorial Cool / Architectural Minimal** | **Cool biên tập – tối giản kiến trúc** | shape lạ tiết chế, sculptural nhưng sạch, muted palette, design-led | Restrained Statement, Contemporary Minimal |
| N | **Design Statement / Craft Heritage** | **Tuyên ngôn thiết kế – thủ công/heritage** | sculptural, woven, handmade, cultural story, object-like bag | Design Object, Craft Heritage, Visual Statement |
| NW | **Romantic / Coquette / Girlish Craft** | **Lãng mạn – coquette – thủ công ngọt** | thêu, hoa, ribbon, pearl, bead, feminine nostalgia, kawaii-chic | Romantic Craft, Kawaii-chic, Girlish Handmade |

### 6.1. Nguyên tắc đọc territory

- **Tier 0–1 không cần territory quá mạnh.** Ở gần tâm, brand chủ yếu đang đáp ứng nhu cầu phổ thông, nên hướng chỉ là tín hiệu nhẹ.
- **Tier 2 trở lên mới bắt đầu đọc territory rõ.** Từ đây, khách hàng bắt đầu mua vì mood, gu hoặc product code.
- **Territory không phải ranking.** Không có territory nào “cao cấp hơn” tự thân; cao cấp hay không phụ thuộc vào cách brand mã hóa và triển khai sản phẩm.

---

## 7. Gán nhãn 21 brand — phiên bản đề xuất cuối

| Brand | Tier cuối | Territory cuối | Modifier / ghi chú |
|---|---|---|---|
| **Vascara** | 0 — Neutral Mass | Core / Mass Polished Feminine | Gu phổ thông nữ tính, công sở mềm, ít tuyên ngôn |
| **Juno** | 0 — Neutral Mass | Core / Mass Polished Feminine | Mass feminine an toàn, dễ thay thế |
| **Hapas** | 0 — Neutral Mass | Core / Mass Polished Feminine | Mass aspiration, nữ tính vừa đủ |
| **Yuumy** | 1 — Elevated Mass | Functional / Value Utility | Giá trị hằng ngày, da tổng hợp, nhiều mẫu, thực dụng |
| **Camelia** | 1 — Elevated Mass | Functional / Value Utility | Minimal canvas utility; nên để tier 1 hơn tier 2 vì vẫn gần mass utility |
| **Lesac** | 1 — Elevated Mass | Seoul Cool / Polished Minimal | Minimal young daily, cool nhẹ nhưng chưa thành aesthetic-led |
| **Carlyn** | 1–2 — Elevated Mass / Coded-Accessible | Soft Casual Cute / Daily Charm | Soft puffer daily; nếu xét dòng icon/puffer thì lên tier 2 |
| **MateMade** | 2 — Coded-Accessible | Sweet / Playful / Kawaii | Modifier: Charmable Self-expression. Đây là vùng chiến lược chính |
| **Vanwalk** | 2 — Coded-Accessible | Soft Casual Cute / Daily Charm | Campus cute + utility; chưa nên đẩy tier 3 |
| **Oui The Brand** | 2 — Coded-Accessible | Soft Casual Cute / Daily Charm | Japanese-lite daily charm, gần MateMade về cute daily |
| **Samantha Vega** | 2 — Coded-Accessible | Romantic / Coquette / Girlish Craft | Modifier: Kawaii-chic / Cute Mode; polish hơn MateMade |
| **Karatta** | 2 — Coded-Accessible | Design Statement / Craft Heritage | Playful visual design, có signature shape/name nhưng vẫn accessible |
| **Mossdoom** | 2 — Coded-Accessible | Seoul Cool / Polished Minimal | Affordable Korean minimal utility; gần mass hơn Stand Oil |
| **Toutou bag** | 3 — Aesthetic-Led | Sweet / Playful / Kawaii | Modifier: Trend-extreme / IP-borrowed cute. Cảnh báo cho MateMade |
| **Ngaos** | 3 — Aesthetic-Led | Romantic / Coquette / Girlish Craft | Thêu/handmade/romantic rõ, khách mua vì craft mood |
| **Ther Gab / R.Gab** | 3 — Aesthetic-Led | Design Statement / Craft Heritage | Heritage/culture/self-expression |
| **Floralpunk** | 3 — Aesthetic-Led | Editorial Cool / Architectural Minimal | Urban feminine polish, fashion-led hơn mass |
| **Chautfifth** | 3 — Aesthetic-Led | Editorial Cool / Architectural Minimal | Restrained statement, contemporary minimal |
| **Stand Oil** | 3 — Aesthetic-Led | Seoul Cool / Polished Minimal | Cool girl, restraint, fashion-aware; không nên copy trực tiếp |
| **Spoiled** | 3 — Aesthetic-Led | Sport / Tech-Utility / Street | Street/sporty accessory, khác cảm xúc MateMade nhưng học được shape/function |
| **Saigon Swagger** | 4 — Specialist / Category-Adjacent | Sport / Tech-Utility / Street | Carry system / street utility, khác category logic |

---

## 8. JSON đề xuất để nạp lại app

```json
[
  {
    "id": "matemade",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Sweet / Playful / Kawaii",
    "territory_vn": "Ngọt – vui – kawaii",
    "modifier_en": "Charmable Self-expression",
    "modifier_vn": "Kẹo ngọt cá nhân hóa qua charm/phụ kiện",
    "note": "Vùng chiến lược chính của MateMade: vẫn gần khách hàng thật, nhưng cần hệ thống hóa charm/strap/pouch/color kit để không rơi xuống trend shop."
  },
  {
    "id": "vascara",
    "tier": 0,
    "tier_name_en": "Neutral Mass",
    "tier_name_vn": "Phổ thông trung lập",
    "territory_en": "Core / Mass Polished Feminine",
    "territory_vn": "Lõi nữ tính phổ thông / công sở mềm",
    "modifier_en": "Soft professional mass",
    "modifier_vn": "Công sở mềm, dễ phối",
    "note": "Gu phổ thông nữ tính, ít tuyên ngôn, dễ thay thế."
  },
  {
    "id": "juno",
    "tier": 0,
    "tier_name_en": "Neutral Mass",
    "tier_name_vn": "Phổ thông trung lập",
    "territory_en": "Core / Mass Polished Feminine",
    "territory_vn": "Lõi nữ tính phổ thông / công sở mềm",
    "modifier_en": "Safe mass feminine",
    "modifier_vn": "Nữ tính an toàn",
    "note": "Mass feminine an toàn, giá vừa, dễ thay thế."
  },
  {
    "id": "hapas",
    "tier": 0,
    "tier_name_en": "Neutral Mass",
    "tier_name_vn": "Phổ thông trung lập",
    "territory_en": "Core / Mass Polished Feminine",
    "territory_vn": "Lõi nữ tính phổ thông / công sở mềm",
    "modifier_en": "Mass aspiration",
    "modifier_vn": "Nữ tính vừa đủ, đại trà có nâng cấp nhẹ",
    "note": "Gần tâm, không có style territory cực đoan."
  },
  {
    "id": "yuumy",
    "tier": 1,
    "tier_name_en": "Elevated Mass",
    "tier_name_vn": "Đại chúng có hướng",
    "territory_en": "Functional / Value Utility",
    "territory_vn": "Công năng – giá trị hằng ngày",
    "modifier_en": "Affordable synthetic leather utility",
    "modifier_vn": "Da tổng hợp, nhiều mẫu, giá trị hằng ngày",
    "note": "Lệch nhẹ khỏi tâm theo hướng practical/value."
  },
  {
    "id": "camelia",
    "tier": 1,
    "tier_name_en": "Elevated Mass",
    "tier_name_vn": "Đại chúng có hướng",
    "territory_en": "Functional / Value Utility",
    "territory_vn": "Công năng – giá trị hằng ngày",
    "modifier_en": "Minimal canvas utility",
    "modifier_vn": "Canvas tối giản, tiện dụng",
    "note": "Vẫn gần mass utility hơn là aesthetic-led."
  },
  {
    "id": "lesac",
    "tier": 1,
    "tier_name_en": "Elevated Mass",
    "tier_name_vn": "Đại chúng có hướng",
    "territory_en": "Seoul Cool / Polished Minimal",
    "territory_vn": "Cool Hàn – tối giản chỉn chu",
    "modifier_en": "Young minimal daily",
    "modifier_vn": "Minimal trẻ, daily",
    "note": "Cool nhẹ nhưng chưa thành aesthetic-led."
  },
  {
    "id": "carlyn",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Soft Casual Cute / Daily Charm",
    "territory_vn": "Cute đời thường mềm",
    "modifier_en": "Soft puffer daily",
    "modifier_vn": "Puffer mềm, casual Hàn",
    "note": "Tier 1–2. Nếu xét các dòng icon/puffer, nên để tier 2; nếu xét toàn portfolio daily, có thể tier 1."
  },
  {
    "id": "vanwalk",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Soft Casual Cute / Daily Charm",
    "territory_vn": "Cute đời thường mềm",
    "modifier_en": "Campus cute utility",
    "modifier_vn": "Cute đi học/đi chơi, có utility",
    "note": "Vẫn accessible, chưa nên đẩy lên tier 3."
  },
  {
    "id": "oui",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Soft Casual Cute / Daily Charm",
    "territory_vn": "Cute đời thường mềm",
    "modifier_en": "Japanese-lite daily charm",
    "modifier_vn": "Daily charm hơi Nhật",
    "note": "Gần MateMade ở cute daily và phụ kiện/charm."
  },
  {
    "id": "samantha_vega",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Romantic / Coquette / Girlish Craft",
    "territory_vn": "Lãng mạn – coquette – thủ công ngọt",
    "modifier_en": "Kawaii-chic / Cute Mode",
    "modifier_vn": "Cute-mode, kawaii có polish",
    "note": "Reference tốt để nâng MateMade từ candy sang cute-mode."
  },
  {
    "id": "karatta",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Design Statement / Craft Heritage",
    "territory_vn": "Tuyên ngôn thiết kế – thủ công/heritage",
    "modifier_en": "Playful visual design",
    "modifier_vn": "Thiết kế thị giác vui, có shape/name riêng",
    "note": "Có signature shape/name nhưng vẫn accessible."
  },
  {
    "id": "mossdoom",
    "tier": 2,
    "tier_name_en": "Coded-Accessible",
    "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
    "territory_en": "Seoul Cool / Polished Minimal",
    "territory_vn": "Cool Hàn – tối giản chỉn chu",
    "modifier_en": "Affordable Korean minimal utility",
    "modifier_vn": "Minimal Hàn giá dễ tiếp cận",
    "note": "Gần mass hơn Stand Oil nhưng cùng hướng cool/minimal."
  },
  {
    "id": "toutou",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Sweet / Playful / Kawaii",
    "territory_vn": "Ngọt – vui – kawaii",
    "modifier_en": "Trend-extreme / IP-borrowed cute",
    "modifier_vn": "Cực cute theo trend / mượn IP",
    "note": "Cảnh báo cho MateMade: xa tâm vì cực cute, không đồng nghĩa với premium hay bản sắc bền."
  },
  {
    "id": "ngaos",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Romantic / Coquette / Girlish Craft",
    "territory_vn": "Lãng mạn – coquette – thủ công ngọt",
    "modifier_en": "Embroidered romantic craft",
    "modifier_vn": "Thêu/handmade/romantic rõ",
    "note": "Khách mua vì craft mood và gu nữ tính thủ công."
  },
  {
    "id": "thergab",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Design Statement / Craft Heritage",
    "territory_vn": "Tuyên ngôn thiết kế – thủ công/heritage",
    "modifier_en": "Vietnamese heritage self-expression",
    "modifier_vn": "Heritage/culture/self-expression",
    "note": "Nằm giữa craft heritage và design statement."
  },
  {
    "id": "floralpunk",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Editorial Cool / Architectural Minimal",
    "territory_vn": "Cool biên tập – tối giản kiến trúc",
    "modifier_en": "Urban feminine polish",
    "modifier_vn": "Urban feminine polish",
    "note": "Fashion-led hơn nhóm mass feminine."
  },
  {
    "id": "chautfifth",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Editorial Cool / Architectural Minimal",
    "territory_vn": "Cool biên tập – tối giản kiến trúc",
    "modifier_en": "Restrained statement / contemporary minimal",
    "modifier_vn": "Tối giản có tuyên ngôn, tiết chế",
    "note": "Benchmark về cách có gu mà không quá decoration."
  },
  {
    "id": "standoil",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Seoul Cool / Polished Minimal",
    "territory_vn": "Cool Hàn – tối giản chỉn chu",
    "modifier_en": "Restraint-led daily bag",
    "modifier_vn": "Daily bag tiết chế, cool girl",
    "note": "Không nên copy trực tiếp cho MateMade vì khách hàng thật không phải cool girl ổn định gu."
  },
  {
    "id": "spoiled",
    "tier": 3,
    "tier_name_en": "Aesthetic-Led",
    "tier_name_vn": "Dẫn dắt bằng thẩm mỹ",
    "territory_en": "Sport / Tech-Utility / Street",
    "territory_vn": "Thể thao – street – tiện ích",
    "modifier_en": "Street sporty accessory",
    "modifier_vn": "Accessory bag street/sporty",
    "note": "Khác cảm xúc MateMade nhưng học được shape/function."
  },
  {
    "id": "saigonswagger",
    "tier": 4,
    "tier_name_en": "Specialist / Category-Adjacent",
    "tier_name_vn": "Chuyên biệt / khác hệ",
    "territory_en": "Sport / Tech-Utility / Street",
    "territory_vn": "Thể thao – street – tiện ích",
    "modifier_en": "Carry system / street utility",
    "modifier_vn": "Hệ carry street/utility",
    "note": "Khác category logic so với túi xách nữ tính; chỉ nên học chọn lọc về cấu trúc sản phẩm."
  }
]
```

---

## 9. MateMade Proximity Map — logic đề xuất

Khi lấy **MateMade làm tâm**, bán kính không còn đo “lệch khỏi Mass Feminine” nữa.

Nó đo:

> **Strategic proximity to MateMade** — mức độ gần/xa về khách hàng, occasion, product code, price logic và aesthetic.

### 9.1. Tên 5 vòng quanh MateMade

| Vòng | Tên EN | Tên VN | Định nghĩa | Brand ví dụ |
|---:|---|---|---|---|
| 0 | **Current Core** | **Lõi hiện tại** | MateMade hiện tại: sweet, playful, charm-heavy, Gen Z, vẫn accessible | MateMade |
| 1 | **Direct Substitute Set** | **Đối thủ thay thế trực tiếp** | Khách có thể chọn thay MateMade ngay vì cùng occasion, giá, cảm giác cute/daily/charm hoặc soft young feminine | Vanwalk, Oui, Toutou, Carlyn một phần |
| 2 | **Credible Adjacency** | **Kề cận có thể tiến tới** | MateMade có thể mở rộng tới một cách thuyết phục | Samantha Vega, Carlyn, Karatta, Lesac |
| 3 | **Aspirational Reference Set** | **Tham chiếu nâng cấp** | Không phải đối thủ trực tiếp, nhưng có thể học về philosophy, restraint, craft, identity, campaign hoặc signature system | Stand Oil, Chautfifth, Floralpunk, Ngaos, Ther Gab, Mossdoom |
| 4 | **Different System / Selective Learning** | **Khác hệ / học chọn lọc** | Khác cảm xúc hoặc category logic; chỉ nên học nguyên lý, không copy định vị | Saigon Swagger, Spoiled, Camelia, Yuumy, Vascara/Juno/Hapas tùy góc nhìn |

---

### 9.2. Hướng tiến hóa của MateMade

| Hướng đi | Nước đi | Cơ hội | Rủi ro | Brand benchmark |
|---|---|---|---|---|
| W / Ngọt hơn | **Deeper Candy** | Dễ viral, dễ social, hợp Gen Z đang thử style | Thành trend shop, rỗng lõi, rơi vào vùng Toutou | Toutou, Vanwalk, Oui |
| E / Cool hơn | **Toward Restraint** | Nâng perception, trưởng thành hơn | Mất khách thật, rối như vấn đề tham chiếu Stand Oil | Stand Oil, Mossdoom, Carlyn |
| N / Design-craft hơn | **Toward Signature** | Tạo brand memory, tăng premium, bớt chung chung | Khó sản xuất, dễ niche, cần creative direction mạnh | Karatta, Ngaos, Ther Gab, Chautfifth |
| S / Utility hơn | **Toward Function** | Tăng volume, repeat purchase, hợp đi học/đi làm | Mất mood, dễ thành túi tiện dụng phổ thông | Camelia, Yuumy, Saigon Swagger |
| NW / Romantic craft | **Romantic Candy Craft** | Từ kẹo ngọt sang coquette/romantic/craft | Dễ sến, cần tiết chế vật liệu/visual | Ngaos, Samantha Vega |
| SW / Cute utility | **Cute Daily Utility** | Gần khách hiện tại, cơ hội thương mại cao | Cạnh tranh trực diện Vanwalk/Oui/Toutou | Vanwalk, Oui, Carlyn |
| NE / Restrained signature | **Restrained Signature** | Nâng brand mạnh, có thể tạo icon product | Xa khách hiện tại nhất, dễ mất volume | Chautfifth, Stand Oil |
| SE / Urban function | **Urban Functional Minimal** | Mở line cho người đi làm trẻ | Dễ trôi vào Lesac/Camelia/Mossdoom | Lesac, Mossdoom, Camelia |

---

## 10. Kết luận chiến lược cho MateMade

Kết luận hay nhất của cả hai bản là:

> **MateMade không nên rời khỏi lãnh thổ Sweet / Playful. Vấn đề không phải đổi hướng sang Stand Oil hay Chautfifth, mà là nâng cấp mức độ mã hóa thẩm mỹ trong chính vùng Sweet.**

Nói cách khác:

```text
Không phải:
Sweet → Cool Minimal

Mà là:
Generic Sweet → Coded Sweet → Modular Candy Utility
```

---

## 11. Vùng cơ hội đề xuất: Modular Candy Utility

### 11.1. Định nghĩa

**Modular Candy Utility** là:

> Một hệ túi xách ngọt, vui, dễ dùng hằng ngày, cho phép Gen Z nữ Việt cá nhân hóa gu qua charm, strap, pouch, color kit và seasonal add-on — nhưng mọi thứ phải được thiết kế thành hệ thống, không phải treo charm ngẫu nhiên.

### 11.2. Vì sao đây là hướng hợp nhất?

| Giữ được | Nâng lên |
|---|---|
| Tính cute / sweet hiện đang gần khách thật | Có product philosophy rõ hơn |
| Tính mass/accessibility | Có mã nhận diện để bớt bị thay thế |
| Charm-heavy behavior của khách | Biến charm thành hệ modular có chủ đích |
| Giá trị social/photo-ready | Có khả năng tạo signature system |

### 11.3. Câu chốt chiến lược

> **MateMade nên trở thành thương hiệu “Coded Sweet” của thị trường túi xách nữ Việt: đủ ngọt để gần khách hàng thật, đủ hệ thống để không bị rơi xuống trend shop.**

Hay ngắn hơn:

> **Đừng đổi hướng — hãy đào sâu bậc.**

---

## 12. Gợi ý triển khai vào app/visualization

### 12.1. Data model nên có

Mỗi brand node nên có tối thiểu các field:

```json
{
  "id": "matemade",
  "name": "MateMade",
  "x": -0.75,
  "y": -0.05,
  "tier": 2,
  "tier_name_en": "Coded-Accessible",
  "tier_name_vn": "Có mã thẩm mỹ, vẫn đại chúng",
  "territory_en": "Sweet / Playful / Kawaii",
  "territory_vn": "Ngọt – vui – kawaii",
  "modifier_en": "Charmable Self-expression",
  "modifier_vn": "Kẹo ngọt cá nhân hóa qua charm/phụ kiện",
  "note": "..."
}
```

### 12.2. Visual layer nên có

1. **Concentric rings = Tier**  
   5 vòng thể hiện mức độ lệch khỏi Mass Feminine.

2. **Sector/nan quạt = Territory**  
   8 hướng phong cách bao quanh tâm.

3. **Node color = Territory**  
   Giúp đọc phong cách nhanh.

4. **Node outline / size = Tier**  
   Giúp đọc mức độ mã hóa thẩm mỹ.

5. **Tooltip = Modifier + note**  
   Giúp giải thích khác biệt tinh giữa các brand cùng territory.

6. **Toggle view**
   - Color by Territory
   - Color by Tier
   - Highlight MateMade competitors
   - Highlight aspirational references

### 12.3. Logic cảnh báo nên có trong app

Một brand xa tâm không tự động là “cao cấp hơn”. App nên có note hoặc legend:

```text
Distance from center = level of taste specificity, not price or quality.
```

Và với các brand như Toutou:

```text
Trend-extreme: high distance because of extreme style intensity, not because of premium brand equity.
```

---

## 13. Chỗ chưa chắc và cần dữ liệu bổ sung

Một số placement cần xác thực thêm bằng dữ liệu sản phẩm thật:

| Brand | Điểm chưa chắc | Cần thêm dữ liệu gì |
|---|---|---|
| Carlyn | Tier 1 hay 2 | Tỉ trọng dòng puffer/iconic trong portfolio; perception của khách Việt |
| Toutou | Brand hay chỉ keyword/item trend | Cấu trúc shop, độ lặp product code, có brand equity riêng không |
| Vanwalk | Tier 2 hay 3 | Mức độ nhận diện riêng ngoài cute campus utility |
| Karatta | Design statement hay playful accessible | Portfolio đầy đủ, mức giá, campaign, signature system |
| Floralpunk | Editorial cool hay urban feminine polish | Dòng túi chủ lực hiện tại, định hướng collection gần đây |
| Spoiled | Aesthetic-led hay category-adjacent | Tỉ trọng street/sporty accessory so với túi nữ daily |

---

## 14. Tóm tắt 1 dòng

> Lỗi cũ là dùng bán kính để gọi tên phong cách. Framework mới tách rõ: **Tier = mức độ mã hóa thẩm mỹ**, **Territory = hướng phong cách**, **Modifier = sắc thái chiến lược**. MateMade hiện là **Coded-Accessible × Sweet/Playful × Charmable Self-expression**, và hướng đi tốt nhất là **Modular Candy Utility**.


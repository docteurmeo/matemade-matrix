# Tư vấn nâng cấp MateMade Brand Territory Matrix

## 1. Kết luận tổng quan

Ma trận hiện tại **không cần đập đi làm lại**. Khung `Tier × Territory × Modifier` vẫn là nền tảng hợp lý để đọc định vị thương hiệu túi xách trong bối cảnh MateMade.

Tuy nhiên, ma trận nên được nâng cấp từ một "bản đồ kết luận" thành một **bản đồ có nhiều lớp đọc chiến lược**, gồm:

1. Vị trí định vị chính: `Tier × Territory`
2. Độ tin cậy dữ liệu: `confidence / evidence strength`
3. Loại benchmark: brand thật, category-adjacent, trend/IP cluster
4. Emotional codes
5. Shape language
6. Outfit role
7. Price/accessibility nếu cần

Mục tiêu không phải thay trục chính, mà là bổ sung các **semantic layers** giúp giải thích vì sao một brand nằm ở vị trí đó và MateMade có thể học gì từ từng cụm.

---

## 2. Đánh giá nghiên cứu hiện tại

Nghiên cứu hiện tại đủ tốt để dùng cho prototype chiến lược, workshop định vị, và định hướng ban đầu. Nhưng chưa nên xem là nghiên cứu thị trường khách quan cuối cùng.

### Điểm mạnh

- Khung `Tier × Territory × Modifier` phù hợp với ngành túi/accessory.
- Đã tách được "cường độ nhận diện" khỏi "phong cách".
- Có `modifier`, `category_adjacent`, `signature_type`, `confidence`.
- Các case khó như Karatta, Carlyn, Floralpunk, Spoiled đã được phân xử tương đối hợp lý.
- Vùng cơ hội "Modular Candy Utility" vẫn có cơ sở chiến lược.

### Điểm yếu

- Bản nghiên cứu còn thiên về desk research định tính.
- Chưa có audit trail đủ rõ cho từng brand.
- Chưa chứng minh đã khảo sát đủ các điểm chạm: official site, Shopee/Lazada/Tiki, Instagram, TikTok, Facebook, UGC, review, press, retailer, campaign/lookbook, offline retail.
- Nhiều kết luận dựa trên mô tả brand/product hơn là corpus SKU có hệ thống.
- `confidence` hiện có nhưng chưa được định nghĩa bằng tiêu chí rõ.
- Một số brand cần tách khỏi benchmark chuẩn, nhất là Toutou.

---

## 3. Có cần thay đổi ma trận không?

Có, nhưng là **tinh chỉnh và bổ sung lớp đọc**, không phải thay đổi hệ trục.

### Không nên thay

- Không cần đổi 2 trục chính.
- Không cần bỏ logic `Tier × Territory × Modifier`.
- Không cần loại bỏ 21 brand hiện tại.
- Không cần đổi ngay vùng cơ hội "Modular Candy Utility".

### Nên thay / bổ sung

#### 3.1. Hiển thị độ tin cậy dữ liệu

Hiện ma trận khiến tất cả brand trông như chắc ngang nhau. Nên bổ sung lớp `confidence` hoặc `evidence strength`.

Gợi ý:
- `high`: có official source + marketplace + social + press/retailer + portfolio/SKU rõ.
- `medium`: có 3-4 nguồn, nhưng thiếu một số điểm chạm.
- `low`: thiếu brand owner, thiếu official site, chủ yếu là marketplace keyword hoặc trend cluster.

#### 3.2. Phân loại benchmark

Nên có badge hoặc field phân loại:

- `brand_benchmark`: brand có hệ thống nhận diện/thương hiệu rõ.
- `category_adjacent`: brand lệch category, ví dụ backpack/carry-system.
- `trend_cluster`: cụm trend/IP/keyword, không phải brand benchmark chắc.
- `low_confidence_reference`: giữ để tham khảo, không dùng làm chuẩn chính.

Toutou nên được gắn `trend/IP cluster`, không đặt ngang hàng với brand benchmark chuẩn.

#### 3.3. Làm rõ category-adjacent

Saigon Swagger nên giữ trên map nhưng có badge riêng vì khoảng cách xa đến từ khác category, không phải vì cùng ngành túi nữ nhưng extreme hơn.

Spoiled nên giữ `category_adjacent=false`, vì vẫn là fashion accessory bag, dù có sporty/street cue.

---

## 4. Review các case cần lưu ý

### Karatta

Vị trí final `x = -0.25, y = 0.62` hợp lý.

Không nên kéo về `x +0.05` vì brand vẫn có chất playful/form lạ. Nhưng cũng không nên giữ quá cute như bản cũ. Karatta nên nằm ở vùng design object có sắc thái playful visual, minimal-leaning.

### Carlyn

Nên ghi rõ là **ranh tier 1-2**.

Nếu xét toàn brand/Fabric Line thì Carlyn khá daily, soft, accessible. Nếu xét signature puffer icon thì có coded aesthetic rõ. Trong app có thể giữ tier 2, nhưng panel nên ghi chú:

> Brand-wide daily; signature puffer line gives it tier 2 coded-aesthetic status.

Confidence nên là high về nguồn, nhưng medium-high về phân xử tier.

### Floralpunk

Final `y = 0.68` hợp lý.

Không nên đẩy ngang Ngaos/Ther Gab/Chautfifth vì "subtly statement" khác với craft/design statement mạnh. Nên đọc là urban feminine polish / subtly statement.

### Spoiled

Nên giữ `category_adjacent=false`.

Spoiled là sporty premium accessory, không phải carry-system. Nằm SE là đúng, nhưng không nên diễn giải như Saigon Swagger.

### Saigon Swagger

Giữ `category_adjacent=true`.

Brand này khác logic túi nữ fashion vì có backpack, laptop compartment, carry-system, water-resistant utility. Nên dùng như đối chiếu category-adjacent, không phải benchmark trực diện.

### Toutou

Nên giữ `confidence=low`.

Nên đổi cách gọi thành `trend/IP cluster`, `IP-borrowed kawaii reference`, hoặc `low-confidence trend reference`.

Không nên dùng Toutou làm benchmark signature tốt cho MateMade.

---

## 5. Nên thêm các lớp đánh giá mới không?

Có. Các nhóm cảm xúc, shape language và vai trò outfit rất đáng đưa vào, nhưng không nên biến thành trục chính. Nên xem chúng là **semantic layers** hoặc **lens mode** chồng lên bản đồ hiện tại.

Ma trận chính trả lời:

> Brand này nằm ở đâu trong không gian định vị tương quan với MateMade?

Các lớp mới trả lời:

> Vì sao nó nằm ở đó? Nó tạo cảm giác bằng mã thiết kế nào? Nó đóng vai trò gì trong outfit? MateMade học gì từ nó?

---

## 6. Đề xuất Semantic Layers

### 6.1. Emotional Codes

Các nhóm có thể dùng:

- Ngọt: Candy, Sweet, Pastel, Girly, Dollish, Kawaii, Soft
- Vui: Playful, Pop, Toy-like, Whimsical, Cheerful
- Lãng mạn: Romantic, Nostalgic, Coquette, Ballet, Feminine
- Cool: Casual Cool, Seoul Cool, Downtown, Effortless, Ironic
- Trưởng thành: Polished, Elegant, Quiet, Refined, Sophisticated
- Sắc cạnh: Edgy, Sexy, Black, Attitude, Subversive
- Nghệ thuật: Sculptural, Conceptual, Statement, Gallery-like
- Thủ công: Crafted, Natural, Tactile, Heritage, Wabi-sabi

Cách thể hiện:
- Radar nhỏ trong brand panel.
- Tag chips.
- Filter/lens đổi màu node.
- Top 3 emotional codes cho mỗi brand.

Ví dụ:
- MateMade: Ngọt cao, Vui cao, Modular/personal cao, Trưởng thành thấp-vừa.
- Ngaos: Lãng mạn cao, Thủ công cao.
- Stand Oil: Cool cao, Trưởng thành vừa-cao.
- Chautfifth: Cool, Nghệ thuật, Trưởng thành.
- Toutou: Ngọt cực cao, Vui cao, nhưng confidence thấp.

### 6.2. Shape Language

Các nhóm có thể dùng:

- Mềm: Puffy, Cloud, Pillow, Slouchy, Rounded
- Gọn: Mini, Compact, Clean, Structured
- To: Oversized, Shopper, Tote, Carry-all
- Kỳ quặc: Odd-shaped, Sculptural, Asymmetric, Blob
- Cổ điển: Satchel, Baguette, Hobo, Bucket, Doctor bag
- Modular: Detachable pouch, Multi-strap, Charm system, Convertible

Cách thể hiện:
- Icon/tag trong brand panel.
- Filter shape.
- Badge nhỏ trên node.
- Portfolio summary dựa trên SKU sampling.

Với ngành túi xách, shape language rất quan trọng vì mood không đủ. Hai brand cùng "cool" có thể khác nhau hoàn toàn nếu một brand là structured mini bag còn brand kia là oversized shopper.

MateMade nên được đọc mạnh ở `Modular / Charm system / Soft-rounded / Compact-daily`.

### 6.3. Outfit Role

Các vai trò:

- Túi là phụ kiện nền: Neutral, Everyday, Goes-with-everything
- Túi là điểm nhấn: Pop accent, Color statement, Charm focus
- Túi là nhân vật chính: It-bag, Statement, Sculptural
- Túi là đồ chơi cá nhân: Customizable, Charmable, Modular
- Túi là biểu tượng gu: Minimal code, Cool-girl code, Luxury code

Đây là lớp chiến lược nhất, vì nó dịch sản phẩm sang hành vi người dùng.

Với MateMade, cơ hội mạnh có thể diễn đạt lại là:

> Túi không chỉ đựng đồ, mà là đồ chơi cá nhân hóa trong outfit hằng ngày.

Đây là insight mạnh hơn việc chỉ nói "sweet + utility".

---

## 7. Gợi ý kiến trúc dữ liệu mới

Không cần đổi cấu trúc map chính. Có thể bổ sung object cho mỗi brand:

```json
{
  "id": "matemade",
  "position": {
    "x": -0.78,
    "y": -0.06,
    "tier": 2,
    "territory_key": "W",
    "modifier": "Charmable self-expression / modular candy cue"
  },
  "benchmark_type": "brand_benchmark",
  "confidence": "high",
  "evidence_strength": {
    "official": true,
    "marketplace": true,
    "social": true,
    "press": true,
    "ugc": false,
    "sku_sample_size": 12
  },
  "emotional_codes": {
    "sweet": 5,
    "playful": 4,
    "romantic": 2,
    "cool": 1,
    "mature": 2,
    "edgy": 0,
    "artistic": 1,
    "crafted": 1
  },
  "shape_language": {
    "soft": 4,
    "compact": 4,
    "oversized": 2,
    "odd": 1,
    "classic": 2,
    "modular": 5
  },
  "outfit_role": {
    "background_accessory": 2,
    "pop_accent": 4,
    "main_character": 2,
    "personal_toy": 5,
    "taste_symbol": 3
  },
  "notes": "MateMade strongest opportunity is modular candy utility: a daily bag that behaves like a personalizable toy."
}
```

---

## 8. Gợi ý UI / App

Không nên làm app rối. Nên thêm `Lens Mode`.

Các lens có thể gồm:

1. Position: Tier × Territory
2. Confidence
3. Benchmark Type
4. Emotion
5. Shape
6. Outfit Role
7. Price / Accessibility

Khi bật lens:
- Node đổi màu theo layer.
- Panel hiển thị radar/tag tương ứng.
- Có filter brand theo code.
- Territory dossier vẫn giữ, nhưng thêm phần "dominant emotional/shape/outfit codes".

---

## 9. Việc nên yêu cầu Claude làm tiếp

Yêu cầu Claude không thay ma trận chính ngay, mà làm các việc sau:

1. Audit lại 21 brand theo evidence matrix.
2. Đề xuất schema semantic layer cho:
   - emotional codes
   - shape language
   - outfit role
   - benchmark type
   - evidence strength
3. Chấm thử 21 brand theo thang 0-5 cho từng nhóm.
4. Ghi rõ nguồn cho từng brand:
   - official website
   - marketplace
   - Instagram/TikTok/Facebook
   - press/retailer
   - UGC/review nếu có
5. Đề xuất chỗ nào cần chỉnh tọa độ hoặc confidence.
6. Không đổi trục chính trừ khi có lý do rất mạnh.
7. Tách rõ "brand benchmark thật" khỏi "trend/IP cluster" và "category-adjacent".

---

## 10. Kết luận chiến lược

Ma trận hiện tại có nền tảng tốt. Hướng nâng cấp tự nhiên nhất không phải là đổi trục, mà là bổ sung các lớp đọc giúp ma trận trả lời sâu hơn:

- Brand nằm ở đâu?
- Vì sao nó nằm ở đó?
- Nó dùng mã cảm xúc nào?
- Nó dùng shape language nào?
- Nó đóng vai trò gì trong outfit?
- Nó là benchmark thật, category-adjacent, hay trend cluster?
- Dữ liệu về nó chắc đến mức nào?

Với MateMade, hướng chiến lược vẫn nên tiếp tục xoay quanh:

> Modular Candy Utility

Diễn giải sâu hơn:

> Một chiếc túi daily-accessible, ngọt và vui vừa đủ, có khả năng cá nhân hóa bằng charm/module, đóng vai trò như "đồ chơi cá nhân trong outfit hằng ngày" thay vì chỉ là túi đựng đồ hoặc phụ kiện nền.

---

## 11. Bổ sung sau visual audit ảnh trong `research-brands/`

Sau khi bổ sung ảnh cho toàn bộ 21 brand trong folder `research-brands/`, cần audit visual trước khi push ảnh vào ma trận. Kết luận tổng quan: **visual mới không làm ma trận cần đổi lớn**. Phần lớn ảnh đang củng cố định vị đã chốt trong `positions-final-reconciled.md`.

Lưu ý: audit này chỉ dựa trên visual ảnh hiện có trong folder, chưa thay thế cho research nguồn đầy đủ. Một số ảnh là screenshot/collage từ social/website, nên tốt cho cảm nhận brand world nhưng yếu hơn packshot/SKU riêng lẻ khi đọc shape language chi tiết.

### 11.1. Kết luận tổng quan từ visual

- Có thể giữ hệ trục và logic `Tier × Territory × Modifier`.
- Không cần dịch chuyển lớn tọa độ của 21 brand.
- Visual củng cố hướng chiến lược `Modular Candy Utility` của MateMade.
- Nên tiếp tục bổ sung `confidence`, `benchmark_type`, `emotional_codes`, `shape_language`, `outfit_role` để ma trận đọc sâu hơn.
- Trước khi push ảnh, cần kiểm tra vài file/brand có rủi ro thấp về tính đại diện hoặc đúng-brand.

### 11.2. Đánh giá visual theo từng brand

| Brand | Đánh giá visual | Khuyến nghị |
|---|---|---|
| MateMade | Rất đúng sweet/playful/charm/modular. Nhiều pastel, pink, heart, bow, flower, pillow/quilt, charm system. Có cả form daily/neutral hơn nhưng không làm mất code chính. | Giữ vị trí. Nên nhấn thêm `charmable / personal toy / modular` trong modifier hoặc semantic layer. |
| Vascara | Polished, resort, professional, commercial, mass. Visual sạch, trưởng thành nhẹ, không quá statement. | Giữ core mass, hơi polished/công sở/resort. |
| Juno | Campaign mới có yếu tố ngọt/pop hơn, pastel/blue/pink và styling idol-like, nhưng tổng thể vẫn commercial mass feminine. | Giữ core. Có thể thêm note: `mass feminine with seasonal sweet/pop campaign`. |
| Hapas | Giftable, polished, feminine, mass aspiration. Visual có nhiều set quà, màu pastel/neutral, túi dễ dùng. | Giữ core, confidence medium hợp lý. |
| Yuumy | Daily, value, functional, nhiều tote/shoulder cơ bản, màu trung tính và styling phổ thông. | Giữ S Functional/Value. |
| Camelia | Minimal utility/canvas rõ, nhiều tote/crossbody tiện dụng, màu cơ bản. Tuy nhiên có file `Mate Mết.jpg` cần xác nhận đúng brand vì tên file gợi khả năng nhầm. | Giữ S Functional/Value, nhưng kiểm tra lại file nghi nhầm trước khi push. |
| Lesac | Minimal daily, clean, young, dễ phối, có utility vừa phải. Visual phù hợp young minimal daily hơn là statement. | Giữ E / young minimal daily. |
| Oui | Leather daily, muted, practical, charm nhẹ, ít "kẹo" hơn MateMade. Visual nghiêng daily leather hơn cute extreme. | Giữ x đã kéo về gần tâm hơn, không cần ngọt quá. |
| Vanwalk | Campus cute utility rất rõ: pastel, backpack, travel/school, preppy, playful. | Giữ SW/S, tier 2 hợp lý. |
| Samantha Vega | Kawaii-chic, pastel, girlish, polished, có charm/collab cue. Ngọt hơn cool, nhưng tinh chỉnh hơn Toutou. | Giữ NW romantic/kawaii-chic. |
| Carlyn | Puffer/soft hobo code rõ, nhưng styling vẫn daily accessible. Visual củng cố trạng thái ranh tier 1-2. | Có thể giữ tier 2 nếu xét signature puffer; panel nên ghi `brand-wide daily; signature puffer line gives tier 2 coded-aesthetic status`. |
| Karatta | Visual nghiêng minimal/design hơn cute; có form lạ/playful nhẹ nhưng tổng mood là design object, neutral/cool hơn vị trí cũ. | Final `x=-0.25` hợp lý. Nếu muốn sát visual mới hơn có thể nhích x về khoảng `-0.15`, nhưng chưa bắt buộc. |
| Floralpunk | Urban/editorial/minimal, nhiều black/brown, structured, polished, ít craft/romantic. | Giữ NE. Visual ủng hộ bản final hơn bản cute/trendy cũ. |
| Ngaos | Romantic/coquette/craft rất rõ: pastel, bow, embroidery, feminine styling, soft visual world. | Giữ NW, y cao. |
| Ther Gab | Soft sculptural/design leather rõ; heritage không phải lúc nào cũng lộ trực diện bằng visual, nhưng form và craft/design mạnh. | Giữ N. Có thể chỉnh modifier từ `VN heritage self-expression` sang `soft sculptural Vietnamese design / heritage-informed craft` nếu muốn tinh hơn. |
| Chautfifth | Statement/design đúng, nhưng visual campaign pop/colorful/playful hơn cách gọi `restrained` thuần. Có nhiều sắc màu, pose/editorial, shape lạ. | Giữ NE. Modifier nên cân nhắc `contemporary statement / playful editorial` thay vì quá quiet/restrained. |
| Stand Oil | Seoul cool/minimal đúng, nhưng social styling trẻ, fashion-daily, có màu sắc và pop cue. | Giữ E. Không nên đọc như quiet luxury quá nghiêm; nên là `daily fashion cool / sculptural practicality`. |
| Mossdoom | Korean-look mass/minimal, daily, affordable vibe, nhiều hobo/shoulder/bowling dễ dùng. | Giữ E nhưng y âm/value-daily là đúng. |
| Spoiled | Sporty/travel/urban accessory, logo/drop culture rõ, nhiều bối cảnh street/travel. | Giữ SE, `category_adjacent=false` đúng. Có thể y không cần thấp như Saigon Swagger vì vẫn là accessory bag. |
| Saigon Swagger | Street/utility/carry-system khác hệ rõ: dark, wallet/crossbody/backpack, utilitarian/streetwear. | Giữ `category_adjacent=true`; dùng như đối chiếu category-adjacent, không phải benchmark túi nữ trực diện. |
| Toutou | Chỉ có 1 ảnh, visual cute/trendy nhưng chưa đủ kiểm chứng brand identity hoặc portfolio. | Giữ `confidence=low`, gọi là `trend/IP cluster` hoặc `low-confidence trend reference`, không dùng làm benchmark chuẩn. |

### 11.3. Những thay đổi nhẹ đáng cân nhắc sau visual audit

Không cần đổi lớn, nhưng nếu muốn ma trận tinh hơn có thể cân nhắc:

- **Karatta:** giữ final hiện tại là ổn; có thể nhích nhẹ từ `x=-0.25` sang khoảng `x=-0.15` nếu ưu tiên visual mới vì brand nhìn design/minimal hơn cute.
- **Ther Gab:** giữ tọa độ, nhưng modifier nên mềm hơn: `soft sculptural Vietnamese design / heritage-informed craft`.
- **Chautfifth:** giữ tọa độ, nhưng modifier nên bớt "restrained" thuần và thêm `playful editorial / contemporary statement`.
- **Stand Oil:** giữ tọa độ, nhưng mô tả nên là `daily fashion cool / sculptural practicality`, không phải quiet luxury lạnh.
- **Juno:** giữ core, nhưng note seasonal campaign có thể ngọt/pop hơn hình ảnh mass thông thường.
- **Spoiled:** giữ SE và `category_adjacent=false`; nếu cần tinh chỉnh, tránh kéo y xuống quá gần Saigon Swagger vì Spoiled vẫn là fashion accessory.

### 11.4. Điểm cần kiểm tra trước khi push ảnh

1. Kiểm tra file `research-brands/camelia/Mate Mết.jpg` có đúng là Camelia không.
2. Toutou chỉ có 1 ảnh, nên vẫn phải hiển thị như low-confidence trend reference.
3. Một số ảnh là screenshot/collage nhỏ; tốt cho brand mood nhưng không đủ để đọc từng SKU/shape. Nếu muốn đọc shape language chính xác, nên bổ sung thêm packshot riêng cho từng dòng sản phẩm chính.
4. Có thể push ảnh sau khi kiểm tra các điểm trên, vì visual nhìn chung **khớp với định vị hiện tại**.

# Expansion Research — Japan / Korea / Thailand Brands

> Ngày: 2026-06-18  
> Mục đích: bổ sung 8 brand Nhật, Hàn, Thái vào MateMade Brand Territory Matrix.  
> Trạng thái: đã đưa vào `matemade-matrix.html` dạng **first-pass research placement**; 8 folder ảnh đã tạo trong `research-brands/` nhưng hiện chưa có ảnh, nên app hiển thị placeholder.

---

## 1. Tóm tắt quyết định

| Brand | Quốc gia | Tọa độ đề xuất | Tier | Territory | Vai trò trong ma trận |
|---|---:|---:|---:|---|---|
| Aeta | Nhật | `(0.35, 1.02)` | 3 | N | Quiet craft-minimal benchmark |
| OSOI | Hàn | `(0.85, 0.82)` | 3 | NE | Sculptural Seoul minimal benchmark |
| Vunque | Hàn | `(0.70, 0.32)` | 3 | E | Polished Korean leather daily |
| Marge Sherwood | Hàn | `(0.62, 0.58)` | 3 | NE | 90s downtown soft leather |
| minitmute | Hàn | `(0.72, 0.05)` | 2 | E | Compact minimal daily cool |
| LYN | Thái | `(0.35, -0.05)` | 1 | CORE | Accessible polished Thai high-street |
| Pipatchara | Thái | `(0.10, 1.22)` | 4 | N | Sustainable craft / community art-piece |
| Jelly Bunny | Thái | `(-0.30, -0.42)` | 1 | SW | Cute accessible Thai daily |

**Kết luận:** 8 brand này mở rộng tốt bản đồ hiện tại mà không làm thay đổi logic nền. Chúng bổ sung vùng mature craft-minimal (Aeta), sculptural Seoul minimal (OSOI), Korean leather/cool-girl midrange (Vunque, Marge Sherwood, minitmute), Thai mass polished (LYN), Thai craft sustainability (Pipatchara), và Thai cute accessible (Jelly Bunny).

---

## 2. Nghiên cứu từng brand

### 2.1. Aeta

**Nguồn chính**
- Official store: `https://store.aeta.website/`
- Retailer profile: `https://www.namu-shop.com/collections/aeta`

**Bằng chứng**
- Official store có các nhóm `Leather Basket`, `NYLON Collection`, `Tote`, `Shoulder`, `Boston`, `Rucksack`, `Waist bag`, `Wallet & Other`.
- Namu Shop mô tả Aeta là minimalist leather goods/accessories brand tại Osaka, Nhật; collection là free forms, có timeless aesthetic, high quality material/construction, playful details.

**Diễn giải định vị**
- Không phải sweet/cute hay mass daily.
- Điểm mạnh nằm ở form discipline, chất liệu, cấu trúc, craft-minimal.
- Gần Ther Gab / Chautfifth ở trục design/craft nhưng mature và quieter hơn.

**Chốt trong app**
```json
{"id":"aeta","x":0.35,"y":1.02,"tier":3,"terr":"N","modifier":"Quiet Japanese craft minimal"}
```

---

### 2.2. OSOI

**Nguồn chính**
- Official about: `https://en.osoi.co.kr/about.html`
- Official bag category: `https://osoi.co.kr/category/bag/42/`
- Instagram: `https://www.instagram.com/osoi_official/`

**Bằng chứng**
- Official about nói OSOI cung cấp timeless value dựa trên uniquely original design, không quá nhạy với trend, vượt khỏi vai trò đơn thuần của bag/shoes brand để đề xuất distinctive style.
- Official cũng nhấn fresh impact qua materials, colours, details mỗi mùa.
- Bag page có các dòng Shoulder Brocle, Shell Brot, Boat Wide Mini, Lip Tote, Toni, Biscuit.

**Diễn giải định vị**
- Rõ hơn Stand Oil về design object/hardware.
- Ít decoration, nhưng shape/hardware tạo signature mạnh.
- Nằm NE vì cool-minimal nhưng editorial/sculptural hơn E daily.

**Chốt trong app**
```json
{"id":"osoi","x":0.85,"y":0.82,"tier":3,"terr":"NE","modifier":"Sculptural Seoul minimal"}
```

---

### 2.3. Vunque

**Nguồn chính**
- Official bag category: `https://en.vunque.com/category/bag/24/`
- Official line/category pages: `https://en.vunque.com/category/line/225/`
- Instagram: `https://www.instagram.com/vunque_official/`

**Bằng chứng**
- Official bag page có 174 products, bao gồm Bag, Wallet, Strap, Acc.
- Product examples: Toque Hermit Cross, Perfec Button Up Flow Hobo, Hey Round One Pocket Shoulder, Magpie wallet, Occam Shell Vintage Hobo, Halfmoon Flac, Toque Square Tote.
- Giá official site khoảng $160–370 cho nhiều item bag/wallet.

**Diễn giải định vị**
- Polished Korean leather, mature hơn minitmute/Carlyn.
- Vẫn wearable/commercial, không statement như OSOI.
- Nằm E, sát NE nhưng thấp hơn về y.

**Chốt trong app**
```json
{"id":"vunque","x":0.70,"y":0.32,"tier":3,"terr":"E","modifier":"Polished Korean leather daily"}
```

---

### 2.4. Marge Sherwood

**Nguồn chính**
- Official site: `https://margesherwood.com/`
- Official bags category: `https://margesherwood.com/category/bags/154/`
- Instagram: `https://www.instagram.com/margesherwood_official/`

**Bằng chứng**
- Official category có nhiều shape line rõ: Grandma Used, Dumpling Tote, Soft Boston, Soft Bowling, Soft Tote, Hobo, Outpocket Hobo, Belted Hobo, Bessette Shoulder, Ribbon Pochette, Boat Shopper, City Hobo, Overpacker.
- Product examples có Soft Boston EW Mini Piping, Grandma Used Shoulder Bag, mức giá KRW 269k–398k.
- Homepage/brand snippet mô tả mood 90s và cultural sensitivity.

**Diễn giải định vị**
- Có signature qua retro/90s shape code.
- Cool/downtown, có material treatment và shape rõ.
- Nằm NE nhưng mềm hơn OSOI, ít architectural hơn.

**Chốt trong app**
```json
{"id":"marge_sherwood","x":0.62,"y":0.58,"tier":3,"terr":"NE","modifier":"90s downtown soft leather"}
```

---

### 2.5. minitmute

**Nguồn chính**
- Official KR: `https://minitmute.com/`
- Official US bags: `https://minitmute.us/collections/bags`
- Instagram: `https://www.instagram.com/minitmute/`

**Bằng chứng**
- Official navigation chia bag thành All Bags, Totes, Crossbody Bags, Mini Bags, Shoulder Bags, minitmute sporty.
- Product examples: Clo Pane, New Box, Soft Chain, Tobo Shoulder, Tobo Bag.
- Giá official US khoảng $190–408; official KR list có soft chain, new box, clo shoulder, tobo shoulder.
- Site footer xác nhận địa chỉ Seoul và © 2015 minitmute.

**Diễn giải định vị**
- Compact, minimal, daily-cool.
- Ít statement hơn OSOI/Marge Sherwood, nhưng có coded aesthetic đủ rõ.
- Nằm E, tier 2.

**Chốt trong app**
```json
{"id":"minitmute","x":0.72,"y":0.05,"tier":2,"terr":"E","modifier":"Compact minimal daily cool"}
```

---

### 2.6. LYN

**Nguồn chính**
- Vietnam official store: `https://lynvn.com/`
- Thai high-street profile: `https://mega-asia.com/magazine/meet-thai-high-street-brand-lyn/`
- Collection page: `https://www.lynaccs.com/en/collections/view-bags`

**Bằng chứng**
- LYN VN menu có Bags, Wallets, Shoes, Accessories; các product examples gồm Re-Edit Stitched Handbag, Mila Shoulder Bag, New Gastonia Shoulder Bag, Fontia Mini Crossbody, Rosis Tote.
- MEGA Asia mô tả LYN là Thai high-street accessories brand, established 2001, part of Jaspal Company Limited, created for women passionate about fashion and trends.
- MEGA cũng ghi triết lý của LYN là fashion/luxury accessible về cả price và design; Jaspal có hơn 400 shops ở Southeast Asia.

**Diễn giải định vị**
- Đây là benchmark mass polished SEA, gần Vascara/Juno/Hapas hơn nhóm design-led.
- Trend-led, polished, accessible, category breadth rộng.
- Nằm CORE/E nhẹ, tier 1.

**Chốt trong app**
```json
{"id":"lyn","x":0.35,"y":-0.05,"tier":1,"terr":"CORE","modifier":"Accessible polished Thai high-street"}
```

---

### 2.7. Pipatchara

**Nguồn chính**
- USD store: `https://store-usd.pipatchara.com/`
- Thai store: `https://pipatchara.com/`
- Instagram: `https://www.instagram.com/pipatchara/`

**Bằng chứng**
- Official USD store ghi 100% Italian Calf Leather, Handmade Macrame.
- Official nói có customized-your-own-bag proposition.
- Official brand text nói họ không chỉ xem mình là fashion brand mà là brand for the community; mỗi sản phẩm được local community ở nhiều vùng Thái Lan làm, gồm hoạt động dạy knot/weave patterns để tạo việc làm.
- Product examples: Infinitude Jade Bag $830, Infinitude Moon Bag $750.

**Diễn giải định vị**
- Xa MateMade về price/tier/category intensity.
- Nằm N mạnh: craft, sustainability, community, art-piece, customization.
- Tier 4 vì tệp hẹp, story mạnh, premium.

**Chốt trong app**
```json
{"id":"pipatchara","x":0.10,"y":1.22,"tier":4,"terr":"N","modifier":"Sustainable craft art piece"}
```

---

### 2.8. Jelly Bunny

**Nguồn chính**
- Official site: `https://jellybunny.com/en`
- Official bags category: `https://jellybunny.com/en/collections/view-bags`

**Bằng chứng**
- Official navigation có Bags & Accessories, Bags, Wallets, Accessories.
- Official category copy/search result mô tả bags cute/practical cho women & teens, colorful/trendy designs.
- Product examples: Roewis Crossbody Bag, Rene Backpack, Rondo Crossbody, Samma Shoulder Bag.
- Collection navigation có IP/collab folders như The Powerpuff Girls, Kuromi, Tom and Jerry, Jeremy Capsule.

**Diễn giải định vị**
- Cute, practical, accessible, teen/women mass.
- Có IP/collab energy nhưng là retail brand rõ hơn Toutou.
- Nằm SW gần W/S, tier 1.

**Chốt trong app**
```json
{"id":"jelly_bunny","x":-0.30,"y":-0.42,"tier":1,"terr":"SW","modifier":"Cute accessible Thai daily"}
```

---

## 3. Nguồn tham khảo nhanh

- Aeta official: https://store.aeta.website/
- Aeta retailer profile: https://www.namu-shop.com/collections/aeta
- OSOI about: https://en.osoi.co.kr/about.html
- OSOI bags: https://osoi.co.kr/category/bag/42/
- Vunque bags: https://en.vunque.com/category/bag/24/
- Marge Sherwood bags: https://margesherwood.com/category/bags/154/
- minitmute bags: https://minitmute.us/collections/bags
- LYN VN: https://lynvn.com/
- LYN / MEGA Asia profile: https://mega-asia.com/magazine/meet-thai-high-street-brand-lyn/
- Pipatchara USD: https://store-usd.pipatchara.com/
- Pipatchara TH: https://pipatchara.com/
- Jelly Bunny official: https://jellybunny.com/en
- Jelly Bunny bags: https://jellybunny.com/en/collections/view-bags

---

## 4. Việc nên làm tiếp

1. Bổ sung ảnh cho 8 folder mới trong `research-brands/`.
2. Chạy lại `gen-research-manifest.ps1` sau khi thêm ảnh.
3. Visual audit 8 brand mới giống quy trình v1.0 trước khi chốt final.
4. Nếu có ảnh thực tế, kiểm tra lại các vị trí có thể nhạy:
   - Aeta: có thể dịch x gần 0 hơn nếu visual thiên craft-neutral hơn cool.
   - Vunque: có thể tăng y nếu visual shell/hardware statement hơn dự đoán.
   - minitmute: có thể dịch xuống daily hơn nếu portfolio thực tế quá basic.
   - Jelly Bunny: kiểm tra mức IP/collab để tránh nhầm với trend_cluster.

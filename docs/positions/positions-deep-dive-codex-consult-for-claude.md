# Codex Deep-Dive Consultation for Claude

> Date: 2026-06-21  
> Scope: independent second-pass audit of the current `FINAL_POS` coordinates in `matemade-matrix.html`.  
> Purpose: provide a consultative memo for Claude/user reconciliation only. No code/app changes are implied by this document.

## 1. Executive summary

After a broader source pass, I agree with most of Claude's latest coordinate changes. The strongest improvements are:

- **Stand Oil**: moved much closer to MateMade than the old cool-minimal placement. This is well supported by the current product range.
- **Karatta**: moved back toward romantic/playful decorated craft rather than neutral design object. This is well supported by the official lookbook.
- **Carlyn**: moved rightward from cute puffer into soft Korean daily/cool. This is directionally correct.
- **Floralpunk**: lowered from high statement to moderate urban polish. This is more objective if Downtown Shopper is treated as the anchor.
- **minitmute**: moved near the center as soft compact Korean daily. This is supported by its own brand story and product architecture.

However, I recommend reconsidering **four coordinates** and **one origin note** before finalizing:

| Brand | Current `FINAL_POS` | Codex recommendation | Reason |
|---|---:|---:|---|
| MateMade | `[-0.48, -0.08]` | `[-0.55, -0.08]` | Claude is right to pull MateMade inward from `-0.78`, but `-0.48` may understate the real bow/charm/pink-red/sweet naming layer still visible in the live catalog. |
| Hapas | `[0.05, 0.15]` | `[0.10, 0.03]` | More upper-core / mass aspiration than design-led statement. |
| Lesac | `[0.45, 0.15]` | `[0.42, 0.00]` | Minimal direction is right, but `y +0.15` overstates statement/craft for a daily minimal accessible brand. |
| Spoiled | `[0.48, -0.15]` | `[0.52, -0.28]` | Current product language is more sporty/utility/travel than the current y suggests, though still fashion-accessory rather than Saigon Swagger-style carry system. |
| Vanwalk | `[-0.88, -0.46]` | keep coordinate, revise origin note | Coordinate is sound, but source evidence supports "Vanwalk Taiwan distributor / China-made; legal brand origin still uncertain" more than a confident "Taiwan brand". |

My high-level reading: Claude's latest map is directionally strong. The risk now is subtle overcorrection: a few brands have been moved too far toward "less sweet" or "more statement" based on selective recent product pages.

## 2. Method

I treated the current `FINAL_POS` as a hypothesis and checked against:

- Official brand pages and live product/category pages.
- Marketplace pages where official sites are thin or not indexable.
- Retailer/press pages for international Korean/Japanese/Thai brands.
- Product naming, material, price, silhouette, carrying use-case, and campaign language.

I did not use `derived-coordinates.json` as a decision source because that file currently appears to be an AI-scored broad benchmark set, while the live app uses `FINAL_POS` in `matemade-matrix.html`.

Coordinate interpretation used in this memo:

- **x axis**: Cute / Sweet / Playful `(-)` to Cool / Minimal / Polished `(+)`.
- **y axis**: Daily / Utility / Value `(-)` to Statement / Design / Craft `(+)`.
- Recommendation is relative, not absolute. The goal is to preserve meaningful distances between brands.

## 3. Brand-by-brand audit

## 3.1. MateMade

Current:

```js
matemade: [-0.48, -0.08]
```

Recommendation:

```js
matemade: [-0.55, -0.08]
```

Confidence: **medium-high**

Claude's reasoning is substantially right: MateMade should not remain at the old `x -0.78` if the live catalog is the main evidence. The official shoulder-bag category shows many neutral and earth colors: black, tan, white, navy, grey, burgundy, beige, brown, cream. Product lines such as Charm Mocha, Cloudy No, Cinnamon, Ember, Half-moon Hobo, Iris, Lume, Slim rectangle are mostly PU daily bags in the 720k-790k VND range. This supports a more daily, softer, more neutral MateMade than an extreme candy-kawaii reading.

But I think `x -0.48` may pull MateMade slightly too close to core. The same official catalog still contains several active sweet cues:

- Product naming: **Charm**, **Cloudy No**, **Lume Dai No**, **TXT Sac**, **Valentine**, **Tet**, **I'm Cool For School**.
- Color variants include pink, red, red plum, cream, soft blue-grey, and white, not only black/brown/neutrals.
- Several product names explicitly include **No** (bow) and charm language.
- MateMade is still materially closer to the sweet/charm side than Hapas, Lesac, Vascara, or Juno.

Therefore, I agree with the inward move but would keep a little more negative x:

- Old reconciled: `[-0.78, -0.06]` felt too sweet.
- Claude latest: `[-0.48, -0.08]` feels slightly too neutral.
- Codex recommendation: `[-0.55, -0.08]` keeps MateMade on the W/SW border while acknowledging the more neutral daily product reality.

The y value `-0.08` is good. The catalog is daily, PU, accessible, and functional enough that it should not move upward into design/craft territory.

Sources:

- MateMade shoulder-bag category: `https://matemade.vn/collections/tui-deo-vai-1`
- MateMade TXT Sac product: `https://matemade.vn/products/txt-sac-sz-24`
- MateMade TXT Luna product: `https://matemade.vn/products/txt-luna-chu-nhat-dang-ngan-sz-24`

## 3.2. Hapas

Current:

```js
hapas: [0.05, 0.15]
```

Recommendation:

```js
hapas: [0.10, 0.03]
```

Confidence: **high**

I think Hapas should remain in **upper core / mass aspiration**, not move meaningfully upward on y.

The La Muse evidence supports:

- Mass giftability: "Mua 1 Duoc 5", free box/gift/perfume bundle, COD, warranty, 18.2k sold.
- Price around 933k VND in the checked campaign page.
- A polished feminine handbag with PU softness, tag detail, and gift packaging.
- Strong mass-market conversion language rather than design/craft language.

This is more elevated than Juno/Yuumy in price and presentation, so a slight positive x and slight positive y are fine. But `y +0.15` implies a design/statement delta that I do not see strongly enough. It is not as utility/value-led as Yuumy or Camelia, but also not close to Karatta/Floralpunk/Chautfifth.

Recommended reading:

- `x 0.10`: a little polished/aspirational, still mass feminine.
- `y 0.03`: barely above core, reflecting giftable polish but not design-led statement.

Source:

- Hapas La Muse campaign/product page: `https://online.hapas.vn/lamusemon`

## 3.3. Lesac

Current:

```js
lesac: [0.45, 0.15]
```

Recommendation:

```js
lesac: [0.42, 0.00]
```

Confidence: **high**

The x direction is correct: Lesac is explicitly positioned around minimality. The official site labels it **MINIMAL BAGS BRAND**, and the general language is natural beauty, confidence, and specially designed bags for women. Social snippets and product references also point to compact, smart compartments, daily carry, and minimalist style.

The issue is y. I do not see enough evidence for `y +0.15`. Lesac reads as:

- Minimal young daily.
- Accessible/local.
- Functional and easy-to-style.
- More cool/minimal than Hapas/Juno, but not design-object/craft.

Compared with minitmute `[0.30, 0.12]`, Lesac should be cooler/more minimal but less craft/material-led. Compared with Stand Oil `[0.42,0.20]`, Lesac has less brand signature and less international design legitimacy. Therefore `y 0.00` is cleaner and keeps it from drifting into statement space.

Source:

- Lesac official: `https://lesac.vn/`

## 3.4. Spoiled

Current:

```js
spoiled: [0.48, -0.15]
```

Recommendation:

```js
spoiled: [0.52, -0.28]
```

Confidence: **medium-high**

Claude's newest direction is better than the earlier "premium fashion accessory" reading. Spoiled is not quiet E minimal; it clearly has a street/sporty accent. But I would pull it slightly lower on y.

Evidence from the official site:

- About page: Vietnamese fashion accessories brand, founded 2022, specializing in premium accessory bags.
- Product mix includes **Mini League Bag**, **Sporty Travel Bag**, **Mini Sporty Bag**, **D Travel Bag**, **Bowling Bag**, **Mini Trunk**.
- Sport Travel Bag language: "sporty energy", "athletic chic", "weekend getaways and everyday hustle", roomy silhouette, multiple inner compartments.
- League Bag language: "luxe croc-embossed vegan leather", "sharp, structured silhouette", multiple inner compartments.
- Mini League Bag language: "varsity-cool edge", "everyday flair", standout lettering.

This implies Spoiled sits between:

- Fashion accessory with edge.
- Sporty/varsity/street branding.
- Practical travel/tote organization.

It should not be category-adjacent like Saigon Swagger because it remains a fashion accessory bag brand, not a backpack/carry-system brand. But `y -0.15` feels a bit too close to neutral/design. I would set `y -0.28` to reflect sporty/travel/daily function. I would set `x 0.52` because the brand is more cool/street/polished than cute.

Sources:

- Spoiled about: `https://spoiledworldwide.com/about/`
- Spoiled homepage/product mix: `https://spoiledworldwide.com/`
- Sporty Travel Bag: `https://spoiledworldwide.com/product/sport-travel-bag-black-2/`
- League Bag: `https://spoiledworldwide.com/product/league-bag-tui-local-brand-matte-black/`
- Mini League Bag: `https://spoiledworldwide.com/product/mini-league-bag-matte-red/`

## 3.5. Vanwalk

Current:

```js
vanwalk: [-0.88, -0.46]
```

Recommendation:

```js
vanwalk: [-0.88, -0.46]
```

But revise note:

```text
Vanwalk Taiwan distributor / China-made; legal brand origin still uncertain.
```

Confidence on coordinate: **high**  
Confidence on origin: **low-medium**

The coordinate is good. Pinkoi pages show a very strong dreamy/kawaii/campus utility universe:

- Lucky Star Series.
- Sheep Fantasy Shoulder Bag.
- Happy Band Moonlight Diva Transparent Backpack.
- Star Wing Backpack.
- Star/jelly/wing/fantasy language.
- Cute pendants, musical note embroidery, transparent compartment, school/backpack tags.

This clearly supports high sweetness and utility/daily school use: `x -0.88`, `y -0.46`.

The problem is origin. Claude's note confidently says Taiwan origin. The evidence is more mixed:

- Pinkoi brand profile says "Vanwalk Taiwan" and shop location Taiwan.
- Product detail often says "Where it's made: mainland China".
- One Pinkoi listing says the product is designed and produced by "Vanwalk," an original Chinese brand, legally imported/sold under authorization.

Therefore the safer wording is not "Taiwan brand, not China". I would say:

> Vanwalk appears through a Taiwan Pinkoi storefront/distributor, with products made in mainland China; legal brand origin still needs verification.

Sources:

- Vanwalk Lucky Star / Sheep Fantasy: `https://en.pinkoi.com/product/dnqQNJEP`
- Vanwalk Happy Band / Moonlight Diva: `https://en.pinkoi.com/product/B2URUiPc`
- Vanwalk Brilliant Star Jelly Bag: `https://en.pinkoi.com/product/bqSGS33k`
- Vanwalk pencil case with explicit "original Chinese brand" wording: `https://en.pinkoi.com/product/dTnKZZnr`

## 3.6. Stand Oil

Current:

```js
standoil: [0.42, 0.20]
```

Recommendation:

```js
standoil: [0.42, 0.20]
```

Confidence: **high**

Claude's latest correction is strongly supported. Stand Oil should not sit near `[0.99, 0.37]` if the current product range is weighted heavily.

Evidence:

- Official brand statement: "daily life full of inspiration", "reimagining everyday moments", "elevates the ordinary".
- Current global bag range includes many affordable daily/playful lines: Breezy, Lene, Tovi, Tickle, Mio, Mushy, Boat, Mino, Ringo.
- Price points in current global listing often sit around KRW 59k-129k, with higher collab pieces around KRW 189k-249k.
- Collabs with Collina Strada and Huh Yunjin add youth/pop/cultural energy, not pure quiet minimalism.
- Chubby Bag is explicitly a round retro bowling style bag, not a severe minimal leather object.

`[0.42,0.20]` is a good compromise:

- x positive because it is still Seoul/cool and more polished than MateMade.
- y modest positive because form and styling are design-aware, but product remains daily/affordable/trend-forward.

Sources:

- Stand Oil about: `https://en.standoil.kr/about.html`
- Stand Oil global bag range: `https://standoil.global/collections/bag`
- Stand Oil all products: `https://standoil.global/collections/all-1`
- Chubby Bag: `https://standoil.global/products/chubby-bag-black`

## 3.7. Carlyn

Current:

```js
carlyn: [-0.26, 0.03]
```

Recommendation:

```js
carlyn: [-0.26, 0.03]
```

Confidence: **medium-high**

The latest coordinate is reasonable. Carlyn is no longer best read as strongly sweet/cute. It is soft, puffy, and accessible, but current brand/product evidence pushes it toward Korean daily-cool:

- W Concept describes CARLYN as based out of New York City and redefining modern/artistic simplicity.
- W Concept Jelly Mini says versatile and everyday, with cute vivid color and voluminous silhouette.
- Official Carlyn categories separate Fabric Line, Leather Line, Small Goods, with language such as daily, natural, cozy, witty, and rhythm of elegance.
- Product list includes Cozy Daily, Soft Daily, Dape Mini, Veil, Plum, etc.

`x -0.26` still acknowledges puffer softness and cute volume, while moving it right from the old `-0.42`. `y 0.03` is right because this is a coded daily signature, not high craft/statement.

Sources:

- W Concept Carlyn brand page: `https://www.wconcept.com/brand/CARLYN/4155.html`
- W Concept Jelly Mini: `https://www.wconcept.com/product/jelly-mini-tote-bag-4-colors/710635931.html`
- Carlyn official/global: `https://carlynmall.net/Mobile/`
- Carlyn category page: `https://carlynmall.net/Mobile/Product/Category/list/cid/101`

## 3.8. Karatta

Current:

```js
karatta: [-0.45, 0.55]
```

Recommendation:

```js
karatta: [-0.45, 0.55]
```

Confidence: **high**

Claude's latest correction is persuasive. Earlier reconciliation had moved Karatta toward more neutral/minimal design. The official lookbook shows a more decorated, romantic, playful product world:

- Lollipop Tag.
- Flower Tag / Bling Tag.
- Airbag Flower.
- Blooming Tote / Blooming Shoulder.
- Loli Bag with Black Lace / Silver Lace variants.
- Black/silver neutral base, but repeated lace/flower/lollipop decoration.

This makes NW / romantic decorated craft more objective than N / neutral design object. The y should remain above core because repeated motif systems and decorated collections create a design signature. The x should remain negative because the emotional code is more girlish/romantic than cool/minimal.

Source:

- Karatta official lookbook: `https://karattaofficial.com/pages/lookbook`

## 3.9. Floralpunk

Current:

```js
floralpunk: [0.20, 0.50]
```

Recommendation:

```js
floralpunk: [0.20, 0.50]
```

Alternative:

```js
floralpunk: [0.22, 0.45]
```

Confidence: **medium**

Claude's lowering from the older `y 0.68-0.80` is justified if Downtown Shopper is the central product anchor. Evidence:

- Downtown Shopper / Downtown Canvas is laptop-capable and daily.
- Mesh/canvas/PU leather trim and removable chain/pearl details create urban polish rather than craft statement.
- Pearl and chain add a fashion signal, but the object still functions as a shopper/tote.

I can accept `[0.20,0.50]`. If final map needs stricter separation from Karatta/Ngaos/Ther Gab/Chautfifth, `[0.22,0.45]` may be even more disciplined.

Sources:

- Floralpunk Downtown Shopper TikTok shop product: `https://shop.tiktok.com/vn/pdp/tui-xach-floralpunk-downtown-shopper-bag-nho-bang-nilon-luoi-kich-thuoc-34-x-28-x-10-5-cm-day-%C4%91/1729566674526571147`
- Floralpunk Instagram / Downtown Canvas evidence: `https://www.instagram.com/p/DY8-CLXlI0f/`
- Floralpunk Facebook video / Downtown Shopper Canvas: `https://www.facebook.com/Floralpunk/videos/whats-in-my-downtown-shopper-canvas-%EF%B8%8Fa-shopper-bag-spacious-enough-for-your-lapt/815837661399120/`

## 3.10. Chautfifth

Current:

```js
chautfifth: [0.40, 0.90]
```

Recommendation:

```js
chautfifth: [0.40, 0.90]
```

Confidence: **high**

Chautfifth has enough statement/design language to justify high y:

- Design philosophy emphasizes restraint, utility, timelessness, and "every line exists for a reason".
- Product/collection structure includes Y2K, Flower, Lace, Bakery, MINMAX, 2-FACE, and charms.
- 2-FACE page explicitly frames one object with two contrasting personalities: maximal side and minimal side.
- Bakery Box / Banhmi Art Edition / 2-FACE entries show shape/system thinking, not just trend accessories.

`x 0.40` is good because it is more cool/editorial than cute but not severe minimalism. `y 0.90` is justified by design system, novelty, and sculptural product language.

Sources:

- Chautfifth Singapore design philosophy: `https://sg.chautfifth.com/pages/design-philosophy`
- Chautfifth 2-FACE page: `https://sg.chautfifth.com/pages/one-bag-two-distinct-personalities`

## 3.11. Ther Gab

Current:

```js
thergab: [-0.05, 0.97]
```

Recommendation:

```js
thergab: [-0.05, 0.97]
```

Confidence: **high**

Ther Gab remains one of the clearest high-y Vietnamese references:

- Official site: "Designed & Made in Vietnam", "Inspired by heritage", "Every bag ... has a story to tell".
- "Duyen & Dieu" brand expression supports cultural/emotional storytelling.
- Press/retail evidence around Singapore/Sift & Pick reinforces cross-border design legitimacy.

The x near neutral is also good: Ther Gab is not very sweet and not very cool-minimal; it is heritage/form/story led.

Sources:

- Ther Gab official: `https://thergab.com/`
- A2E Ship / Ther Gab Singapore story: `https://a2eship.com/en/thergab-takes-singapore-how-a-vietnamese-bag-brand-conquered-sift-pick/`

## 3.12. Yuumy

Current:

```js
yuumy: [0.01, -0.38]
```

Recommendation:

```js
yuumy: [0.01, -0.38]
```

Confidence: **high**

The current coordinate is good. Yuumy is value/daily, but not pure canvas utility. Official evidence:

- Large product breadth: bags, backpacks, wallets, office bags, travel bags.
- Many prices around 289k-620k VND after discount.
- Collections such as Day To Night, Into The Fall, Bring Me Out add feminine seasonal styling.
- Products include synthetic leather, multiple compartments, A4/laptop utility, office use.

`x 0.01` is good because it is not strongly cute or cool. `y -0.38` is good because daily/value and practical use are central.

Sources:

- Yuumy homepage/category: `https://yuumy.vn/`
- Yuumy Into The Fall: `https://yuumy.vn/collections/into-the-fall`
- Yuumy Day To Night: `https://yuumy.vn/collections/yuumy-day-to-night`
- Yuumy office bag YTX20: `https://yuumy.vn/products/tui-xach-nu-cong-so-co-lon-yuumy-ytx20n-mau-nau`

## 3.13. Camelia

Current:

```js
camelia: [0.22, -0.76]
```

Recommendation:

```js
camelia: [0.22, -0.76]
```

Confidence: **high**

The coordinate is appropriate. Shopee Mall evidence shows Camelia's top sellers are backpacks, totes, wallets, laptop sleeves, passport covers, pencil cases, etc. That is a strong utility ecosystem:

- Global Backpack, Basic Backpack, Popular Backpack, New Original Backpack.
- Compact Tote, Boat Tote, Work Tote.
- Very high sold counts on Shopee.

This is more functional/campus/carry-oriented than Yuumy, hence lower y. x positive but modest is fine because the look is minimal/clean rather than cute.

Sources:

- Camelia Shopee Mall: `https://shopee.vn/camelia_vn`
- Camelia search/listing evidence: `https://shopee.vn/list/camelia`

## 3.14. Mossdoom

Current:

```js
mossdoom: [0.70, -0.42]
```

Recommendation:

```js
mossdoom: [0.70, -0.42]
```

Confidence: **medium-high**

Coordinate is credible. Mossdoom is affordable, minimal/classic, practical, and mass-market:

- Wix page states established in 2009 and providing fashionable ladies' bags.
- Shopee Indonesia official shop shows very large following and high-volume affordable products.
- Blibli price evidence shows a broad range around Rp198k-347k and many simple shoulder/crossbody/backpack items.

It should stay cool/minimal positive x, but y negative because price/function/mass distribution dominate.

Important note: the Indonesia/Bandung correction is much better supported than older Thai/CN origin language. But "Korean-look marketing" should be kept as style, not origin.

Sources:

- Mossdoom Wix: `https://mossdoom.wixsite.com/indonesia`
- Mossdoom Shopee Indonesia official: `https://shopee.co.id/mossdoom.official`
- Blibli Mossdoom: `https://www.blibli.com/jual/tas-mossdoom`
- Mossdoom Instagram: `https://www.instagram.com/mossdoom.id/`

## 3.15. Saigon Swagger

Current:

```js
saigonswagger: [0.70, -1.15]
```

Recommendation:

```js
saigonswagger: [0.70, -1.15]
```

Confidence: **high**

The coordinate and `category_adjacent` logic are sound:

- Vietcetera confirms founding around end of 2013 by Thu Ha and Phuong Uyen, with backpacks designed/constructed by founders.
- The brand is tied to Saigon urban/hustle/street identity.
- It is coveted by hypebeasts and office workers, i.e. broad urban carry use.

This is not a feminine handbag benchmark; it is a carry-system/street utility benchmark. Far negative y is correct.

Source:

- Vietcetera profile: `https://vietcetera.com/en/saigon-swagger-hustle-and-bustle-in-a-bag`

## 3.16. Aeta

Current:

```js
aeta: [0.30, 0.88]
```

Recommendation:

```js
aeta: [0.30, 0.88]
```

Confidence: **high**

Namu Shop describes Aeta as Osaka-based minimalist leather goods, with "free forms" inspired by encounters, timeless aesthetic, high-quality material and construction. This supports high y for craft/material/construction and moderately positive x for minimal restraint.

Source:

- Namu Shop Aeta: `https://www.namu-shop.com/collections/aeta`

## 3.17. OSOI

Current:

```js
osoi: [0.82, 0.78]
```

Recommendation:

```js
osoi: [0.82, 0.78]
```

Confidence: **high**

OSOI official language supports unique/original design, timeless value, fresh materials/colors/details, and distinctive style. Retail evidence points to Toni/Toni Mini, moon-like shape, industrial hardware, Brocle/Shell lines. This is clearly sculptural Seoul minimal and should stay high x/high y.

Sources:

- OSOI official about: `https://en.osoi.co.kr/about.html`
- OSOI official bag category: `https://osoi.co.kr/category/bag/42/`
- Monnier Paris OSOI profile: `https://www.monnierparis.com/collections/osoi`
- OSOI Hong Kong about: `https://www.osoi.com.hk/pages/about-osoi-brand-guide`

## 3.18. Vunque

Current:

```js
vunque: [0.78, 0.50]
```

Recommendation:

```js
vunque: [0.78, 0.50]
```

Confidence: **medium-high**

Vunque official shop evidence supports a polished Korean leather/wallet ecosystem with Halfmoon, Occam, Toque, Hey, Boater, Magpie and charm systems. W Concept describes Vunque as proposing Style & Life with customers wherever they are. This is design-aware and polished but more commercial/daily than OSOI. Current coordinate is good.

Sources:

- Vunque official new/category: `https://m.en.vunque.com/category/all/144/`
- W Concept Vunque Halfmoon: `https://www.wconcept.com/product/halfmoon-pocket-minicross-bag/720155565.html`
- Vunque styling page: `https://en.vunque.com/article/styling-mobile/18/9988/`

## 3.19. Marge Sherwood

Current:

```js
marge_sherwood: [0.48, 0.58]
```

Recommendation:

```js
marge_sherwood: [0.48, 0.58]
```

Confidence: **high**

Current coordinate is well supported:

- Founded in 2016 by Sungeun Um and Soonyoung Kim.
- Contemporary handbag label with retro silhouettes in premium leather.
- Practical yet explorative in shape and color.
- Restrained delicacy, contemporary dressing.
- DNA Magazine notes the cinematic muse and contemporary art/modern dance influence.

This is less severe/cool than OSOI, but more design-led than daily mass Korean bags. `[0.48,0.58]` is a good relative placement.

Sources:

- Victor Showroom Marge Sherwood: `https://www.victorshowroom.com/margesherwood`
- DNA Mag: `https://www.dnamag.co/home/5-good-things-by-margesherwood`
- Hypebae Marge Sherwood: `https://hypebae.com/2020/8/marge-sherwood-korean-brand-moss-half-nylon-90s-bag-black-release-price`

## 3.20. minitmute

Current:

```js
minitmute: [0.30, 0.12]
```

Recommendation:

```js
minitmute: [0.30, 0.12]
```

Confidence: **high**

Claude's current coordinate is good. Official minitmute says it started from the idea of making a light and small bag for traveling. Products include Tobo, Clo, Soft Chain, New Box, with Italian leather, quilting, nylon, daily water resistance, and practical construction.

This should not be as far right/high as Stand Oil or Vunque. It is compact, soft, practical, daily-cool.

Sources:

- minitmute official: `https://minitmute.com/`
- minitmute all items: `https://minitmute.com/category/all-items/43/`
- minitmute Tobo product: `https://minitmute.com/product/tobo-bag-black-77-%EC%88%9C%EC%B0%A8%EB%B0%B0%EC%86%A1/1305/`
- minitmute Soft Chain product: `https://minitmute.com/product/2nd-soft-chain-black-7%EC%9B%94-%EC%B4%88-%EC%88%9C%EC%B0%A8%EB%B0%B0%EC%86%A1/1680/`

## 3.21. Pipatchara

Current:

```js
pipatchara: [0.05, 1.35]
```

Recommendation:

```js
pipatchara: [0.05, 1.35]
```

Confidence: **high**

Pipatchara is the clearest high-y niche/craft benchmark in the expanded set:

- Official site says 100% Italian calf leather and handmade macrame.
- It explicitly says it does not consider itself a fashion brand, but a brand for the community.
- Pieces are made by local communities from Thailand.
- Customization / one-of-one language is central.
- Prices on USD store around $715-$830 and Thai store Infinitude bag around THB 22,900-27,900.
- Press around Lisa/Monaco confirms sustainable upcycled material visibility at international pop-culture scale.

x near neutral is appropriate: the brand is not primarily cute or cold minimal; it is material/community/craft led.

Sources:

- Pipatchara official: `https://pipatchara.com/`
- Pipatchara USD store: `https://store-usd.pipatchara.com/`
- Pipatchara Infinitude Bag: `https://pipatchara.com/collections/infinitude-bag`
- L'Officiel Singapore / Lisa F1 Monaco: `https://www.lofficielsingapore.com/fashion/blackpink-lisa-sustainable-gold-dress-at-2024-f1-monaco-grand-prix-pipatchara-celebrity-fashion`
- Teen Vogue / Lisa upcycled outfit: `https://www.teenvogue.com/story/lisa-from-blackpink-wears-sustainable-outfit`

## 3.22. LYN and Jelly Bunny

Current:

```js
lyn: [0.35, -0.05]
jelly_bunny: [-0.55, -0.35]
```

Recommendation:

```js
lyn: [0.35, -0.05]
jelly_bunny: [-0.55, -0.35]
```

Confidence: **medium-high**

LYN sits correctly as polished Thai high-street, near core but more trend/polished than Juno/Vascara. Jelly Bunny sits correctly as cute/IP accessible Thai daily.

Evidence:

- LYN official sells trend-led bags/accessories and functions as accessible fashion.
- Jelly Bunny has licensed/IP/collab evidence including Tom & Jerry, Powerpuff Girls, Kuromi/Sanrio, and accessible colorful bags.
- Jaspal Group evidence supports Jelly Bunny as a cute fashion brand in the group ecosystem.

Sources:

- LYN official: `https://www.lynaccs.com/en`
- Jelly Bunny x Tom and Jerry licensing evidence: `https://www.facebook.com/PacificLicensingStudio/posts/thailand-jelly-bunny-launched-the-newest-springsummer-2025-collection-with-the-i/1235369808597655/`
- Jaspal Group Jelly Bunny x Kuromi evidence: `https://www.facebook.com/jaspalgroup/videos/jelly-bunny-%E0%B9%80%E0%B8%88%E0%B8%A5%E0%B8%A5%E0%B8%B5-%E0%B8%9A%E0%B8%B1%E0%B8%99%E0%B8%99%E0%B8%B5-%E0%B9%81%E0%B8%9A%E0%B8%A3%E0%B8%99%E0%B8%94%E0%B9%8C%E0%B9%81%E0%B8%9F%E0%B8%8A%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B8%AA%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%B4%E0%B9%8A%E0%B8%A7%E0%B8%97%E0%B9%8C-%E0%B8%A0%E0%B8%B2%E0%B8%A2%E0%B9%83%E0%B8%95%E0%B9%89%E0%B8%A2%E0%B8%B1%E0%B8%AA%E0%B8%9B%E0%B8%B2%E0%B8%A5-%E0%B8%81%E0%B8%A3%E0%B8%B8%E0%B9%8A%E0%B8%9B-%E0%B8%A3%E0%B9%88%E0%B8%A7%E0%B8%A1%E0%B8%89%E0%B8%A5%E0%B8%AD%E0%B8%87%E0%B8%84%E0%B8%A3%E0%B8%9A%E0%B8%A3%E0%B8%AD%E0%B8%9A-/727322496736331/`

## 4. Consolidated recommendation

If making only evidence-backed coordinate changes, I recommend this minimal diff:

```js
const FINAL_POS_RECOMMENDED_DELTA = {
  matemade: [-0.55, -0.08],
  hapas: [0.10, 0.03],
  lesac: [0.42, 0.00],
  spoiled: [0.52, -0.28],
};
```

And one wording/note adjustment:

```text
Vanwalk: "Vanwalk Taiwan storefront/distributor; many product pages indicate mainland-China production and one listing calls it an original Chinese brand. Keep coordinate, verify legal origin before final label."
```

Everything else in Claude's current `FINAL_POS` can reasonably stand.

## 5. Risk notes for reconciliation

1. **Do not over-weight marketing copy alone.**  
   For several brands, official copy is aspirational. Actual product mix, price, material, and use-case should dominate coordinate placement.

2. **Avoid treating price as tier directly.**  
   Hapas is more expensive than some core Vietnamese brands, but the product still reads mass aspiration, not design-led.

3. **Separate product origin, shop location, and production location.**  
   Vanwalk is the clearest example: storefront/distribution evidence and manufacturing evidence are not the same.

4. **Current portfolio should beat historical perception.**  
   Stand Oil is a good example: if one remembers it as severe Seoul cool, the coordinate becomes too far right/high. The live product range is much more youthful, playful, and daily.

5. **Keep MateMade strategically honest.**  
   MateMade should move inward from extreme sweet, but not so far that the map erases its active charm/bow/sweet emotional codes. The most useful strategic truth is: MateMade is now a soft daily brand with sweet accents, not a pure candy brand and not a neutral mass brand.


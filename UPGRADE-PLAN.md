# Trail Quest v4 - Major Upgrade Plan

## Vision
Transform Trail Quest from a basic clicker into a visually stunning, replayable e-bike adventure with real-world bike data and strategic gameplay.

---

## Research Summary

### Real Bike Specs (from web research)

| Bike | Battery | Range | Top Speed | Style |
|------|---------|-------|-----------|-------|
| **Super73 RX** | 960Wh (52V 18Ah) | 38-75mi | 28mph | Cafe Cruiser |
| **ONYX RCR 72V** | 72V 45Ah (~3.2kWh) | 45-120mi | 55-60mph | Speed Demon |
| **Sur-Ron X** | 60V 40Ah | 40-50mi | 45mph | Off-Road MX |
| **Revv1 DRT** | 72V 36Ah (~2.6kWh) | 50-85mi | 50mph | Dual Sport |

### Asset Sources (CC0/Free)
- OpenGameArt: Top-down bike sprites (CC0)
- itch.io: Pixel bike constructors
- Kenney.nl: 60,000+ free game assets

---

## Upgrade Areas

### 1. Visual Overhaul 🎨

**Bikes as Detailed SVGs:**
- Create silhouette SVGs that resemble actual bikes
- Super73: Fat tires, low cruiser stance
- ONYX: Moped-style, chunky battery visible
- Sur-Ron: MX dirt bike shape
- Revv1: Dual-sport adventure style

**Animated Ride Scene:**
- Parallax background (far mountains, mid trees, near road)
- Bike with spinning wheels
- Rider leaning on curves
- Dust/debris effects at high speed
- Weather overlays (rain, sun rays)

**UI Polish:**
- Glass morphism cards
- Smooth animations
- Haptic-style feedback on mobile
- Battery bar always visible (inline with speed)

### 2. Real Bike Data 🔧

**Updated Bike Stats:**
```javascript
{
  id: 'super73rx',
  name: 'Super73 RX',
  brand: 'Super73',
  type: 'Cafe Cruiser',
  battery: { voltage: 52, ah: 18, wh: 960 },
  motor: { watts: 750, peakWatts: 1200, type: 'hub' },
  speed: { eco: 15, normal: 20, sport: 25, max: 28 },
  range: { eco: 75, normal: 50, sport: 38 },
  weight: 75, // lbs
  price: 3245,
  color: '#2563eb',
  unlockMiles: 0
}
```

### 3. Replayability Features 🔄

**Achievement System:**
- First Ride, Century Club (100 miles), Speed Demon (hit 60mph)
- Trail completions unlock badges
- Streak bonuses for daily play
- Unlock bikes by hitting milestones

**Challenge Modes:**
- Time Trial: Complete trail as fast as possible
- Efficiency Run: Use minimum battery
- Endurance: Chain multiple trails
- Photo Mode: Find scenic spots

**Progressive Unlocks:**
- Start with budget bike (RadRunner style)
- Earn money completing trails
- Unlock better bikes as you progress
- Upgrade paths that change handling

**Weather System:**
- Random weather affects range
- Rain: -15% range, reduced grip
- Headwind: -20% speed
- Sunny: +10% range (solar trickle)
- Night: Different visuals, lights on

### 4. Better Gameplay ⚡

**Strategic Choices:**
- Fork in trail: Scenic (longer, more XP) vs Direct (faster)
- Charging stations mid-trail (costs money or time)
- Draft behind other riders for efficiency
- Risk/reward: Push sport mode but might run out

**Meaningful Events:**
- Flat tire: Lose time, not just battery
- Trail closed: Forced detour
- E-bike meetup: Bonus XP and money
- Police checkpoint: Class 3 bikes slow down 😄

**Segment-Based Trails:**
Each trail has 4-6 segments with:
- Terrain type (paved, gravel, singletrack)
- Elevation change
- Points of interest
- Different event pools

---

## Implementation Phases

### Phase 1: Visual Foundation (Tonight)
- [ ] Create proper SVG bikes (4 base bikes)
- [ ] Animated parallax background
- [ ] Better battery/speed HUD
- [ ] Glass morphism UI update

### Phase 2: Real Data (Tonight)
- [ ] Update BIKES array with real specs
- [ ] Wh-based range calculations
- [ ] Mode-specific speeds
- [ ] Weight affects acceleration

### Phase 3: Achievements (Tomorrow)
- [ ] Achievement data structure
- [ ] Unlock notifications
- [ ] Achievement gallery screen
- [ ] localStorage persistence

### Phase 4: Weather & Events (Tomorrow)
- [ ] Weather system
- [ ] Enhanced events
- [ ] Segment-based trail design

---

## Technical Notes

- Keep single HTML file (works offline)
- SVGs inline for portability
- Mobile-first responsive
- 60fps animations via requestAnimationFrame
- Battery drain: `wh_used = power * hours`

---

## Inspiration
- Alto's Adventure (beautiful parallax, simple controls)
- Tiny Wings (momentum-based gameplay)  
- Pocket City (unlock progression)
- Real e-bike dashboards

---

*Let's make this beautiful.* ⚡

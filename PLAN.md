# Trail Quest - Game Design Document

## Overview
A side-scrolling e-bike adventure game where players ride real New England trails, manage battery life, and upgrade their bikes.

## Core Gameplay Loop
1. Select/Buy a bike
2. Choose a trail
3. Ride the trail (manage speed vs battery)
4. Complete trail → earn money
5. Buy upgrades → better bikes/parts
6. Tackle harder trails

## Game States

### Player (Persistent - saved to localStorage)
- money: number (starting: 500)
- ownedBikes: string[] (starting: ['revv1'])
- ownedUpgrades: string[]
- currentBike: string (bike ID)
- stats: { totalMiles, totalRides, trailsCompleted }

### Game (Per-ride - reset each ride)
- bike: object (current bike with stats)
- trail: object (selected trail)
- battery: number (0-100, starts at 100)
- distance: number (miles traveled)
- time: number (seconds elapsed)
- speed: number (current mph)
- topSpeed: number (max achieved)
- mode: 'eco' | 'normal' | 'sport' | 'turbo'
- paused: boolean
- running: boolean

## Screens

### 1. Title Screen
- Game logo/title
- "Start Ride" button → Bike Select
- "Garage" button → Garage Screen
- Display: Total miles, Total rides

### 2. Bike Select Screen
- Grid of available bikes (4 total)
- Show owned/locked status
- Show price for locked bikes
- Stats preview (speed, range, accel)
- "Next" button → Trail Select (only if bike selected)
- Back button → Title

### 3. Trail Select Screen
- List of trails with:
  - Name, State, Length, Difficulty
  - Icon for trail type
- "Ride" button → Ride Screen
- Back button → Bike Select

### 4. Ride Screen (Main Game)
**HUD (Top):**
- Battery % (with color warning)
- Distance (miles)
- Time elapsed

**Progress Bar:**
- Shows % of trail complete

**Game View (Middle):**
- Parallax background (sky, clouds, mountains)
- Middle ground (trees, rocks scrolling)
- Trail/ground
- Bike (animated wheels)
- Speed display

**Controls (Bottom):**
- 4 mode buttons: ECO, NORMAL, SPORT, TURBO
- Active mode highlighted

**Events:**
- Random popup events during ride
- Affect battery (+/-)
- Pause game while shown

### 5. Results Screen
- Success/Failure status
- Stats: Distance, Time, Top Speed, Battery remaining
- Money earned (if success)
- "Ride Again" → Trail Select
- "Menu" → Title

### 6. Garage Screen
- Current bike display with stats
- Upgrade sections:
  - Battery (3 tiers)
  - Motor (3 tiers)
  - Controller (3 tiers)
- Show owned/affordable/locked
- Back button → Title

## Bikes Data

| ID | Name | Type | Speed | Range | Accel | Price |
|----|------|------|-------|-------|-------|-------|
| revv1 | Revv1 DRT | Dual Sport | 40 | 50 | 7 | FREE |
| super73 | Super 73 RX | Cafe Racer | 35 | 60 | 6 | $500 |
| surron | Sur-Ron Ultra | MX Style | 55 | 45 | 9 | $1500 |
| onyx | ONYX RCR | Speed Demon | 65 | 40 | 10 | $2500 |

## Upgrades Data

### Battery
| ID | Name | Effect | Price |
|----|------|--------|-------|
| bat1 | 52V 20Ah | +10 Range | $300 |
| bat2 | 72V 30Ah | +25 Range | $800 |
| bat3 | 72V 40Ah | +40 Range | $1500 |

### Motor
| ID | Name | Effect | Price |
|----|------|--------|-------|
| mot1 | Hub 1500W | +5 Speed | $400 |
| mot2 | QS205 3kW | +15 Speed | $1200 |
| mot3 | QS205 5kW | +25 Speed | $2000 |

### Controller
| ID | Name | Effect | Price |
|----|------|--------|-------|
| ctrl1 | Basic 50A | +1 Accel | $200 |
| ctrl2 | ND72 | +3 Accel | $600 |
| ctrl3 | ND84 | +5 Accel | $1000 |

## Trails Data

| Name | State | Length | Difficulty |
|------|-------|--------|------------|
| East Bay Path | RI | 14 mi | Easy |
| Minuteman | MA | 11 mi | Easy |
| Cape Cod Rail | MA | 26 mi | Medium |
| Burlington Greenway | VT | 13 mi | Easy |
| Eastern Trail | ME | 29 mi | Medium |
| Airline State Park | CT | 50 mi | Hard |

## Game Mechanics

### Speed/Mode System
Each mode sets a target speed as % of bike's max speed:
- ECO: 40% of max speed
- NORMAL: 60% of max speed
- SPORT: 80% of max speed  
- TURBO: 100% of max speed

Speed accelerates/decelerates smoothly toward target.

### Battery Drain
Base drain per tick (100ms):
- ECO: 0.008%
- NORMAL: 0.015%
- SPORT: 0.025%
- TURBO: 0.04%

Modified by range stat: `drain * (50 / bike.range)`
Higher range = less drain

### Distance Calculation
`distance += speed / 36000` per 100ms tick
(speed in mph, 36000 = seconds in 10 hours, gives miles)

### Event System
- 0.1% chance per tick to trigger event
- Events pause game, show popup
- Player clicks to continue
- Battery adjusted by event effect

### Money/Rewards
On trail completion:
- Base: trail.length * 5
- Bonus: battery_remaining * 2 (only if completed)
- Failure: $0

## Testing Checklist
- [ ] Title screen loads correctly
- [ ] Can navigate to Garage
- [ ] Can navigate to Bike Select
- [ ] Bike selection works
- [ ] Can buy new bike
- [ ] Trail selection works
- [ ] Ride starts with 100% battery
- [ ] Mode buttons change speed
- [ ] Battery drains at reasonable rate
- [ ] Distance accumulates correctly
- [ ] Events trigger and pause game
- [ ] Trail completion triggers success
- [ ] Battery death triggers failure
- [ ] Money awarded correctly
- [ ] Upgrades affect stats
- [ ] Data persists across refreshes

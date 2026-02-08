// ============================================================
// TRAIL QUEST: BIKE BUILDER SYSTEM
// Real e-bikes, controllers, batteries, and motors
// Created by Sparky ⚡
// ============================================================

// ===================
// REAL E-BIKES (Base Models)
// ===================

const REAL_BIKES = {
    super73_rx: {
        id: 'super73_rx',
        name: 'Super 73 RX',
        brand: 'Super 73',
        icon: '🏍️',
        type: 'Cafe Racer',
        price: 3500,
        description: 'Iconic cafe racer style. Perfect platform for upgrades.',
        stock: {
            controller: 'stock_s73',
            battery: 'stock_52v_15ah',
            motor: 'stock_hub_750w'
        },
        stats: {
            topSpeed: 28,
            range: 40,
            power: 750,
            torque: 55,
            weight: 75,
            style: 95
        },
        upgradeable: true,
        compatibleVoltages: [52, 72],
        frameLimit: { voltage: 72, power: 5000 }
    },
    
    revv1_drt: {
        id: 'revv1_drt',
        name: 'Revv1 DRT',
        brand: 'Revv1',
        icon: '🚵',
        type: 'Dual Sport',
        price: 2800,
        description: 'Affordable dual-sport platform. Great value for builders.',
        stock: {
            controller: 'stock_revv1',
            battery: 'stock_52v_20ah',
            motor: 'stock_hub_1000w'
        },
        stats: {
            topSpeed: 32,
            range: 35,
            power: 1000,
            torque: 60,
            weight: 80,
            style: 75
        },
        upgradeable: true,
        compatibleVoltages: [52, 72, 96],
        frameLimit: { voltage: 96, power: 15000 }
    },
    
    surron_ultrabee: {
        id: 'surron_ultrabee',
        name: 'Sur-Ron Ultra Bee',
        brand: 'Sur-Ron',
        icon: '🐝',
        type: 'MX Style',
        price: 6000,
        description: 'Factory performance MX. Mid-drive beast out of the box.',
        stock: {
            controller: 'stock_surron',
            battery: 'stock_60v_32ah',
            motor: 'stock_mid_6kw'
        },
        stats: {
            topSpeed: 47,
            range: 40,
            power: 6000,
            torque: 120,
            weight: 110,
            style: 90
        },
        upgradeable: true,
        compatibleVoltages: [60, 72],
        frameLimit: { voltage: 72, power: 12000 }
    },
    
    onyx_rcr: {
        id: 'onyx_rcr',
        name: 'ONYX RCR',
        brand: 'ONYX',
        icon: '⚡',
        type: 'Moped Style',
        price: 5500,
        description: 'Sleek moped styling. Built for high-voltage performance.',
        stock: {
            controller: 'stock_onyx',
            battery: 'stock_72v_23ah',
            motor: 'stock_hub_3kw'
        },
        stats: {
            topSpeed: 60,
            range: 50,
            power: 3000,
            torque: 90,
            weight: 130,
            style: 92
        },
        upgradeable: true,
        compatibleVoltages: [72, 96],
        frameLimit: { voltage: 96, power: 20000 }
    },
    
    ariel_rider_grizzly: {
        id: 'ariel_rider_grizzly',
        name: 'Ariel Rider Grizzly',
        brand: 'Ariel Rider',
        icon: '🐻',
        type: 'Dual Motor',
        price: 3200,
        description: 'Dual hub motors, AWD capable. Unique builder platform.',
        stock: {
            controller: 'stock_grizzly',
            battery: 'stock_52v_21ah',
            motor: 'stock_dual_1000w'
        },
        stats: {
            topSpeed: 32,
            range: 35,
            power: 2000,
            torque: 80,
            weight: 95,
            style: 70
        },
        upgradeable: true,
        compatibleVoltages: [52, 72],
        frameLimit: { voltage: 72, power: 8000 }
    }
};

// ===================
// CONTROLLERS
// ===================

const CONTROLLERS = {
    // Stock controllers (come with bikes)
    stock_s73: {
        id: 'stock_s73',
        name: 'Super 73 Stock',
        brand: 'Generic',
        price: 0,
        voltage: 52,
        peakAmps: 35,
        continuousAmps: 25,
        programmable: false,
        features: [],
        stats: { power: 1, efficiency: 0.8, control: 0.6 }
    },
    stock_revv1: {
        id: 'stock_revv1',
        name: 'Revv1 Stock',
        brand: 'Generic',
        price: 0,
        voltage: 52,
        peakAmps: 40,
        continuousAmps: 30,
        programmable: false,
        features: [],
        stats: { power: 1, efficiency: 0.75, control: 0.5 }
    },
    stock_surron: {
        id: 'stock_surron',
        name: 'Sur-Ron Stock',
        brand: 'Sur-Ron',
        price: 0,
        voltage: 60,
        peakAmps: 100,
        continuousAmps: 60,
        programmable: false,
        features: ['regen'],
        stats: { power: 1.2, efficiency: 0.85, control: 0.7 }
    },
    stock_onyx: {
        id: 'stock_onyx',
        name: 'ONYX Stock',
        brand: 'ONYX',
        price: 0,
        voltage: 72,
        peakAmps: 60,
        continuousAmps: 45,
        programmable: false,
        features: [],
        stats: { power: 1.1, efficiency: 0.8, control: 0.6 }
    },
    stock_grizzly: {
        id: 'stock_grizzly',
        name: 'Grizzly Dual Stock',
        brand: 'Ariel Rider',
        price: 0,
        voltage: 52,
        peakAmps: 50,
        continuousAmps: 35,
        programmable: false,
        features: ['dual_motor'],
        stats: { power: 1, efficiency: 0.7, control: 0.6 }
    },

    // FARDRIVER Controllers (48-72V compatible - realistic!)
    nd72450: {
        id: 'nd72450',
        name: 'Fardriver ND72450',
        brand: 'Fardriver',
        icon: '🎛️',
        price: 450,
        voltage: 72,
        voltageRange: [48, 52, 60, 72], // Fardrivers work 48-72V!
        peakAmps: 450,
        continuousAmps: 200,
        programmable: true,
        bluetooth: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse'],
        description: '48-72V compatible. 450A peak, Bluetooth programmable.',
        stats: { power: 2.2, efficiency: 0.88, control: 0.85 }
    },
    nd72680: {
        id: 'nd72680',
        name: 'Fardriver ND72680',
        brand: 'Fardriver',
        icon: '🎛️',
        price: 650,
        voltage: 72,
        voltageRange: [48, 52, 60, 72],
        peakAmps: 680,
        continuousAmps: 350,
        programmable: true,
        bluetooth: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse', 'temp_sensor'],
        description: '48-72V compatible. 680A peak for serious builds.',
        stats: { power: 3.0, efficiency: 0.90, control: 0.88 }
    },
    nd84850: {
        id: 'nd84850',
        name: 'Fardriver ND84850',
        brand: 'Fardriver',
        icon: '🎛️',
        price: 850,
        voltage: 96,
        voltageRange: [72, 84, 96], // Higher voltage range
        peakAmps: 850,
        continuousAmps: 400,
        programmable: true,
        bluetooth: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse', 'temp_sensor', 'multi_mode'],
        description: '72-96V compatible. 850A peak for extreme builds.',
        stats: { power: 4.0, efficiency: 0.92, control: 0.90 }
    },
    
    // EBMX Controller
    ebmx_x9000: {
        id: 'ebmx_x9000',
        name: 'EBMX X-9000',
        brand: 'EBMX',
        icon: '⚡',
        price: 1200,
        voltage: 72,
        peakAmps: 600,
        continuousAmps: 300,
        programmable: true,
        bluetooth: true,
        canbus: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse', 'traction_control', 'wheelie_mode'],
        description: 'Purpose-built for Sur-Ron platform. Premium features.',
        stats: { power: 3.2, efficiency: 0.91, control: 0.95 }
    },
    
    // Ventus Aetos
    ventus_aetos_pro: {
        id: 'ventus_aetos_pro',
        name: 'Ventus Aetos Pro',
        brand: 'Ventus',
        icon: '🦅',
        price: 1500,
        voltage: 96,
        peakAmps: 750,
        continuousAmps: 380,
        programmable: true,
        bluetooth: true,
        canbus: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse', 'traction_control', 'launch_control', 'data_logging'],
        description: 'Top-tier 96V controller. Race-proven performance.',
        stats: { power: 4.2, efficiency: 0.93, control: 0.98 }
    },
    
    // ASI BAC
    asi_bac8000: {
        id: 'asi_bac8000',
        name: 'ASI BAC8000',
        brand: 'ASI',
        icon: '🔧',
        price: 800,
        voltage: 72,
        peakAmps: 500,
        continuousAmps: 250,
        programmable: true,
        bluetooth: true,
        features: ['regen', 'field_weakening', 'cruise', 'reverse', 'sine_wave'],
        description: 'Smooth sine-wave control. Great mid-drive option.',
        stats: { power: 2.8, efficiency: 0.89, control: 0.92 }
    }
};

// ===================
// BATTERIES
// ===================

const BATTERIES = {
    // Stock batteries
    stock_52v_15ah: {
        id: 'stock_52v_15ah',
        name: 'Stock 52V 15Ah',
        price: 0,
        voltage: 52,
        capacity: 15,
        wh: 780,
        chemistry: '21700',
        range: 25,
        weight: 12,
        stats: { range: 0.8, power: 0.6, weight: 1.0 }
    },
    stock_52v_20ah: {
        id: 'stock_52v_20ah',
        name: 'Stock 52V 20Ah',
        price: 0,
        voltage: 52,
        capacity: 20,
        wh: 1040,
        chemistry: '21700',
        range: 35,
        weight: 15,
        stats: { range: 1.0, power: 0.7, weight: 1.1 }
    },
    stock_60v_32ah: {
        id: 'stock_60v_32ah',
        name: 'Sur-Ron Stock 60V 32Ah',
        price: 0,
        voltage: 60,
        capacity: 32,
        wh: 1920,
        chemistry: '21700',
        range: 45,
        weight: 22,
        stats: { range: 1.3, power: 0.9, weight: 1.3 }
    },
    stock_72v_23ah: {
        id: 'stock_72v_23ah',
        name: 'ONYX Stock 72V 23Ah',
        price: 0,
        voltage: 72,
        capacity: 23,
        wh: 1656,
        chemistry: '18650',
        range: 40,
        weight: 20,
        stats: { range: 1.2, power: 0.85, weight: 1.2 }
    },
    stock_52v_21ah: {
        id: 'stock_52v_21ah',
        name: 'Grizzly Stock 52V 21Ah',
        price: 0,
        voltage: 52,
        capacity: 21,
        wh: 1092,
        chemistry: '21700',
        range: 35,
        weight: 16,
        stats: { range: 1.0, power: 0.75, weight: 1.1 }
    },

    // Upgrade batteries - 52V (for stock bike upgrades)
    battery_52v_25ah: {
        id: 'battery_52v_25ah',
        name: '52V 25Ah Pack',
        brand: 'Unit Pack Power',
        icon: '🔋',
        price: 600,
        voltage: 52,
        capacity: 25,
        wh: 1300,
        chemistry: '21700 Samsung 50E',
        maxDischarge: 50,
        range: 45,
        weight: 15,
        description: 'Solid 52V upgrade. More range, same voltage.',
        stats: { range: 1.3, power: 0.85, weight: 1.1 }
    },
    battery_52v_35ah: {
        id: 'battery_52v_35ah',
        name: '52V 35Ah Pack',
        brand: 'Unit Pack Power',
        icon: '🔋',
        price: 900,
        voltage: 52,
        capacity: 35,
        wh: 1820,
        chemistry: '21700 Samsung 50E',
        maxDischarge: 60,
        range: 60,
        weight: 20,
        description: 'Big 52V pack. Serious range upgrade.',
        stats: { range: 1.7, power: 1.0, weight: 1.2 }
    },

    // Upgrade batteries - 72V
    battery_72v_25ah: {
        id: 'battery_72v_25ah',
        name: '72V 25Ah Pack',
        brand: 'Chi Battery',
        icon: '🔋',
        price: 1200,
        voltage: 72,
        capacity: 25,
        wh: 1800,
        chemistry: '21700 Samsung 50E',
        maxDischarge: 60,
        range: 45,
        weight: 18,
        description: 'Entry-level 72V upgrade. Great range, moderate power.',
        stats: { range: 1.4, power: 1.0, weight: 1.1 }
    },
    battery_72v_36ah: {
        id: 'battery_72v_36ah',
        name: '72V 36Ah Pack',
        brand: 'Chi Battery',
        icon: '🔋',
        price: 1800,
        voltage: 72,
        capacity: 36,
        wh: 2592,
        chemistry: '21700 Samsung 50E',
        maxDischarge: 80,
        range: 60,
        weight: 24,
        description: 'Mid-range workhorse. Balance of range and power.',
        stats: { range: 1.8, power: 1.3, weight: 1.3 }
    },
    battery_72v_50ah: {
        id: 'battery_72v_50ah',
        name: '72V 50Ah Pack',
        brand: 'Chi Battery',
        icon: '🔋',
        price: 2800,
        voltage: 72,
        capacity: 50,
        wh: 3600,
        chemistry: '21700 Molicel P42A',
        maxDischarge: 120,
        range: 80,
        weight: 32,
        description: 'High-capacity beast. Long range + serious power.',
        stats: { range: 2.4, power: 1.8, weight: 1.6 }
    },

    // Upgrade batteries - 96V
    battery_96v_40ah: {
        id: 'battery_96v_40ah',
        name: '96V 40Ah Pack',
        brand: 'Chi Battery',
        icon: '🔋',
        price: 3500,
        voltage: 96,
        capacity: 40,
        wh: 3840,
        chemistry: '21700 Molicel P42A',
        maxDischarge: 100,
        range: 70,
        weight: 35,
        description: 'Enter the 96V world. Serious voltage, serious speed.',
        stats: { range: 2.2, power: 2.0, weight: 1.7 }
    },
    battery_96v_60ah: {
        id: 'battery_96v_60ah',
        name: '96V 60Ah Pack',
        brand: 'Chi Battery',
        icon: '🔋',
        price: 5500,
        voltage: 96,
        capacity: 60,
        wh: 5760,
        chemistry: '21700 Molicel P50B',
        maxDischarge: 150,
        range: 100,
        weight: 48,
        description: 'Maximum everything. Race-day ready.',
        stats: { range: 3.0, power: 2.5, weight: 2.0 }
    }
};

// ===================
// MOTORS
// ===================

const MOTORS = {
    // Stock motors
    stock_hub_750w: {
        id: 'stock_hub_750w',
        name: 'Stock 750W Hub',
        price: 0,
        type: 'hub',
        power: 750,
        peakPower: 1500,
        winding: 'standard',
        topSpeed: 28,
        torque: 55,
        weight: 8,
        stats: { speed: 0.6, torque: 0.5, efficiency: 0.8 }
    },
    stock_hub_1000w: {
        id: 'stock_hub_1000w',
        name: 'Stock 1000W Hub',
        price: 0,
        type: 'hub',
        power: 1000,
        peakPower: 2000,
        winding: 'standard',
        topSpeed: 32,
        torque: 60,
        weight: 9,
        stats: { speed: 0.7, torque: 0.55, efficiency: 0.78 }
    },
    stock_mid_6kw: {
        id: 'stock_mid_6kw',
        name: 'Sur-Ron 6kW Mid-Drive',
        price: 0,
        type: 'mid',
        power: 6000,
        peakPower: 10000,
        winding: 'performance',
        topSpeed: 47,
        torque: 120,
        weight: 12,
        stats: { speed: 1.0, torque: 1.2, efficiency: 0.85 }
    },
    stock_hub_3kw: {
        id: 'stock_hub_3kw',
        name: 'ONYX 3kW Hub',
        price: 0,
        type: 'hub',
        power: 3000,
        peakPower: 5000,
        winding: 'performance',
        topSpeed: 60,
        torque: 90,
        weight: 15,
        stats: { speed: 1.3, torque: 0.9, efficiency: 0.82 }
    },
    stock_dual_1000w: {
        id: 'stock_dual_1000w',
        name: 'Dual 1000W Hubs',
        price: 0,
        type: 'dual_hub',
        power: 2000,
        peakPower: 4000,
        winding: 'standard',
        topSpeed: 32,
        torque: 80,
        weight: 16,
        stats: { speed: 0.7, torque: 0.8, efficiency: 0.75 }
    },

    // QS205 Series (the king of hub motors)
    qs205_25t: {
        id: 'qs205_25t',
        name: 'QS205 V3 2.5T',
        brand: 'QS Motor',
        icon: '⚙️',
        type: 'hub',
        price: 650,
        power: 8000,
        peakPower: 15000,
        winding: '2.5T',
        windingType: 'speed',
        topSpeed: 85,
        torque: 80,
        weight: 16,
        description: 'Speed winding. 80+ mph capability with enough volts.',
        stats: { speed: 2.5, torque: 0.8, efficiency: 0.85 }
    },
    qs205_35t: {
        id: 'qs205_35t',
        name: 'QS205 V3 3.5T',
        brand: 'QS Motor',
        icon: '⚙️',
        type: 'hub',
        price: 650,
        power: 8000,
        peakPower: 15000,
        winding: '3.5T',
        windingType: 'balanced',
        topSpeed: 65,
        torque: 110,
        weight: 16,
        description: 'Balanced winding. Best all-around performance.',
        stats: { speed: 1.8, torque: 1.1, efficiency: 0.87 }
    },
    qs205_4t: {
        id: 'qs205_4t',
        name: 'QS205 V3 4T',
        brand: 'QS Motor',
        icon: '⚙️',
        type: 'hub',
        price: 650,
        power: 8000,
        peakPower: 15000,
        winding: '4T',
        windingType: 'torque',
        topSpeed: 50,
        torque: 140,
        weight: 16,
        description: 'Torque winding. Hill climbing monster.',
        stats: { speed: 1.3, torque: 1.5, efficiency: 0.88 }
    },
    
    // QS273 (bigger brother)
    qs273_3t: {
        id: 'qs273_3t',
        name: 'QS273 3T',
        brand: 'QS Motor',
        icon: '⚙️',
        type: 'hub',
        price: 950,
        power: 12000,
        peakPower: 20000,
        winding: '3T',
        windingType: 'speed',
        topSpeed: 100,
        torque: 120,
        weight: 22,
        description: 'The big boy. 100+ mph territory.',
        stats: { speed: 3.0, torque: 1.2, efficiency: 0.84 }
    },

    // Cyc Motors (Mid-drive)
    cyc_x1_stealth: {
        id: 'cyc_x1_stealth',
        name: 'CYC X1 Stealth',
        brand: 'CYC Motor',
        icon: '🔧',
        type: 'mid',
        price: 1200,
        power: 5000,
        peakPower: 8000,
        winding: 'performance',
        topSpeed: 55,
        torque: 180,
        weight: 7,
        description: 'Compact mid-drive. Insane torque-to-weight.',
        stats: { speed: 1.4, torque: 1.8, efficiency: 0.90 }
    }
};

// ===================
// COMPONENT COMPATIBILITY
// ===================

function checkCompatibility(bike, controller, battery, motor) {
    const errors = [];
    const warnings = [];
    
    const bikeData = typeof bike === 'string' ? REAL_BIKES[bike] : bike;
    const controllerData = typeof controller === 'string' ? CONTROLLERS[controller] : controller;
    const batteryData = typeof battery === 'string' ? BATTERIES[battery] : battery;
    const motorData = typeof motor === 'string' ? MOTORS[motor] : motor;
    
    if (!bikeData || !controllerData || !batteryData || !motorData) {
        errors.push('Missing component data');
        return { compatible: false, errors, warnings };
    }
    
    // Voltage compatibility
    if (!bikeData.compatibleVoltages.includes(batteryData.voltage)) {
        errors.push(`Frame not rated for ${batteryData.voltage}V`);
    }
    
    // Check controller voltage compatibility (some controllers support ranges)
    const controllerVoltages = controllerData.voltageRange || [controllerData.voltage];
    if (!controllerVoltages.includes(batteryData.voltage)) {
        errors.push(`Controller (${controllerData.voltageRange ? controllerData.voltageRange.join('-') + 'V' : controllerData.voltage + 'V'}) doesn't match battery (${batteryData.voltage}V)`);
    }
    
    // Power limits
    const peakPower = (controllerData.peakAmps * batteryData.voltage);
    if (peakPower > bikeData.frameLimit.power) {
        warnings.push(`Peak power (${peakPower}W) exceeds frame rating (${bikeData.frameLimit.power}W) - proceed with caution`);
    }
    
    // Motor compatibility with controller
    if (motorData.peakPower < peakPower * 0.5) {
        warnings.push('Motor undersized for controller - may overheat');
    }
    
    // Battery discharge check
    if (batteryData.maxDischarge && controllerData.continuousAmps > batteryData.maxDischarge) {
        warnings.push('Controller may pull more amps than battery is rated for');
    }
    
    return {
        compatible: errors.length === 0,
        errors,
        warnings
    };
}

// ===================
// CALCULATE BUILD STATS
// ===================

function calculateBuildStats(bike, controller, battery, motor) {
    const bikeData = typeof bike === 'string' ? REAL_BIKES[bike] : bike;
    const controllerData = typeof controller === 'string' ? CONTROLLERS[controller] : controller;
    const batteryData = typeof battery === 'string' ? BATTERIES[battery] : battery;
    const motorData = typeof motor === 'string' ? MOTORS[motor] : motor;
    
    if (!bikeData || !controllerData || !batteryData || !motorData) {
        return null;
    }
    
    // Calculate final stats
    const peakPower = Math.min(
        controllerData.peakAmps * batteryData.voltage,
        motorData.peakPower
    );
    
    const continuousPower = Math.min(
        controllerData.continuousAmps * batteryData.voltage,
        motorData.power
    );
    
    // Speed calculation (simplified - motor winding + voltage affect speed)
    const voltageMultiplier = batteryData.voltage / 72;
    let topSpeed = motorData.topSpeed * voltageMultiplier;
    if (motorData.windingType === 'torque') topSpeed *= 0.8;
    if (motorData.windingType === 'speed') topSpeed *= 1.1;
    
    // Range calculation - realistic Wh/mile based on power level
    // Base efficiency: 20-40 Wh/mile depending on power and riding style
    // Higher power = more consumption, but also more fun
    const baseWhPerMile = 20 + (continuousPower / 500); // 3kW continuous = 26 Wh/mi, 5kW = 30 Wh/mi
    const efficiencyBonus = controllerData.stats.efficiency * motorData.stats.efficiency;
    const adjustedWhPerMile = baseWhPerMile / efficiencyBonus;
    const range = Math.round(batteryData.wh / adjustedWhPerMile);
    
    // Torque calculation
    const torque = Math.round(motorData.torque * (batteryData.voltage / 72));
    
    // Total weight
    const weight = bikeData.stats.weight + batteryData.weight + motorData.weight;
    
    return {
        topSpeed: Math.round(topSpeed),
        range: range,
        peakPower: Math.round(peakPower),
        continuousPower: Math.round(continuousPower),
        torque: torque,
        weight: Math.round(weight),
        voltage: batteryData.voltage,
        capacity: batteryData.capacity,
        efficiency: Math.round(efficiencyBonus * 100),
        style: bikeData.stats.style
    };
}

// ===================
// GET TOTAL BUILD COST
// ===================

function calculateBuildCost(bike, controller, battery, motor) {
    const bikeData = typeof bike === 'string' ? REAL_BIKES[bike] : bike;
    const controllerData = typeof controller === 'string' ? CONTROLLERS[controller] : controller;
    const batteryData = typeof battery === 'string' ? BATTERIES[battery] : battery;
    const motorData = typeof motor === 'string' ? MOTORS[motor] : motor;
    
    let total = 0;
    if (bikeData) total += bikeData.price || 0;
    if (controllerData) total += controllerData.price || 0;
    if (batteryData) total += batteryData.price || 0;
    if (motorData) total += motorData.price || 0;
    
    return total;
}

// ===================
// STARTER PACKAGES
// ===================

const STARTER_PACKAGES = {
    budget: {
        id: 'budget',
        name: 'Budget Builder',
        price: 0,
        cash: 2800,
        bike: 'revv1_drt',
        description: 'Start with a Revv1 DRT. Affordable platform with room to grow.'
    },
    cruiser: {
        id: 'cruiser',
        name: 'Cafe Cruiser',
        price: 700,
        cash: 3500,
        bike: 'super73_rx',
        description: 'Iconic Super 73 RX. Style points matter.'
    },
    performance: {
        id: 'performance',
        name: 'Performance Pack',
        price: 1500,
        cash: 5500,
        bike: 'onyx_rcr',
        description: 'ONYX RCR. Ready for high-voltage upgrades.'
    },
    mx: {
        id: 'mx',
        name: 'MX Madness',
        price: 2500,
        cash: 6000,
        bike: 'surron_ultrabee',
        description: 'Sur-Ron Ultra Bee. Factory fast, upgrade potential.'
    },
    custom: {
        id: 'custom',
        name: 'Custom Start',
        price: 5000,
        cash: 10000,
        bike: null,
        description: 'Big budget. Pick any bike, with cash to spare.'
    }
};

// ===================
// EARNINGS TABLE
// ===================

const EARNINGS = {
    trail_easy: { min: 50, max: 150 },
    trail_moderate: { min: 150, max: 350 },
    trail_hard: { min: 300, max: 600 },
    achievement_common: { min: 100, max: 250 },
    achievement_rare: { min: 300, max: 750 },
    achievement_legendary: { min: 1000, max: 2000 },
    help_rider: 100,
    perfect_run: 200,
    close_call: 150
};

// ===================
// RADMOTO USA SHOP INVENTORY
// Real brands they carry with realistic pricing
// ===================

const RADMOTO_INVENTORY = {
    // ACCESSORIES & GEAR
    gritshift_grips: {
        id: 'gritshift_grips',
        name: 'Gritshift Lock-On Grips',
        brand: 'Gritshift',
        category: 'accessories',
        price: 45,
        icon: '🏍️',
        description: 'Premium lock-on grips. Better control, less fatigue.',
        effect: { control: 1.05, comfort: 1.1 }
    },
    gritshift_pegs: {
        id: 'gritshift_pegs',
        name: 'Gritshift Footpegs',
        brand: 'Gritshift',
        category: 'accessories',
        price: 85,
        icon: '🦶',
        description: 'CNC aluminum pegs with aggressive grip.',
        effect: { control: 1.08 }
    },
    radmoto_handguards: {
        id: 'radmoto_handguards',
        name: 'Radmoto Handguards',
        brand: 'Radmoto',
        category: 'accessories',
        price: 65,
        icon: '🛡️',
        description: 'Protect your controls on the trails.',
        effect: { durability: 1.15 }
    },
    
    // WHEELS
    warp9_supermoto_front: {
        id: 'warp9_supermoto_front',
        name: 'Warp 9 Supermoto Front Wheel',
        brand: 'Warp 9',
        category: 'wheels',
        price: 425,
        icon: '🛞',
        description: '17" supermoto wheel. Street performance upgrade.',
        effect: { speed: 1.1, handling: 1.15 }
    },
    warp9_supermoto_rear: {
        id: 'warp9_supermoto_rear',
        name: 'Warp 9 Supermoto Rear Wheel',
        brand: 'Warp 9',
        category: 'wheels',
        price: 475,
        icon: '🛞',
        description: '17" supermoto rear. Complete the set.',
        effect: { speed: 1.1, traction: 1.1 }
    },
    warp9_supermoto_set: {
        id: 'warp9_supermoto_set',
        name: 'Warp 9 Supermoto Wheelset',
        brand: 'Warp 9',
        category: 'wheels',
        price: 850,
        icon: '🛞',
        description: 'Front + rear 17" supermoto wheels. Street beast mode.',
        effect: { speed: 1.15, handling: 1.2, style: 1.1 }
    },
    kke_mx_wheelset: {
        id: 'kke_mx_wheelset',
        name: 'KKE MX Wheelset 19/16',
        brand: 'KKE',
        category: 'wheels',
        price: 550,
        icon: '🛞',
        description: 'Off-road focused wheelset. Dirt ready.',
        effect: { offroad: 1.2, durability: 1.1 }
    },
    
    // SUSPENSION
    dnm_volcano_rear: {
        id: 'dnm_volcano_rear',
        name: 'DNM Volcano Rear Shock',
        brand: 'DNM',
        category: 'suspension',
        price: 280,
        icon: '🔧',
        description: 'Adjustable rear shock. Better bump absorption.',
        effect: { comfort: 1.2, offroad: 1.15 }
    },
    rst_killah_fork: {
        id: 'rst_killah_fork',
        name: 'RST Killah Pro Fork',
        brand: 'RST',
        category: 'suspension',
        price: 350,
        icon: '🔧',
        description: 'Inverted fork upgrade. Stiffer, more precise.',
        effect: { handling: 1.15, offroad: 1.1 }
    },
    fastace_fork: {
        id: 'fastace_fork',
        name: 'Fastace ALX-13 RC Fork',
        brand: 'Fastace',
        category: 'suspension',
        price: 650,
        icon: '🔧',
        description: 'Premium inverted fork. Race-proven performance.',
        effect: { handling: 1.25, offroad: 1.2, comfort: 1.15 }
    },
    
    // BRAKES
    magura_mt5e: {
        id: 'magura_mt5e',
        name: 'Magura MT5e Brake Set',
        brand: 'Magura',
        category: 'brakes',
        price: 320,
        icon: '🛑',
        description: 'E-bike specific hydraulic brakes. Serious stopping power.',
        effect: { braking: 1.3, safety: 1.2 }
    },
    galfer_rotors: {
        id: 'galfer_rotors',
        name: 'Galfer Wave Rotor Set',
        brand: 'Galfer',
        category: 'brakes',
        price: 145,
        icon: '💿',
        description: 'Floating wave rotors. Better heat dissipation.',
        effect: { braking: 1.15 }
    },
    
    // TITANIUM PARTS
    ti_axle_set: {
        id: 'ti_axle_set',
        name: 'Titanium Axle Set',
        brand: 'Titanium Surron',
        category: 'titanium',
        price: 185,
        icon: '✨',
        description: 'Lightweight titanium axles. Weight savings.',
        effect: { weight: 0.98, style: 1.05 }
    },
    ti_footpeg_pins: {
        id: 'ti_footpeg_pins',
        name: 'Titanium Footpeg Pins',
        brand: 'Titanium Surron',
        category: 'titanium',
        price: 95,
        icon: '✨',
        description: 'Titanium hardware. Bling that saves weight.',
        effect: { weight: 0.99, style: 1.03 }
    },
    ti_bolt_kit: {
        id: 'ti_bolt_kit',
        name: 'Titanium Bolt Kit',
        brand: 'Titanium Surron',
        category: 'titanium',
        price: 275,
        icon: '✨',
        description: 'Full titanium hardware kit. Max weight savings.',
        effect: { weight: 0.95, style: 1.1 }
    },
    
    // BODY & COVERS
    sirris_body_kit: {
        id: 'sirris_body_kit',
        name: 'Sirris Full Body Kit',
        brand: 'Sirris',
        category: 'body',
        price: 450,
        icon: '🎨',
        description: 'Complete plastics replacement. Fresh look.',
        effect: { style: 1.25, durability: 1.1 }
    },
    dirtybike_bash_guard: {
        id: 'dirtybike_bash_guard',
        name: 'DirtyBike Bash Guard',
        brand: 'DirtyBike',
        category: 'protection',
        price: 125,
        icon: '🛡️',
        description: 'Protect your battery and motor from rocks.',
        effect: { durability: 1.2 }
    },
    
    // LIGHTS & ELECTRICAL
    baja_squadron_pro: {
        id: 'baja_squadron_pro',
        name: 'Baja Squadron Pro LED',
        brand: 'Baja Designs',
        category: 'lights',
        price: 285,
        icon: '💡',
        description: 'Serious off-road lighting. See everything.',
        effect: { nightRiding: true, visibility: 1.5 }
    },
    tb_display: {
        id: 'tb_display',
        name: 'TB Electric Display',
        brand: 'TB Electric',
        category: 'electrical',
        price: 165,
        icon: '📟',
        description: 'Color display with speed, battery, power stats.',
        effect: { info: true }
    },
    nucular_display: {
        id: 'nucular_display',
        name: 'Nucular Display Unit',
        brand: 'Nucular',
        category: 'electrical',
        price: 220,
        icon: '📟',
        description: 'Advanced display with Bluetooth connectivity.',
        effect: { info: true, bluetooth: true }
    },
    
    // TIRES
    shinko_244_set: {
        id: 'shinko_244_set',
        name: 'Shinko 244 Tire Set',
        brand: 'Shinko',
        category: 'tires',
        price: 120,
        icon: '⭕',
        description: 'Dual-sport tires. Good on and off road.',
        effect: { traction: 1.1, versatility: 1.15 }
    },
    maxxis_dth_set: {
        id: 'maxxis_dth_set',
        name: 'Maxxis DTH Street Tire Set',
        brand: 'Maxxis',
        category: 'tires',
        price: 95,
        icon: '⭕',
        description: 'Street-focused tires. Maximum grip on pavement.',
        effect: { speed: 1.05, handling: 1.1 }
    },
    kenda_mx_set: {
        id: 'kenda_mx_set',
        name: 'Kenda Washougal MX Tire Set',
        brand: 'Kenda',
        category: 'tires',
        price: 110,
        icon: '⭕',
        description: 'Aggressive knobby tires. Dirt dominance.',
        effect: { offroad: 1.2, traction: 1.15 }
    },
    
    // SEATS
    selle_seat: {
        id: 'selle_seat',
        name: 'Selle Comfort Seat',
        brand: 'Selle',
        category: 'seat',
        price: 85,
        icon: '🪑',
        description: 'Ergonomic seat upgrade. Longer rides, less pain.',
        effect: { comfort: 1.2, range: 1.05 }
    },
    
    // CHARGERS
    fast_charger_10a: {
        id: 'fast_charger_10a',
        name: '72V 10A Fast Charger',
        brand: 'Generic',
        category: 'charger',
        price: 175,
        icon: '🔌',
        description: 'Charge 3x faster than stock. Get back riding.',
        effect: { chargeSpeed: 3.0 }
    },
    fast_charger_15a: {
        id: 'fast_charger_15a',
        name: '72V 15A Rapid Charger',
        brand: 'Generic',
        category: 'charger',
        price: 285,
        icon: '🔌',
        description: 'Blazing fast charging. 0-80% in under an hour.',
        effect: { chargeSpeed: 5.0 }
    }
};

// ===================
// SHOP DEFINITIONS
// ===================

const PART_SHOPS = {
    radmoto: {
        id: 'radmoto',
        name: 'Radmoto USA',
        location: 'Portsmouth, NH',
        icon: '🏪',
        featured: true,
        discount: 0.10, // 10% off featured partner
        description: 'Premier e-moto dealer with expert service. Sur-Ron, ONYX, Talaria specialists.',
        url: 'https://radmotousa.com',
        inventory: [
            // Accessories
            'gritshift_grips', 'gritshift_pegs', 'radmoto_handguards',
            // Wheels
            'warp9_supermoto_set', 'kke_mx_wheelset',
            // Suspension
            'dnm_volcano_rear', 'rst_killah_fork', 'fastace_fork',
            // Brakes
            'magura_mt5e', 'galfer_rotors',
            // Body & Protection
            'sirris_body_kit', 'dirtybike_bash_guard',
            // Electrical
            'baja_squadron_pro', 'tb_display', 'nucular_display',
            // Tires
            'shinko_244_set', 'maxxis_dth_set', 'kenda_mx_set',
            // Chargers
            'fast_charger_10a', 'fast_charger_15a'
        ]
    },
    lunacycle: {
        id: 'lunacycle',
        name: 'Luna Cycle',
        location: 'Online',
        icon: '🌙',
        description: 'E-bike specialists. Batteries, kits, and Sur-Ron/Talaria parts.',
        url: 'https://lunacycle.com',
        inventory: [
            'warp9_supermoto_front', 'warp9_supermoto_rear',
            'dnm_volcano_rear', 'magura_mt5e',
            'shinko_244_set', 'fast_charger_10a'
        ]
    },
    titanium_specialist: {
        id: 'titanium_specialist',
        name: 'Titanium Specialist',
        location: 'Online',
        icon: '✨',
        description: 'Lightweight titanium parts for weight-conscious builders.',
        inventory: [
            'ti_axle_set', 'ti_footpeg_pins', 'ti_bolt_kit'
        ]
    },
    trailside: {
        id: 'trailside',
        name: 'Trailside Stop',
        location: 'Various Trailheads',
        icon: '🏕️',
        description: 'Basic supplies at trailheads. Limited but convenient.',
        inventory: [
            'shinko_244_set', 'gritshift_grips', 'selle_seat'
        ]
    }
};

// ===================
// EXPORT
// ===================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        REAL_BIKES,
        CONTROLLERS,
        BATTERIES,
        MOTORS,
        STARTER_PACKAGES,
        EARNINGS,
        checkCompatibility,
        calculateBuildStats,
        calculateBuildCost
    };
}

// ============================================================
// TRAIL QUEST: GARAGE UI
// Bike builder interface for the game
// Created by Sparky ⚡
// ============================================================

// ===================
// GARAGE SCREEN RENDERER
// ===================

function renderGarage() {
    const build = game.currentBuild || {};
    const bike = build.bike ? REAL_BIKES[build.bike] : null;
    const controller = build.controller ? CONTROLLERS[build.controller] : null;
    const battery = build.battery ? BATTERIES[build.battery] : null;
    const motor = build.motor ? MOTORS[build.motor] : null;
    
    const stats = bike ? calculateBuildStats(build.bike, build.controller, build.battery, build.motor) : null;
    const compat = bike ? checkCompatibility(build.bike, build.controller, build.battery, build.motor) : null;

    return `
        <div class="left-panel">
            ${renderGarageStats(stats)}
            ${renderMoneyPanel()}
            ${renderCompatibilityPanel(compat)}
        </div>

        <div class="main-screen">
            <div class="game-screen">
                <div class="screen-header">
                    <span class="screen-title">🔧 YOUR GARAGE</span>
                    <span class="screen-subtitle">${bike ? bike.name : 'No Bike Selected'}</span>
                </div>
                <div class="screen-content">
                    ${bike ? renderCurrentBuild(bike, controller, battery, motor, stats) : renderNoBike()}
                    
                    <div class="choices" style="margin-top: 25px;">
                        <button class="choice-btn" onclick="openComponentShop('controller')" ${!bike ? 'disabled' : ''}>
                            🎛️ Upgrade Controller
                            <span class="choice-cost">Power & Control</span>
                        </button>
                        <button class="choice-btn" onclick="openComponentShop('battery')" ${!bike ? 'disabled' : ''}>
                            🔋 Upgrade Battery
                            <span class="choice-cost">Range & Voltage</span>
                        </button>
                        <button class="choice-btn" onclick="openComponentShop('motor')" ${!bike ? 'disabled' : ''}>
                            ⚙️ Upgrade Motor
                            <span class="choice-cost">Speed & Torque</span>
                        </button>
                        <button class="choice-btn warning" onclick="openPartsShop()">
                            🏪 Parts Shop
                            <span class="choice-cost">Radmoto USA & more</span>
                        </button>
                        <button class="choice-btn secondary" onclick="backToHub()">
                            ⬅️ Back to Trail Hub
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-panel">
            ${renderBuildHistory()}
            ${renderAchievementsPanel()}
        </div>
    `;
}

// ===================
// PARTS SHOP
// ===================

function renderPartsShop() {
    const shop = SHOPS.radmoto; // Default to Radmoto
    
    const categories = {};
    shop.inventory.forEach(itemId => {
        const item = RADMOTO_INVENTORY[itemId];
        if (item) {
            const cat = item.category || 'misc';
            if (!categories[cat]) categories[cat] = [];
            categories[cat].push(item);
        }
    });
    
    let itemsHtml = '';
    for (const [category, items] of Object.entries(categories)) {
        itemsHtml += `
            <div class="shop-category">
                <h4 style="color: var(--secondary); text-transform: uppercase; margin: 20px 0 10px; font-size: 0.8rem;">
                    ${category}
                </h4>
                ${items.map(item => {
                    const price = shop.discount ? Math.floor(item.price * (1 - shop.discount)) : item.price;
                    const canAfford = (game.money || 0) >= price;
                    const owned = (game.ownedParts || []).includes(item.id);
                    
                    return `
                        <div class="shop-item ${owned ? 'owned' : ''} ${!canAfford && !owned ? 'unaffordable' : ''}" 
                             onclick="${owned || !canAfford ? '' : `buyPart('${item.id}', ${price})`}">
                            <div class="shop-item-icon">${item.icon}</div>
                            <div class="shop-item-info">
                                <div class="shop-item-name">${item.name}</div>
                                <div class="shop-item-desc">${item.description}</div>
                                <div class="shop-item-brand" style="font-size: 0.75rem; color: var(--text-dim);">
                                    ${item.brand}
                                </div>
                            </div>
                            <div class="shop-item-price">
                                ${owned ? '✓ OWNED' : `$${price}`}
                                ${shop.discount && !owned ? `<br><span style="font-size: 0.6rem; color: var(--primary);">10% OFF!</span>` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    return `
        <div class="left-panel">
            ${renderMoneyPanel()}
            ${renderOwnedPartsPanel()}
        </div>

        <div class="main-screen">
            <div class="game-screen">
                <div class="screen-header">
                    <span class="screen-title">${shop.icon} ${shop.name}</span>
                    <span class="screen-subtitle">${shop.location}</span>
                </div>
                <div class="screen-content">
                    <p class="narrative">${shop.description}</p>
                    ${shop.featured ? `
                        <div class="event-box gold">
                            <div class="event-title">⭐ FEATURED PARTNER</div>
                            <p>10% discount on all parts! Real shop: <a href="${shop.url}" target="_blank" style="color: var(--gold);">${shop.url}</a></p>
                        </div>
                    ` : ''}
                    
                    <div style="margin-top: 20px;">
                        ${itemsHtml}
                    </div>

                    <div class="choices" style="margin-top: 25px;">
                        <button class="choice-btn secondary" onclick="goToGarage()">
                            ⬅️ Back to Garage
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-panel">
            ${renderShopInfo(shop)}
            ${renderAchievementsPanel()}
        </div>
    `;
}

function renderOwnedPartsPanel() {
    const owned = game.ownedParts || [];
    if (owned.length === 0) {
        return `
            <div class="panel">
                <div class="panel-header">
                    <span class="panel-title">🎒 Owned Parts</span>
                </div>
                <p style="color: var(--text-dim); text-align: center; padding: 15px; font-size: 0.85rem;">
                    No parts yet - shop the upgrades!
                </p>
            </div>
        `;
    }
    
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">🎒 Owned Parts</span>
                <span style="color: var(--text-dim);">${owned.length}</span>
            </div>
            <div style="max-height: 150px; overflow-y: auto;">
                ${owned.map(id => {
                    const item = RADMOTO_INVENTORY[id];
                    return item ? `
                        <div style="display: flex; align-items: center; gap: 8px; padding: 5px 0; border-bottom: 1px solid var(--border);">
                            <span>${item.icon}</span>
                            <span style="font-size: 0.8rem;">${item.name}</span>
                        </div>
                    ` : '';
                }).join('')}
            </div>
        </div>
    `;
}

function renderShopInfo(shop) {
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">ℹ️ Shop Info</span>
            </div>
            <div style="font-size: 0.85rem; line-height: 1.6;">
                <p style="color: var(--primary); font-weight: 600;">${shop.name}</p>
                <p style="color: var(--text-dim);">📍 ${shop.location}</p>
                ${shop.url ? `
                    <p style="margin-top: 10px;">
                        <a href="${shop.url}" target="_blank" style="color: var(--secondary);">
                            🌐 Visit Real Shop
                        </a>
                    </p>
                ` : ''}
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
                    <p style="color: var(--text-dim); font-size: 0.8rem;">
                        Parts give your bike bonuses! Wheels improve handling, suspension helps off-road, brakes keep you safe.
                    </p>
                </div>
            </div>
        </div>
    `;
}

function openPartsShop() {
    game.screen = 'parts_shop';
    render();
}

function buyPart(partId, price) {
    const part = RADMOTO_INVENTORY[partId];
    if (!part || (game.money || 0) < price) return;
    
    game.money -= price;
    game.ownedParts = game.ownedParts || [];
    game.ownedParts.push(partId);
    
    // Apply part effects to bike
    if (part.effect && game.bike) {
        applyPartEffect(part.effect);
    }
    
    game.buildLog = game.buildLog || [];
    game.buildLog.push({
        component: part.name,
        action: `Installed from ${part.brand}`
    });
    
    game.stats.itemsBought = (game.stats.itemsBought || 0) + 1;
    
    playSound('buy');
    saveGame();
    render();
}

function applyPartEffect(effect) {
    // Parts give percentage bonuses to bike stats
    if (!game.bike || !game.bike.bonuses) return;
    
    if (effect.speed) game.bike.speed = Math.round(game.bike.speed * effect.speed);
    if (effect.range) game.bike.range = Math.round(game.bike.range * effect.range);
    if (effect.handling) game.bike.bonuses.handling = (game.bike.bonuses.handling || 1) * effect.handling;
    if (effect.offroad) game.bike.bonuses.climbing = (game.bike.bonuses.climbing || 1) * effect.offroad;
    if (effect.comfort) game.bike.bonuses.efficiency = (game.bike.bonuses.efficiency || 1) * effect.comfort;
}

function renderNoBike() {
    return `
        <div class="event-box warning" style="text-align: center; padding: 40px;">
            <div style="font-size: 4rem; margin-bottom: 20px;">🏭</div>
            <h2 style="color: var(--warning); margin-bottom: 15px;">No Bike Yet!</h2>
            <p>You need to select a starter package first.</p>
        </div>
    `;
}

function renderCurrentBuild(bike, controller, battery, motor, stats) {
    return `
        <div class="build-display">
            <div class="build-bike-card">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="font-size: 4rem;">${bike.icon}</div>
                    <div>
                        <h2 style="color: var(--primary); margin: 0;">${bike.name}</h2>
                        <p style="color: var(--text-dim); margin: 5px 0;">${bike.brand} • ${bike.type}</p>
                        <p style="color: var(--secondary); font-size: 0.9rem;">${bike.description}</p>
                    </div>
                </div>
            </div>
            
            <div class="component-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-top: 20px;">
                <div class="component-slot">
                    <div class="component-label">🎛️ Controller</div>
                    <div class="component-name">${controller ? controller.name : 'Stock'}</div>
                    ${controller && controller.price > 0 ? `
                        <div class="component-details">
                            ${controller.voltage}V • ${controller.peakAmps}A peak
                            ${controller.bluetooth ? '<span class="tag">📶 BT</span>' : ''}
                        </div>
                    ` : ''}
                </div>
                
                <div class="component-slot">
                    <div class="component-label">🔋 Battery</div>
                    <div class="component-name">${battery ? battery.name : 'Stock'}</div>
                    ${battery ? `
                        <div class="component-details">
                            ${battery.voltage}V ${battery.capacity}Ah (${battery.wh}Wh)
                        </div>
                    ` : ''}
                </div>
                
                <div class="component-slot">
                    <div class="component-label">⚙️ Motor</div>
                    <div class="component-name">${motor ? motor.name : 'Stock'}</div>
                    ${motor ? `
                        <div class="component-details">
                            ${motor.type === 'hub' ? 'Hub' : 'Mid-Drive'} • ${Math.round(motor.power/1000)}kW
                            ${motor.winding ? `<span class="tag">${motor.winding}</span>` : ''}
                        </div>
                    ` : ''}
                </div>
            </div>
            
            ${stats ? `
                <div class="build-stats-bar" style="margin-top: 25px;">
                    <div class="stat-row">
                        <span>⚡ Top Speed</span>
                        <div class="stat-bar">
                            <div class="stat-bar-fill speed" style="width: ${Math.min(100, stats.topSpeed)}%"></div>
                        </div>
                        <span class="stat-value">${stats.topSpeed} mph</span>
                    </div>
                    <div class="stat-row">
                        <span>🔋 Range</span>
                        <div class="stat-bar">
                            <div class="stat-bar-fill range" style="width: ${Math.min(100, stats.range)}%"></div>
                        </div>
                        <span class="stat-value">${stats.range} mi</span>
                    </div>
                    <div class="stat-row">
                        <span>💪 Torque</span>
                        <div class="stat-bar">
                            <div class="stat-bar-fill torque" style="width: ${Math.min(100, stats.torque / 2)}%"></div>
                        </div>
                        <span class="stat-value">${stats.torque} Nm</span>
                    </div>
                    <div class="stat-row">
                        <span>⚡ Peak Power</span>
                        <div class="stat-bar">
                            <div class="stat-bar-fill power" style="width: ${Math.min(100, stats.peakPower / 200)}%"></div>
                        </div>
                        <span class="stat-value">${(stats.peakPower/1000).toFixed(1)}kW</span>
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

function renderGarageStats(stats) {
    if (!stats) {
        return `
            <div class="panel">
                <div class="panel-header">
                    <span class="panel-title">📊 Build Stats</span>
                </div>
                <p style="color: var(--text-dim); text-align: center; padding: 20px;">
                    Select a bike to see stats
                </p>
            </div>
        `;
    }
    
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">📊 Build Stats</span>
            </div>
            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-value" style="color: var(--secondary);">${stats.topSpeed}</div>
                    <div class="stat-label">MPH</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color: var(--primary);">${stats.range}</div>
                    <div class="stat-label">Miles</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value" style="color: var(--warning);">${(stats.peakPower/1000).toFixed(1)}kW</div>
                    <div class="stat-label">Peak</div>
                </div>
                <div class="stat-box">
                    <div class="stat-value">${stats.voltage}V</div>
                    <div class="stat-label">Voltage</div>
                </div>
            </div>
            <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                    <span style="color: var(--text-dim);">Torque</span>
                    <span style="color: var(--warning);">${stats.torque} Nm</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px;">
                    <span style="color: var(--text-dim);">Weight</span>
                    <span>${stats.weight} lbs</span>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.85rem;">
                    <span style="color: var(--text-dim);">Efficiency</span>
                    <span style="color: var(--primary);">${stats.efficiency}%</span>
                </div>
            </div>
        </div>
    `;
}

function renderMoneyPanel() {
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">💰 Funds</span>
            </div>
            <div style="text-align: center; padding: 15px 0;">
                <div style="font-family: 'Press Start 2P', cursive; font-size: 1.5rem; color: var(--gold);">
                    $${game.money?.toLocaleString() || 0}
                </div>
                <div style="color: var(--text-dim); font-size: 0.85rem; margin-top: 8px;">
                    Available Cash
                </div>
            </div>
            <div style="padding-top: 10px; border-top: 1px solid var(--border);">
                <div style="font-size: 0.75rem; color: var(--text-dim);">
                    Earn more by completing trails!
                </div>
            </div>
        </div>
    `;
}

function renderCompatibilityPanel(compat) {
    if (!compat) {
        return `
            <div class="panel">
                <div class="panel-header">
                    <span class="panel-title">⚡ Compatibility</span>
                </div>
                <p style="color: var(--text-dim); text-align: center; padding: 15px;">
                    Build a bike to check
                </p>
            </div>
        `;
    }
    
    const statusIcon = compat.compatible ? '✅' : '❌';
    const statusText = compat.compatible ? 'All Good!' : 'Issues Found';
    const statusColor = compat.compatible ? 'var(--primary)' : 'var(--danger)';
    
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">⚡ Compatibility</span>
                <span style="color: ${statusColor};">${statusIcon}</span>
            </div>
            <div style="text-align: center; padding: 10px 0;">
                <span style="color: ${statusColor}; font-weight: 600;">${statusText}</span>
            </div>
            ${compat.errors.length > 0 ? `
                <div style="margin-top: 10px;">
                    ${compat.errors.map(e => `
                        <div style="color: var(--danger); font-size: 0.8rem; margin-bottom: 5px;">
                            ❌ ${e}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
            ${compat.warnings.length > 0 ? `
                <div style="margin-top: 10px;">
                    ${compat.warnings.map(w => `
                        <div style="color: var(--warning); font-size: 0.8rem; margin-bottom: 5px;">
                            ⚠️ ${w}
                        </div>
                    `).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

function renderBuildHistory() {
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">📜 Build Log</span>
            </div>
            <div style="max-height: 150px; overflow-y: auto;">
                ${(game.buildLog || []).slice(-5).reverse().map(entry => `
                    <div style="font-size: 0.8rem; color: var(--text-dim); margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid var(--border);">
                        <div style="color: var(--primary);">${entry.component}</div>
                        <div>${entry.action}</div>
                    </div>
                `).join('')}
                ${(!game.buildLog || game.buildLog.length === 0) ? `
                    <p style="color: var(--text-dim); font-size: 0.85rem; text-align: center;">
                        No upgrades yet
                    </p>
                ` : ''}
            </div>
        </div>
    `;
}

// ===================
// COMPONENT SHOP
// ===================

function renderComponentShop(type) {
    const build = game.currentBuild || {};
    const bike = REAL_BIKES[build.bike];
    
    let items = [];
    let title = '';
    let currentId = '';
    
    // Get current battery voltage for controller filtering
    const currentBattery = build.battery ? BATTERIES[build.battery] : null;
    const currentVoltage = currentBattery ? currentBattery.voltage : 52;
    
    switch(type) {
        case 'controller':
            title = '🎛️ Controllers';
            currentId = build.controller;
            // Show controllers that work with current battery voltage OR bike's compatible voltages
            items = Object.values(CONTROLLERS).filter(c => {
                if (c.price <= 0) return false;
                const voltages = c.voltageRange || [c.voltage];
                // Controller works if it supports current battery voltage
                return voltages.includes(currentVoltage) || 
                       voltages.some(v => bike.compatibleVoltages.includes(v));
            });
            break;
        case 'battery':
            title = '🔋 Batteries';
            currentId = build.battery;
            items = Object.values(BATTERIES).filter(b => 
                b.price > 0 && 
                bike.compatibleVoltages.includes(b.voltage)
            );
            break;
        case 'motor':
            title = '⚙️ Motors';
            currentId = build.motor;
            items = Object.values(MOTORS).filter(m => m.price > 0);
            break;
    }
    
    const itemsHtml = items.map(item => {
        const canAfford = game.money >= item.price;
        const owned = item.id === currentId;
        
        return `
            <div class="shop-item ${owned ? 'owned' : ''} ${!canAfford ? 'unaffordable' : ''}" 
                 onclick="${owned || !canAfford ? '' : `buyComponent('${type}', '${item.id}')`}">
                <div class="shop-item-icon">${item.icon || '📦'}</div>
                <div class="shop-item-info">
                    <div class="shop-item-name">${item.name}</div>
                    <div class="shop-item-desc">
                        ${item.description || getComponentSummary(item, type)}
                    </div>
                    ${type === 'controller' ? `
                        <div class="shop-item-specs">
                            ${item.voltageRange ? item.voltageRange[0] + '-' + item.voltageRange[item.voltageRange.length-1] + 'V' : item.voltage + 'V'} • ${item.peakAmps}A peak
                            ${item.bluetooth ? '• BT' : ''}
                        </div>
                    ` : ''}
                    ${type === 'battery' ? `
                        <div class="shop-item-specs">
                            ${item.voltage}V ${item.capacity}Ah • ${item.wh}Wh
                        </div>
                    ` : ''}
                    ${type === 'motor' ? `
                        <div class="shop-item-specs">
                            ${item.type} • ${(item.power/1000).toFixed(1)}kW
                            ${item.winding ? `• ${item.winding}` : ''}
                        </div>
                    ` : ''}
                </div>
                <div class="shop-item-price">
                    ${owned ? '✓ INSTALLED' : `$${item.price.toLocaleString()}`}
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="left-panel">
            ${renderGarageStats(calculateBuildStats(build.bike, build.controller, build.battery, build.motor))}
            ${renderMoneyPanel()}
        </div>

        <div class="main-screen">
            <div class="game-screen">
                <div class="screen-header">
                    <span class="screen-title">${title}</span>
                    <span class="screen-subtitle">Upgrade your ${type}</span>
                </div>
                <div class="screen-content">
                    ${items.length === 0 ? `
                        <div class="event-box warning">
                            <p>No compatible ${type}s available for your bike's voltage rating.</p>
                        </div>
                    ` : itemsHtml}
                    
                    <div class="choices" style="margin-top: 25px;">
                        <button class="choice-btn secondary" onclick="goToGarage()">
                            ⬅️ Back to Garage
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div class="right-panel">
            ${renderVoltageInfo(type, bike)}
            ${renderAchievementsPanel()}
        </div>
    `;
}

function getComponentSummary(item, type) {
    switch(type) {
        case 'controller':
            return `${item.brand} • ${item.voltage}V ${item.peakAmps}A`;
        case 'battery':
            return `${item.chemistry || 'Li-ion'} • ~${item.range}mi range`;
        case 'motor':
            return `${item.brand || 'Performance'} • ${item.topSpeed}mph top speed`;
        default:
            return '';
    }
}

function renderVoltageInfo(type, bike) {
    return `
        <div class="panel">
            <div class="panel-header">
                <span class="panel-title">⚡ Voltage Guide</span>
            </div>
            <div style="font-size: 0.85rem; line-height: 1.6;">
                <p style="color: var(--text-dim); margin-bottom: 10px;">
                    Your ${bike.name} supports:
                </p>
                <div style="display: flex; gap: 10px; margin-bottom: 15px;">
                    ${bike.compatibleVoltages.map(v => `
                        <span class="voltage-badge v${v}">${v}V</span>
                    `).join('')}
                </div>
                <p style="color: var(--text-dim); font-size: 0.8rem;">
                    ⚠️ Controller and battery must match voltage!
                </p>
                ${type === 'motor' ? `
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
                        <p style="color: var(--secondary); font-weight: 600;">Motor Windings:</p>
                        <p style="font-size: 0.8rem; color: var(--text-dim);">
                            <strong>2.5T</strong> = Speed<br>
                            <strong>3.5T</strong> = Balanced<br>
                            <strong>4T</strong> = Torque/Hills
                        </p>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

// ===================
// STARTER PACKAGE SELECT
// ===================

function renderStarterSelect() {
    const packagesHtml = Object.values(STARTER_PACKAGES).map(pkg => {
        const bike = pkg.bike ? REAL_BIKES[pkg.bike] : null;
        
        return `
            <div class="starter-package ${game.selectedPackage === pkg.id ? 'selected' : ''}" 
                 onclick="selectPackage('${pkg.id}')">
                <div class="package-header">
                    <span class="package-name">${pkg.name}</span>
                    <span class="package-price">${pkg.price === 0 ? 'FREE' : `$${pkg.price}`}</span>
                </div>
                <div class="package-icon">${bike ? bike.icon : '🏭'}</div>
                <div class="package-details">
                    ${bike ? `
                        <div class="package-bike">${bike.name}</div>
                        <div class="package-type">${bike.type}</div>
                    ` : `
                        <div class="package-bike">Choose Any Bike</div>
                    `}
                </div>
                <div class="package-cash">
                    💰 Starting Cash: <strong>$${pkg.cash.toLocaleString()}</strong>
                </div>
                <p class="package-desc">${pkg.description}</p>
            </div>
        `;
    }).join('');

    return `
        <div class="main-screen" style="grid-column: 1 / -1;">
            <div class="game-screen">
                <div class="screen-header">
                    <span class="screen-title">🏁 CHOOSE YOUR START</span>
                    <span class="screen-subtitle">Pick a starter package</span>
                </div>
                <div class="screen-content">
                    <p class="narrative">
                        Every great build starts somewhere. Pick a package that fits your style 
                        and budget. You'll earn more cash by riding trails!
                    </p>
                    
                    <div class="starter-grid">
                        ${packagesHtml}
                    </div>
                    
                    <div class="choices" style="margin-top: 30px;">
                        <button class="choice-btn" onclick="confirmPackage()" ${!game.selectedPackage ? 'disabled' : ''}>
                            ✅ START BUILDING!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ===================
// GAME INTEGRATION
// ===================

function selectPackage(pkgId) {
    game.selectedPackage = pkgId;
    playSound('select');
    render();
}

function confirmPackage() {
    const pkg = STARTER_PACKAGES[game.selectedPackage];
    if (!pkg) return;
    
    game.money = pkg.cash;
    
    if (pkg.bike) {
        const bike = REAL_BIKES[pkg.bike];
        game.currentBuild = {
            bike: pkg.bike,
            controller: bike.stock.controller,
            battery: bike.stock.battery,
            motor: bike.stock.motor
        };
        game.bike = createGameBike(game.currentBuild);
        game.screen = 'hub';
    } else {
        // Custom package - go to bike selection
        game.screen = 'select_real_bike';
    }
    
    game.buildLog = [{
        component: pkg.name,
        action: 'Started adventure!'
    }];
    
    playSound('start');
    saveGame();
    render();
}

function goToGarage() {
    game.screen = 'garage';
    render();
}

function openComponentShop(type) {
    game.shopType = type;
    game.screen = 'component_shop';
    render();
}

function buyComponent(type, itemId) {
    let item;
    switch(type) {
        case 'controller': item = CONTROLLERS[itemId]; break;
        case 'battery': item = BATTERIES[itemId]; break;
        case 'motor': item = MOTORS[itemId]; break;
    }
    
    if (!item || game.money < item.price) return;
    
    // Check compatibility before buying
    const testBuild = { ...game.currentBuild };
    testBuild[type] = itemId;
    
    const compat = checkCompatibility(
        testBuild.bike, 
        testBuild.controller, 
        testBuild.battery, 
        testBuild.motor
    );
    
    if (!compat.compatible) {
        showModal('⚠️ Compatibility Issue', `
            <div class="event-box danger">
                <p>This component isn't compatible with your current build:</p>
                <ul style="margin-top: 10px; color: var(--danger);">
                    ${compat.errors.map(e => `<li>${e}</li>`).join('')}
                </ul>
            </div>
            <button class="choice-btn" onclick="closeModal()" style="margin-top: 20px;">
                OK, I'll pick something else
            </button>
        `);
        return;
    }
    
    // Process purchase
    game.money -= item.price;
    game.currentBuild[type] = itemId;
    game.bike = createGameBike(game.currentBuild);
    
    game.buildLog = game.buildLog || [];
    game.buildLog.push({
        component: item.name,
        action: `Installed ${type}`
    });
    
    game.stats.itemsBought = (game.stats.itemsBought || 0) + 1;
    
    playSound('buy');
    checkAchievements();
    saveGame();
    render();
}

// Create a game-compatible bike object from build
function createGameBike(build) {
    const stats = calculateBuildStats(build.bike, build.controller, build.battery, build.motor);
    const bikeData = REAL_BIKES[build.bike];
    
    if (!stats || !bikeData) return null;
    
    return {
        id: build.bike,
        name: bikeData.name,
        icon: bikeData.icon,
        type: bikeData.type,
        battery: stats.capacity * stats.voltage, // Wh
        range: stats.range,
        motor: stats.peakPower,
        speed: stats.topSpeed,
        weight: stats.weight,
        description: bikeData.description,
        bonuses: {
            efficiency: stats.efficiency / 100,
            speed: stats.topSpeed > 50 ? 15 : 0,
            climbing: stats.torque > 100 ? 1.3 : 1.0
        }
    };
}

// Earn money from trail completion
function awardTrailMoney(trail) {
    const earnings = EARNINGS[`trail_${trail.difficulty}`] || { min: 50, max: 150 };
    const amount = Math.floor(Math.random() * (earnings.max - earnings.min + 1)) + earnings.min;
    
    // Bonus for longer trails
    const lengthBonus = Math.floor(trail.length * 5);
    
    game.money = (game.money || 0) + amount + lengthBonus;
    
    return amount + lengthBonus;
}

// Earn money from achievements
function awardAchievementMoney(achievement) {
    const rarity = achievement.rare ? 'rare' : achievement.legendary ? 'legendary' : 'common';
    const earnings = EARNINGS[`achievement_${rarity}`] || { min: 100, max: 250 };
    const amount = Math.floor(Math.random() * (earnings.max - earnings.min + 1)) + earnings.min;
    
    game.money = (game.money || 0) + amount;
    
    return amount;
}

// ===================
// ADDITIONAL STYLES
// ===================

const garageStyles = `
    .starter-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 20px;
    }
    
    .starter-package {
        background: rgba(0, 0, 0, 0.3);
        border: 2px solid var(--border);
        border-radius: 15px;
        padding: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        text-align: center;
    }
    
    .starter-package:hover, .starter-package.selected {
        border-color: var(--primary);
        background: rgba(0, 255, 136, 0.1);
    }
    
    .starter-package.selected {
        box-shadow: 0 0 20px var(--primary-dim);
    }
    
    .package-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 15px;
    }
    
    .package-name {
        font-family: 'Press Start 2P', cursive;
        font-size: 0.65rem;
        color: var(--primary);
    }
    
    .package-price {
        background: var(--gold);
        color: var(--bg-dark);
        padding: 4px 10px;
        border-radius: 10px;
        font-size: 0.8rem;
        font-weight: 600;
    }
    
    .package-icon {
        font-size: 3rem;
        margin: 15px 0;
    }
    
    .package-bike {
        font-weight: 600;
        color: var(--text);
    }
    
    .package-type {
        font-size: 0.85rem;
        color: var(--text-dim);
    }
    
    .package-cash {
        margin: 15px 0;
        padding: 10px;
        background: rgba(255, 215, 0, 0.1);
        border-radius: 8px;
        color: var(--gold);
    }
    
    .package-desc {
        font-size: 0.85rem;
        color: var(--text-dim);
    }
    
    .build-display {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 15px;
        padding: 20px;
    }
    
    .component-slot {
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--border);
        border-radius: 10px;
        padding: 15px;
        text-align: center;
    }
    
    .component-label {
        font-size: 0.75rem;
        color: var(--text-dim);
        margin-bottom: 8px;
    }
    
    .component-name {
        font-weight: 600;
        color: var(--primary);
        margin-bottom: 5px;
    }
    
    .component-details {
        font-size: 0.8rem;
        color: var(--text-dim);
    }
    
    .tag {
        background: var(--primary-dim);
        color: var(--primary);
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 0.7rem;
        margin-left: 5px;
    }
    
    .stat-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 12px;
    }
    
    .stat-row > span:first-child {
        width: 100px;
        font-size: 0.85rem;
        color: var(--text-dim);
    }
    
    .stat-bar {
        flex: 1;
        height: 12px;
        background: rgba(0, 0, 0, 0.4);
        border-radius: 6px;
        overflow: hidden;
    }
    
    .stat-bar-fill {
        height: 100%;
        border-radius: 6px;
        transition: width 0.5s ease;
    }
    
    .stat-bar-fill.speed { background: linear-gradient(90deg, var(--secondary), #00aaff); }
    .stat-bar-fill.range { background: linear-gradient(90deg, var(--primary), #00cc6a); }
    .stat-bar-fill.torque { background: linear-gradient(90deg, var(--warning), #ff8800); }
    .stat-bar-fill.power { background: linear-gradient(90deg, var(--danger), #ff6666); }
    
    .stat-value {
        width: 70px;
        text-align: right;
        font-family: 'Press Start 2P', cursive;
        font-size: 0.6rem;
        color: var(--text);
    }
    
    .voltage-badge {
        padding: 5px 12px;
        border-radius: 15px;
        font-size: 0.85rem;
        font-weight: 600;
    }
    
    .voltage-badge.v52 { background: rgba(0, 204, 255, 0.2); color: var(--secondary); }
    .voltage-badge.v60 { background: rgba(0, 255, 136, 0.2); color: var(--primary); }
    .voltage-badge.v72 { background: rgba(255, 170, 0, 0.2); color: var(--warning); }
    .voltage-badge.v96 { background: rgba(255, 68, 68, 0.2); color: var(--danger); }
    
    .shop-item.unaffordable {
        opacity: 0.5;
        cursor: not-allowed;
    }
    
    .shop-item-specs {
        font-size: 0.75rem;
        color: var(--secondary);
        margin-top: 5px;
    }
`;

// Inject styles
if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = garageStyles;
    document.head.appendChild(styleEl);
}

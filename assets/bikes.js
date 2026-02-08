// Trail Quest - E-Bike SVG Assets
// Each bike designed to resemble its real-world counterpart

const BIKE_SVGS = {
    // Super73 RX - Fat tire cafe cruiser, low stance
    super73rx: `
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back Fat Tire -->
            <circle cx="40" cy="80" r="28" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="3"/>
            <circle cx="40" cy="80" r="20" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            <circle cx="40" cy="80" r="8" fill="#3d3d5c"/>
            <!-- Tire tread pattern -->
            <circle cx="40" cy="80" r="24" fill="none" stroke="#4a4a6a" stroke-width="6" stroke-dasharray="4 3"/>
            
            <!-- Front Fat Tire -->
            <circle cx="155" cy="80" r="28" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="3"/>
            <circle cx="155" cy="80" r="20" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            <circle cx="155" cy="80" r="8" fill="#3d3d5c"/>
            <circle cx="155" cy="80" r="24" fill="none" stroke="#4a4a6a" stroke-width="6" stroke-dasharray="4 3"/>
            
            <!-- Frame - Low cruiser style -->
            <path d="M40 80 L65 45 L130 45 L155 80" stroke="var(--bike-color, #2563eb)" stroke-width="6" stroke-linecap="round"/>
            <path d="M40 80 L90 55" stroke="var(--bike-color, #2563eb)" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Battery Pack (integrated in frame) -->
            <rect x="70" y="48" width="50" height="14" rx="4" fill="#1e293b" stroke="var(--bike-color, #2563eb)" stroke-width="1"/>
            <rect x="74" y="51" width="8" height="8" rx="1" fill="#22c55e" opacity="0.8"/>
            <rect x="84" y="51" width="8" height="8" rx="1" fill="#22c55e" opacity="0.6"/>
            <rect x="94" y="51" width="8" height="8" rx="1" fill="#22c55e" opacity="0.4"/>
            
            <!-- Seat -->
            <ellipse cx="75" cy="38" rx="18" ry="6" fill="#1a1a2e"/>
            <path d="M60 38 Q75 32 90 38" stroke="#2d2d44" stroke-width="2" fill="none"/>
            
            <!-- Handlebars - wide cruiser style -->
            <path d="M130 45 L145 30" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
            <path d="M138 28 L152 32" stroke="#1a1a2e" stroke-width="6" stroke-linecap="round"/>
            
            <!-- Headlight -->
            <circle cx="160" cy="55" r="6" fill="#fef3c7"/>
            <circle cx="160" cy="55" r="4" fill="#fcd34d"/>
            
            <!-- Hub Motor (rear) -->
            <circle cx="40" cy="80" r="12" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            
            <!-- Pedals -->
            <circle cx="90" cy="75" r="8" fill="#3d3d5c"/>
            <rect x="80" y="72" width="6" height="6" fill="#4a4a6a"/>
            <rect x="94" y="72" width="6" height="6" fill="#4a4a6a"/>
        </svg>
    `,

    // ONYX RCR - Moped style, chunky, powerful
    onyx: `
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back Wheel -->
            <circle cx="38" cy="78" r="26" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="3"/>
            <circle cx="38" cy="78" r="18" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            <circle cx="38" cy="78" r="6" fill="#4a4a6a"/>
            
            <!-- Front Wheel -->
            <circle cx="158" cy="78" r="26" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="3"/>
            <circle cx="158" cy="78" r="18" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            <circle cx="158" cy="78" r="6" fill="#4a4a6a"/>
            
            <!-- Chunky Frame -->
            <path d="M38 78 L55 50 L85 40 L135 40 L158 78" stroke="var(--bike-color, #8b5cf6)" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M55 50 L85 70 L135 40" stroke="var(--bike-color, #8b5cf6)" stroke-width="6" stroke-linecap="round"/>
            
            <!-- MASSIVE Battery Box -->
            <rect x="60" y="42" width="65" height="22" rx="4" fill="#0f172a" stroke="var(--bike-color, #8b5cf6)" stroke-width="2"/>
            <text x="92" y="57" font-size="10" fill="var(--bike-color, #8b5cf6)" text-anchor="middle" font-family="monospace">72V</text>
            
            <!-- Seat (bench style) -->
            <rect x="50" y="30" width="55" height="10" rx="5" fill="#1a1a2e"/>
            <path d="M50 30 L105 30" stroke="#3d3d5c" stroke-width="2"/>
            
            <!-- Handlebars - Moped style -->
            <path d="M135 40 L155 25" stroke="#4a4a6a" stroke-width="5" stroke-linecap="round"/>
            <path d="M145 22 L165 28" stroke="#1a1a2e" stroke-width="7" stroke-linecap="round"/>
            
            <!-- Dual Headlights -->
            <circle cx="160" cy="48" r="5" fill="#fef3c7"/>
            <circle cx="168" cy="52" r="4" fill="#fef3c7"/>
            
            <!-- Motor (mid-drive style look) -->
            <circle cx="85" cy="70" r="14" fill="#2d2d44" stroke="#4a4a6a" stroke-width="3"/>
            <circle cx="85" cy="70" r="8" fill="#3d3d5c"/>
            
            <!-- Chain guard -->
            <path d="M38 78 L85 70" stroke="#3d3d5c" stroke-width="3"/>
            
            <!-- Rear fender -->
            <path d="M20 60 Q38 52 56 60" stroke="#1e293b" stroke-width="4" fill="none"/>
        </svg>
    `,

    // Sur-Ron X - MX Dirt bike style, aggressive
    surron: `
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back Knobby Tire -->
            <circle cx="35" cy="82" r="24" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="35" cy="82" r="17" fill="#2d2d44"/>
            <circle cx="35" cy="82" r="5" fill="#4a4a6a"/>
            <!-- Knobby tread -->
            <circle cx="35" cy="82" r="21" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-dasharray="3 4"/>
            
            <!-- Front Knobby Tire -->
            <circle cx="160" cy="82" r="24" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="160" cy="82" r="17" fill="#2d2d44"/>
            <circle cx="160" cy="82" r="5" fill="#4a4a6a"/>
            <circle cx="160" cy="82" r="21" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-dasharray="3 4"/>
            
            <!-- MX Frame - High and aggressive -->
            <path d="M35 82 L50 45 L80 35 L130 38 L145 50 L160 82" stroke="var(--bike-color, #f59e0b)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M50 45 L90 65 L130 38" stroke="var(--bike-color, #f59e0b)" stroke-width="4" stroke-linecap="round"/>
            
            <!-- Slim Battery (under seat) -->
            <rect x="55" y="38" width="50" height="12" rx="3" fill="#0f172a" stroke="#f59e0b" stroke-width="1"/>
            
            <!-- Dirt Bike Seat (slim) -->
            <path d="M45 32 L110 28 L115 32 L45 36 Z" fill="#1a1a2e"/>
            
            <!-- Front Fork (long travel) -->
            <path d="M145 50 L155 35 L165 82" stroke="#4a4a6a" stroke-width="4" fill="none"/>
            <path d="M145 50 L150 35 L160 82" stroke="#5a5a7a" stroke-width="3" fill="none"/>
            
            <!-- High Handlebars -->
            <path d="M155 35 L160 22" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
            <path d="M150 18 L170 22" stroke="#1a1a2e" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Number Plate -->
            <ellipse cx="140" cy="42" rx="12" ry="8" fill="var(--bike-color, #f59e0b)" opacity="0.3"/>
            
            <!-- Motor -->
            <circle cx="90" cy="65" r="12" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            
            <!-- Rear Swing Arm -->
            <path d="M90 65 L35 82" stroke="#3d3d5c" stroke-width="4"/>
            
            <!-- Rear Shock -->
            <path d="M55 50 L75 75" stroke="#6b7280" stroke-width="3"/>
            <circle cx="55" cy="50" r="3" fill="#4a4a6a"/>
            <circle cx="75" cy="75" r="3" fill="#4a4a6a"/>
        </svg>
    `,

    // Revv1 DRT - Dual Sport Adventure
    revv1: `
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back Wheel -->
            <circle cx="38" cy="80" r="25" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="38" cy="80" r="18" fill="#2d2d44"/>
            <circle cx="38" cy="80" r="6" fill="#4a4a6a"/>
            <circle cx="38" cy="80" r="22" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-dasharray="5 3"/>
            
            <!-- Front Wheel -->
            <circle cx="158" cy="80" r="25" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="158" cy="80" r="18" fill="#2d2d44"/>
            <circle cx="158" cy="80" r="6" fill="#4a4a6a"/>
            <circle cx="158" cy="80" r="22" fill="none" stroke="#4a4a6a" stroke-width="4" stroke-dasharray="5 3"/>
            
            <!-- Adventure Frame -->
            <path d="M38 80 L55 48 L90 38 L135 42 L158 80" stroke="var(--bike-color, #10b981)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M55 48 L88 68 L135 42" stroke="var(--bike-color, #10b981)" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Battery (triangle style) -->
            <path d="M60 50 L100 40 L95 65 Z" fill="#0f172a" stroke="#10b981" stroke-width="1"/>
            <text x="82" y="54" font-size="8" fill="#10b981" text-anchor="middle" font-family="monospace">72V</text>
            
            <!-- Adventure Seat -->
            <path d="M52 42 L100 35 L105 40 L52 48 Z" fill="#1a1a2e"/>
            
            <!-- Front Fork -->
            <path d="M135 42 L150 30 L158 80" stroke="#4a4a6a" stroke-width="4"/>
            
            <!-- Handlebars with guards -->
            <path d="M150 30 L155 18" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
            <path d="M145 15 L165 20" stroke="#1a1a2e" stroke-width="5" stroke-linecap="round"/>
            <!-- Hand guards -->
            <path d="M143 12 Q155 8 167 16" stroke="var(--bike-color, #10b981)" stroke-width="2" fill="none"/>
            
            <!-- Headlight (adventure style) -->
            <circle cx="162" cy="52" r="7" fill="#fef3c7"/>
            <circle cx="162" cy="52" r="5" fill="#fcd34d"/>
            
            <!-- Motor -->
            <circle cx="88" cy="68" r="11" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            
            <!-- Pannier rack hints -->
            <path d="M42 65 L52 60 L52 75" stroke="#3d3d5c" stroke-width="2"/>
        </svg>
    `,

    // RadRunner - Budget commuter (starter bike)
    radrunner: `
        <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <!-- Back Wheel (smaller, utility style) -->
            <circle cx="42" cy="82" r="22" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="42" cy="82" r="15" fill="#2d2d44"/>
            <circle cx="42" cy="82" r="5" fill="#4a4a6a"/>
            
            <!-- Front Wheel -->
            <circle cx="155" cy="82" r="22" fill="#1a1a2e" stroke="#3d3d5c" stroke-width="2"/>
            <circle cx="155" cy="82" r="15" fill="#2d2d44"/>
            <circle cx="155" cy="82" r="5" fill="#4a4a6a"/>
            
            <!-- Utility Frame (step-through) -->
            <path d="M42 82 L55 55 L130 55 L155 82" stroke="var(--bike-color, #ef4444)" stroke-width="5" stroke-linecap="round"/>
            <path d="M55 55 L55 82" stroke="var(--bike-color, #ef4444)" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Rear Rack -->
            <rect x="35" y="55" width="35" height="6" rx="2" fill="#3d3d5c"/>
            <path d="M35 61 L35 75" stroke="#3d3d5c" stroke-width="2"/>
            <path d="M70 61 L70 75" stroke="#3d3d5c" stroke-width="2"/>
            
            <!-- Battery (external) -->
            <rect x="58" y="58" width="35" height="10" rx="3" fill="#0f172a" stroke="#ef4444" stroke-width="1"/>
            
            <!-- Seat -->
            <ellipse cx="55" cy="48" rx="12" ry="5" fill="#1a1a2e"/>
            
            <!-- Handlebars (upright) -->
            <path d="M130 55 L142 40" stroke="#4a4a6a" stroke-width="4" stroke-linecap="round"/>
            <path d="M135 35 L150 38" stroke="#1a1a2e" stroke-width="5" stroke-linecap="round"/>
            
            <!-- Basket -->
            <rect x="145" y="55" width="18" height="15" rx="2" stroke="#3d3d5c" stroke-width="2" fill="none"/>
            
            <!-- Hub Motor -->
            <circle cx="42" cy="82" r="10" fill="#2d2d44" stroke="#4a4a6a" stroke-width="2"/>
            
            <!-- Pedals -->
            <circle cx="85" cy="78" r="6" fill="#3d3d5c"/>
        </svg>
    `
};

// Rider SVG (can be overlaid on bike)
const RIDER_SVG = `
    <svg viewBox="0 0 60 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Helmet -->
        <ellipse cx="30" cy="15" rx="12" ry="10" fill="#1e293b"/>
        <path d="M20 18 Q30 25 40 18" stroke="#3d3d5c" stroke-width="2" fill="none"/>
        
        <!-- Body -->
        <path d="M30 25 L30 50" stroke="#1e293b" stroke-width="8" stroke-linecap="round"/>
        
        <!-- Arms (reaching forward) -->
        <path d="M30 32 L45 40 L55 38" stroke="#1e293b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
        
        <!-- Legs -->
        <path d="M30 50 L22 70 L18 85" stroke="#1e293b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M30 50 L38 70 L42 85" stroke="#1e293b" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
`;

// Spinning wheel animation
const WHEEL_SPIN_CSS = `
    @keyframes wheelSpin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    .wheel-spinning {
        animation: wheelSpin var(--wheel-speed, 0.5s) linear infinite;
    }
`;

// Export for use
if (typeof module !== 'undefined') {
    module.exports = { BIKE_SVGS, RIDER_SVG, WHEEL_SPIN_CSS };
}

module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/matches/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/mongodb.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Match.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cricapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/cricapi.ts [app-route] (ecmascript)");
;
;
;
;
async function GET(req) {
    try {
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$mongodb$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])();
        // Return all matches, sorted by matchStartTime ascending
        let matches = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
            matchStartTime: 1
        }).lean();
        // If the database is completely empty OR the demo match is missing, auto-sync from CricAPI to populate it
        const hasDemoMatch = matches.some((m)=>m.apiId === 'mock-upcoming-2');
        if (matches.length === 0 || !hasDemoMatch) {
            console.log('Demo match missing or DB empty! Auto-syncing matches from CricAPI...');
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$cricapi$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["syncMatchesFromCricAPI"])();
            // Re-fetch after syncing
            matches = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({}).sort({
                matchStartTime: 1
            }).lean();
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(matches);
    } catch (error) {
        console.error('Fetch Matches Error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/cricapi.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "autoLockMatches",
    ()=>autoLockMatches,
    "syncMatchesFromCricAPI",
    ()=>syncMatchesFromCricAPI
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/models/Match.ts [app-route] (ecmascript)");
;
const CRICAPI_KEY = process.env.CRICAPI_KEY || 'MOCK_KEY';
const CRICAPI_BASE_URL = 'https://api.cricapi.com/v1';
async function syncMatchesFromCricAPI() {
    if (CRICAPI_KEY === 'MOCK_KEY') {
        console.log('Using MOCK CricAPI. In a real environment, provide CRICAPI_KEY in .env.local');
        // For demo purposes, we will just return a mocked structure if no key is provided
        return mockSyncMatches();
    }
    try {
        const res = await fetch(`${CRICAPI_BASE_URL}/matches?apikey=${CRICAPI_KEY}&offset=0`);
        const data = await res.json();
        if (data.status !== 'success') {
            console.warn('CricAPI Sync Failed or Limit Reached:', data.reason);
            console.warn('Falling back to mock live matches to keep app functional!');
            return mockSyncMatches();
        }
        const matches = data.data;
        for (const match of matches){
            // ONLY fetch UPCOMING matches (matchStarted === false) to save API calls and meet user requirement
            if ([
                't20',
                'odi',
                'test'
            ].includes(match.matchType) && match.matchStarted === false) {
                const existingMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
                    apiId: match.id
                });
                if (!existingMatch) {
                    // Try to safely extract team info if available
                    const t1Info = match.teamInfo && match.teamInfo[0] ? match.teamInfo[0] : null;
                    const t2Info = match.teamInfo && match.teamInfo[1] ? match.teamInfo[1] : null;
                    const team1Code = t1Info?.shortname || match.teams[0].substring(0, 3).toUpperCase();
                    const team2Code = t2Info?.shortname || match.teams[1].substring(0, 3).toUpperCase();
                    const team1Logo = t1Info?.img || '';
                    const team2Logo = t2Info?.img || '';
                    // Fetch Squads
                    let squadTeam1 = [];
                    let squadTeam2 = [];
                    try {
                        // Avoid rate limit / SSL reset from hitting cricapi too fast
                        await new Promise((resolve)=>setTimeout(resolve, 800));
                        const squadRes = await fetch(`${CRICAPI_BASE_URL}/match_squad?apikey=${CRICAPI_KEY}&id=${match.id}`);
                        const squadData = await squadRes.json();
                        if (squadData.status === 'success' && squadData.data && squadData.data.length >= 2) {
                            const mapSquad = (teamSquad, teamCode, teamName)=>{
                                return (teamSquad.players || []).map((p)=>({
                                        id: p.id,
                                        name: p.name,
                                        shortName: p.name.split(' ').slice(-1)[0],
                                        team: teamCode,
                                        teamName: teamName,
                                        role: (p.role || '').toLowerCase().includes('wicket') ? 'WK' : (p.role || '').toLowerCase().includes('all') ? 'AR' : (p.role || '').toLowerCase().includes('bowl') ? 'BOWL' : 'BAT',
                                        avatar: p.playerImg || `https://ui-avatars.com/api/?name=${encodeURIComponent(p.name)}&background=random`,
                                        country: p.country || teamName,
                                        recentForm: [],
                                        careerStatHighlight: p.battingStyle || p.bowlingStyle || 'Pro Player'
                                    }));
                            };
                            const t1squad = squadData.data.find((s)=>s.teamName === match.teams[0]);
                            const t2squad = squadData.data.find((s)=>s.teamName === match.teams[1]);
                            if (t1squad) squadTeam1 = mapSquad(t1squad, team1Code, match.teams[0]);
                            if (t2squad) squadTeam2 = mapSquad(t2squad, team2Code, match.teams[1]);
                        }
                    } catch (e) {
                        console.log('Failed to fetch squad for match', match.id, e);
                    }
                    // Create new match
                    await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
                        apiId: match.id,
                        title: `${match.teams[0]} vs ${match.teams[1]}`,
                        series: match.series_id || match.name,
                        format: match.matchType.toUpperCase(),
                        team1: {
                            name: match.teams[0],
                            code: team1Code,
                            logoUrl: team1Logo
                        },
                        team2: {
                            name: match.teams[1],
                            code: team2Code,
                            logoUrl: team2Logo
                        },
                        matchStartTime: match.dateTimeGMT,
                        status: match.matchStarted ? 'LIVE' : 'UPCOMING',
                        questions: generateDefaultQuestions(),
                        entryFees: [
                            25,
                            50,
                            100
                        ],
                        squadTeam1,
                        squadTeam2
                    });
                }
            }
        }
        return {
            success: true,
            count: matches.length
        };
    } catch (error) {
        console.error('CricAPI Sync Error:', error);
        return {
            success: false,
            error
        };
    }
}
async function autoLockMatches() {
    const oneMinuteFromNow = new Date(Date.now() + 60 * 1000);
    // Find upcoming matches that start within 1 minute
    const matchesToLock = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].find({
        status: 'UPCOMING',
        matchStartTime: {
            $lte: oneMinuteFromNow.toISOString()
        }
    });
    for (const match of matchesToLock){
        match.status = 'LOCKED';
        await match.save();
        console.log(`🔒 Auto-locked match: ${match.title}`);
    }
}
function generateDefaultQuestions() {
    return [
        {
            id: 'q1_top_batter',
            title: 'Top Batter',
            subtitle: 'Who will score the most runs?',
            type: 'PLAYER',
            iconName: 'BAT',
            statValue: 'TOP_BATTER'
        },
        {
            id: 'q2_top_bowler',
            title: 'Top Bowler',
            subtitle: 'Who will take the most wickets?',
            type: 'PLAYER',
            iconName: 'BOWL',
            statValue: 'TOP_BOWLER'
        },
        {
            id: 'q3_top_striker',
            title: 'Top Striker',
            subtitle: 'Who will have the highest strike rate?',
            type: 'PLAYER',
            iconName: 'STAR',
            statValue: 'TOP_STRIKER'
        },
        {
            id: 'q4_econ_bowler',
            title: 'Most Economical Bowler',
            subtitle: 'Who will concede the fewest runs per over?',
            type: 'PLAYER',
            iconName: 'SHIELD',
            statValue: 'MOST_ECON_BOWLER'
        },
        {
            id: 'q5_most_6s',
            title: 'Most 6s',
            subtitle: 'Which player will hit the most 6s?',
            type: 'PLAYER',
            iconName: 'TICKET',
            statValue: 'MOST_SIXES'
        },
        {
            id: 'q6_most_wickets',
            title: 'Most Wickets',
            subtitle: 'Which player will take the most wickets?',
            type: 'PLAYER',
            iconName: 'BOWL',
            statValue: 'MOST_WICKETS'
        }
    ];
}
async function mockSyncMatches() {
    const mockLiveMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        apiId: 'mock-live-1'
    });
    if (!mockLiveMatch) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            apiId: 'mock-live-1',
            title: 'Chennai Super Kings vs Mumbai Indians',
            series: 'IPL 2026',
            format: 'T20',
            team1: {
                name: 'Chennai Super Kings',
                code: 'CSK'
            },
            team2: {
                name: 'Mumbai Indians',
                code: 'MI'
            },
            matchStartTime: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
            status: 'LIVE',
            liveScore: 'CSK 142/3 (14.2)  CRR: 10.00',
            totalPool: 0,
            totalEntries: 0,
            questions: generateDefaultQuestions(),
            squadTeam1: [],
            squadTeam2: []
        });
    } else {
        // Keep score moving for demo
        const overs = (Math.random() * 20).toFixed(1);
        mockLiveMatch.liveScore = `CSK ${Math.floor(Math.random() * 200)}/3 (${overs})  CRR: ${(Math.random() * 10).toFixed(2)}`;
        await mockLiveMatch.save();
    }
    const mockUpcomingMatch = await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].findOne({
        apiId: 'mock-upcoming-2'
    });
    if (!mockUpcomingMatch) {
        await __TURBOPACK__imported__module__$5b$project$5d2f$models$2f$Match$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"].create({
            apiId: 'mock-upcoming-2',
            title: 'Client Demo: India vs Australia',
            series: 'T20 World Cup 2026',
            format: 'T20',
            team1: {
                name: 'India',
                code: 'IND'
            },
            team2: {
                name: 'Australia',
                code: 'AUS'
            },
            matchStartTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
            status: 'UPCOMING',
            liveScore: '',
            totalPool: 0,
            totalEntries: 0,
            entryFees: [
                5,
                25,
                50,
                100
            ],
            questions: generateDefaultQuestions(),
            squadTeam1: [],
            squadTeam2: []
        });
    }
    return {
        success: true,
        count: 2,
        mock: true
    };
}
}),
"[project]/lib/mongodb.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/superover';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
let cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose;
if (!cached) {
    cached = /*TURBOPACK member replacement*/ __turbopack_context__.g.mongoose = {
        conn: null,
        promise: null
    };
}
async function connectToDatabase() {
    if (cached.conn) {
        return cached.conn;
    }
    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };
        cached.promise = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].connect(MONGODB_URI, opts).then((mongoose)=>{
            console.log('MongoDB connected successfully');
            return mongoose;
        });
    }
    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }
    return cached.conn;
}
const __TURBOPACK__default__export__ = connectToDatabase;
}),
"[project]/models/Match.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__ = __turbopack_context__.i("[externals]/mongoose [external] (mongoose, cjs, [project]/node_modules/mongoose)");
;
const MatchSchema = new __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"]({
    apiId: {
        type: String,
        unique: true,
        sparse: true
    },
    title: {
        type: String,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    team1: {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        logoUrl: {
            type: String
        }
    },
    team2: {
        name: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        logoUrl: {
            type: String
        }
    },
    matchStartTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: [
            'UPCOMING',
            'LIVE',
            'LOCKED',
            'COMPLETED'
        ],
        default: 'UPCOMING'
    },
    totalPool: {
        type: Number,
        default: 0
    },
    totalEntries: {
        type: Number,
        default: 0
    },
    entryFees: {
        type: [
            Number
        ],
        default: [
            25,
            50,
            100
        ]
    },
    questions: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.Mixed
        }
    ],
    squadTeam1: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.Mixed
        }
    ],
    squadTeam2: [
        {
            type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.Mixed
        }
    ],
    actualResults: {
        type: __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["Schema"].Types.Mixed
    },
    liveScore: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
});
const __TURBOPACK__default__export__ = __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].models.Match || __TURBOPACK__imported__module__$5b$externals$5d2f$mongoose__$5b$external$5d$__$28$mongoose$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$mongoose$29$__["default"].model('Match', MatchSchema);
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1qduv19._.js.map
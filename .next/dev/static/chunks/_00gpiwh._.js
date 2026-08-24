(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/admin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>AdminPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/AdminPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
;
function AdminPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [isInitializing, setIsInitializing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [allUsers, setAllUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [slips, setSlips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminPage.useEffect": ()=>{
            async function checkAdminAndLoadData() {
                try {
                    const currentUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getCurrentUser();
                    if (currentUser.id === 'u_guest' || currentUser.role !== 'ADMIN') {
                        alert('Access Denied. Admins only.');
                        router.push('/');
                        return;
                    }
                    const [fetchedMatches, fetchedAllUsers, fetchedSlips, fetchedTransactions, fetchedMetrics] = await Promise.all([
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getMatches(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getAllUsers(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getSlips(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getTransactions(),
                        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getMetrics()
                    ]);
                    setMatches(fetchedMatches);
                    setAllUsers(fetchedAllUsers);
                    setSlips(fetchedSlips);
                    setTransactions(fetchedTransactions);
                    setMetrics(fetchedMetrics);
                } catch (err) {
                    console.error("Failed to load admin data", err);
                } finally{
                    setIsInitializing(false);
                }
            }
            checkAdminAndLoadData();
        }
    }["AdminPage.useEffect"], [
        router
    ]);
    if (isInitializing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center min-h-screen bg-[#050816]",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-12 h-12 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/app/admin/page.tsx",
                lineNumber: 61,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/admin/page.tsx",
            lineNumber: 60,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#050816] text-slate-200",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$AdminPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AdminPanel"], {
            metrics: metrics,
            matches: matches,
            allUsers: allUsers,
            allSlips: slips,
            allTransactions: transactions,
            faqs: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_FAQS"],
            onUpdateMatch: async (updated)=>{
                try {
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].updateMatch(updated);
                    setMatches((prev)=>prev.map((m)=>m.id === updated.id ? updated : m));
                } catch (e) {
                    console.error(e);
                }
            },
            onCreateMatch: (newMatch)=>setMatches((prev)=>[
                        newMatch,
                        ...prev
                    ]),
            onSettleMatch: async (matchId, results)=>{
                try {
                    const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].settleMatch({
                        matchId,
                        picks: results.answers,
                        summary: results.summaryNote
                    });
                    if (res.success || res.message) {
                        const [fetchedMatches, fetchedSlips, fetchedTransactions, fetchedUsers] = await Promise.all([
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getMatches(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getSlips(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getTransactions(),
                            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["api"].getAllUsers()
                        ]);
                        setMatches(fetchedMatches);
                        setSlips(fetchedSlips);
                        setTransactions(fetchedTransactions);
                        setAllUsers(fetchedUsers);
                    } else {
                        alert('Settlement failed. Please check logs.');
                    }
                } catch (e) {
                    console.error(e);
                    alert('Settlement API error.');
                }
            },
            onUpdateUser: (updated)=>{
                setAllUsers((prev)=>prev.map((u)=>u.id === updated.id ? updated : u));
            },
            onApproveWithdrawal: (txId)=>{
                setTransactions((prev)=>prev.map((t)=>t.id === txId ? {
                            ...t,
                            status: 'SUCCESS'
                        } : t));
            },
            onRejectWithdrawal: (txId)=>{
                setTransactions((prev)=>prev.map((t)=>t.id === txId ? {
                            ...t,
                            status: 'REJECTED'
                        } : t));
            },
            onAddBonusCash: ()=>{},
            onApproveJackpot: ()=>{},
            onRejectJackpot: ()=>{},
            onCloseAdmin: ()=>router.push('/')
        }, void 0, false, {
            fileName: "[project]/app/admin/page.tsx",
            lineNumber: 68,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/admin/page.tsx",
        lineNumber: 67,
        columnNumber: 5
    }, this);
}
_s(AdminPage, "0Lu7RD1LLgStyM12wf/u/JXQxvw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminPage;
var _c;
__turbopack_context__.k.register(_c, "AdminPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/AdminPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AdminPanel",
    ()=>AdminPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-client] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-client] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-client] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-client] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-client] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock-open.js [app-client] (ecmascript) <export default as Unlock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-client] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-spreadsheet.js [app-client] (ecmascript) <export default as FileSpreadsheet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/square.js [app-client] (ecmascript) <export default as Square>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user-plus.js [app-client] (ecmascript) <export default as UserPlus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gift.js [app-client] (ecmascript) <export default as Gift>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-client] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-down-left.js [app-client] (ecmascript) <export default as ArrowDownLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/payoutCalculator.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
;
;
;
;
// Preset Library of Star Players for quick addition to any squad
const STAR_PLAYERS_CATALOG = [
    {
        id: 'star_vk',
        name: 'Virat Kohli',
        shortName: 'V. Kohli',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '77',
            '83*',
            '51',
            '42',
            '113*'
        ],
        careerStatHighlight: 'Avg: 39.5 • SR: 138.4 • 8 IPL Tons'
    },
    {
        id: 'star_rohit',
        name: 'Rohit Sharma',
        shortName: 'R. Sharma',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '105*',
            '38',
            '68',
            '19',
            '49'
        ],
        careerStatHighlight: 'Hitman • 6500+ Runs • 275 Sixes'
    },
    {
        id: 'star_bumrah',
        name: 'Jasprit Bumrah',
        shortName: 'J. Bumrah',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '5/21',
            '3/18',
            '2/15',
            '0/22',
            '4/20'
        ],
        careerStatHighlight: 'Econ: 6.2 • Yorker King • 165 Wkts'
    },
    {
        id: 'star_msd',
        name: 'MS Dhoni',
        shortName: 'MS Dhoni',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '28*(9)',
            '19*(5)',
            '37*(16)',
            '12*(4)',
            '20*(8)'
        ],
        careerStatHighlight: 'Finisher SR: 228.4 in 20th Over'
    },
    {
        id: 'star_klaasen',
        name: 'Heinrich Klaasen',
        shortName: 'H. Klaasen',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'SA',
        recentForm: [
            '80(34)',
            '63*(29)',
            '42(19)',
            '71(31)',
            '24(12)'
        ],
        careerStatHighlight: 'SR: 178.5 vs Spin • 38 Sixes'
    },
    {
        id: 'star_head',
        name: 'Travis Head',
        shortName: 'T. Head',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '89(30)',
            '102(39)',
            '67(24)',
            '12(6)',
            '58(28)'
        ],
        careerStatHighlight: 'PP SR: 215.4 • Powerplay Demolisher'
    },
    {
        id: 'star_cummins',
        name: 'Pat Cummins',
        shortName: 'P. Cummins',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '3/22',
            '2/19',
            '1/31',
            '3/28',
            '2/25'
        ],
        careerStatHighlight: 'Captain • Hat-trick Record Holder'
    },
    {
        id: 'star_sky',
        name: 'Suryakumar Yadav',
        shortName: 'S. Yadav',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '78*(35)',
            '56(26)',
            '102*(51)',
            '31(18)',
            '83(40)'
        ],
        careerStatHighlight: '360° Maestro • T20 No. 1 • SR: 172.5'
    },
    {
        id: 'star_hardik',
        name: 'Hardik Pandya',
        shortName: 'H. Pandya',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '34*(18)',
            '2/26',
            '41(21)',
            '1/19',
            '28(14)'
        ],
        careerStatHighlight: 'Clutch All-Rounder • 150+ SR'
    },
    {
        id: 'star_rashid',
        name: 'Rashid Khan',
        shortName: 'R. Khan',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'AFG',
        recentForm: [
            '3/16',
            '2/21',
            '1/18',
            '2/24',
            '4/19'
        ],
        careerStatHighlight: 'Mystery Googly • Econ: 6.4 in T20'
    },
    {
        id: 'star_russell',
        name: 'Andre Russell',
        shortName: 'A. Russell',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'WI',
        recentForm: [
            '64*(25)',
            '2/16',
            '41(15)',
            '3/22',
            '29*(11)'
        ],
        careerStatHighlight: 'Dre Russ • SR: 185.0 • Death Bowling'
    },
    {
        id: 'star_pant',
        name: 'Rishabh Pant',
        shortName: 'R. Pant',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '58',
            '44',
            '89*',
            '33',
            '61'
        ],
        careerStatHighlight: 'SR: 155.2 • 3500+ Runs • Match Winner'
    },
    {
        id: 'star_kuldeep',
        name: 'Kuldeep Yadav',
        shortName: 'K. Yadav',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '3/20',
            '2/18',
            '4/14',
            '1/24',
            '3/26'
        ],
        careerStatHighlight: 'Left-arm Wrist Spin • Econ: 6.8'
    }
];
const AdminPanel = ({ metrics, matches, allUsers, allSlips, allTransactions, faqs, onUpdateMatch, onCreateMatch, onSettleMatch, onUpdateUser, onApproveWithdrawal, onRejectWithdrawal, onAddBonusCash, onApproveJackpot, onRejectJackpot, onCloseAdmin })=>{
    _s();
    const [adminTab, setAdminTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('overview');
    // Match Management State
    const [selectedMatchForSquad, setSelectedMatchForSquad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(matches[0]?.id || '');
    const [selectedTeamForSquad, setSelectedTeamForSquad] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('team1');
    // Add Player Modal State
    const [showAddPlayerModal, setShowAddPlayerModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newPlayerName, setNewPlayerName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newPlayerShortName, setNewPlayerShortName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [newPlayerRole, setNewPlayerRole] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('BAT');
    const [newPlayerCountry, setNewPlayerCountry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('IND');
    const [newPlayerJersey, setNewPlayerJersey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('18');
    const [newPlayerHighlight, setNewPlayerHighlight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Avg: 42.5 • SR: 148.0');
    const [newPlayerForm, setNewPlayerForm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('54, 78*, 31, 89, 45');
    // Settlement Form State
    const [selectedMatchIdForSettlement, setSelectedMatchIdForSettlement] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(matches[0]?.id || '');
    const selectedMatchForSettlement = matches.find((m)=>m.id === selectedMatchIdForSettlement) || matches[0];
    const squadForSettlement = selectedMatchForSettlement ? [
        ...selectedMatchForSettlement.squadTeam1,
        ...selectedMatchForSettlement.squadTeam2
    ] : [];
    const [settlementPicks, setSettlementPicks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [settlementSummaryNote, setSettlementSummaryNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Match concluded. Official stats verified.');
    const [settlementSuccessMessage, setSettlementSuccessMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    // User Search & Inspector State
    const [userSearch, setUserSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [inspectedUser, setInspectedUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [bonusCreditAmount, setBonusCreditAmount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(50);
    const [bonusCreditNote, setBonusCreditNote] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Promotional Skill Reward');
    // Create Match Modal State
    const [showCreateMatchModal, setShowCreateMatchModal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [newMatchTitle, setNewMatchTitle] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Delhi Capitals vs Sunrisers Hyderabad');
    const [newMatchSeries, setNewMatchSeries] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('IPL 2026');
    const [newMatchVenue, setNewMatchVenue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Arun Jaitley Stadium, Delhi');
    const currentMatchForSquad = matches.find((m)=>m.id === selectedMatchForSquad) || matches[0];
    // Match Lifecycle Handlers
    const handleStartMatch = (match)=>{
        const updated = {
            ...match,
            status: 'LIVE'
        };
        onUpdateMatch(updated);
    };
    const handleEndMatch = (match)=>{
        setSelectedMatchIdForSettlement(match.id);
        setAdminTab('settlement');
    };
    const handleToggleLock = (match)=>{
        const nextStatus = match.status === 'LOCKED' ? 'UPCOMING' : 'LOCKED';
        onUpdateMatch({
            ...match,
            status: nextStatus
        });
    };
    // Squad Management: Add Player
    const handleAddCustomPlayer = ()=>{
        if (!newPlayerName.trim() || !currentMatchForSquad) return;
        const teamKey = selectedTeamForSquad;
        const teamInfo = teamKey === 'team1' ? currentMatchForSquad.team1 : currentMatchForSquad.team2;
        const player = {
            id: `p_${Date.now()}`,
            name: newPlayerName.trim(),
            shortName: newPlayerShortName.trim() || newPlayerName.trim(),
            team: teamInfo.code,
            teamName: teamInfo.name,
            role: newPlayerRole,
            avatar: `https://images.unsplash.com/photo-${1500648767791 + Math.floor(Math.random() * 500)}?w=150&auto=format&fit=crop&q=80`,
            country: newPlayerCountry,
            jerseyNumber: parseInt(newPlayerJersey) || 18,
            recentForm: newPlayerForm.split(',').map((s)=>s.trim()),
            careerStatHighlight: newPlayerHighlight.trim()
        };
        const updatedSquad = teamKey === 'team1' ? [
            ...currentMatchForSquad.squadTeam1,
            player
        ] : [
            ...currentMatchForSquad.squadTeam2,
            player
        ];
        const updatedMatch = {
            ...currentMatchForSquad,
            [teamKey === 'team1' ? 'squadTeam1' : 'squadTeam2']: updatedSquad
        };
        onUpdateMatch(updatedMatch);
        setShowAddPlayerModal(false);
        setNewPlayerName('');
        setNewPlayerShortName('');
    };
    // Squad Management: Add Star Player Preset
    const handleAddStarPreset = (star)=>{
        if (!currentMatchForSquad) return;
        const teamKey = selectedTeamForSquad;
        const teamInfo = teamKey === 'team1' ? currentMatchForSquad.team1 : currentMatchForSquad.team2;
        const player = {
            ...star,
            id: `p_star_${star.id}_${Date.now()}`,
            team: teamInfo.code,
            teamName: teamInfo.name
        };
        const updatedSquad = teamKey === 'team1' ? [
            ...currentMatchForSquad.squadTeam1,
            player
        ] : [
            ...currentMatchForSquad.squadTeam2,
            player
        ];
        const updatedMatch = {
            ...currentMatchForSquad,
            [teamKey === 'team1' ? 'squadTeam1' : 'squadTeam2']: updatedSquad
        };
        onUpdateMatch(updatedMatch);
    };
    // Squad Management: Remove Player
    const handleRemovePlayer = (playerId)=>{
        if (!currentMatchForSquad) return;
        const updatedTeam1 = currentMatchForSquad.squadTeam1.filter((p)=>p.id !== playerId);
        const updatedTeam2 = currentMatchForSquad.squadTeam2.filter((p)=>p.id !== playerId);
        const updatedMatch = {
            ...currentMatchForSquad,
            squadTeam1: updatedTeam1,
            squadTeam2: updatedTeam2
        };
        onUpdateMatch(updatedMatch);
    };
    // Settlement Submission
    const handleSettleSubmit = ()=>{
        if (!selectedMatchForSettlement) return;
        const answers = {};
        selectedMatchForSettlement.questions?.forEach((q)=>{
            const pick = settlementPicks[q.id];
            if (pick) {
                answers[q.id] = {
                    answerId: pick.answerId,
                    answerText: pick.answerText,
                    statValue: pick.statValue
                };
            }
        });
        const results = {
            answers,
            settledAt: new Date().toISOString(),
            summaryNote: settlementSummaryNote
        };
        onSettleMatch(selectedMatchForSettlement.id, results);
        setSettlementSuccessMessage(`Match ${selectedMatchForSettlement.title} ended and settled! All user payouts distributed.`);
        setTimeout(()=>{
            setSettlementSuccessMessage('');
        }, 4000);
    };
    const handleExportCSV = ()=>{
        const csvContent = "data:text/csv;charset=utf-8," + "Transaction_ID,User_ID,Type,Amount_INR,Status,Timestamp,Reference_ID\n" + allTransactions.map((e)=>`${e.id},${e.userId},${e.type},${e.amount},${e.status},${e.timestamp},${e.referenceId}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `superover_financials_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    const filteredUsers = allUsers.filter((u)=>{
        if (!userSearch.trim()) return true;
        const q = userSearch.toLowerCase();
        return u.name.toLowerCase().includes(q) || u.phone.includes(q) || u.email?.toLowerCase().includes(q);
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5 rounded-2xl bg-gradient-to-r from-purple-950/70 via-[#0D122B] to-indigo-950/70 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3.5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-purple-600/30",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                    className: "w-6 h-6"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 419,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 418,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-black text-[10px] uppercase border border-purple-500/30",
                                                children: "Organizer Suite"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 423,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-xs text-slate-400",
                                                children: "Match Lifecycle, Squads & User Intelligence"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 426,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 422,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-xl sm:text-2xl font-black text-white font-display mt-0.5",
                                        children: "Admin Management Portal"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 428,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 421,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 417,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: onCloseAdmin,
                            className: "px-4 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold transition-colors border border-[#1A223E]",
                            id: "btn-admin-back-to-fan",
                            children: "← Fan Play View"
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 433,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 432,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 416,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-[#1A223E]",
                children: [
                    {
                        id: 'overview',
                        label: 'Platform KPI',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"]
                    },
                    {
                        id: 'matches',
                        label: 'Match Lifecycle (Start/End)',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"]
                    },
                    {
                        id: 'squads',
                        label: 'Match Squad Viewer',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"]
                    },
                    {
                        id: 'settlement',
                        label: 'Result Settlement & Payouts',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"]
                    },
                    {
                        id: 'jackpots',
                        label: 'Jackpot Approvals',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"]
                    },
                    {
                        id: 'users',
                        label: `User Inspector (${allUsers.length})`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"]
                    },
                    {
                        id: 'withdrawals',
                        label: `Withdrawal Queue (${allTransactions.filter((t)=>t.type === 'WITHDRAWAL' && t.status === 'PENDING').length})`,
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"]
                    },
                    {
                        id: 'financials',
                        label: 'Audit CSV & Rake',
                        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$spreadsheet$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileSpreadsheet$3e$__["FileSpreadsheet"]
                    }
                ].map((tab)=>{
                    const Icon = tab.icon;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setAdminTab(tab.id),
                        className: `px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${adminTab === tab.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30' : 'bg-[#0D122B] text-slate-400 hover:text-white border border-[#1A223E]'}`,
                        id: `admin-tab-${tab.id}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                className: "w-3.5 h-3.5"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 467,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: tab.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 468,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, tab.id, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 457,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 444,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'overview' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider block",
                                        children: "Total Pool Volume"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 479,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl sm:text-3xl font-black text-white font-display mt-1 block",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.totalPoolCollected)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 480,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-[#4ADE80] mt-1 block",
                                        children: "From ₹25, ₹50, ₹100 entry fees"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 483,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 478,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider block",
                                        children: "Total Won Payouts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 487,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl sm:text-3xl font-black text-[#FFAA00] font-display mt-1 block",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.totalPayoutsDisbursed)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 488,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-slate-400 mt-1 block",
                                        children: "0.5X, 3X, 10X & 100X Winners"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 491,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 486,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-[#0D122B] border border-purple-500/30 shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-purple-300 font-bold uppercase tracking-wider block",
                                        children: "Platform Net Rake"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 495,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl sm:text-3xl font-black text-[#4ADE80] font-display mt-1 block",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.platformProfit)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 496,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-purple-400 mt-1 block",
                                        children: [
                                            "~",
                                            metrics.commissionRate,
                                            "% House Commission"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 499,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] shadow-md",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider block",
                                        children: "Registered Players"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 503,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl sm:text-3xl font-black text-white font-display mt-1 block",
                                        children: [
                                            allUsers.length,
                                            " Users"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 504,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[11px] text-slate-400 mt-1 block",
                                        children: [
                                            allSlips.length,
                                            " Total Slips Placed"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 507,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 502,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 477,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-black text-white flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                className: "w-4 h-4 text-[#FF6B00]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 514,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Live & Upcoming Matches Status"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 513,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-2.5",
                                        children: matches.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-bold text-white text-xs",
                                                                children: m.title
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 521,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "text-[11px] text-slate-400",
                                                                children: [
                                                                    "Prize Pool: ",
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-[#FFAA00] font-bold",
                                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(allSlips.filter((s)=>s.matchId === m.id).reduce((sum, slip)=>sum + slip.entryFee, 0))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                                        lineNumber: 522,
                                                                        columnNumber: 79
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    " • ",
                                                                    allSlips.filter((s)=>s.matchId === m.id).length,
                                                                    " Entries"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 522,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 520,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `px-2 py-0.5 rounded text-[10px] font-black ${m.status === 'LIVE' ? 'bg-rose-500/20 text-rose-400 animate-pulse' : m.status === 'COMPLETED' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' : m.status === 'LOCKED' ? 'bg-[#FFAA00]/20 text-[#FFAA00]' : 'bg-sky-500/20 text-sky-300'}`,
                                                        children: m.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 524,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 519,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 517,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 512,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-base font-black text-white flex items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "w-4 h-4 text-purple-400"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 538,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Quick Organizer Controls"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 537,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-300 leading-relaxed",
                                        children: "Admins can start matches to go LIVE, lock slips before toss, add custom or star players to any squad, audit what each registered user played/deposited/withdrew, and settle official 6-stat winners with automated instant payouts."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 541,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAdminTab('matches'),
                                                className: "py-2.5 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 font-bold text-xs border border-purple-500/40 text-center",
                                                children: "Manage Match Status →"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 545,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setAdminTab('squads'),
                                                className: "py-2.5 px-3 rounded-xl bg-[#FF6B00]/20 hover:bg-[#FF6B00]/30 text-[#FF8800] font-bold text-xs border border-[#FF6B00]/40 text-center",
                                                children: "Edit Squad Players →"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 551,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 544,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 536,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 511,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 476,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'matches' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-black text-white",
                                        children: "Match Lifecycle Management"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 568,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Start live matches, end/conclude fixtures, lock submissions, or edit match details."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 569,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 567,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setShowCreateMatchModal(true),
                                className: "px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md self-start sm:self-auto",
                                id: "btn-create-match-open",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 577,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Create New Match"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 578,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 572,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 566,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: matches.map((match)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 sm:p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex flex-col lg:flex-row lg:items-center justify-between gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "space-y-1.5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 flex-wrap",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-0.5 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-black uppercase border border-[#1A223E]",
                                                        children: match.format
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 590,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-300 font-bold",
                                                        children: match.series
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 593,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-bold text-slate-600",
                                                        children: "•"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 594,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `text-[10px] font-black px-2.5 py-0.5 rounded-full ${match.status === 'LIVE' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 animate-pulse' : match.status === 'COMPLETED' ? 'bg-[#4ADE80]/20 text-[#4ADE80] border border-[#4ADE80]/30' : match.status === 'LOCKED' ? 'bg-[#FFAA00]/20 text-[#FFAA00] border border-[#FFAA00]/30' : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'}`,
                                                        children: match.status === 'LIVE' ? '🔴 LIVE IN PLAY' : match.status
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 595,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 589,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                className: "text-base font-extrabold text-white",
                                                children: match.title
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 604,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            match.status === 'LIVE' && match.liveScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-sm font-black text-[#FF6B00] bg-[#FF6B00]/10 px-3 py-1 rounded-lg border border-[#FF6B00]/20 inline-block mt-1 animate-pulse",
                                                children: [
                                                    "🔴 LIVE: ",
                                                    match.liveScore
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 606,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-400 mt-1",
                                                children: [
                                                    "Venue: ",
                                                    match.venue,
                                                    " • Prize Pool: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#FFAA00] font-bold",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(allSlips.filter((s)=>s.matchId === match.id).reduce((sum, slip)=>sum + slip.entryFee, 0))
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 611,
                                                        columnNumber: 56
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    " • ",
                                                    allSlips.filter((s)=>s.matchId === match.id).length,
                                                    " Entries Placed"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 610,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-[11px] text-slate-500",
                                                children: [
                                                    "Squads: ",
                                                    match.team1.code,
                                                    " (",
                                                    match.squadTeam1.length,
                                                    " players) vs ",
                                                    match.team2.code,
                                                    " (",
                                                    match.squadTeam2.length,
                                                    " players)"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 615,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 588,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1A223E]",
                                        children: [
                                            match.status !== 'LIVE' && match.status !== 'COMPLETED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleStartMatch(match),
                                                className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:brightness-110 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-rose-600/30",
                                                id: `btn-start-match-${match.id}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {
                                                        className: "w-3.5 h-3.5 fill-current"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 629,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Start Match (Go LIVE)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 630,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 624,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            match.status !== 'COMPLETED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleEndMatch(match),
                                                className: "px-3.5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-600/30",
                                                id: `btn-end-settle-match-${match.id}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Square$3e$__["Square"], {
                                                        className: "w-3.5 h-3.5 fill-current"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 641,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "End & Settle Payouts"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 642,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 636,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            match.status === 'UPCOMING' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleToggleLock(match),
                                                className: "px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold border border-[#1A223E] flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 652,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Lock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 653,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 648,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            match.status === 'LOCKED' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>handleToggleLock(match),
                                                className: "px-3 py-2 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-300 text-xs font-bold border border-[#1A223E] flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Unlock$3e$__["Unlock"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 662,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Unlock"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 663,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 658,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    setSelectedMatchForSquad(match.id);
                                                    setAdminTab('squads');
                                                },
                                                className: "px-3 py-2 rounded-xl bg-[#080C1D] hover:bg-[#131A38] text-[#FF8800] text-xs font-bold border border-[#FF6B00]/40 flex items-center gap-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2d$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__UserPlus$3e$__["UserPlus"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 675,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Squad Players"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 676,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 668,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 621,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, match.id, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 584,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 582,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 565,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'squads' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-black text-white",
                                    children: "Match Squad Viewer"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 690,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-emerald-400 font-bold flex items-center gap-1",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 691,
                                            columnNumber: 89
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        " Fully synchronized directly from CricAPI."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 691,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 689,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 688,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] grid grid-cols-1 sm:grid-cols-2 gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1",
                                        children: "Select Match:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 698,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                        value: selectedMatchForSquad,
                                        onChange: (e)=>setSelectedMatchForSquad(e.target.value),
                                        className: "w-full px-3.5 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs font-bold focus:outline-none focus:border-[#FF6B00]",
                                        children: matches.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                value: m.id,
                                                children: [
                                                    m.title,
                                                    " (",
                                                    m.series,
                                                    ")"
                                                ]
                                            }, m.id, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 705,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 699,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 697,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-[10px] text-slate-400 font-bold uppercase tracking-wider block mb-1",
                                        children: "Select Squad Team:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 711,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "grid grid-cols-2 gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedTeamForSquad('team1'),
                                                className: `py-2 px-3 rounded-xl text-xs font-black transition-all ${selectedTeamForSquad === 'team1' ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md' : 'bg-[#080C1D] text-slate-400 border border-[#1A223E]'}`,
                                                children: [
                                                    currentMatchForSquad?.team1.name,
                                                    " (",
                                                    currentMatchForSquad?.team1.code,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 713,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setSelectedTeamForSquad('team2'),
                                                className: `py-2 px-3 rounded-xl text-xs font-black transition-all ${selectedTeamForSquad === 'team2' ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md' : 'bg-[#080C1D] text-slate-400 border border-[#1A223E]'}`,
                                                children: [
                                                    currentMatchForSquad?.team2.name,
                                                    " (",
                                                    currentMatchForSquad?.team2.code,
                                                    ")"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 723,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 712,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 710,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 696,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-xs font-black text-slate-300 uppercase tracking-wider",
                                children: [
                                    selectedTeamForSquad === 'team1' ? currentMatchForSquad?.team1.name : currentMatchForSquad?.team2.name,
                                    " Squad (",
                                    (selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2)?.length || 0,
                                    " Players)"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 739,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                children: (selectedTeamForSquad === 'team1' ? currentMatchForSquad?.squadTeam1 : currentMatchForSquad?.squadTeam2)?.map((player)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3.5 rounded-xl bg-[#0D122B] border border-[#1A223E] flex items-center justify-between gap-3",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: player.avatar,
                                                    alt: player.name,
                                                    className: "w-10 h-10 rounded-xl object-cover ring-1 ring-[#1A223E]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 751,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-xs font-black text-white",
                                                                    children: player.name
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 754,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-1.5 py-0.2 rounded bg-[#131A38] text-[#FFAA00] text-[10px] font-black",
                                                                    children: player.role
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 755,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-[10px] text-slate-400",
                                                                    children: player.country
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 758,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 753,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-[11px] text-slate-400 mt-0.5 truncate max-w-xs",
                                                            children: player.careerStatHighlight
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 760,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 752,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 750,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, player.id, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 746,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 744,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 738,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 687,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'settlement' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-black text-white flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-5 h-5 text-[#FFAA00]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 775,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Match Result Settlement & Payout Engine"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 774,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400",
                                children: "Input official player match stats for the 6 categories. The engine will instantly calculate accuracy scores and disburse winnings to all participating users."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 778,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 773,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    settlementSuccessMessage && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-2xl bg-[#4ADE80]/20 border border-[#4ADE80]/50 text-[#4ADE80] text-xs font-bold flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                className: "w-5 h-5 text-[#4ADE80] flex-shrink-0"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 785,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: settlementSuccessMessage
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 786,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 784,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "text-xs font-bold text-slate-400 uppercase tracking-wider block",
                                children: "Select Match to End & Settle:"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 792,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: selectedMatchIdForSettlement,
                                onChange: (e)=>setSelectedMatchIdForSettlement(e.target.value),
                                className: "w-full px-3.5 py-2.5 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white font-bold text-xs focus:outline-none focus:border-purple-400",
                                id: "select-match-to-settle",
                                children: matches.map((m)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: m.id,
                                        children: [
                                            m.title,
                                            " (",
                                            m.series,
                                            ") - Status: ",
                                            m.status
                                        ]
                                    }, m.id, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 802,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 795,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 791,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-5 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-sm font-extrabold text-white",
                                        children: "Enter Official Question Answers"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 812,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: async ()=>{
                                            if (!selectedMatchForSettlement) return;
                                            try {
                                                const res = await api.autoDetectMatchResults(selectedMatchForSettlement.id);
                                                if (res && res.answers) {
                                                    const newPicks = {};
                                                    Object.keys(res.answers).forEach((qId)=>{
                                                        newPicks[qId] = {
                                                            answerId: res.answers[qId] || '',
                                                            answerText: res.answers[qId] || '',
                                                            statValue: ''
                                                        };
                                                    });
                                                    setSettlementPicks(newPicks);
                                                    setSettlementSummary(res.summaryNote || 'Auto-fetched successfully.');
                                                }
                                            } catch (error) {
                                                console.error('Failed to auto-detect results', error);
                                                alert('Failed to auto-detect results. Ensure you are an Admin and CricAPI is reachable.');
                                            }
                                        },
                                        className: "px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:brightness-110 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/20",
                                        id: "btn-auto-detect-results",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                className: "w-4 h-4"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 838,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "✨ Auto-Detect Results via API"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 839,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 813,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 811,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                children: selectedMatchForSettlement?.questions?.map((q)=>{
                                    const currentPick = settlementPicks[q.id] || {
                                        answerId: '',
                                        answerText: '',
                                        statValue: ''
                                    };
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs font-bold text-[#FFAA00]",
                                                    children: [
                                                        q.number,
                                                        ". ",
                                                        q.title,
                                                        " (",
                                                        q.shortTitle,
                                                        ")"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 850,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 849,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] text-slate-400 block mb-1",
                                                        children: "Official Winner Answer/Player ID:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 856,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: currentPick.answerId,
                                                        onChange: (e)=>{
                                                            const val = e.target.value;
                                                            setSettlementPicks((prev)=>({
                                                                    ...prev,
                                                                    [q.id]: {
                                                                        ...currentPick,
                                                                        answerId: val,
                                                                        answerText: val
                                                                    }
                                                                }));
                                                        },
                                                        placeholder: "e.g. p_vkohli or Yes",
                                                        className: "w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 857,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 855,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        className: "text-[10px] text-slate-400 block mb-1",
                                                        children: "Official Stat Value / Figure:"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 873,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        type: "text",
                                                        value: currentPick.statValue,
                                                        onChange: (e)=>{
                                                            const val = e.target.value;
                                                            setSettlementPicks((prev)=>({
                                                                    ...prev,
                                                                    [q.id]: {
                                                                        ...currentPick,
                                                                        statValue: val
                                                                    }
                                                                }));
                                                        },
                                                        placeholder: "e.g. 86* off 46 balls or 3/18 (4 ov)",
                                                        className: "w-full px-3 py-1.5 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs focus:outline-none"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 874,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 872,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, q.id, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 848,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0));
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 843,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "text-xs font-bold text-slate-400 block mb-1",
                                        children: "Official Summary Note / Match Commentary:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 894,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                        value: settlementSummaryNote,
                                        onChange: (e)=>setSettlementSummaryNote(e.target.value),
                                        className: "w-full px-3.5 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white text-xs focus:outline-none",
                                        rows: 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 895,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 893,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleSettleSubmit,
                                className: "w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:brightness-110 active:scale-[0.99] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-purple-600/30 transition-all",
                                id: "btn-confirm-settlement",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 908,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Settle Match & Disburse Cash Payouts"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 909,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 903,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 810,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 772,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'jackpots' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-lg font-black text-white flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                            className: "w-5 h-5 text-amber-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 920,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        "6/6 Jackpot Approvals"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 919,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs text-slate-400",
                                    children: "Review and approve massive payouts for users who correctly guessed 6/6 stats."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 923,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 918,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 917,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: allSlips.filter((s)=>s.status === 'PENDING_APPROVAL').length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center bg-[#0D122B] border border-[#1A223E] rounded-2xl",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                    className: "w-12 h-12 text-slate-700 mx-auto mb-3"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 930,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-white font-bold",
                                    children: "No Pending Jackpots"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 931,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-slate-400 text-sm mt-1",
                                    children: "There are currently no 6/6 wins awaiting approval."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 932,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 929,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : allSlips.filter((s)=>s.status === 'PENDING_APPROVAL').map((slip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-[#0D122B] border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_15px_rgba(245,158,11,0.1)]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 mb-1",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-white",
                                                        children: slip.userName
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 939,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs text-slate-400",
                                                        children: [
                                                            "(",
                                                            slip.userPhone,
                                                            ")"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 940,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase border border-amber-500/30",
                                                        children: [
                                                            slip.multiplierWon,
                                                            "X JACKPOT"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 941,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 938,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-300",
                                                children: [
                                                    "Match: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold",
                                                        children: slip.matchTitle
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 946,
                                                        columnNumber: 30
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 945,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-300 mt-0.5",
                                                children: [
                                                    "Payout: ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-mono font-black text-amber-500 text-lg ml-1",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(slip.payoutAmount || 0)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 949,
                                                        columnNumber: 31
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 948,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 937,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onRejectJackpot(slip.id),
                                                className: "px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 font-bold text-xs transition-colors border border-rose-500/20",
                                                children: "Reject"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 953,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onApproveJackpot(slip.id),
                                                className: "px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-emerald-600/20",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                                        className: "w-4 h-4"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 963,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    "Approve Payout"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 959,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 952,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, slip.id, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 936,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 927,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 916,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'users' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-black text-white",
                                        children: "Registered Users & KYC Intelligence"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 979,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Click any user to inspect their predictions played, money added, withdrawals, and balances."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 980,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 978,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                        className: "w-4 h-4 text-slate-400 absolute left-3 top-2.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 984,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "text",
                                        placeholder: "Search user name or phone...",
                                        value: userSearch,
                                        onChange: (e)=>setUserSearch(e.target.value),
                                        className: "pl-9 pr-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-400"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 985,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 983,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 977,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: filteredUsers.map((u)=>{
                            const userSlipsCount = allSlips.filter((s)=>s.userId === u.id).length;
                            const userDepositsCount = allTransactions.filter((t)=>t.userId === u.id && t.type === 'DEPOSIT').length;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-purple-500/40 transition-all",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: u.avatar,
                                                alt: u.name,
                                                className: "w-11 h-11 rounded-xl object-cover ring-1 ring-[#1A223E]"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1006,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 flex-wrap",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-black text-white",
                                                                children: u.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 1009,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: `px-2 py-0.2 rounded text-[10px] font-bold ${u.kycStatus === 'VERIFIED' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' : 'bg-[#FFAA00]/20 text-[#FFAA00]'}`,
                                                                children: [
                                                                    "KYC: ",
                                                                    u.kycStatus
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 1010,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            u.isBlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-2 py-0.2 rounded bg-rose-500/20 text-rose-400 text-[10px] font-bold",
                                                                children: "BLOCKED"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 1016,
                                                                columnNumber: 27
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1008,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "text-xs text-slate-400 mt-0.5",
                                                        children: [
                                                            u.phone,
                                                            " • Joined ",
                                                            u.joinedDate,
                                                            " • ",
                                                            userSlipsCount,
                                                            " Slips • ",
                                                            userDepositsCount,
                                                            " Deposits"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1007,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1005,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-2 flex-wrap",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>setInspectedUser(u),
                                                className: "px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-black flex items-center gap-1.5 shadow-md shadow-purple-600/30",
                                                id: `btn-inspect-user-${u.id}`,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {
                                                        className: "w-3.5 h-3.5"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1033,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Inspect Activity"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1034,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1028,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onAddBonusCash(u.id, 50, 'Admin Promotional Reward'),
                                                className: "px-2.5 py-1.5 rounded-xl bg-[#FF6B00]/20 hover:bg-[#FF6B00]/30 text-[#FF8800] text-xs font-bold border border-[#FF6B00]/30",
                                                children: "+₹50 Bonus"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1037,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>onUpdateUser({
                                                        ...u,
                                                        isBlocked: !u.isBlocked
                                                    }),
                                                className: `px-2.5 py-1.5 rounded-xl text-xs font-bold border ${u.isBlocked ? 'bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`,
                                                children: u.isBlocked ? 'Unblock' : 'Block'
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1044,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1027,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, u.id, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1001,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0));
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 995,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 976,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            inspectedUser && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-3xl bg-[#0D122B] border border-purple-500/40 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden my-auto p-5 sm:p-6 space-y-5 max-h-[90vh] flex flex-col",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between pb-3 border-b border-[#1A223E] flex-shrink-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: inspectedUser.avatar,
                                            alt: inspectedUser.name,
                                            className: "w-10 h-10 rounded-xl object-cover ring-2 ring-purple-500"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1068,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-base font-black text-white font-display flex items-center gap-2",
                                                    children: [
                                                        inspectedUser.name,
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs text-slate-400",
                                                            children: [
                                                                "(",
                                                                inspectedUser.phone,
                                                                ")"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1072,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1070,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-xs text-slate-400",
                                                    children: [
                                                        "UPI: ",
                                                        inspectedUser.upiId || 'Not specified',
                                                        " • KYC: ",
                                                        inspectedUser.kycStatus
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1074,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1069,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1067,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setInspectedUser(null),
                                    className: "w-8 h-8 rounded-lg bg-[#131A38] text-slate-400 hover:text-white flex items-center justify-center",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1082,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1078,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1066,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "overflow-y-auto space-y-4 pr-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-3.5 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between gap-3 flex-wrap",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-xs text-slate-400 font-bold",
                                                    children: "KYC Action:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1090,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        const next = inspectedUser.kycStatus === 'VERIFIED' ? 'UNVERIFIED' : 'VERIFIED';
                                                        const updated = {
                                                            ...inspectedUser,
                                                            kycStatus: next
                                                        };
                                                        onUpdateUser(updated);
                                                        setInspectedUser(updated);
                                                    },
                                                    className: "px-3 py-1 rounded-lg bg-[#4ADE80]/20 text-[#4ADE80] font-bold text-xs border border-[#4ADE80]/30",
                                                    children: inspectedUser.kycStatus === 'VERIFIED' ? 'Revoke KYC' : 'Verify KYC ✓'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1091,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1089,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: bonusCreditAmount,
                                                    onChange: (e)=>setBonusCreditAmount(Number(e.target.value)),
                                                    className: "w-20 px-2 py-1 rounded-lg bg-[#0D122B] border border-[#1A223E] text-white text-xs font-mono text-center",
                                                    placeholder: "Amount"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1105,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: ()=>{
                                                        onAddBonusCash(inspectedUser.id, bonusCreditAmount, bonusCreditNote);
                                                    },
                                                    className: "px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gift$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gift$3e$__["Gift"], {
                                                            className: "w-3.5 h-3.5"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1118,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: [
                                                                "Credit ₹",
                                                                bonusCreditAmount,
                                                                " Bonus"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1119,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1112,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1104,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1088,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                    className: "w-3.5 h-3.5 text-[#FFAA00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Contests & Slips Played (",
                                                allSlips.filter((s)=>s.userId === inspectedUser.id).length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        allSlips.filter((s)=>s.userId === inspectedUser.id).length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "p-4 rounded-xl bg-[#080C1D] text-slate-400 text-xs text-center",
                                            children: "User has not placed any prediction slips yet."
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: allSlips.filter((s)=>s.userId === inspectedUser.id).map((slip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 rounded-xl bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "font-bold text-white",
                                                                    children: slip.matchTitle
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1139,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "text-[11px] text-slate-400",
                                                                    children: [
                                                                        "Entry: ",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(slip.entryFee),
                                                                        " • Submitted: ",
                                                                        new Date(slip.submittedAt).toLocaleDateString()
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1140,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1138,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "text-right",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: `px-2 py-0.5 rounded text-[10px] font-black ${slip.status === 'WON' ? 'bg-[#4ADE80]/20 text-[#4ADE80]' : slip.status === 'PENDING' ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'}`,
                                                                    children: [
                                                                        slip.status,
                                                                        " ",
                                                                        slip.multiplierWon ? `(${slip.multiplierWon}X)` : ''
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1143,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                slip.payoutAmount ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "block text-[#4ADE80] font-black text-xs",
                                                                    children: [
                                                                        "+",
                                                                        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(slip.payoutAmount)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1150,
                                                                    columnNumber: 29
                                                                }, ("TURBOPACK compile-time value", void 0)) : null
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1142,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, slip.id, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1137,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1125,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$down$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowDownLeft$3e$__["ArrowDownLeft"], {
                                                    className: "w-3.5 h-3.5 text-[#4ADE80]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1162,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Money Added (Deposits) (",
                                                allTransactions.filter((t)=>t.userId === inspectedUser.id && t.type === 'DEPOSIT').length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1161,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: allTransactions.filter((t)=>t.userId === inspectedUser.id && t.type === 'DEPOSIT').map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2.5 rounded-lg bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-bold",
                                                                    children: tx.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1169,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-500 text-[10px] block",
                                                                    children: [
                                                                        new Date(tx.timestamp).toLocaleString(),
                                                                        " • Ref: ",
                                                                        tx.referenceId
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1170,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1168,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#4ADE80] font-black",
                                                            children: [
                                                                "+",
                                                                (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(tx.amount)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1172,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, tx.id, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1167,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1165,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1160,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                            className: "text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                                    className: "w-3.5 h-3.5 text-sky-400"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1181,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                "Withdrawal Requests (",
                                                allTransactions.filter((t)=>t.userId === inspectedUser.id && t.type === 'WITHDRAWAL').length,
                                                ")"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1180,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1.5",
                                            children: allTransactions.filter((t)=>t.userId === inspectedUser.id && t.type === 'WITHDRAWAL').map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-2.5 rounded-lg bg-[#080C1D] border border-[#1A223E] flex items-center justify-between text-xs",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-bold",
                                                                    children: tx.description
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1188,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-slate-500 text-[10px] block",
                                                                    children: new Date(tx.timestamp).toLocaleString()
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1189,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1187,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center gap-2",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-white font-black",
                                                                    children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(tx.amount)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1192,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                tx.status === 'PENDING' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "flex items-center gap-1",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>onApproveWithdrawal(tx.id),
                                                                            className: "px-2 py-0.5 rounded bg-[#4ADE80] text-slate-950 font-black text-[10px]",
                                                                            children: "Approve"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                                            lineNumber: 1195,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                            onClick: ()=>onRejectWithdrawal(tx.id),
                                                                            className: "px-2 py-0.5 rounded bg-rose-500 text-white font-bold text-[10px]",
                                                                            children: "Reject"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                                            lineNumber: 1201,
                                                                            columnNumber: 29
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1194,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "px-2 py-0.5 rounded text-[10px] font-bold bg-[#131A38] text-slate-300",
                                                                    children: tx.status
                                                                }, void 0, false, {
                                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                                    lineNumber: 1209,
                                                                    columnNumber: 27
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1191,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, tx.id, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1186,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1184,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1179,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1086,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPanel.tsx",
                    lineNumber: 1065,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 1064,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'withdrawals' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-lg font-black text-white",
                                children: "Central Withdrawal Processing Queue"
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1227,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs text-slate-400",
                                children: "Review pending user cashouts to bank UPI accounts."
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1228,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 1226,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: allTransactions.filter((t)=>t.type === 'WITHDRAWAL').length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "p-8 text-center rounded-2xl bg-[#0D122B] border border-[#1A223E] text-xs text-slate-400",
                            children: "No withdrawal requests found in ledger."
                        }, void 0, false, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1233,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : allTransactions.filter((t)=>t.type === 'WITHDRAWAL').map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] flex items-center justify-between text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "font-bold text-white",
                                                children: tx.description
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1243,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-slate-400 text-[11px] mt-0.5",
                                                children: [
                                                    new Date(tx.timestamp).toLocaleString(),
                                                    " • Ref: ",
                                                    tx.referenceId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1244,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1242,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex items-center gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-sm font-black text-white",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(tx.amount)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1250,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            tx.status === 'PENDING' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onApproveWithdrawal(tx.id),
                                                        className: "px-3 py-1.5 rounded-lg bg-[#4ADE80] hover:brightness-110 text-slate-950 font-black text-xs shadow-sm",
                                                        children: "Approve IMPS"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1253,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>onRejectWithdrawal(tx.id),
                                                        className: "px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-white font-bold text-xs",
                                                        children: "Reject"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1259,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1252,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${tx.status === 'SUCCESS' ? 'bg-[#4ADE80]/20 text-[#4ADE80] border-[#4ADE80]/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/30'}`,
                                                children: tx.status
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1267,
                                                columnNumber: 23
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1249,
                                        columnNumber: 19
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, tx.id, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1238,
                                columnNumber: 17
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 1231,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 1225,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            adminTab === 'financials' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-lg font-black text-white",
                                        children: "Financial Audit & CSV Export"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1286,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs text-slate-400",
                                        children: "Full platform transactional audit trail."
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1287,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1285,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleExportCSV,
                                className: "px-4 py-2 rounded-xl bg-[#4ADE80] hover:brightness-110 text-slate-950 font-black text-xs flex items-center gap-2 shadow-md",
                                id: "btn-export-financials-csv",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                        className: "w-4 h-4"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1295,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Export Ledger CSV"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1296,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1290,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 1284,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-4 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-3 gap-3 text-xs",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400 block",
                                                children: "Total Pool Volume"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1303,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-black text-white mt-0.5 block",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.totalPoolCollected)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1304,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1302,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400 block",
                                                children: "Total Paid Out"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1307,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-black text-[#FFAA00] mt-0.5 block",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.totalPayoutsDisbursed)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1308,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1306,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-3 bg-[#080C1D] rounded-xl border border-[#1A223E]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-400 block",
                                                children: "Platform Net Commission"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1311,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-base font-black text-[#4ADE80] mt-0.5 block",
                                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(metrics.platformProfit)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1312,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1310,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1301,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "overflow-x-auto",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                                    className: "w-full text-left text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                className: "border-b border-[#1A223E] text-slate-400",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2",
                                                        children: "Tx ID"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1320,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2",
                                                        children: "Type"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1321,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2",
                                                        children: "Description"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1322,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2",
                                                        children: "Amount"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1323,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                        className: "py-2",
                                                        children: "Status"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                                        lineNumber: 1324,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                lineNumber: 1319,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1318,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                            className: "divide-y divide-[#1A223E]",
                                            children: allTransactions.slice(0, 10).map((tx)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 font-mono text-[11px] text-slate-400",
                                                            children: tx.id
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1330,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 font-bold text-slate-300",
                                                            children: tx.type
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1331,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 text-slate-300",
                                                            children: tx.description
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1332,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5 font-black text-white",
                                                            children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["formatINR"])(tx.amount)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1333,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                            className: "py-2.5",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "px-1.5 py-0.2 rounded bg-[#131A38] text-slate-300 text-[10px]",
                                                                children: tx.status
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/AdminPanel.tsx",
                                                                lineNumber: 1335,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1334,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, tx.id, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1329,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1327,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1317,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/AdminPanel.tsx",
                                lineNumber: 1316,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/AdminPanel.tsx",
                        lineNumber: 1300,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 1283,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showAddPlayerModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-md bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-black text-white font-display",
                                    children: "Add Player to Squad"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1353,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowAddPlayerModal(false),
                                    className: "text-slate-400 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1355,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1354,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1352,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Player Full Name: *"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1361,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "e.g. Jasprit Bumrah",
                                            value: newPlayerName,
                                            onChange: (e)=>setNewPlayerName(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1362,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1360,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-slate-300 font-bold block mb-1",
                                                    children: "Short Name:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1373,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "e.g. J. Bumrah",
                                                    value: newPlayerShortName,
                                                    onChange: (e)=>setNewPlayerShortName(e.target.value),
                                                    className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1374,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1372,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-slate-300 font-bold block mb-1",
                                                    children: "Playing Role: *"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1384,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: newPlayerRole,
                                                    onChange: (e)=>setNewPlayerRole(e.target.value),
                                                    className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "BAT",
                                                            children: "Batter (BAT)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1390,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "BOWL",
                                                            children: "Bowler (BOWL)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1391,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "AR",
                                                            children: "All-Rounder (AR)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1392,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "WK",
                                                            children: "Wicket-Keeper (WK)"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                                            lineNumber: 1393,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1385,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1383,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1371,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-slate-300 font-bold block mb-1",
                                                    children: "Country:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1400,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    placeholder: "IND",
                                                    value: newPlayerCountry,
                                                    onChange: (e)=>setNewPlayerCountry(e.target.value),
                                                    className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1401,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1399,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    className: "text-slate-300 font-bold block mb-1",
                                                    children: "Jersey Number:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1411,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    value: newPlayerJersey,
                                                    onChange: (e)=>setNewPlayerJersey(e.target.value),
                                                    className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                                    lineNumber: 1412,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1410,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1398,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Career Highlight Stat:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1422,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "Avg: 48.5 • SR: 154.2 • 2500+ Runs",
                                            value: newPlayerHighlight,
                                            onChange: (e)=>setNewPlayerHighlight(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1423,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1421,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Recent Form (comma-separated):"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1433,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            placeholder: "78*, 45, 12, 89, 34",
                                            value: newPlayerForm,
                                            onChange: (e)=>setNewPlayerForm(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-[#FF6B00]"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1434,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1432,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleAddCustomPlayer,
                                    className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black text-xs shadow-md shadow-[#FF6B00]/30 hover:brightness-110",
                                    children: "Save Player to Squad"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1443,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1359,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPanel.tsx",
                    lineNumber: 1351,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 1350,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            showCreateMatchModal && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-md overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative w-full max-w-md bg-[#0D122B] border border-[#1A223E] rounded-2xl shadow-2xl overflow-hidden my-auto p-5 sm:p-6 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-between",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-base font-black text-white font-display",
                                    children: "Create New Cricket Match"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1459,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>setShowCreateMatchModal(false),
                                    className: "text-slate-400 hover:text-white",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                        className: "w-5 h-5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/AdminPanel.tsx",
                                        lineNumber: 1461,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1460,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1458,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Match Title:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1467,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newMatchTitle,
                                            onChange: (e)=>setNewMatchTitle(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1468,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1466,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Series / Tournament:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1477,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newMatchSeries,
                                            onChange: (e)=>setNewMatchSeries(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1478,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1476,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "text-slate-300 font-bold block mb-1",
                                            children: "Venue Stadium & City:"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1487,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "text",
                                            value: newMatchVenue,
                                            onChange: (e)=>setNewMatchVenue(e.target.value),
                                            className: "w-full px-3 py-2 rounded-xl bg-[#080C1D] border border-[#1A223E] text-white focus:outline-none focus:border-purple-400"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/AdminPanel.tsx",
                                            lineNumber: 1488,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1486,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        const newMatch = {
                                            id: `match_${Date.now()}`,
                                            title: newMatchTitle,
                                            series: newMatchSeries,
                                            matchNumber: `Match ${matches.length + 1}`,
                                            team1: {
                                                code: 'DC',
                                                name: 'Delhi Capitals',
                                                shortName: 'DC',
                                                color: '#004C97',
                                                accentColor: '#EF1B23',
                                                flagOrLogo: '🐯'
                                            },
                                            team2: {
                                                code: 'SRH',
                                                name: 'Sunrisers Hyderabad',
                                                shortName: 'SRH',
                                                color: '#F26522',
                                                accentColor: '#000000',
                                                flagOrLogo: '🦅'
                                            },
                                            venue: newMatchVenue,
                                            city: 'Delhi',
                                            startTime: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
                                            lockTime: new Date(Date.now() + 7 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
                                            status: 'UPCOMING',
                                            format: 'T20',
                                            totalPool: 150000,
                                            totalEntries: 620,
                                            entryFees: [
                                                25,
                                                50,
                                                100
                                            ],
                                            squadTeam1: [
                                                {
                                                    id: `p_dc_${Date.now()}_1`,
                                                    name: 'Rishabh Pant',
                                                    shortName: 'R. Pant',
                                                    team: 'DC',
                                                    teamName: 'Delhi Capitals',
                                                    role: 'WK',
                                                    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                                                    country: 'IND',
                                                    recentForm: [
                                                        '58',
                                                        '44',
                                                        '89*'
                                                    ],
                                                    careerStatHighlight: 'SR: 155.2 • 3500+ Runs'
                                                },
                                                {
                                                    id: `p_dc_${Date.now()}_2`,
                                                    name: 'Kuldeep Yadav',
                                                    shortName: 'K. Yadav',
                                                    team: 'DC',
                                                    teamName: 'Delhi Capitals',
                                                    role: 'BOWL',
                                                    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                                                    country: 'IND',
                                                    recentForm: [
                                                        '3/20',
                                                        '2/18'
                                                    ],
                                                    careerStatHighlight: 'Econ: 6.8'
                                                }
                                            ],
                                            squadTeam2: [
                                                {
                                                    id: `p_srh_${Date.now()}_1`,
                                                    name: 'Travis Head',
                                                    shortName: 'T. Head',
                                                    team: 'SRH',
                                                    teamName: 'Sunrisers Hyderabad',
                                                    role: 'BAT',
                                                    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
                                                    country: 'AUS',
                                                    recentForm: [
                                                        '89',
                                                        '102*'
                                                    ],
                                                    careerStatHighlight: 'SR: 189.5'
                                                },
                                                {
                                                    id: `p_srh_${Date.now()}_2`,
                                                    name: 'Pat Cummins',
                                                    shortName: 'P. Cummins',
                                                    team: 'SRH',
                                                    teamName: 'Sunrisers Hyderabad',
                                                    role: 'BOWL',
                                                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                                                    country: 'AUS',
                                                    recentForm: [
                                                        '3/22',
                                                        '2/19'
                                                    ],
                                                    careerStatHighlight: 'Hat-trick hero'
                                                }
                                            ],
                                            questions: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_QUESTIONS"]
                                        };
                                        onCreateMatch(newMatch);
                                        setShowCreateMatchModal(false);
                                    },
                                    className: "w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-600/30",
                                    children: "Create Match & Publish"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/AdminPanel.tsx",
                                    lineNumber: 1496,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/AdminPanel.tsx",
                            lineNumber: 1465,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/AdminPanel.tsx",
                    lineNumber: 1457,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/src/components/AdminPanel.tsx",
                lineNumber: 1456,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/AdminPanel.tsx",
        lineNumber: 414,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminPanel, "fnO77iV71uyB2UMM4z1HhEuBO7E=");
_c = AdminPanel;
var _c;
__turbopack_context__.k.register(_c, "AdminPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/initialData.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_QUESTIONS",
    ()=>DEFAULT_QUESTIONS,
    "INITIAL_ALL_USERS",
    ()=>INITIAL_ALL_USERS,
    "INITIAL_FAQS",
    ()=>INITIAL_FAQS,
    "INITIAL_MATCHES",
    ()=>INITIAL_MATCHES,
    "INITIAL_PLATFORM_METRICS",
    ()=>INITIAL_PLATFORM_METRICS,
    "INITIAL_SLIPS",
    ()=>INITIAL_SLIPS,
    "INITIAL_TRANSACTIONS",
    ()=>INITIAL_TRANSACTIONS,
    "INITIAL_USER",
    ()=>INITIAL_USER,
    "INITIAL_WALLET",
    ()=>INITIAL_WALLET
]);
const INITIAL_USER = {
    id: 'u_guest',
    phone: '',
    name: 'Guest',
    email: '',
    avatar: 'https://ui-avatars.com/api/?name=Guest&background=131A38&color=fff',
    kycStatus: 'PENDING',
    panNumber: '',
    upiId: '',
    isBlocked: false,
    joinedDate: new Date().toISOString().split('T')[0],
    dailyDepositLimit: 0,
    totalContestsJoined: 0,
    totalWon: 0
};
const INITIAL_WALLET = {
    depositBalance: 250,
    winningsBalance: 450,
    bonusBalance: 50,
    totalBalance: 750,
    kycVerified: true,
    upiId: 'rohitfan@okaxis'
};
// Players for CSK vs MI match
const SQUAD_CSK = [
    {
        id: 'p_ruturaj',
        name: 'Ruturaj Gaikwad',
        shortName: 'R. Gaikwad',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '67',
            '42',
            '89*',
            '14',
            '58'
        ],
        careerStatHighlight: 'Avg: 42.1 • SR: 141.5 • 28 50s'
    },
    {
        id: 'p_conway',
        name: 'Devon Conway',
        shortName: 'D. Conway',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'NZ',
        recentForm: [
            '52',
            '31',
            '74',
            '8',
            '60*'
        ],
        careerStatHighlight: 'Avg: 48.6 • SR: 140.2 • 15 50s'
    },
    {
        id: 'p_dube',
        name: 'Shivam Dube',
        shortName: 'S. Dube',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '45*(18)',
            '28(12)',
            '51(24)',
            '33(16)',
            '66*(27)'
        ],
        careerStatHighlight: 'SR: 162.8 • 35 Sixes vs Spin'
    },
    {
        id: 'p_jadeja',
        name: 'Ravindra Jadeja',
        shortName: 'R. Jadeja',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '2/22',
            '1/18',
            '24*(11)',
            '3/20',
            '1/28'
        ],
        careerStatHighlight: 'Econ: 7.55 • 158 Wkts • 3000+ Runs'
    },
    {
        id: 'p_msd',
        name: 'MS Dhoni',
        shortName: 'MS Dhoni',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '28*(9)',
            '19*(5)',
            '37*(16)',
            '12*(4)',
            '20*(8)'
        ],
        careerStatHighlight: 'Finisher SR: 228.4 in 20th Over'
    },
    {
        id: 'p_pathirana',
        name: 'Matheesha Pathirana',
        shortName: 'M. Pathirana',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'SL',
        recentForm: [
            '3/21',
            '2/28',
            '4/19',
            '1/32',
            '3/15'
        ],
        careerStatHighlight: 'Death Econ: 7.8 • Yorkers: 145kph+'
    },
    {
        id: 'p_chahar',
        name: 'Deepak Chahar',
        shortName: 'D. Chahar',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '2/26',
            '1/34',
            '3/22',
            '0/25',
            '2/18'
        ],
        careerStatHighlight: 'PP Swing: 58 Powerplay Wickets'
    },
    {
        id: 'p_theekshana',
        name: 'Maheesh Theekshana',
        shortName: 'M. Theekshana',
        team: 'CSK',
        teamName: 'Chennai Super Kings',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        country: 'SL',
        recentForm: [
            '1/24',
            '2/19',
            '0/28',
            '2/22',
            '1/16'
        ],
        careerStatHighlight: 'Mystery Carrom Ball • Econ: 7.2'
    }
];
const SQUAD_MI = [
    {
        id: 'p_rohit',
        name: 'Rohit Sharma',
        shortName: 'R. Sharma',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '105*',
            '38',
            '68',
            '19',
            '49'
        ],
        careerStatHighlight: 'Hitman • 6500+ Runs • 275 Sixes'
    },
    {
        id: 'p_sky',
        name: 'Suryakumar Yadav',
        shortName: 'Suryakumar',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '83(35)',
            '56(26)',
            '102*(51)',
            '24(11)',
            '78(39)'
        ],
        careerStatHighlight: 'MR. 360° • T20I Rank 1 • SR: 172.5'
    },
    {
        id: 'p_hardik',
        name: 'Hardik Pandya',
        shortName: 'H. Pandya',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '39*(15)',
            '2/28',
            '21(12)',
            '3/31',
            '45(23)'
        ],
        careerStatHighlight: 'All-Rounder • 140kph Pace + 155 SR'
    },
    {
        id: 'p_tilak',
        name: 'Tilak Varma',
        shortName: 'T. Varma',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '65*',
            '41',
            '55',
            '32',
            '48*'
        ],
        careerStatHighlight: 'Avg: 41.5 • Left-hand Anchor'
    },
    {
        id: 'p_bumrah',
        name: 'Jasprit Bumrah',
        shortName: 'J. Bumrah',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '5/21',
            '3/18',
            '2/15',
            '1/12',
            '4/14'
        ],
        careerStatHighlight: 'GOAT Pacer • Econ: 6.45 • 165 Wkts'
    },
    {
        id: 'p_coetzee',
        name: 'Gerald Coetzee',
        shortName: 'G. Coetzee',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'SA',
        recentForm: [
            '3/32',
            '2/24',
            '1/38',
            '3/29',
            '2/19'
        ],
        careerStatHighlight: 'Express 150kph Speed • Strike Rate: 13.2'
    },
    {
        id: 'p_ishan',
        name: 'Ishan Kishan',
        shortName: 'I. Kishan',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '69(34)',
            '23(15)',
            '81(40)',
            '0',
            '35(19)'
        ],
        careerStatHighlight: 'Explosive Opener • Double Centurion'
    },
    {
        id: 'p_chawla',
        name: 'Piyush Chawla',
        shortName: 'P. Chawla',
        team: 'MI',
        teamName: 'Mumbai Indians',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '2/27',
            '1/24',
            '3/33',
            '1/19',
            '2/30'
        ],
        careerStatHighlight: '180+ IPL Wickets • Googly Specialist'
    }
];
// Squad for India vs Australia T20
const SQUAD_IND = [
    {
        id: 'p_kohli',
        name: 'Virat Kohli',
        shortName: 'V. Kohli',
        team: 'IND',
        teamName: 'India',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '82*(53)',
            '76(59)',
            '92(48)',
            '51(38)',
            '113*(72)'
        ],
        careerStatHighlight: 'King Kohli • Avg: 52.8 • Chase Master'
    },
    {
        id: 'p_jaiswal',
        name: 'Yashasvi Jaiswal',
        shortName: 'Y. Jaiswal',
        team: 'IND',
        teamName: 'India',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '93(53)',
            '68(34)',
            '47(21)',
            '100*(62)',
            '32(14)'
        ],
        careerStatHighlight: 'PP Powerhouse • SR: 164.2'
    },
    {
        id: 'p_pant',
        name: 'Rishabh Pant',
        shortName: 'R. Pant',
        team: 'IND',
        teamName: 'India',
        role: 'WK',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '55(31)',
            '42(24)',
            '88*(43)',
            '29(16)',
            '64(37)'
        ],
        careerStatHighlight: 'Match Winner • Reverse Sweep Pioneer'
    },
    {
        id: 'p_arshdeep',
        name: 'Arshdeep Singh',
        shortName: 'Arshdeep S.',
        team: 'IND',
        teamName: 'India',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '4/9',
            '3/20',
            '2/24',
            '3/32',
            '2/18'
        ],
        careerStatHighlight: 'T20 WC Top Wicket-taker (17 Wkts)'
    },
    {
        id: 'p_kuldeep',
        name: 'Kuldeep Yadav',
        shortName: 'K. Yadav',
        team: 'IND',
        teamName: 'India',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '3/16',
            '2/19',
            '4/14',
            '2/22',
            '3/26'
        ],
        careerStatHighlight: 'Left-Arm Wrist Spinner • Econ: 6.7'
    },
    {
        id: 'p_axar',
        name: 'Axar Patel',
        shortName: 'A. Patel',
        team: 'IND',
        teamName: 'India',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '3/23',
            '47(31)',
            '1/15',
            '2/21',
            '28*(12)'
        ],
        careerStatHighlight: 'Econ: 6.9 • Clutch Player of Final'
    }
];
const SQUAD_AUS = [
    {
        id: 'p_head',
        name: 'Travis Head',
        shortName: 'T. Head',
        team: 'AUS',
        teamName: 'Australia',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '76(43)',
            '89(30)',
            '34(15)',
            '102(48)',
            '54(26)'
        ],
        careerStatHighlight: 'Powerplay Monster • SR: 178.6'
    },
    {
        id: 'p_marsh',
        name: 'Mitchell Marsh',
        shortName: 'M. Marsh',
        team: 'AUS',
        teamName: 'Australia',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '58(34)',
            '1/18',
            '35(20)',
            '2/24',
            '72*(44)'
        ],
        careerStatHighlight: 'Captain • Aggressive #3'
    },
    {
        id: 'p_maxwell',
        name: 'Glenn Maxwell',
        shortName: 'G. Maxwell',
        team: 'AUS',
        teamName: 'Australia',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '64*(28)',
            '2/17',
            '19(9)',
            '1/22',
            '104*(47)'
        ],
        careerStatHighlight: 'The Big Show • 5 T20I Hundreds • SR: 155+'
    },
    {
        id: 'p_starc',
        name: 'Mitchell Starc',
        shortName: 'M. Starc',
        team: 'AUS',
        teamName: 'Australia',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '3/34',
            '2/14',
            '1/28',
            '3/20',
            '4/33'
        ],
        careerStatHighlight: 'Toe-Crushing Yorkers • 170+ ICC Wickets'
    },
    {
        id: 'p_zampa',
        name: 'Adam Zampa',
        shortName: 'A. Zampa',
        team: 'AUS',
        teamName: 'Australia',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '4/12',
            '2/28',
            '3/21',
            '1/19',
            '2/25'
        ],
        careerStatHighlight: 'Leading Leggie • Econ: 7.1'
    },
    {
        id: 'p_cummins',
        name: 'Pat Cummins',
        shortName: 'P. Cummins',
        team: 'AUS',
        teamName: 'Australia',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '3/19 (Hat-trick)',
            '2/23',
            '1/31',
            '3/24',
            '2/17'
        ],
        careerStatHighlight: 'Back-to-Back T20 WC Hat-tricks'
    }
];
// Squad for RCB vs KKR
const SQUAD_RCB = [
    {
        id: 'p_faf',
        name: 'Faf du Plessis',
        shortName: 'F. du Plessis',
        team: 'RCB',
        teamName: 'Royal Challengers Bengaluru',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        country: 'SA',
        recentForm: [
            '73',
            '44',
            '61',
            '12',
            '55'
        ],
        careerStatHighlight: 'Avg: 37.2 • 4500+ IPL Runs'
    },
    {
        id: 'p_patidar',
        name: 'Rajat Patidar',
        shortName: 'R. Patidar',
        team: 'RCB',
        teamName: 'Royal Challengers Bengaluru',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '52(23)',
            '48(20)',
            '21(11)',
            '50(19)',
            '68(32)'
        ],
        careerStatHighlight: 'Spin Basher • SR: 177.1 vs Spin'
    },
    {
        id: 'p_siraj',
        name: 'Mohammed Siraj',
        shortName: 'M. Siraj',
        team: 'RCB',
        teamName: 'Royal Challengers Bengaluru',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '3/23',
            '1/31',
            '2/18',
            '0/29',
            '3/19'
        ],
        careerStatHighlight: 'Mian Magic • Powerplay Specialist'
    },
    {
        id: 'p_green',
        name: 'Cameron Green',
        shortName: 'C. Green',
        team: 'RCB',
        teamName: 'Royal Challengers Bengaluru',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        country: 'AUS',
        recentForm: [
            '46*(17)',
            '2/28',
            '37(20)',
            '1/19',
            '67(32)'
        ],
        careerStatHighlight: 'Height & Pace + 160 SR Striker'
    }
];
const SQUAD_KKR = [
    {
        id: 'p_russell',
        name: 'Andre Russell',
        shortName: 'A. Russell',
        team: 'KKR',
        teamName: 'Kolkata Knight Riders',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        country: 'WI',
        recentForm: [
            '64*(25)',
            '3/19',
            '41(19)',
            '2/15',
            '71*(30)'
        ],
        careerStatHighlight: 'Dre Russ • All-time T20 Highest SR (174.5)'
    },
    {
        id: 'p_narine',
        name: 'Sunil Narine',
        shortName: 'S. Narine',
        team: 'KKR',
        teamName: 'Kolkata Knight Riders',
        role: 'AR',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
        country: 'WI',
        recentForm: [
            '85(39)',
            '2/22',
            '109(56)',
            '1/18',
            '71(32)'
        ],
        careerStatHighlight: 'MVP 3 Times • Centurion + Econ: 6.6'
    },
    {
        id: 'p_rinku',
        name: 'Rinku Singh',
        shortName: 'R. Singh',
        team: 'KKR',
        teamName: 'Kolkata Knight Riders',
        role: 'BAT',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '48*(21)',
            '31*(11)',
            '53(29)',
            '22*(8)',
            '38*(14)'
        ],
        careerStatHighlight: 'Clutch Finisher • 5 Sixes in Final Over'
    },
    {
        id: 'p_varun',
        name: 'Varun Chakravarthy',
        shortName: 'V. Chakravarthy',
        team: 'KKR',
        teamName: 'Kolkata Knight Riders',
        role: 'BOWL',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
        country: 'IND',
        recentForm: [
            '3/16',
            '2/24',
            '4/15',
            '1/20',
            '3/22'
        ],
        careerStatHighlight: 'Purple Cap contender • 21 Wickets in 2024'
    }
];
const DEFAULT_QUESTIONS = [
    {
        id: 'q1',
        number: 1,
        title: 'Match Winner',
        shortTitle: 'Winner',
        subtitle: 'Which team will win this match?',
        criteria: 'Team that scores more runs or wins the super over.',
        iconName: 'Award',
        badgeColor: 'from-amber-500 to-orange-500',
        type: 'TEAM'
    },
    {
        id: 'q2',
        number: 2,
        title: 'Top Batter',
        shortTitle: 'Highest Runs',
        subtitle: 'Which batsman will score the most runs in the match?',
        criteria: 'Player with highest individual aggregate score in both innings.',
        iconName: 'Target',
        badgeColor: 'from-blue-500 to-indigo-500',
        type: 'PLAYER'
    },
    {
        id: 'q3',
        number: 3,
        title: 'Any Century?',
        shortTitle: '100+ Runs',
        subtitle: 'Will any player score 100 or more runs?',
        criteria: 'At least one player scores 100+ runs.',
        iconName: 'Flame',
        badgeColor: 'from-rose-500 to-red-600',
        type: 'YES_NO',
        options: [
            'Yes',
            'No'
        ]
    },
    {
        id: 'q4',
        number: 4,
        title: 'Total Match Sixes',
        shortTitle: 'Total 6s',
        subtitle: 'How many sixes will be hit in the entire match?',
        criteria: 'Combined sixes hit by both teams.',
        iconName: 'Zap',
        badgeColor: 'from-emerald-500 to-teal-500',
        type: 'MULTIPLE_CHOICE',
        options: [
            'Under 10',
            '10 - 15',
            '16 - 20',
            'Over 20'
        ]
    },
    {
        id: 'q5',
        number: 5,
        title: 'Top Bowler',
        shortTitle: 'Most Wickets',
        subtitle: 'Which bowler will have the best bowling performance?',
        criteria: 'Highest wickets taken. Tie-breaker: Fewest runs conceded.',
        iconName: 'Crosshair',
        badgeColor: 'from-purple-500 to-indigo-500',
        type: 'PLAYER'
    },
    {
        id: 'q6',
        number: 6,
        title: 'Toss Winner',
        shortTitle: 'Toss',
        subtitle: 'Which team will win the toss?',
        criteria: 'The team that wins the pre-match coin toss.',
        iconName: 'ShieldCheck',
        badgeColor: 'from-slate-500 to-slate-700',
        type: 'TEAM'
    }
];
const INITIAL_MATCHES = [
    {
        id: 'match_csk_mi_2026',
        title: 'Chennai Super Kings vs Mumbai Indians',
        series: 'IPL 2026 - El Clásico of Cricket',
        matchNumber: 'Match 18 of 74',
        team1: {
            code: 'CSK',
            name: 'Chennai Super Kings',
            shortName: 'CSK',
            color: '#F9CD05',
            accentColor: '#1E3D8F',
            flagOrLogo: '🦁'
        },
        team2: {
            code: 'MI',
            name: 'Mumbai Indians',
            shortName: 'MI',
            color: '#004BA0',
            accentColor: '#D1AB3E',
            flagOrLogo: '⚡'
        },
        venue: 'Wankhede Stadium',
        city: 'Mumbai',
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(),
        lockTime: new Date(Date.now() + 2 * 60 * 60 * 1000 + 35 * 60 * 1000).toISOString(),
        status: 'UPCOMING',
        format: 'T20',
        totalPool: 348500,
        totalEntries: 2420,
        entryFees: [
            25,
            50,
            100
        ],
        squadTeam1: SQUAD_CSK,
        squadTeam2: SQUAD_MI,
        questions: DEFAULT_QUESTIONS,
        isFeatured: true
    },
    {
        id: 'm_ind_aus_t20',
        title: 'India vs Australia',
        series: 'T20 World Cup 2026',
        matchNumber: 'Semi Final 1',
        team1: {
            code: 'IND',
            name: 'India',
            shortName: 'IND',
            color: '#0070B8',
            accentColor: '#FF671F',
            flagOrLogo: '🇮🇳'
        },
        team2: {
            code: 'AUS',
            name: 'Australia',
            shortName: 'AUS',
            color: '#00843D',
            accentColor: '#FFCD00',
            flagOrLogo: '🇦🇺'
        },
        venue: 'Melbourne Cricket Ground (MCG)',
        city: 'Melbourne',
        startTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(),
        lockTime: new Date(Date.now() + 5 * 60 * 60 * 1000 + 50 * 60 * 1000).toISOString(),
        status: 'UPCOMING',
        format: 'T20',
        totalPool: 780000,
        totalEntries: 5120,
        entryFees: [
            25,
            50,
            100
        ],
        squadTeam1: SQUAD_IND,
        squadTeam2: SQUAD_AUS,
        questions: DEFAULT_QUESTIONS,
        isFeatured: true
    },
    {
        id: 'match_rcb_kkr_2026',
        title: 'Royal Challengers Bengaluru vs Kolkata Knight Riders',
        series: 'IPL 2026',
        matchNumber: 'Match 19 of 74',
        team1: {
            code: 'RCB',
            name: 'Royal Challengers Bengaluru',
            shortName: 'RCB',
            color: '#D11D27',
            accentColor: '#1A1A1A',
            flagOrLogo: '👑'
        },
        team2: {
            code: 'KKR',
            name: 'Kolkata Knight Riders',
            shortName: 'KKR',
            color: '#3A225D',
            accentColor: '#D4AF37',
            flagOrLogo: '⚔️'
        },
        venue: 'M. Chinnaswamy Stadium',
        city: 'Bengaluru',
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        lockTime: new Date(Date.now() + (24 * 60 - 10) * 60 * 1000).toISOString(),
        status: 'UPCOMING',
        format: 'T20',
        totalPool: 195000,
        totalEntries: 1410,
        entryFees: [
            25,
            50,
            100
        ],
        squadTeam1: SQUAD_RCB,
        squadTeam2: SQUAD_KKR,
        questions: DEFAULT_QUESTIONS
    },
    {
        id: 'match_past_gt_rr',
        title: 'Gujarat Titans vs Rajasthan Royals',
        series: 'IPL 2026',
        matchNumber: 'Match 17 of 74',
        team1: {
            code: 'GT',
            name: 'Gujarat Titans',
            shortName: 'GT',
            color: '#1B2133',
            accentColor: '#C4A962',
            flagOrLogo: '⚡'
        },
        team2: {
            code: 'RR',
            name: 'Rajasthan Royals',
            shortName: 'RR',
            color: '#EA1A85',
            accentColor: '#254AA5',
            flagOrLogo: '🛡️'
        },
        venue: 'Narendra Modi Stadium',
        city: 'Ahmedabad',
        startTime: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        lockTime: new Date(Date.now() - 14 * 60 * 60 * 1000 - 10 * 60 * 1000).toISOString(),
        status: 'COMPLETED',
        format: 'T20',
        totalPool: 412000,
        totalEntries: 3200,
        entryFees: [
            25,
            50,
            100
        ],
        squadTeam1: [
            {
                id: 'p_shubman',
                name: 'Shubman Gill',
                shortName: 'S. Gill',
                team: 'GT',
                teamName: 'Gujarat Titans',
                role: 'BAT',
                avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
                country: 'IND',
                recentForm: [
                    '89*(55)',
                    '72',
                    '34',
                    '51',
                    '104'
                ],
                careerStatHighlight: 'Orange Cap Winner • Avg: 41.8'
            },
            {
                id: 'p_rashid',
                name: 'Rashid Khan',
                shortName: 'Rashid Khan',
                team: 'GT',
                teamName: 'Gujarat Titans',
                role: 'AR',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
                country: 'AFG',
                recentForm: [
                    '3/18',
                    '2/21',
                    '24*(11)',
                    '1/15',
                    '2/26'
                ],
                careerStatHighlight: 'T20 Magician • Econ: 6.78'
            },
            {
                id: 'p_mohit',
                name: 'Mohit Sharma',
                shortName: 'M. Sharma',
                team: 'GT',
                teamName: 'Gujarat Titans',
                role: 'BOWL',
                avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
                country: 'IND',
                recentForm: [
                    '3/28',
                    '2/25',
                    '1/33',
                    '3/17',
                    '2/20'
                ],
                careerStatHighlight: 'Back of hand slower ball master'
            },
            {
                id: 'p_miller',
                name: 'David Miller',
                shortName: 'D. Miller',
                team: 'GT',
                teamName: 'Gujarat Titans',
                role: 'BAT',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
                country: 'SA',
                recentForm: [
                    '44*(18)',
                    '31*(12)',
                    '55(27)',
                    '19(9)',
                    '62*(29)'
                ],
                careerStatHighlight: 'Killer Miller • SR: 150+ in chases'
            }
        ],
        squadTeam2: [
            {
                id: 'p_samson',
                name: 'Sanju Samson',
                shortName: 'S. Samson',
                team: 'RR',
                teamName: 'Rajasthan Royals',
                role: 'WK',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
                country: 'IND',
                recentForm: [
                    '86*(46)',
                    '68(38)',
                    '32(19)',
                    '45(22)',
                    '102(51)'
                ],
                careerStatHighlight: 'Skipper • Clean Hitter • SR: 153.8'
            },
            {
                id: 'p_parag',
                name: 'Riyan Parag',
                shortName: 'R. Parag',
                team: 'RR',
                teamName: 'Rajasthan Royals',
                role: 'BAT',
                avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
                country: 'IND',
                recentForm: [
                    '54*(28)',
                    '76(40)',
                    '43(22)',
                    '84*(45)',
                    '34(16)'
                ],
                careerStatHighlight: 'Breakout Star 2024 • 573 Runs'
            },
            {
                id: 'p_chahal',
                name: 'Yuzvendra Chahal',
                shortName: 'Y. Chahal',
                team: 'RR',
                teamName: 'Rajasthan Royals',
                role: 'BOWL',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
                country: 'IND',
                recentForm: [
                    '2/19',
                    '3/24',
                    '1/31',
                    '2/22',
                    '4/17'
                ],
                careerStatHighlight: 'IPL All-Time #1 Wicket Taker (205 Wkts)'
            },
            {
                id: 'p_boult',
                name: 'Trent Boult',
                shortName: 'T. Boult',
                team: 'RR',
                teamName: 'Rajasthan Royals',
                role: 'BOWL',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
                country: 'NZ',
                recentForm: [
                    '3/22',
                    '2/16',
                    '1/28',
                    '2/20',
                    '3/15'
                ],
                careerStatHighlight: 'First Over Assassin • 30+ 1st over Wkts'
            }
        ],
        questions: DEFAULT_QUESTIONS,
        actualResults: {
            answers: {
                q1: {
                    answerId: 'RR',
                    answerText: 'Rajasthan Royals',
                    statValue: 'Won by 4 wickets'
                },
                q2: {
                    answerId: 'p_samson',
                    answerText: 'Sanju Samson',
                    statValue: '86* (46 balls)'
                },
                q3: {
                    answerId: 'No',
                    answerText: 'No',
                    statValue: 'Highest was 86*'
                },
                q4: {
                    answerId: '10 - 15',
                    answerText: '10 - 15',
                    statValue: 'Total 12 Sixes'
                },
                q5: {
                    answerId: 'p_rashid',
                    answerText: 'Rashid Khan',
                    statValue: '3/18 (4.0 ov)'
                },
                q6: {
                    answerId: 'GT',
                    answerText: 'Gujarat Titans',
                    statValue: 'Elected to bowl first'
                }
            },
            settledAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
            summaryNote: 'Rajasthan Royals won by 4 wickets in a thriller at Ahmedabad.'
        }
    }
];
const INITIAL_SLIPS = [
    {
        id: 'slip_991823',
        userId: 'usr_882910',
        userName: 'Rohit Sharma Fan',
        userPhone: '+91 98765 43210',
        matchId: 'match_past_gt_rr',
        matchTitle: 'Gujarat Titans vs Rajasthan Royals',
        series: 'IPL 2026',
        team1Code: 'GT',
        team2Code: 'RR',
        matchStartTime: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
        entryFee: 50,
        answers: {
            q1: 'RR',
            q2: 'p_samson',
            q3: 'No',
            q4: '10 - 15',
            q5: 'p_rashid',
            q6: 'GT'
        },
        submittedAt: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        status: 'WON',
        jackpotMultiplier: 10,
        correctCount: 5,
        multiplierWon: 10,
        payoutAmount: 500,
        settlementDetails: [
            {
                questionId: 'q1',
                questionTitle: 'Match Winner',
                userAnswerId: 'RR',
                userAnswerText: 'Rajasthan Royals',
                actualAnswerId: 'RR',
                actualAnswerText: 'Rajasthan Royals',
                actualStatValue: 'Won by 4 wickets',
                isCorrect: true
            },
            {
                questionId: 'q2',
                questionTitle: 'Top Batter',
                userAnswerId: 'p_samson',
                userAnswerText: 'Sanju Samson',
                actualAnswerId: 'p_samson',
                actualAnswerText: 'Sanju Samson',
                actualStatValue: '86* (46 balls)',
                isCorrect: true
            },
            {
                questionId: 'q3',
                questionTitle: 'Any Century?',
                userAnswerId: 'No',
                userAnswerText: 'No',
                actualAnswerId: 'No',
                actualAnswerText: 'No',
                actualStatValue: 'Highest was 86*',
                isCorrect: true
            },
            {
                questionId: 'q4',
                questionTitle: 'Total Match Sixes',
                userAnswerId: '10 - 15',
                userAnswerText: '10 - 15',
                actualAnswerId: '10 - 15',
                actualAnswerText: '10 - 15',
                actualStatValue: 'Total 12 Sixes',
                isCorrect: true
            },
            {
                questionId: 'q5',
                questionTitle: 'Top Bowler',
                userAnswerId: 'p_rashid',
                userAnswerText: 'Rashid Khan',
                actualAnswerId: 'p_rashid',
                actualAnswerText: 'Rashid Khan',
                actualStatValue: '3/18 (4.0 ov)',
                isCorrect: true
            },
            {
                questionId: 'q6',
                questionTitle: 'Toss Winner',
                userAnswerId: 'GT',
                userAnswerText: 'Gujarat Titans',
                actualAnswerId: 'GT',
                actualAnswerText: 'Gujarat Titans',
                actualStatValue: 'Elected to bowl first',
                isCorrect: true
            }
        ]
    }
];
const INITIAL_TRANSACTIONS = [
    {
        id: 'tx_pay_9821',
        userId: 'usr_882910',
        type: 'CONTEST_PAYOUT',
        amount: 500,
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
        description: 'Won 10X Super Win for GT vs RR (5/6 Correct)',
        referenceId: 'PAY-GTRR-10X',
        payoutMultiplier: 10
    },
    {
        id: 'tx_ent_9820',
        userId: 'usr_882910',
        type: 'CONTEST_ENTRY',
        amount: 50,
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 15 * 60 * 60 * 1000).toISOString(),
        description: 'Entry fee for GT vs RR (6 Stats Prediction)',
        referenceId: 'ENTRY-GT-RR-50'
    },
    {
        id: 'tx_dep_9819',
        userId: 'usr_882910',
        type: 'DEPOSIT',
        amount: 200,
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        description: 'Added cash via Google Pay UPI',
        paymentMethod: 'Google Pay UPI (UPI-REF-883921)',
        referenceId: 'UPI-DEP-9921'
    },
    {
        id: 'tx_bon_9818',
        userId: 'usr_882910',
        type: 'BONUS_REWARD',
        amount: 50,
        status: 'SUCCESS',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        description: 'Welcome Sign-up Bonus',
        referenceId: 'BONUS-WELCOME-50'
    }
];
const INITIAL_ALL_USERS = [
    INITIAL_USER,
    {
        id: 'usr_102931',
        phone: '+91 99440 12839',
        name: 'Kavitha Sundaram',
        email: 'kavitha.s@outlook.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        kycStatus: 'VERIFIED',
        panNumber: 'ABCDE9876Z',
        upiId: 'kavitha@paytm',
        isBlocked: false,
        joinedDate: '2026-03-22',
        dailyDepositLimit: 5000,
        totalContestsJoined: 28,
        totalWon: 12500
    },
    {
        id: 'usr_203948',
        phone: '+91 98112 34567',
        name: 'Aarav Mehta',
        email: 'aarav.m@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        kycStatus: 'SUBMITTED',
        panNumber: 'FGHIJ4567K',
        upiId: 'aarav@okaxis',
        isBlocked: false,
        joinedDate: '2026-04-02',
        dailyDepositLimit: 2000,
        totalContestsJoined: 8,
        totalWon: 150
    },
    {
        id: 'usr_304958',
        phone: '+91 97654 32109',
        name: 'Vikram Rajput',
        email: 'vikram.crick@yahoo.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        kycStatus: 'UNVERIFIED',
        isBlocked: false,
        joinedDate: '2026-04-18',
        dailyDepositLimit: 1000,
        totalContestsJoined: 3,
        totalWon: 0
    }
];
const INITIAL_PLATFORM_METRICS = {
    totalUsers: 8420,
    activeMatches: 3,
    totalPoolCollected: 1735500,
    totalPayoutsDisbursed: 1475175,
    platformProfit: 260325,
    commissionRate: 15
};
const INITIAL_FAQS = [
    {
        id: 'faq_1',
        question: 'How do I play SuperOver?',
        answer: 'Pick an upcoming cricket match, select your entry fee (₹25, ₹50, or ₹100), and answer all 6 questions predicting the Top Batter, Top Bowler, Top Striker, Most Economical Bowler, Most 6s, and Most Wickets before match lock time (10 minutes before toss/match start).',
        category: 'GAMEPLAY'
    },
    {
        id: 'faq_2',
        question: 'What is the Payout Structure?',
        answer: 'Payouts are mathematically calculated based on the number of correct predictions: 3 Correct = 0.5X Entry (50% return), 4 Correct = 3X Entry (300%), 5 Correct = 10X Entry (1,000%), and 6 Correct = 100X Entry Jackpot (10,000% return)! 0-2 correct gets 0.',
        category: 'PAYOUTS'
    },
    {
        id: 'faq_3',
        question: 'How do UPI deposits & withdrawals work?',
        answer: 'You can deposit starting at ₹25 using Google Pay, PhonePe, Paytm, BHIM, or any UPI ID instantly. Winnings can be withdrawn directly to your verified UPI ID or Bank Account immediately after match settlement.',
        category: 'WALLET'
    },
    {
        id: 'faq_4',
        question: 'Is SuperOver legal in India?',
        answer: 'Yes. SuperOver is a 100% skill-based cricket knowledge and analytical prediction platform protected under Indian Supreme Court precedents for games of skill. Users must be 18+ years of age. Users from restricted states (Telangana, Andhra Pradesh, Assam, Odisha, Nagaland, Sikkim) are prohibited.',
        category: 'LEGAL'
    },
    {
        id: 'faq_5',
        question: 'When do match submissions lock?',
        answer: 'Submissions lock exactly 10 minutes prior to official match start or toss to ensure fair play after team announcements. You can edit your picks anytime until the timer hits zero.',
        category: 'GAMEPLAY'
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/services/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-client] (ecmascript)");
;
const BASE_URL = '/api';
/**
 * Helper to fetch data from the API with a fallback to mock data.
 * It will try to read from localStorage first if the API fails, and if empty, use the provided mockData.
 */ async function fetchWithMockFallback(endpoint, options, mockData) {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': `Bearer YOUR_TOKEN`, // Uncomment if using auth
                ...options?.headers
            }
        });
        if (!response.ok) {
            throw new Error(`API returned status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.warn(`[API Stub] ${endpoint} failed, falling back to mock data.`, error);
        if (mockData !== undefined) {
            return mockData;
        }
        throw error;
    }
}
const api = {
    // Matches
    getMatches: async ()=>{
        const rawMatches = await fetchWithMockFallback('/matches', {
            method: 'GET'
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_MATCHES"]);
        return rawMatches.map((m)=>{
            // API returns matchStartTime and _id, need to map to frontend types
            const startTimeIso = m.matchStartTime || m.startTime;
            let lockTimeIso = m.lockTime;
            if (!lockTimeIso && startTimeIso) {
                // Default lock time is 1 min before start
                lockTimeIso = new Date(new Date(startTimeIso).getTime() - 60 * 1000).toISOString();
            }
            let status = m.status;
            if (status === 'UPCOMING' && new Date() >= new Date(lockTimeIso)) {
                status = 'LOCKED';
            }
            return {
                ...m,
                id: m._id || m.id,
                startTime: startTimeIso,
                lockTime: lockTimeIso,
                status: status
            };
        });
    },
    updateMatch: (payload)=>fetchWithMockFallback('/matches/update', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    // User Data
    getCurrentUser: ()=>fetchWithMockFallback('/user/current', {
            method: 'GET'
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_USER"]),
    getAllUsers: ()=>fetchWithMockFallback('/users', {
            method: 'GET'
        }, []),
    // Wallet & Transactions
    getWallet: async ()=>{
        const response = await fetch('/api/wallet', {
            method: 'GET'
        });
        if (!response.ok) {
            return {
                depositBalance: 0,
                winningsBalance: 0,
                bonusBalance: 0,
                totalBalance: 0,
                kycVerified: false,
                upiId: ''
            };
        }
        return response.json();
    },
    getTransactions: async ()=>{
        const response = await fetch('/api/transactions', {
            method: 'GET'
        });
        if (!response.ok) return [];
        return response.json();
    },
    createOrder: (payload)=>fetchWithMockFallback('/wallet/create-order', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    verifyPayment: (payload)=>fetchWithMockFallback('/wallet/verify-payment', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    withdrawFunds: (payload)=>fetchWithMockFallback('/wallet/withdraw', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    // Match Settlement
    settleMatch: (payload)=>fetchWithMockFallback('/matches/settle', {
            method: 'POST',
            body: JSON.stringify(payload)
        }),
    autoDetectMatchResults: (matchId)=>fetchWithMockFallback(`/matches/scorecard?matchId=${matchId}`, {
            method: 'GET'
        }),
    // Slips
    getSlips: ()=>fetchWithMockFallback('/slips', {
            method: 'GET'
        }, []),
    submitPredictionSlip: (payload)=>fetchWithMockFallback('/slips', {
            method: 'POST',
            body: JSON.stringify(payload)
        }, {
            message: 'Success mock',
            slip: {
                id: `slip_${Date.now()}`,
                ...payload,
                submittedAt: new Date().toISOString(),
                status: 'PENDING'
            },
            wallet: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_WALLET"]
        }),
    // Platform
    getMetrics: ()=>fetchWithMockFallback('/metrics', {
            method: 'GET'
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["INITIAL_PLATFORM_METRICS"])
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/payoutCalculator.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PAYOUT_TIERS",
    ()=>PAYOUT_TIERS,
    "calculatePotentialPayout",
    ()=>calculatePotentialPayout,
    "formatINR",
    ()=>formatINR,
    "getMultiplierForCorrectCount",
    ()=>getMultiplierForCorrectCount,
    "settlePredictionSlip",
    ()=>settlePredictionSlip
]);
const PAYOUT_TIERS = [
    {
        correct: 6,
        multiplier: 50,
        label: '50X Jackpot',
        badge: 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950',
        returnRate: '5,000%'
    },
    {
        correct: 5,
        multiplier: 10,
        label: '10X Super Win',
        badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
        returnRate: '1,000%'
    },
    {
        correct: 4,
        multiplier: 3,
        label: '3X Triple Win',
        badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/40',
        returnRate: '300%'
    },
    {
        correct: 3,
        multiplier: 0.5,
        label: '0.5X Refund Guard',
        badge: 'bg-slate-700/50 text-slate-300 border border-slate-600/40',
        returnRate: '50%'
    },
    {
        correct: 2,
        multiplier: 0,
        label: 'No Payout',
        badge: 'text-slate-500',
        returnRate: '0%'
    },
    {
        correct: 1,
        multiplier: 0,
        label: 'No Payout',
        badge: 'text-slate-500',
        returnRate: '0%'
    },
    {
        correct: 0,
        multiplier: 0,
        label: 'No Payout',
        badge: 'text-slate-500',
        returnRate: '0%'
    }
];
function getMultiplierForCorrectCount(correctCount, jackpotMultiplier = 50) {
    if (correctCount >= 6) return jackpotMultiplier;
    if (correctCount === 5) return 10;
    if (correctCount === 4) return 3;
    if (correctCount === 3) return 0.5;
    return 0;
}
function calculatePotentialPayout(entryFee, correctCount) {
    const multiplier = getMultiplierForCorrectCount(correctCount);
    return entryFee * multiplier;
}
function settlePredictionSlip(slip, match, results) {
    const allPlayers = [
        ...match.squadTeam1,
        ...match.squadTeam2
    ];
    const playerMap = new Map(allPlayers.map((p)=>[
            p.id,
            p
        ]));
    let correctCount = 0;
    const settlementDetails = [];
    match.questions.forEach((q)=>{
        const userAnswerId = slip.answers[q.id];
        const actualResult = results.answers?.[q.id];
        const actualAnswerId = actualResult ? actualResult.answerId : '';
        const isCorrect = Boolean(userAnswerId && actualAnswerId && userAnswerId.toLowerCase() === actualAnswerId.toLowerCase());
        if (isCorrect) {
            correctCount += 1;
        }
        // Try to resolve names if it's a player
        const userPlayer = userAnswerId ? playerMap.get(userAnswerId) : undefined;
        const winnerPlayer = actualAnswerId ? playerMap.get(actualAnswerId) : undefined;
        let userAnswerText = userAnswerId;
        if (q.type === 'PLAYER' && userPlayer) userAnswerText = userPlayer.name;
        let actualAnswerText = actualAnswerId || 'Pending';
        if (q.type === 'PLAYER' && winnerPlayer) actualAnswerText = winnerPlayer.name;
        else if (actualResult?.answerText) actualAnswerText = actualResult.answerText;
        settlementDetails.push({
            questionId: q.id,
            questionTitle: q.title,
            userAnswerId: userAnswerId || '',
            userAnswerText: userAnswerText || 'Unselected',
            actualAnswerId: actualAnswerId,
            actualAnswerText: actualAnswerText,
            actualStatValue: actualResult?.statValue || 'N/A',
            isCorrect
        });
    });
    const wheelMult = slip.wheelMultiplier || 50;
    const boostFactor = wheelMult / 50; // base 6/6 is 50, so if wheel is 100, boost is 2x
    let baseMultiplier = 0;
    if (correctCount >= 6) baseMultiplier = wheelMult;
    else if (correctCount === 5) baseMultiplier = 10 * boostFactor;
    else if (correctCount === 4) baseMultiplier = 3 * boostFactor;
    else if (correctCount === 3) baseMultiplier = 0.5; // 3/6 is refund, usually not boosted
    const multiplier = baseMultiplier;
    const payoutAmount = slip.entryFee * multiplier;
    let status = 'LOST';
    if (multiplier > 0) {
        status = correctCount === 6 ? 'PENDING_APPROVAL' : 'WON';
    }
    const settledSlip = {
        ...slip,
        status,
        correctCount,
        multiplierWon: multiplier,
        payoutAmount,
        settlementDetails
    };
    return {
        settledSlip,
        payoutAmount,
        multiplier,
        correctCount
    };
}
function formatINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 1,
        minimumFractionDigits: Number.isInteger(amount) ? 0 : 1
    }).format(amount);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_00gpiwh._.js.map
module.exports = [
"[project]/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Page
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/App.tsx [app-ssr] (ecmascript)");
'use client';
;
;
function Page() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$App$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 5,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/App.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>App
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Header.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/target.js [app-ssr] (ecmascript) <export default as Target>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PayoutRuleBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PayoutRuleBanner.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MatchLobby$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/MatchLobby.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/payoutCalculator.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/services/api.ts [app-ssr] (ecmascript)");
;
;
;
;
;
;
const PredictionModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/PredictionModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.PredictionModal
        })));
const SlipResultModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/SlipResultModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.SlipResultModal
        })));
const MyContestsView = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/MyContestsView.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.MyContestsView
        })));
const WalletModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/WalletModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.WalletModal
        })));
const AuthModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/AuthModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.AuthModal
        })));
const KYCModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/KYCModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.KYCModal
        })));
const RulesFAQModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/RulesFAQModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.RulesFAQModal
        })));
const ResponsibleGamingModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/ResponsibleGamingModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.ResponsibleGamingModal
        })));
const AdminLoginModal = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/AdminLoginModal.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.AdminLoginModal
        })));
const AdminPanel = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].lazy(()=>__turbopack_context__.A("[project]/src/components/AdminPanel.tsx [app-ssr] (ecmascript, async loader)").then((m)=>({
            default: m.AdminPanel
        })));
;
;
;
function App() {
    const [isInitializing, setIsInitializing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    // Core Application State
    const [matches, setMatches] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentUser, setCurrentUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_USER"]);
    const [allUsers, setAllUsers] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_ALL_USERS"]);
    const [wallet, setWallet] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_WALLET"]);
    const [slips, setSlips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_SLIPS"]);
    const [transactions, setTransactions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_TRANSACTIONS"]);
    const [metrics, setMetrics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_PLATFORM_METRICS"]);
    // Navigation & View Tabs
    const [activeTab, setActiveTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('lobby');
    const [isAdmin, setIsAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        async function loadInitialData() {
            try {
                const [fetchedMatches, fetchedUser, fetchedAllUsers, fetchedWallet, fetchedSlips, fetchedTransactions, fetchedMetrics] = await Promise.all([
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getMatches(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getCurrentUser(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getAllUsers(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getWallet(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getSlips(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getTransactions(),
                    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].getMetrics()
                ]);
                setMatches(fetchedMatches);
                setCurrentUser(fetchedUser);
                setAllUsers(fetchedAllUsers);
                setWallet(fetchedWallet);
                setSlips(fetchedSlips);
                setTransactions(fetchedTransactions);
                setMetrics(fetchedMetrics);
            } catch (err) {
                console.error("Failed to fetch from API", err);
            } finally{
                setIsInitializing(false);
            }
        }
        loadInitialData();
    }, []);
    // Modals
    const [selectedMatchForPlay, setSelectedMatchForPlay] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedMatchForResults, setSelectedMatchForResults] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [walletModalState, setWalletModalState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        open: false,
        tab: 'deposit'
    });
    const [isAuthModalOpen, setIsAuthModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isKycModalOpen, setIsKycModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isRulesModalOpen, setIsRulesModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isResponsibleModalOpen, setIsResponsibleModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminLoginModalOpen, setIsAdminLoginModalOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Check for admin.html route on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, [
        isAdminAuthenticated
    ]);
    // Secret Admin Hotkey (Ctrl + Shift + A) - Kept for convenience
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const handleKeyDown = (e)=>{
            if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') {
                e.preventDefault();
                if (!isAdminAuthenticated) {
                    setIsAdminLoginModalOpen(true);
                } else {
                    setActiveTab('admin');
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return ()=>window.removeEventListener('keydown', handleKeyDown);
    }, []);
    // User submissions count awaiting settlement
    const pendingSlipsCount = slips.filter((s)=>s.status === 'PENDING' || s.status === 'LIVE').length;
    const handleSubmitSelectionSlip = async (answers, entryFee, totalPaid, jackpotMultiplier, freeHit = false, freeHitFee = 0, wheelMultiplier)=>{
        if (!selectedMatchForPlay) return;
        const match = selectedMatchForPlay.match;
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].submitPredictionSlip({
                matchId: match.id,
                answers,
                entryFee,
                freeHit,
                freeHitFee,
                totalPayable: totalPaid,
                wheelMultiplier
            });
            // Update state with response from backend
            if (response && response.slip) {
                setWallet(response.wallet);
                setSlips((prev)=>[
                        response.slip,
                        ...prev
                    ]);
                // Add local transaction history log
                const newTx = {
                    id: `tx_ent_${Date.now()}`,
                    userId: currentUser.id,
                    type: 'CONTEST_ENTRY',
                    amount: -totalPaid,
                    status: 'SUCCESS',
                    timestamp: new Date().toISOString(),
                    description: `Stake for ${match.title}${freeHit ? ' + Free Hit' : ''}`,
                    referenceId: `ENTRY-${match.team1.code}${match.team2.code}-${Date.now().toString().slice(-4)}`
                };
                setTransactions((prev)=>[
                        newTx,
                        ...prev
                    ]);
                // Update match pool and entry counts
                setMatches((prev)=>prev.map((m)=>m.id === match.id ? {
                            ...m,
                            totalEntries: (m.totalEntries || 0) + 1,
                            totalPool: (m.totalPool || 0) + entryFee
                        } : m));
                // Update platform metrics
                setMetrics((prev)=>({
                        ...prev,
                        totalPoolCollected: prev.totalPoolCollected + entryFee
                    }));
                // Close prediction modal and redirect to My Contests tab
                setSelectedMatchForPlay(null);
                setActiveTab('my-contests');
            }
        } catch (error) {
            console.error('Failed to submit slip:', error);
            alert('Failed to submit prediction. Please check your balance or try again.');
        }
    };
    // Handler: Add Cash (Deposit via UPI)
    const handleDepositCash = async (payload, method)=>{
        try {
            // payload contains razorpay_order_id, razorpay_payment_id, razorpay_signature, amount
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$services$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["api"].verifyPayment(payload);
            if (data.success) {
                // Update local wallet state
                setWallet(data.wallet);
                // Update transactions
                if (data.transaction) {
                    setTransactions((prev)=>[
                            data.transaction,
                            ...prev
                        ]);
                }
                console.log('Deposit successful!', data);
            }
        } catch (error) {
            console.error('Deposit Error:', error);
            alert('Failed to verify payment. Please try again or contact support.');
        }
    };
    // Handler: Withdraw winnings
    const handleWithdrawWinnings = (amount, upiId)=>{
        const updatedWallet = {
            ...wallet,
            winningsBalance: wallet.winningsBalance - amount,
            totalBalance: wallet.totalBalance - amount
        };
        setWallet(updatedWallet);
        const newTx = {
            id: `tx_wdr_${Date.now()}`,
            userId: currentUser.id,
            type: 'WITHDRAWAL',
            amount,
            status: 'SUCCESS',
            timestamp: new Date().toISOString(),
            description: `Withdrawn to UPI (${upiId})`,
            paymentMethod: `IMPS/UPI: ${upiId}`,
            referenceId: `WDR-UPI-${Date.now().toString().slice(-6)}`
        };
        setTransactions((prev)=>[
                newTx,
                ...prev
            ]);
    };
    // Handler: Admin Settle Match & Distribute Payouts
    const handleSettleMatch = (matchId, results)=>{
        const match = matches.find((m)=>m.id === matchId);
        if (!match) return;
        // 1. Mark match as completed with actual results
        const updatedMatch = {
            ...match,
            status: 'COMPLETED',
            actualResults: results
        };
        setMatches((prev)=>prev.map((m)=>m.id === matchId ? updatedMatch : m));
        // 2. Settle all user prediction slips for this match
        let totalPaidOutThisMatch = 0;
        let userPayoutAmountForCurrent = 0;
        const updatedSlips = slips.map((slip)=>{
            if (slip.matchId !== matchId) return slip;
            const { settledSlip, payoutAmount } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["settlePredictionSlip"])(slip, updatedMatch, results);
            if (payoutAmount > 0 && settledSlip.status === 'WON') {
                totalPaidOutThisMatch += payoutAmount;
                if (slip.userId === currentUser.id) {
                    userPayoutAmountForCurrent += payoutAmount;
                }
                // Add payout transaction
                const payoutTx = {
                    id: `tx_pay_${Date.now()}_${slip.id}`,
                    userId: slip.userId,
                    type: 'CONTEST_PAYOUT',
                    amount: payoutAmount,
                    status: 'SUCCESS',
                    timestamp: new Date().toISOString(),
                    description: `Won ${settledSlip.multiplierWon}X Cash Prize for ${match.title} (${settledSlip.correctCount}/6 Correct)`,
                    referenceId: `PAY-${match.team1.code}${match.team2.code}-${settledSlip.multiplierWon}X`,
                    payoutMultiplier: settledSlip.multiplierWon
                };
                setTransactions((prevTxs)=>[
                        payoutTx,
                        ...prevTxs
                    ]);
            }
            return settledSlip;
        });
        setSlips(updatedSlips);
        // 3. Credit current user's wallet if they won
        if (userPayoutAmountForCurrent > 0) {
            setWallet((prev)=>({
                    ...prev,
                    winningsBalance: prev.winningsBalance + userPayoutAmountForCurrent,
                    totalBalance: prev.totalBalance + userPayoutAmountForCurrent
                }));
            setCurrentUser((prev)=>({
                    ...prev,
                    totalWon: prev.totalWon + userPayoutAmountForCurrent
                }));
        }
        // 4. Update platform financial metrics
        setMetrics((prev)=>({
                ...prev,
                totalPayoutsDisbursed: prev.totalPayoutsDisbursed + totalPaidOutThisMatch,
                platformProfit: prev.platformProfit + match.totalPool * (prev.commissionRate / 100)
            }));
    };
    // Handler: Admin Approve Jackpot
    const handleApproveJackpot = (slipId)=>{
        const slip = slips.find((s)=>s.id === slipId);
        if (!slip || slip.status !== 'PENDING_APPROVAL' || !slip.payoutAmount) return;
        // Update slip status
        setSlips((prev)=>prev.map((s)=>s.id === slipId ? {
                    ...s,
                    status: 'WON'
                } : s));
        // Update Wallet & Transactions
        const payoutTx = {
            id: `tx_pay_${Date.now()}_${slip.id}`,
            userId: slip.userId,
            type: 'CONTEST_PAYOUT',
            amount: slip.payoutAmount,
            status: 'SUCCESS',
            timestamp: new Date().toISOString(),
            description: `Won ${slip.multiplierWon}X Cash Prize for ${slip.matchTitle} (6/6 Correct - Admin Approved)`,
            referenceId: `PAY-${slip.team1Code}${slip.team2Code}-${slip.multiplierWon}X`,
            payoutMultiplier: slip.multiplierWon
        };
        setTransactions((prev)=>[
                payoutTx,
                ...prev
            ]);
        // Update metrics
        setMetrics((prev)=>({
                ...prev,
                totalPayoutsDisbursed: prev.totalPayoutsDisbursed + (slip.payoutAmount || 0)
            }));
        // If it's the current user, update their wallet live
        if (slip.userId === currentUser.id) {
            setWallet((prev)=>({
                    ...prev,
                    winningsBalance: prev.winningsBalance + (slip.payoutAmount || 0),
                    totalBalance: prev.totalBalance + (slip.payoutAmount || 0)
                }));
            setCurrentUser((prev)=>({
                    ...prev,
                    totalWon: prev.totalWon + (slip.payoutAmount || 0)
                }));
        }
    };
    // Handler: Admin Reject Jackpot
    const handleRejectJackpot = (slipId)=>{
        // Just mark it as LOST or REJECTED. We'll use LOST since it's an existing status.
        setSlips((prev)=>prev.map((s)=>s.id === slipId ? {
                    ...s,
                    status: 'LOST',
                    payoutAmount: 0
                } : s));
    };
    // Handler: Admin Add Bonus Cash
    const handleAdminAddBonus = (userId, amount)=>{
        if (userId === currentUser.id) {
            setWallet((prev)=>({
                    ...prev,
                    bonusBalance: prev.bonusBalance + amount,
                    totalBalance: prev.totalBalance + amount
                }));
        }
        const bonusTx = {
            id: `tx_bon_${Date.now()}`,
            userId,
            type: 'BONUS_REWARD',
            amount,
            status: 'SUCCESS',
            timestamp: new Date().toISOString(),
            description: 'Promotional Bonus Cash Credited by SuperOver Admin',
            referenceId: `BONUS-${Date.now().toString().slice(-4)}`
        };
        setTransactions((prev)=>[
                bonusTx,
                ...prev
            ]);
    };
    if (isInitializing) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "min-h-screen bg-[#050816] flex items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 389,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/App.tsx",
            lineNumber: 388,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-[#050816] text-slate-100 flex flex-col selection:bg-[#FF6B00] selection:text-white",
        children: [
            !(("TURBOPACK compile-time value", "undefined") !== 'undefined' && window.location.pathname === '/admin.html') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Header$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Header"], {
                user: currentUser,
                wallet: wallet,
                activeTab: activeTab,
                setActiveTab: setActiveTab,
                openWalletModal: (tab = 'deposit')=>setWalletModalState({
                        open: true,
                        tab
                    }),
                openAuthModal: ()=>setIsAuthModalOpen(true),
                openKycModal: ()=>setIsKycModalOpen(true),
                openRulesModal: ()=>setIsRulesModalOpen(true),
                openResponsibleModal: ()=>setIsResponsibleModalOpen(true),
                isAdmin: isAdmin,
                setIsAdmin: setIsAdmin,
                pendingSlipsCount: pendingSlipsCount
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 398,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8",
                children: ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        activeTab === 'lobby' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PayoutRuleBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PayoutRuleBanner"], {
                                    onOpenRules: ()=>setIsRulesModalOpen(true),
                                    onSelectMatchQuick: ()=>{}
                                }, void 0, false, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 470,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$MatchLobby$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MatchLobby"], {
                                    matches: matches,
                                    userSlips: slips,
                                    onSelectMatchToPlay: (match, fee = 25)=>{
                                        if (currentUser.id === 'u_guest') {
                                            setIsAuthModalOpen(true);
                                            return;
                                        }
                                        setSelectedMatchForPlay({
                                            match,
                                            fee
                                        });
                                    },
                                    onViewMatchResult: (match, slip)=>{
                                        setSelectedMatchForResults({
                                            match,
                                            slip
                                        });
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 474,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 469,
                            columnNumber: 11
                        }, this),
                        activeTab === 'my-contests' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Suspense, {
                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-center p-12",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"
                                }, void 0, false, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 493,
                                    columnNumber: 79
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 493,
                                columnNumber: 37
                            }, this),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MyContestsView, {
                                user: currentUser,
                                wallet: wallet,
                                slips: slips,
                                transactions: transactions,
                                matches: matches,
                                onViewSlipDetails: (match, slip)=>{
                                    setSelectedMatchForResults({
                                        match,
                                        slip
                                    });
                                },
                                onGoToLobby: ()=>setActiveTab('lobby'),
                                onOpenWallet: (tab)=>setWalletModalState({
                                        open: true,
                                        tab
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 494,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 493,
                            columnNumber: 11
                        }, this),
                        activeTab === 'payouts-rules' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PayoutRuleBanner$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PayoutRuleBanner"], {
                                    onOpenRules: ()=>setIsRulesModalOpen(true)
                                }, void 0, false, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 512,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "p-6 rounded-2xl bg-[#0D122B] border border-[#1A223E] space-y-4 shadow-xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            className: "text-xl font-extrabold text-white font-display flex items-center gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "w-2.5 h-2.5 rounded-full bg-[#FF6B00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 517,
                                                    columnNumber: 17
                                                }, this),
                                                "How SuperOver Works"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 516,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-3 gap-4 text-xs",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black flex items-center justify-center shadow-md",
                                                            children: "1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 522,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-white text-sm",
                                                            children: "Choose Entry Fee"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 523,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-400",
                                                            children: "Join upcoming IPL or International fixtures starting at just ₹25, ₹50, or ₹100."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 524,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 521,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex flex-col items-center p-3 sm:p-4 rounded-xl bg-[#0D122B] border border-[#1A223E] hover:border-[#FF6B00]/40 transition-colors text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 rounded-full bg-[#FF6B00]/20 flex items-center justify-center text-[#FF6B00] mb-3",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$target$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Target$3e$__["Target"], {
                                                                className: "w-5 h-5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/App.tsx",
                                                                lineNumber: 530,
                                                                columnNumber: 21
                                                            }, this)
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 529,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-white text-sm",
                                                            children: "Crack 6 Stats"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 532,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-xs text-slate-400 mt-1",
                                                            children: "Select player outcomes (e.g., Top Batter, Most 6s) before the match starts."
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 533,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 526,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-4 rounded-xl bg-[#080C1D] border border-[#1A223E] space-y-2",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white font-black flex items-center justify-center shadow-md",
                                                            children: "3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 536,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "font-bold text-white text-sm",
                                                            children: "Win Up to 100X Cash"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 537,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-slate-400",
                                                            children: "Get 3 right = 0.5X refund guard. 4 right = 3X. 5 right = 10X. 6 right = 100X Jackpot!"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/App.tsx",
                                                            lineNumber: 538,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/App.tsx",
                                                    lineNumber: 535,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 520,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 515,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 511,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 466,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 415,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "bg-[#03050D] border-t border-[#1A223E] py-8 text-xs text-slate-400",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row items-center justify-between gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "hidden lg:flex items-center gap-2 text-sm font-medium text-slate-400",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-[#FF6B00]",
                                                children: "SuperOver"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 554,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "•"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 555,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Low-stakes 6-stat cricket selection game"
                                            }, void 0, false, {
                                                fileName: "[project]/src/App.tsx",
                                                lineNumber: 556,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/App.tsx",
                                        lineNumber: 553,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 552,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-4 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsRulesModalOpen(true),
                                            className: "hover:text-white transition-colors",
                                            children: "Rules & FAQs"
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 561,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setIsResponsibleModalOpen(true),
                                            className: "hover:text-white transition-colors",
                                            children: "Responsible Gaming"
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 562,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setWalletModalState({
                                                    open: true,
                                                    tab: 'deposit'
                                                }),
                                            className: "hover:text-white transition-colors",
                                            children: "UPI Deposit"
                                        }, void 0, false, {
                                            fileName: "[project]/src/App.tsx",
                                            lineNumber: 563,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/App.tsx",
                                    lineNumber: 560,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 551,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "pt-4 border-t border-[#1A223E]/50 text-[11px] text-slate-500 text-center sm:text-left leading-relaxed",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Disclaimer: SuperOver is a game of skill compliant with the Public Gambling Act, 1867 and applicable Indian High Court & Supreme Court judgments. Participation is strictly restricted to Indian citizens aged 18 years and above residing in permitted states. Residents of Andhra Pradesh, Assam, Nagaland, Odisha, Sikkim, and Telangana are prohibited from participating in real-money contests."
                            }, void 0, false, {
                                fileName: "[project]/src/App.tsx",
                                lineNumber: 568,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/src/App.tsx",
                            lineNumber: 567,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 550,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 549,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].Suspense, {
                fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "fixed inset-0 flex items-center justify-center bg-[#050816]/50 backdrop-blur-sm z-50",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "w-8 h-8 border-4 border-[#FF6B00] border-t-transparent rounded-full animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 576,
                        columnNumber: 135
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/App.tsx",
                    lineNumber: 576,
                    columnNumber: 33
                }, this),
                children: [
                    selectedMatchForPlay && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictionModal, {
                        match: selectedMatchForPlay.match,
                        user: currentUser,
                        wallet: wallet,
                        initialFee: selectedMatchForPlay.fee,
                        onClose: ()=>setSelectedMatchForPlay(null),
                        onSubmitSlip: handleSubmitSelectionSlip,
                        onOpenDeposit: ()=>{
                            setSelectedMatchForPlay(null);
                            setWalletModalState({
                                open: true,
                                tab: 'deposit'
                            });
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 579,
                        columnNumber: 11
                    }, this),
                    selectedMatchForResults && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(SlipResultModal, {
                        match: selectedMatchForResults.match,
                        slip: selectedMatchForResults.slip,
                        onClose: ()=>setSelectedMatchForResults(null),
                        onPlayAnother: ()=>{
                            setSelectedMatchForResults(null);
                            setActiveTab('lobby');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 595,
                        columnNumber: 11
                    }, this),
                    walletModalState.open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(WalletModal, {
                        wallet: wallet,
                        user: currentUser,
                        transactions: transactions,
                        initialTab: walletModalState.tab,
                        onClose: ()=>setWalletModalState({
                                open: false,
                                tab: 'deposit'
                            }),
                        onDeposit: handleDepositCash,
                        onWithdraw: handleWithdrawWinnings,
                        onOpenKyc: ()=>{
                            setWalletModalState({
                                open: false,
                                tab: 'deposit'
                            });
                            setIsKycModalOpen(true);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 608,
                        columnNumber: 11
                    }, this),
                    isAuthModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthModal, {
                        onClose: ()=>setIsAuthModalOpen(false),
                        onLoginSuccess: (user)=>{
                            const enrichedUser = {
                                ...user,
                                avatar: `https://ui-avatars.com/api/?name=${user.name}&background=FF6B00&color=fff`,
                                kycStatus: 'PENDING',
                                isBlocked: false,
                                joinedDate: new Date().toISOString().split('T')[0],
                                dailyDepositLimit: 10000,
                                totalContestsJoined: 0,
                                totalWon: 0,
                                id: user._id || user.id
                            };
                            setCurrentUser(enrichedUser);
                            setWallet(user.wallet);
                            // Update allUsers so they show up in Admin panel (Mock Mode)
                            setAllUsers((prev)=>{
                                if (!prev.find((u)=>u.id === enrichedUser.id)) {
                                    return [
                                        enrichedUser,
                                        ...prev
                                    ];
                                }
                                return prev;
                            });
                            setIsAuthModalOpen(false);
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 625,
                        columnNumber: 11
                    }, this),
                    isKycModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(KYCModal, {
                        user: currentUser,
                        onClose: ()=>setIsKycModalOpen(false),
                        onCompleteKyc: (pan)=>{
                            const updated = {
                                ...currentUser,
                                kycStatus: 'VERIFIED',
                                panNumber: pan
                            };
                            setCurrentUser(updated);
                            setWallet((prev)=>({
                                    ...prev,
                                    kycVerified: true
                                }));
                            setAllUsers((prev)=>prev.map((u)=>u.id === updated.id ? updated : u));
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 655,
                        columnNumber: 11
                    }, this),
                    isRulesModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(RulesFAQModal, {
                        faqs: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_FAQS"],
                        onClose: ()=>setIsRulesModalOpen(false)
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 673,
                        columnNumber: 11
                    }, this),
                    isResponsibleModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ResponsibleGamingModal, {
                        user: currentUser,
                        onClose: ()=>setIsResponsibleModalOpen(false),
                        onUpdateLimit: (limit)=>{
                            setCurrentUser((prev)=>({
                                    ...prev,
                                    dailyDepositLimit: limit
                                }));
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 681,
                        columnNumber: 11
                    }, this),
                    isAdminLoginModalOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AdminLoginModal, {
                        onClose: ()=>{
                            setIsAdminLoginModalOpen(false);
                            // If closed without login and on admin.html, redirect back to home
                            if (window.location.pathname === '/admin.html') {
                                window.location.href = '/';
                            }
                        },
                        onLoginSuccess: ()=>{
                            setIsAdminAuthenticated(true);
                            setIsAdminLoginModalOpen(false);
                            setActiveTab('admin');
                        }
                    }, void 0, false, {
                        fileName: "[project]/src/App.tsx",
                        lineNumber: 692,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/App.tsx",
                lineNumber: 576,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/App.tsx",
        lineNumber: 395,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/Header.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>Header
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wallet.js [app-ssr] (ecmascript) <export default as Wallet>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.js [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/settings.js [app-ssr] (ecmascript) <export default as Settings>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/award.js [app-ssr] (ecmascript) <export default as Award>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trophy.js [app-ssr] (ecmascript) <export default as Trophy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-plus.js [app-ssr] (ecmascript) <export default as PlusCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/payoutCalculator.ts [app-ssr] (ecmascript)");
;
;
;
const Header = ({ user, wallet, activeTab, setActiveTab, openWalletModal, openAuthModal, openKycModal, openRulesModal, openResponsibleModal, isAdmin, setIsAdmin, pendingSlipsCount })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: "sticky top-0 z-40 bg-[#050816]/95 backdrop-blur-md border-b border-[#1A223E] shadow-xl shadow-black/40",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-[#03050D] px-4 py-1.5 border-b border-[#1A223E]/70 text-xs text-slate-400 flex justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5 font-bold text-[#4ADE80]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 53,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Where stats meet instincts"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 52,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline-block text-slate-700",
                                children: "•"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 55,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "hidden sm:inline-flex items-center gap-1.5 text-slate-300 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 57,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Crack 6 match stats and gain upto 500X rewards"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 56,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openResponsibleModal,
                                className: "hover:text-[#FFAA00] transition-colors flex items-center gap-1 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "px-1.5 py-0.2 rounded bg-[#FF6B00]/15 text-[#FF6B00] font-bold border border-[#FF6B00]/30 text-[10px]",
                                        children: "18+"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Responsible Gaming"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 63,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-700",
                                children: "|"
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 70,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: openRulesModal,
                                className: "hover:text-slate-200 transition-colors flex items-center gap-1 text-[11px]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                        className: "w-3 h-3 text-[#FF6B00]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " FAQs & Rules"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 71,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 62,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveTab('lobby'),
                                className: "flex items-center gap-2.5 text-left group focus:outline-none",
                                id: "btn-brand-home",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#FF8800] to-[#FFAA00] p-0.5 shadow-lg shadow-[#FF6B00]/25 group-hover:scale-105 transition-transform flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "w-full h-full bg-[#050816] rounded-[10px] flex items-center justify-center text-[#FF6B00] relative overflow-hidden",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                    className: "w-5 h-5 fill-[#FF6B00] text-[#FF6B00]"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 91,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "absolute -bottom-1 -right-1 text-[9px] font-black text-[#FF6B00]/40",
                                                    children: "6"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 92,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 90,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xl font-extrabold tracking-tight text-white font-display",
                                                        children: [
                                                            "Super",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00]",
                                                                children: "Over"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/Header.tsx",
                                                                lineNumber: 98,
                                                                columnNumber: 24
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 97,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-1.5 py-0.2 rounded bg-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-black tracking-wider uppercase border border-[#FF6B00]/40",
                                                        children: "500X"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 100,
                                                        columnNumber: 17
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 96,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-[11px] text-slate-400 -mt-0.5 hidden sm:block",
                                                children: "6-Stat Cricket Selection"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 104,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 84,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                                className: "hidden md:flex items-center gap-1 ml-4 pl-4 border-l border-[#1A223E]",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('lobby'),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${activeTab === 'lobby' ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10' : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'}`,
                                        id: "nav-lobby-tab",
                                        children: "Match Lobby"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 110,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('my-contests'),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 relative ${activeTab === 'my-contests' ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10' : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'}`,
                                        id: "nav-my-contests-tab",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trophy$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Trophy$3e$__["Trophy"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 130,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "My Selections",
                                            pendingSlipsCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-slate-950 text-[10px] font-black",
                                                children: pendingSlipsCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 133,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 121,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setActiveTab('payouts-rules'),
                                        className: `px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${activeTab === 'payouts-rules' ? 'bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/40 shadow-sm shadow-[#FF6B00]/10' : 'text-slate-300 hover:text-white hover:bg-[#0D122B]'}`,
                                        id: "nav-payouts-tab",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$award$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Award$3e$__["Award"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 147,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "Rewards Multipliers"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 138,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 109,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 83,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2.5",
                        children: [
                            user.id !== 'u_guest' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center bg-[#0D122B] rounded-xl p-1 border border-[#1A223E] shadow-inner",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openWalletModal('passbook'),
                                        className: "flex items-center gap-2 px-2.5 py-1 text-left hover:bg-[#131A38] rounded-lg transition-colors group",
                                        title: "Click to view wallet details",
                                        id: "btn-wallet-balance",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-7 h-7 rounded-lg bg-[#4ADE80]/20 border border-[#4ADE80]/30 flex items-center justify-center text-[#4ADE80]",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wallet$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Wallet$3e$__["Wallet"], {
                                                    className: "w-3.5 h-3.5"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 165,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 164,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-400 uppercase tracking-wider font-bold leading-none",
                                                        children: "Wallet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 168,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-xs font-extrabold text-white group-hover:text-[#4ADE80] transition-colors",
                                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(wallet.totalBalance)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/Header.tsx",
                                                        lineNumber: 169,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 167,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 158,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>openWalletModal('deposit'),
                                        className: "ml-1 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white text-xs font-extrabold hover:brightness-110 active:scale-95 transition-all shadow-md shadow-[#FF6B00]/30 flex items-center gap-1",
                                        id: "btn-quick-add-money",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$plus$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__PlusCircle$3e$__["PlusCircle"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 180,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Add ₹"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/Header.tsx",
                                                lineNumber: 181,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/Header.tsx",
                                        lineNumber: 175,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 157,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "relative",
                                children: user.id === 'u_guest' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: openAuthModal,
                                    className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold transition-all shadow-md shadow-indigo-500/20 hover:brightness-110",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 193,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Login / Register"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 194,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 189,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: openAuthModal,
                                    className: "flex items-center gap-2 p-1 sm:px-2.5 sm:py-1 rounded-xl bg-[#0D122B] hover:bg-[#131A38] border border-[#1A223E] transition-all text-left group",
                                    id: "btn-user-profile",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: user.avatar,
                                            alt: user.name,
                                            className: "w-7 h-7 rounded-lg object-cover ring-1 ring-[#FF6B00]/40"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 202,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "hidden lg:flex flex-col",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-xs font-bold text-slate-200 truncate max-w-[90px]",
                                                            children: user.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 209,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        user.kycStatus === 'VERIFIED' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#4ADE80] text-[10px]",
                                                            title: "KYC Verified",
                                                            children: "✓"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-[#FFAA00] text-[10px]",
                                                            title: "KYC Pending",
                                                            children: "⚠️"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/Header.tsx",
                                                            lineNumber: 213,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-slate-400",
                                                    children: user.phone
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/Header.tsx",
                                                    lineNumber: 216,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 197,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            user.role === 'ADMIN' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pl-1 border-l border-[#1A223E]",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: "/admin",
                                    className: "px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400 shadow-md shadow-purple-600/30 ring-2 ring-purple-500/30 hover:brightness-110",
                                    title: "Go to Admin Panel",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$settings$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Settings$3e$__["Settings"], {
                                            className: "w-3.5 h-3.5 text-white"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 229,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "hidden sm:inline",
                                            children: "Admin Panel"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "sm:hidden",
                                            children: "Admin"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/Header.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/Header.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 223,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 154,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 81,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "md:hidden flex items-center justify-around border-t border-[#1A223E] bg-[#03050D] px-2 py-1.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('lobby'),
                        className: `flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors ${activeTab === 'lobby' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'}`,
                        children: "Matches"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 240,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('my-contests'),
                        className: `flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1 ${activeTab === 'my-contests' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'}`,
                        children: [
                            "My Selections",
                            pendingSlipsCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "px-1.5 py-0.2 rounded-full bg-[#4ADE80] text-slate-950 text-[9px] font-black",
                                children: pendingSlipsCount
                            }, void 0, false, {
                                fileName: "[project]/src/components/Header.tsx",
                                lineNumber: 256,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 248,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>setActiveTab('payouts-rules'),
                        className: `flex-1 py-1.5 text-center text-xs font-bold rounded-lg transition-colors ${activeTab === 'payouts-rules' ? 'bg-[#FF6B00]/20 text-[#FF6B00]' : 'text-slate-400'}`,
                        children: "500X Rewards"
                    }, void 0, false, {
                        fileName: "[project]/src/components/Header.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/Header.tsx",
                lineNumber: 239,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/Header.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/MatchLobby.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MatchLobby",
    ()=>MatchLobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/clock.js [app-ssr] (ecmascript) <export default as Clock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/users.js [app-ssr] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/flame.js [app-ssr] (ecmascript) <export default as Flame>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-right.js [app-ssr] (ecmascript) <export default as ArrowRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/lock.js [app-ssr] (ecmascript) <export default as Lock>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/payoutCalculator.ts [app-ssr] (ecmascript)");
;
;
;
;
const MatchLobby = ({ matches, userSlips, onSelectMatchToPlay, onViewMatchResult })=>{
    const [activeFilter, setActiveFilter] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('UPCOMING');
    const [now, setNow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(new Date());
    // Update clock every second for precise countdown
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setInterval(()=>{
            setNow(new Date());
        }, 1000);
        return ()=>clearInterval(timer);
    }, []);
    const filteredMatches = matches.filter((m)=>{
        if (activeFilter === 'COMPLETED') return m.status === 'COMPLETED';
        // For UPCOMING, IPL, INTL - only show matches you can actually play!
        if (m.status !== 'UPCOMING') return false;
        // RULE: A user can only predict once per match.
        // If they have already predicted this match, hide it from the lobby.
        // They can track it in the 'My Selections' tab instead.
        const hasPredicted = userSlips.some((slip)=>slip.matchId === m.id);
        if (hasPredicted) return false;
        if (activeFilter === 'IPL') return m.series.includes('IPL');
        if (activeFilter === 'INTL') return m.series.includes('ICC') || m.series.includes('Championship');
        return true; // For UPCOMING
    });
    const getCountdownString = (startTimeIso, lockTimeIso, status)=>{
        if (status === 'COMPLETED') return 'Match Ended & Settled';
        if (status === 'LOCKED' || status === 'LIVE') return 'Submissions Locked • Match Live';
        const lockDate = new Date(lockTimeIso).getTime();
        const diffMs = lockDate - now.getTime();
        if (diffMs <= 0) {
            return 'Locking now...';
        }
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor(diffMs % (1000 * 60 * 60) / (1000 * 60));
        const diffSecs = Math.floor(diffMs % (1000 * 60) / 1000);
        if (diffHrs > 24) {
            const days = Math.floor(diffHrs / 24);
            return `Locks in ${days}d ${diffHrs % 24}h`;
        }
        return `Locks in ${String(diffHrs).padStart(2, '0')}h ${String(diffMins).padStart(2, '0')}m ${String(diffSecs).padStart(2, '0')}s`;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display flex items-center gap-2.5",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$flame$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Flame$3e$__["Flame"], {
                                        className: "w-6 h-6 text-[#FF6B00] fill-[#FF6B00]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Match Lobby"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MatchLobby.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-400 mt-1",
                                children: "Pick an upcoming match, choose your entry fee, and select the 6 key match stats."
                            }, void 0, false, {
                                fileName: "[project]/src/components/MatchLobby.tsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/MatchLobby.tsx",
                        lineNumber: 88,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none",
                        children: [
                            {
                                id: 'UPCOMING',
                                label: 'All Upcoming'
                            },
                            {
                                id: 'IPL',
                                label: 'IPL 2026'
                            },
                            {
                                id: 'INTL',
                                label: 'International'
                            }
                        ].map((tab)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setActiveFilter(tab.id),
                                className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${activeFilter === tab.id ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md shadow-[#FF6B00]/30' : 'bg-[#0D122B] text-slate-300 hover:bg-[#131A38] border border-[#1A223E]'}`,
                                id: `filter-tab-${tab.id.toLowerCase()}`,
                                children: tab.label
                            }, tab.id, false, {
                                fileName: "[project]/src/components/MatchLobby.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)))
                    }, void 0, false, {
                        fileName: "[project]/src/components/MatchLobby.tsx",
                        lineNumber: 99,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/MatchLobby.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5",
                children: filteredMatches.map((match)=>{
                    const userSlipsForMatch = userSlips.filter((s)=>s.matchId === match.id);
                    const hasUserEntered = userSlipsForMatch.length > 0;
                    const isLocked = match.status === 'LOCKED' || match.status === 'LIVE';
                    const isCompleted = match.status === 'COMPLETED';
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: `rounded-2xl border transition-all duration-200 overflow-hidden flex flex-col justify-between ${match.isFeatured ? 'bg-gradient-to-b from-[#0D122B] to-[#080B1A] border-[#FF6B00]/35 shadow-xl shadow-black/40 hover:border-[#FF6B00]/70' : 'bg-[#0D122B]/90 border-[#1A223E] hover:border-[#253058] shadow-lg shadow-black/30'}`,
                        id: `match-card-${match.id}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "px-4 py-2.5 bg-[#080C1D] border-b border-[#1A223E] flex items-center justify-between text-xs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 truncate",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "px-1.5 py-0.5 rounded bg-[#131A38] text-[#FF6B00] font-black text-[10px] uppercase border border-[#FF6B00]/20",
                                                        children: match.format
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 143,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-bold text-slate-200 truncate max-w-[140px] sm:max-w-[180px]",
                                                        children: match.series
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 146,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 142,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-1.5 text-xs",
                                                children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded-full bg-[#131A38] text-slate-300 font-bold text-[11px] flex items-center gap-1 border border-[#1A223E]",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                            className: "w-3 h-3 text-[#4ADE80]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                                            lineNumber: 154,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Settled"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 153,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)) : isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold text-[11px] flex items-center gap-1 animate-pulse",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                                            className: "w-3 h-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                                            lineNumber: 158,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        " Locked"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 157,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "px-2 py-0.5 rounded-full bg-[#FF6B00]/15 text-[#FFAA00] border border-[#FF6B00]/30 font-bold text-[11px] flex items-center gap-1",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$clock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Clock$3e$__["Clock"], {
                                                            className: "w-3 h-3 text-[#FF6B00]"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 25
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        getCountdownString(match.startTime, match.lockTime, match.status)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 161,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 151,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                        lineNumber: 141,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "p-5",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center justify-between gap-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 flex flex-col items-center text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-14 h-14 rounded-2xl p-1 flex items-center justify-center text-2xl shadow-inner relative border",
                                                                style: {
                                                                    backgroundColor: `${match.team1.color}20`,
                                                                    borderColor: match.team1.color
                                                                },
                                                                children: [
                                                                    match.team1.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: match.team1.logoUrl,
                                                                        alt: match.team1.code,
                                                                        className: "w-10 h-10 object-contain drop-shadow-md"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 179,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "filter drop-shadow",
                                                                        children: match.team1.flagOrLogo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 181,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded text-white shadow-sm",
                                                                        style: {
                                                                            backgroundColor: match.team1.color
                                                                        },
                                                                        children: match.team1.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 183,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 174,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-white mt-2 line-clamp-1",
                                                                children: match.team1.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 190,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 173,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex flex-col items-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "w-8 h-8 rounded-full bg-[#131A38] border border-[#1A223E] text-slate-400 text-xs font-black flex items-center justify-center shadow-md",
                                                                children: "VS"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 197,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-[10px] text-slate-400 font-medium mt-1",
                                                                children: new Date(match.startTime).toLocaleTimeString([], {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 200,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 196,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex-1 flex flex-col items-center text-center",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "w-14 h-14 rounded-2xl p-1 flex items-center justify-center text-2xl shadow-inner relative border",
                                                                style: {
                                                                    backgroundColor: `${match.team2.color}20`,
                                                                    borderColor: match.team2.color
                                                                },
                                                                children: [
                                                                    match.team2.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                                        src: match.team2.logoUrl,
                                                                        alt: match.team2.code,
                                                                        className: "w-10 h-10 object-contain drop-shadow-md"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 212,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "filter drop-shadow",
                                                                        children: match.team2.flagOrLogo
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 214,
                                                                        columnNumber: 27
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "absolute -bottom-1 text-[9px] font-black px-1.5 py-0.2 rounded text-white shadow-sm",
                                                                        style: {
                                                                            backgroundColor: match.team2.color
                                                                        },
                                                                        children: match.team2.code
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                                        lineNumber: 216,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 207,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-xs font-bold text-white mt-2 line-clamp-1",
                                                                children: match.team2.name
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 223,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 206,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 171,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            match.status === 'LIVE' && match.liveScore && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-2 mx-4 p-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00]/20 to-[#FF8800]/5 border border-[#FF6B00]/30 flex flex-col items-center justify-center text-center animate-pulse",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] font-black text-[#FF8800] uppercase tracking-wider mb-0.5",
                                                        children: "🔴 Live Score"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 232,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-sm font-extrabold text-white",
                                                        children: match.liveScore
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 233,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 231,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-4 pt-3 border-t border-[#1A223E] flex items-center justify-between text-xs text-slate-400 mx-5 pb-4",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 text-[11px] truncate max-w-[170px]",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                                className: "w-3.5 h-3.5 text-slate-500 flex-shrink-0"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 240,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "truncate",
                                                                children: [
                                                                    match.venue,
                                                                    ", ",
                                                                    match.city
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 241,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-1 font-bold text-slate-300",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"], {
                                                                className: "w-3.5 h-3.5 text-[#FF6B00]"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 245,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: [
                                                                    match.totalEntries.toLocaleString(),
                                                                    " entries"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 246,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 244,
                                                        columnNumber: 21
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 238,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            hasUserEntered && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mt-3 px-3 py-1.5 rounded-lg bg-[#4ADE80]/10 border border-[#4ADE80]/30 flex items-center justify-between text-xs",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#4ADE80] font-bold flex items-center gap-1.5",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                                                className: "w-3.5 h-3.5"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                                lineNumber: 254,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            userSlipsForMatch.length,
                                                            " Slip",
                                                            userSlipsForMatch.length > 1 ? 's' : '',
                                                            " Submitted"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 253,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    isCompleted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[#FFAA00] font-black",
                                                        children: userSlipsForMatch[0].status === 'WON' ? `Won ${(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(userSlipsForMatch[0].payoutAmount || 0)} (${userSlipsForMatch[0].multiplierWon}X)` : '0 / Payout'
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                                        lineNumber: 258,
                                                        columnNumber: 25
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/MatchLobby.tsx",
                                                lineNumber: 252,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/MatchLobby.tsx",
                                        lineNumber: 170,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MatchLobby.tsx",
                                lineNumber: 140,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "p-4 bg-[#080C1D] border-t border-[#1A223E]",
                                children: isCompleted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onViewMatchResult(match, userSlipsForMatch[0]),
                                    className: "w-full py-2.5 rounded-xl bg-[#131A38] hover:bg-[#1A223E] text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-[#1A223E] hover:border-[#253058] shadow",
                                    id: `btn-view-results-${match.id}`,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "View Official Results & Slips"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 277,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                            className: "w-4 h-4"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 278,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                    lineNumber: 272,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : isLocked ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>onViewMatchResult(match, userSlipsForMatch[0]),
                                    className: "w-full py-2.5 rounded-xl bg-[#131A38] text-slate-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-not-allowed border border-[#1A223E]",
                                    disabled: true,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$lock$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Lock$3e$__["Lock"], {
                                            className: "w-3.5 h-3.5"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 286,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Auto locks 1 minute before scheduled time"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 287,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                    lineNumber: 281,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-between",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[11px] text-slate-400 font-semibold",
                                                    children: "Choose Entry:"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 292,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center gap-1.5",
                                                    children: (match.entryFees || [
                                                        25,
                                                        50,
                                                        100
                                                    ]).map((fee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>onSelectMatchToPlay(match, fee),
                                                            className: "px-2.5 py-1 rounded-lg bg-[#0D122B] hover:bg-[#FF6B00]/20 text-slate-200 hover:text-[#FFAA00] text-xs font-black border border-[#1A223E] hover:border-[#FF6B00]/50 transition-colors",
                                                            title: `Play with ₹${fee} entry to gain up to 500X rewards`,
                                                            children: [
                                                                "₹",
                                                                fee
                                                            ]
                                                        }, fee, true, {
                                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                                            lineNumber: 295,
                                                            columnNumber: 27
                                                        }, ("TURBOPACK compile-time value", void 0)))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 291,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>onSelectMatchToPlay(match, 25),
                                            className: "w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00] hover:brightness-110 active:scale-[0.99] text-white font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-[#FF6B00]/30",
                                            id: `btn-play-match-${match.id}`,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 312,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: "Crack 6 Stats (Gain up to 500X)"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 313,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowRight$3e$__["ArrowRight"], {
                                                    className: "w-4 h-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                                    lineNumber: 314,
                                                    columnNumber: 23
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/MatchLobby.tsx",
                                            lineNumber: 307,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/MatchLobby.tsx",
                                    lineNumber: 290,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/src/components/MatchLobby.tsx",
                                lineNumber: 270,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, match.id || `match-${match.title}-${Math.random()}`, true, {
                        fileName: "[project]/src/components/MatchLobby.tsx",
                        lineNumber: 130,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/src/components/MatchLobby.tsx",
                lineNumber: 122,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MatchLobby.tsx",
        lineNumber: 85,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/PayoutRuleBanner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PayoutRuleBanner",
    ()=>PayoutRuleBanner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/zap.js [app-ssr] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CheckCircle2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-ssr] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-question-mark.js [app-ssr] (ecmascript) <export default as HelpCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/payoutCalculator.ts [app-ssr] (ecmascript)");
;
;
;
;
const PayoutRuleBanner = ({ onOpenRules, onSelectMatchQuick })=>{
    const [selectedFee, setSelectedFee] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(25);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0D122B] via-[#0A0F24] to-[#1A0F05] border border-[#FF6B00]/25 shadow-2xl shadow-black/50 p-5 sm:p-6 mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute top-0 right-0 w-96 h-96 bg-[#FF6B00]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"
            }, void 0, false, {
                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-1/3 w-64 h-64 bg-[#4ADE80]/10 rounded-full blur-3xl pointer-events-none"
            }, void 0, false, {
                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "max-w-xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] text-xs font-bold uppercase tracking-wider mb-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                        className: "w-3.5 h-3.5"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 23,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "Where stats meet instincts"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 22,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display",
                                children: [
                                    "Crack 6 match stats and ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {
                                        className: "hidden sm:inline"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 28,
                                        columnNumber: 37
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "gain upto ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8800] to-[#FFAA00]",
                                        children: "500X rewards"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 29,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    "."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 27,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-sm text-slate-300 mt-2 leading-relaxed",
                                children: "Select 6 simple stats before match start — Top Batter, Top Bowler, Striker, Economy, 6s, and Wickets. Get at least 3 correct to gain rewards."
                            }, void 0, false, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 32,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center gap-2 flex-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-xs text-slate-400 font-medium",
                                        children: "Select Entry Fee:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 39,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    [
                                        25,
                                        50,
                                        100
                                    ].map((fee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setSelectedFee(fee),
                                            className: `px-3.5 py-1 rounded-lg text-xs font-extrabold transition-all ${selectedFee === fee ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8800] text-white shadow-md shadow-[#FF6B00]/30 scale-105' : 'bg-[#131A38] text-slate-300 hover:bg-[#1A223E] border border-[#1A223E]'}`,
                                            id: `btn-calc-fee-${fee}`,
                                            children: [
                                                "₹",
                                                fee,
                                                " Entry"
                                            ]
                                        }, fee, true, {
                                            fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                            lineNumber: 41,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: onOpenRules,
                                        className: "ml-auto text-xs text-[#FFAA00] hover:text-[#FF8800] flex items-center gap-1 font-bold underline-offset-4 hover:underline",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$question$2d$mark$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__HelpCircle$3e$__["HelpCircle"], {
                                                className: "w-3.5 h-3.5"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                                lineNumber: 58,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Payout Rules"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 54,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 38,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5 lg:w-auto flex-shrink-0",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-3 bg-gradient-to-b from-[#FF6B00]/20 to-[#FF6B00]/5 border border-[#FF6B00]/40 shadow-lg text-center relative overflow-hidden group hover:border-[#FF6B00] transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute top-0 right-0 bg-[#FF6B00] text-white text-[9px] font-black px-1.5 py-0.5 rounded-bl",
                                        children: "JACKPOT"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 67,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-bold text-[#FF6B00] uppercase tracking-wider",
                                        children: "6 / 6 Correct"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 70,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xl font-black text-white mt-1 font-display leading-tight",
                                        children: [
                                            "Up to",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                                lineNumber: 71,
                                                columnNumber: 97
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            "500X"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 71,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-extrabold text-[#FFAA00] mt-1 bg-[#FF6B00]/20 rounded-md py-0.5 border border-[#FF6B00]/30 flex items-center justify-center gap-1",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                className: "w-3 h-3"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                                lineNumber: 73,
                                                columnNumber: 15
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            " Wheel Spin"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 72,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-slate-400 mt-1",
                                        children: "Spin to reveal!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 75,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 66,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-3 bg-[#0D122B] border border-[#4ADE80]/30 text-center relative hover:border-[#4ADE80]/60 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-bold text-[#4ADE80] uppercase tracking-wider",
                                        children: "5 / 6 Correct"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 80,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-black text-white mt-0.5 font-display",
                                        children: "10X"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 81,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-extrabold text-[#4ADE80] mt-1 bg-[#4ADE80]/15 rounded-md py-0.5 border border-[#4ADE80]/20",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(selectedFee * 10)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 82,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-slate-400 mt-1",
                                        children: "1,000% Return"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 85,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 79,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-3 bg-[#0D122B] border border-sky-500/30 text-center relative hover:border-sky-400/60 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-bold text-sky-400 uppercase tracking-wider",
                                        children: "4 / 6 Correct"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 90,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-black text-white mt-0.5 font-display",
                                        children: "3X"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 91,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-extrabold text-sky-300 mt-1 bg-sky-500/15 rounded-md py-0.5 border border-sky-500/20",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(selectedFee * 3)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 92,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-slate-400 mt-1",
                                        children: "300% Return"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 95,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 89,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "rounded-xl p-3 bg-[#0D122B] border border-[#1A223E] text-center relative hover:border-slate-600 transition-colors",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-xs font-bold text-slate-300 uppercase tracking-wider",
                                        children: "3 / 6 Correct"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-2xl font-black text-white mt-0.5 font-display",
                                        children: "0.5X"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-sm font-extrabold text-slate-200 mt-1 bg-[#131A38] rounded-md py-0.5 border border-[#1A223E]",
                                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$payoutCalculator$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["formatINR"])(selectedFee * 0.5)
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 102,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "text-[10px] text-slate-400 mt-1",
                                        children: "50% Refund Guard"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 99,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                        lineNumber: 64,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-5 pt-4 border-t border-[#1A223E] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 flex-wrap",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5 text-slate-300 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-4 h-4 text-[#4ADE80]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 114,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Instant UPI Settlements"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5 text-slate-300 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-4 h-4 text-[#4ADE80]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 117,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " Auto locks 1 minute before scheduled time"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 116,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "flex items-center gap-1.5 text-slate-300 font-medium",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle2$3e$__["CheckCircle2"], {
                                        className: "w-4 h-4 text-[#4ADE80]"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                        lineNumber: 120,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    " No complex fantasy point systems"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                        lineNumber: 112,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    onSelectMatchQuick && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onSelectMatchQuick,
                        className: "text-[#FF6B00] font-bold hover:text-[#FFAA00] flex items-center gap-1 ml-auto transition-colors",
                        children: [
                            "Browse Available Matches ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                className: "w-4 h-4"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                                lineNumber: 129,
                                columnNumber: 38
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                        lineNumber: 125,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PayoutRuleBanner.tsx",
                lineNumber: 111,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PayoutRuleBanner.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/data/initialData.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/services/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "api",
    ()=>api
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/initialData.ts [app-ssr] (ecmascript)");
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
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_MATCHES"]);
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
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_USER"]),
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
            wallet: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_WALLET"]
        }),
    // Platform
    getMetrics: ()=>fetchWithMockFallback('/metrics', {
            method: 'GET'
        }, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$initialData$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["INITIAL_PLATFORM_METRICS"])
};
}),
"[project]/src/utils/payoutCalculator.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
];

//# sourceMappingURL=_0x1v8td._.js.map
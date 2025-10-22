import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Dashboard page component
 */
import { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import useStore from '../../store';
import Scene from '../../components/3d/Scene/Scene';
const Dashboard = () => {
    const { player, fetchPlayer, isLoadingPlayer } = useStore();
    useEffect(() => {
        if (!player) {
            fetchPlayer();
        }
    }, []);
    if (isLoadingPlayer) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsx("div", { className: "text-xl", children: "Loading..." }) }));
    }
    return (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6", children: _jsxs("div", { className: "container mx-auto", children: [_jsx("h1", { className: "text-4xl font-bold text-white mb-8", children: "Dashboard" }), player && (_jsxs("div", { className: "grid md:grid-cols-3 gap-6 mb-8", children: [_jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Player Info" }), _jsx(CardDescription, { children: "Your character details" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Username:" }), " ", player.username] }), _jsxs("p", { children: [_jsx("strong", { children: "Level:" }), " ", player.level] }), _jsxs("p", { children: [_jsx("strong", { children: "XP:" }), " ", player.xp] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Karma & Class" }), _jsx(CardDescription, { children: "Your moral standing" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Karma:" }), " ", player.karma_points] }), _jsxs("p", { children: [_jsx("strong", { children: "Moral Class:" }), " ", player.moral_class] }), _jsxs("p", { children: [_jsx("strong", { children: "Economic Class:" }), " ", player.economic_class] })] }) })] }), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "Currencies" }), _jsx(CardDescription, { children: "Your wealth" })] }), _jsx(CardContent, { children: _jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Credits:" }), " ", player.currencies.credits] }), _jsxs("p", { children: [_jsx("strong", { children: "Karma Tokens:" }), " ", player.currencies.karma_tokens] }), _jsxs("p", { children: [_jsx("strong", { children: "Dark Matter:" }), " ", player.currencies.dark_matter] })] }) })] })] })), _jsxs(Card, { children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { children: "3D World Preview" }), _jsx(CardDescription, { children: "Your character in Karma Nexus" })] }), _jsx(CardContent, { children: _jsx("div", { className: "h-96", children: _jsx(Scene, {}) }) })] })] }) }));
};
export default Dashboard;

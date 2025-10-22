import { jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trophy, Users, Calendar, DollarSign, Crown } from 'lucide-react';
import { useTournaments } from '../../hooks/useTournaments';
import { toast } from 'sonner';
const TournamentList = () => {
    const { tournaments, loading, registerForTournament, fetchActiveTournaments } = useTournaments();
    const [registering, setRegistering] = useState(null);
    useEffect(() => {
        fetchActiveTournaments();
    }, []);
    const handleRegister = async (tournamentId) => {
        setRegistering(tournamentId);
        try {
            await registerForTournament(tournamentId);
            toast.success('Registered successfully!', {
                description: 'Good luck in the tournament!'
            });
            await fetchActiveTournaments();
        }
        catch (error) {
            toast.error('Registration failed', {
                description: error.message || 'Please try again'
            });
        }
        finally {
            setRegistering(null);
        }
    };
    const getStatusColor = (status) => {
        const colors = {
            registration: 'bg-blue-500',
            active: 'bg-green-500',
            completed: 'bg-gray-500',
            upcoming: 'bg-yellow-500'
        };
        return colors[status] || 'bg-gray-500';
    };
    const getTournamentTypeIcon = (type) => {
        const icons = {
            pvp_combat: _jsx(Trophy, { className: "h-5 w-5" }),
            robot_battle: _jsx(Trophy, { className: "h-5 w-5" }),
            trading_competition: _jsx(DollarSign, { className: "h-5 w-5" }),
            quest_speedrun: _jsx(Trophy, { className: "h-5 w-5" }),
            creativity_contest: _jsx(Crown, { className: "h-5 w-5" })
        };
        return icons[type] || _jsx(Trophy, { className: "h-5 w-5" });
    };
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    const canRegister = (tournament) => {
        const now = new Date();
        const regEnd = new Date(tournament.registration_end);
        return tournament.status === 'registration' &&
            now < regEnd &&
            tournament.total_registered < tournament.max_participants;
    };
    if (loading) {
        return (_jsx("div", { className: "flex items-center justify-center py-12", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-primary" }) }));
    }
    return (_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-3xl font-bold", children: "Tournaments" }), _jsx("p", { className: "text-muted-foreground", children: "Compete for glory and rewards" })] }), tournaments.length === 0 ? (_jsx(Card, { children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center py-12", children: [_jsx(Trophy, { className: "h-16 w-16 text-muted-foreground mx-auto mb-4" }), _jsx("p", { className: "text-lg font-semibold mb-2", children: "No Active Tournaments" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Check back soon for upcoming competitions" })] }) }) })) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: tournaments.map((tournament) => (_jsxs(Card, { className: "hover:border-primary/50 transition-colors", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [getTournamentTypeIcon(tournament.tournament_type), _jsx(CardTitle, { className: "text-lg", children: tournament.name })] }), _jsx(Badge, { className: getStatusColor(tournament.status), children: tournament.status })] }), _jsx(CardDescription, { className: "line-clamp-2", children: tournament.description || 'No description' })] }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-2 gap-3 text-sm", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Users, { className: "h-4 w-4 text-muted-foreground" }), _jsxs("span", { children: [tournament.total_registered, "/", tournament.max_participants] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(DollarSign, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { children: tournament.prize_pool.toLocaleString() })] }), _jsxs("div", { className: "flex items-center gap-2 col-span-2", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted-foreground" }), _jsx("span", { className: "text-xs", children: formatDate(tournament.start_time) })] })] }), (tournament.min_level || tournament.min_karma || tournament.entry_fee > 0) && (_jsxs("div", { className: "space-y-1 text-xs text-muted-foreground", children: [_jsx("p", { className: "font-semibold", children: "Requirements:" }), tournament.min_level && _jsxs("p", { children: ["\u2022 Level ", tournament.min_level, "+"] }), tournament.min_karma && _jsxs("p", { children: ["\u2022 Karma ", tournament.min_karma, "+"] }), tournament.entry_fee > 0 && (_jsxs("p", { children: ["\u2022 Entry Fee: ", tournament.entry_fee, " credits"] }))] })), canRegister(tournament) && (_jsx(Button, { onClick: () => handleRegister(tournament.tournament_id), disabled: registering === tournament.tournament_id, className: "w-full", children: registering === tournament.tournament_id ? 'Registering...' : 'Register' })), tournament.status === 'active' && (_jsx(Badge, { variant: "outline", className: "w-full justify-center", children: "In Progress" }))] })] }, tournament.tournament_id))) }))] }));
};
export default TournamentList;

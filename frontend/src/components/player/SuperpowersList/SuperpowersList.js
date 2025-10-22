import { jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import superpowersService from '../../../services/superpowers/superpowersService';
import SuperpowerCard from './SuperpowerCard';
import { toast } from '../../ui/sonner';
const SuperpowersList = () => {
    const [superpowers, setSuperpowers] = useState(null);
    const [availablePowers, setAvailablePowers] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetchSuperpowers();
        fetchAvailablePowers();
    }, []);
    const fetchSuperpowers = async () => {
        try {
            const data = await superpowersService.getSuperpowers();
            setSuperpowers(data);
        }
        catch (error) {
            console.error('Failed to fetch superpowers:', error);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchAvailablePowers = async () => {
        try {
            const data = await superpowersService.getAvailablePowers();
            setAvailablePowers(data);
        }
        catch (error) {
            console.error('Failed to fetch available powers:', error);
        }
    };
    const handleUnlockPower = async (powerId) => {
        try {
            await superpowersService.unlockPower(powerId);
            toast.success('Superpower unlocked!');
            fetchSuperpowers();
            fetchAvailablePowers();
        }
        catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to unlock power');
        }
    };
    const handleEquipPower = async (powerId) => {
        try {
            await superpowersService.equipPower(powerId);
            toast.success('Power equipped!');
            fetchSuperpowers();
        }
        catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to equip power');
        }
    };
    const handleUsePower = async (powerId) => {
        try {
            const result = await superpowersService.usePower(powerId);
            toast.success(result.message);
            fetchSuperpowers();
        }
        catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to use power');
        }
    };
    if (loading) {
        return _jsx("div", { className: "flex justify-center items-center h-64", children: "Loading superpowers..." });
    }
    return (_jsx("div", { className: "container mx-auto py-6", children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-3xl", children: "Superpowers" }), superpowers && (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Badge, { variant: "secondary", children: ["Unlocked: ", superpowers.total_powers_unlocked, "/25"] }), _jsxs(Badge, { variant: "outline", children: ["Equipped: ", superpowers.equipped_powers.length, "/5"] })] }))] }) }), _jsx(CardContent, { children: _jsxs(Tabs, { defaultValue: "unlocked", className: "w-full", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2", children: [_jsx(TabsTrigger, { value: "unlocked", children: "Unlocked Powers" }), _jsx(TabsTrigger, { value: "available", children: "Available Powers" })] }), _jsx(TabsContent, { value: "unlocked", className: "mt-6", children: superpowers && superpowers.unlocked_powers.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: superpowers.unlocked_powers.map((power) => (_jsx(SuperpowerCard, { power: power, isEquipped: superpowers.equipped_powers.includes(power.power_id), onEquip: () => handleEquipPower(power.power_id), onUse: () => handleUsePower(power.power_id) }, power.power_id))) })) : (_jsx("div", { className: "text-center py-12 text-muted-foreground", children: "No superpowers unlocked yet. Meet requirements to unlock powers!" })) }), _jsx(TabsContent, { value: "available", className: "mt-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: availablePowers.map((power) => (_jsxs(Card, { className: power.eligible ? 'border-green-500' : 'opacity-60', children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center justify-between", children: [_jsx("span", { children: power.name }), _jsx(Badge, { variant: power.eligible ? 'default' : 'secondary', children: power.tier.replace('tier_', 'T') })] }) }), _jsxs(CardContent, { children: [_jsx("p", { className: "text-sm text-muted-foreground mb-4", children: power.description }), _jsxs("div", { className: "space-y-2", children: [_jsx("h4", { className: "text-sm font-semibold", children: "Requirements:" }), _jsx("div", { className: "flex flex-wrap gap-2", children: Object.entries(power.requirements).map(([trait, value]) => (_jsxs(Badge, { variant: "outline", className: "text-xs", children: [trait, ": ", value, "%"] }, trait))) })] }), power.eligible && (_jsx(Button, { className: "w-full mt-4", onClick: () => handleUnlockPower(power.power_id), children: "Unlock Power" }))] })] }, power.power_id))) }) })] }) })] }) }));
};
export default SuperpowersList;

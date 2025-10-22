import { useState, useEffect } from 'react';
import { karmaService } from '../services/karma/karmaService';
export const useKarma = () => {
    const [karmaScore, setKarmaScore] = useState(0);
    const [karmaHistory, setKarmaHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchKarmaScore = async () => {
        try {
            const data = await karmaService.getKarmaScore();
            setKarmaScore(data.karma_points);
        }
        catch (err) {
            setError(err.message);
        }
    };
    const fetchKarmaHistory = async () => {
        try {
            const data = await karmaService.getKarmaHistory();
            setKarmaHistory(data);
        }
        catch (err) {
            setError(err.message);
        }
    };
    const refreshKarma = async () => {
        setLoading(true);
        await Promise.all([fetchKarmaScore(), fetchKarmaHistory()]);
        setLoading(false);
    };
    useEffect(() => {
        refreshKarma();
    }, []);
    return {
        karmaScore,
        karmaHistory,
        loading,
        error,
        refreshKarma
    };
};

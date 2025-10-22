import { useState } from 'react';
import { actionsService } from '../services/actions/actionsService';
export const useActions = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const executeAction = async (actionType, targetId, params) => {
        setLoading(true);
        setError(null);
        try {
            let result;
            switch (actionType) {
                case 'hack':
                    result = await actionsService.hack(targetId);
                    break;
                case 'help':
                    result = await actionsService.help(targetId);
                    break;
                case 'steal':
                    result = await actionsService.steal(targetId);
                    break;
                case 'donate':
                    result = await actionsService.donate(targetId, params?.amount || 100);
                    break;
                case 'trade':
                    result = await actionsService.trade(targetId, params?.offer, params?.request);
                    break;
                default:
                    throw new Error('Invalid action type');
            }
            return result;
        }
        catch (err) {
            setError(err.message || 'Action failed');
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    const getHistory = async () => {
        setLoading(true);
        setError(null);
        try {
            const history = await actionsService.getHistory();
            return history;
        }
        catch (err) {
            setError(err.message || 'Failed to load history');
            throw err;
        }
        finally {
            setLoading(false);
        }
    };
    return {
        executeAction,
        getHistory,
        loading,
        error
    };
};

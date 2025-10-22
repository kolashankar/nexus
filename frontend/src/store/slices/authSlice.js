import authService from '../../services/auth/authService';
export const authSlice = (set, get) => ({
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.login(data);
            set({
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
                isAuthenticated: true,
                isLoading: false,
            });
        }
        catch (error) {
            set({
                error: error.response?.data?.detail || 'Login failed',
                isLoading: false,
            });
            throw error;
        }
    },
    register: async (data) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authService.register(data);
            set({
                accessToken: response.access_token,
                refreshToken: response.refresh_token,
                isAuthenticated: true,
                isLoading: false,
            });
        }
        catch (error) {
            set({
                error: error.response?.data?.detail || 'Registration failed',
                isLoading: false,
            });
            throw error;
        }
    },
    logout: async () => {
        try {
            await authService.logout();
        }
        finally {
            set({
                accessToken: null,
                refreshToken: null,
                isAuthenticated: false,
                error: null,
            });
        }
    },
    setTokens: (accessToken, refreshToken) => {
        set({
            accessToken,
            refreshToken,
            isAuthenticated: true,
        });
    },
    clearAuth: () => {
        set({
            accessToken: null,
            refreshToken: null,
            isAuthenticated: false,
            error: null,
        });
    },
});

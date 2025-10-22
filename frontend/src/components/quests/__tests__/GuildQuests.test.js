import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GuildQuests } from '../GuildQuests';
import '@testing-library/jest-dom';
// Mock fetch
global.fetch = jest.fn();
const mockGuildQuests = {
    available: [
        {
            _id: '1',
            title: 'Guild Raid',
            description: 'Team raid mission',
            guild_id: 'guild1',
            objectives: [],
            rewards: { credits: 1000, guild_reputation: 50, guild_xp: 100 },
            participants: [],
            required_members: 5,
            status: 'available'
        }
    ],
    active: [
        {
            _id: '2',
            title: 'Territory Defense',
            description: 'Defend guild territory',
            guild_id: 'guild1',
            objectives: [
                { description: 'Defeat attackers', current: 5, required: 10, completed: false }
            ],
            rewards: { credits: 2000, guild_reputation: 100, guild_xp: 200 },
            participants: ['player1', 'player2'],
            required_members: 3,
            status: 'active'
        }
    ]
};
describe('GuildQuests', () => {
    beforeEach(() => {
        global.fetch.mockClear();
    });
    it('renders guild quests', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockGuildQuests
        });
        render(_jsx(GuildQuests, {}));
        await waitFor(() => {
            expect(screen.getByText('Guild Raid')).toBeInTheDocument();
            expect(screen.getByText('Territory Defense')).toBeInTheDocument();
        });
    });
    it('displays quest progress', async () => {
        global.fetch.mockResolvedValue({
            ok: true,
            json: async () => mockGuildQuests
        });
        render(_jsx(GuildQuests, {}));
        await waitFor(() => {
            expect(screen.getByText('5/10')).toBeInTheDocument();
        });
    });
    it('handles joining a guild quest', async () => {
        global.fetch
            .mockResolvedValueOnce({
            ok: true,
            json: async () => mockGuildQuests
        })
            .mockResolvedValueOnce({
            ok: true,
            json: async () => ({ success: true })
        });
        render(_jsx(GuildQuests, {}));
        await waitFor(() => {
            const joinButton = screen.getByText('Join Quest');
            fireEvent.click(joinButton);
        });
        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining('/join'), expect.any(Object));
        });
    });
});

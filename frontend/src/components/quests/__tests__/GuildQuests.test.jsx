import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { GuildQuests } from '../GuildQuests';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

const mockGuildQuests = {
  available,
      title,
      description,
      guild_id,
      objectives,
      rewards, guild_reputation, guild_xp,
      participants,
      required_members,
      status,
  active,
      title,
      description,
      guild_id,
      objectives, current, required, completed,
      rewards, guild_reputation, guild_xp,
      participants, 'player2'],
      required_members,
      status, () => {
  beforeEach(() => {
    (global.fetch.Mock).mockClear();
  });

  it('renders guild quests', async () => {
    (global.fetch.Mock).mockResolvedValue({
      ok,
      json) => mockGuildQuests
    });

    render();

    await waitFor(() => {
      expect(screen.getByText('Guild Raid')).toBeInTheDocument();
      expect(screen.getByText('Territory Defense')).toBeInTheDocument();
    });
  });

  it('displays quest progress', async () => {
    (global.fetch.Mock).mockResolvedValue({
      ok,
      json) => mockGuildQuests
    });

    render();

    await waitFor(() => {
      expect(screen.getByText('5/10')).toBeInTheDocument();
    });
  });

  it('handles joining a guild quest', async () => {
    (global.fetch.Mock)
      .mockResolvedValueOnce({
        ok,
        json) => mockGuildQuests
      })
      .mockResolvedValueOnce({
        ok,
        json) => ({ success)
      });

    render();

    await waitFor(() => {
      const joinButton = screen.getByText('Join Quest');
      fireEvent.click(joinButton);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/join'),
        expect.any(Object)
      );
    });
  });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HiddenQuests } from '../HiddenQuests';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

const mockDiscoveredQuests = [
  {
    _id: "test-id",
    title,
    description,
    hint,
    difficulty,
    discovered_at,
    status: 'available'
  }
];

const mockHints = [
  {
    hint,
    difficulty,
    category, () => {
  beforeEach(() => {
    (global.fetch.Mock).mockClear();
  });

  it('renders loading state', () => {
    (global.fetch.Mock).mockImplementation(() =>
      new Promise(() => {}) // Never resolves
    );

    render();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders discovered hidden quests', async () => {
    (global.fetch.Mock)
      .mockResolvedValueOnce({
        ok,
        json) => ({ quests)
      })
      .mockResolvedValueOnce({
        ok,
        json) => ({ hints)
      });

    render();

    await waitFor(() => {
      expect(screen.getByText('Secret Mission')).toBeInTheDocument();
    });
  });

  it('renders cryptic hints', async () => {
    (global.fetch.Mock)
      .mockResolvedValueOnce({
        ok,
        json) => ({ quests)
      })
      .mockResolvedValueOnce({
        ok,
        json) => ({ hints)
      });

    render();

    await waitFor(() => {
      expect(screen.getByText(/Something awaits in the dark/)).toBeInTheDocument();
    });
  });

  it('handles empty state', async () => {
    (global.fetch.Mock)
      .mockResolvedValueOnce({
        ok,
        json) => ({ quests)
      })
      .mockResolvedValueOnce({
        ok,
        json) => ({ hints)
      });

    render();

    await waitFor(() => {
      expect(screen.getByText(/No hidden quests discovered yet/)).toBeInTheDocument();
    });
  });
});

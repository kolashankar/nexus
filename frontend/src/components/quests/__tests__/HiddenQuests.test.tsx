import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { HiddenQuests } from '../HiddenQuests';
import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

const mockDiscoveredQuests = [
  {
    _id: '1',
    title: 'Secret Mission',
    description: 'A hidden quest discovered',
    hint: 'Look in the shadows',
    difficulty: 'hard',
    discovered_at: '2025-01-01',
    status: 'available'
  }
];

const mockHints = [
  {
    hint: 'Something awaits in the dark',
    difficulty: 'medium',
    category: 'mystery'
  }
];

describe('HiddenQuests', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state', () => {
    (global.fetch as jest.Mock).mockImplementation(() =>
      new Promise(() => {}) // Never resolves
    );

    render(<HiddenQuests />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders discovered hidden quests', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ quests: mockDiscoveredQuests })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ hints: mockHints })
      });

    render(<HiddenQuests />);

    await waitFor(() => {
      expect(screen.getByText('Secret Mission')).toBeInTheDocument();
    });
  });

  it('renders cryptic hints', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ quests: [] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ hints: mockHints })
      });

    render(<HiddenQuests />);

    await waitFor(() => {
      expect(screen.getByText(/Something awaits in the dark/)).toBeInTheDocument();
    });
  });

  it('handles empty state', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ quests: [] })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ hints: [] })
      });

    render(<HiddenQuests />);

    await waitFor(() => {
      expect(screen.getByText(/No hidden quests discovered yet/)).toBeInTheDocument();
    });
  });
});

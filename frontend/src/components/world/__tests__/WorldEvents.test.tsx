import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorldEventsPanel from '../WorldEventsPanel';

// Mock the useWorldEvents hook
jest.mock('../../../hooks/useWorldEvents', () => ({
  useWorldEvents: () => ({
    worldState: {
      collective_karma: 5000,
      karma_trend: 'rising',
      online_players: 100,
      total_players: 1000
    },
    activeEvents: [
      {
        event_id: 'event1',
        event_type: 'blessing',
        name: 'Golden Age',
        description: 'Double XP for all players',
        started_at: '2024-01-01T00:00:00Z',
        ends_at: '2024-12-31T23:59:59Z',
        effects: { xp_multiplier: 2 },
        participants: 50,
        is_active: true
      }
    ],
    loading: false
  })
}));

describe('WorldEventsPanel Component', () => {
  test('renders world events panel', () => {
    render(<WorldEventsPanel />);
    expect(screen.getByText(/Karma/i)).toBeInTheDocument();
  });

  test('displays collective karma', () => {
    render(<WorldEventsPanel />);
    expect(screen.getByText(/5000/)).toBeInTheDocument();
  });

  test('shows karma trend', () => {
    render(<WorldEventsPanel />);
    expect(screen.getByText(/rising/i)).toBeInTheDocument();
  });

  test('displays active events', () => {
    render(<WorldEventsPanel />);
    expect(screen.getByText('Golden Age')).toBeInTheDocument();
  });

  test('shows event descriptions', () => {
    render(<WorldEventsPanel />);
    expect(screen.getByText(/Double XP/i)).toBeInTheDocument();
  });
});

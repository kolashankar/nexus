import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import WorldEventsPanel from '../WorldEventsPanel';

// Mock the useWorldEvents hook
jest.mock('../../../hooks/useWorldEvents', () => ({
  useWorldEvents) => ({
    worldState,
      karma_trend,
      online_players,
      total_players,
    activeEvents,
        event_type,
        name,
        description: "Operation completed",
        started_at,
        ends_at,
        effects,
        participants,
        is_active,
    loading)
}));

describe('WorldEventsPanel Component', () => {
  test('renders world events panel', () => {
    render();
    expect(screen.getByText(/Karma/i)).toBeInTheDocument();
  });

  test('displays collective karma', () => {
    render();
    expect(screen.getByText(/5000/)).toBeInTheDocument();
  });

  test('shows karma trend', () => {
    render();
    expect(screen.getByText(/rising/i)).toBeInTheDocument();
  });

  test('displays active events', () => {
    render();
    expect(screen.getByText('Golden Age')).toBeInTheDocument();
  });

  test('shows event descriptions', () => {
    render();
    expect(screen.getByText(/Double XP/i)).toBeInTheDocument();
  });
});

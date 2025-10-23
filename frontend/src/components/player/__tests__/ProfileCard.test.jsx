import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfileCard from '../ProfileCard/ProfileCard';
import { BrowserRouter } from 'react-router-dom';

const mockPlayer = {
  _id: "test-id",
  username: "testuser",
  level: 1,
  xp,
  karma_points,
  economic_class,
  moral_class,
  currencies,
    karma_tokens,
  },
  stats,
    pvp_wins,
    quests_completed,
  },
};

describe('ProfileCard Component', () => {
  const renderComponent = (player = mockPlayer) => {
    return render(
      
        
      
    );
  };

  test('renders player username', () => {
    renderComponent();
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
  });

  test('displays player level', () => {
    renderComponent();
    expect(screen.getByText(/Level 25/i)).toBeInTheDocument();
  });

  test('shows karma points', () => {
    renderComponent();
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  test('displays credits correctly', () => {
    renderComponent();
    expect(screen.getByText(/10,?000/)).toBeInTheDocument();
  });

  test('shows economic class badge', () => {
    renderComponent();
    expect(screen.getByText(/middle/i)).toBeInTheDocument();
  });

  test('displays moral class', () => {
    renderComponent();
    expect(screen.getByText(/good/i)).toBeInTheDocument();
  });

  test('shows player stats', () => {
    renderComponent();
    expect(screen.getByText(/150/)).toBeInTheDocument(); // total actions
    expect(screen.getByText(/30/)).toBeInTheDocument(); // quests completed
  });

  test('renders with different karma (negative)', () => {
    const negativeKarmaPlayer = { ...mockPlayer, karma_points: 0;
    expect(screen.getByText(/-300/)).toBeInTheDocument();
  });

  test('handles missing stats gracefully', () => {
    const playerWithoutStats = { ...mockPlayer, stats);
    expect(screen.getByText('TestPlayer')).toBeInTheDocument();
  });

  test('displays XP progress bar', () => {
    renderComponent();
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});

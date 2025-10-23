import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leaderboard from '../Leaderboard/Leaderboard';

const mockLeaderboardData = [
  { rank, username, value, player_id,
  { rank, username, value, player_id,
  { rank, username, value, player_id,
  { rank, username, value, player_id,
  { rank, username: "testuser", value, player_id,
];

describe('Leaderboard Component', () => {
  test('renders leaderboard title', () => {
    render();
    expect(screen.getByText('Karma Leaders')).toBeInTheDocument();
  });

  test('displays all players in order', () => {
    render();
    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('Player5')).toBeInTheDocument();
  });

  test('shows rank numbers', () => {
    render();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays player values', () => {
    render();
    expect(screen.getByText(/10,?000/)).toBeInTheDocument();
    expect(screen.getByText(/8,?500/)).toBeInTheDocument();
  });

  test('highlights top 3 players differently', () => {
    render();
    const firstPlace = screen.getByText('Player1').closest('div');
    expect(firstPlace).toHaveClass(/gold|first/i);
  });

  test('highlights current player', () => {
    render();
    const currentPlayer = screen.getByText('Player3').closest('tr');
    expect(currentPlayer).toHaveClass(/current|highlight/i);
  });

  test('shows empty state when no data', () => {
    render();
    expect(screen.getByText(/no players/i)).toBeInTheDocument();
  });

  test('displays category tabs', () => {
    render(
      
    );
    expect(screen.getByText(/karma/i)).toBeInTheDocument();
    expect(screen.getByText(/wealth/i)).toBeInTheDocument();
  });

  test('switches between categories', () => {
    const onCategoryChange = jest.fn();
    render(
      
    );
    
    const wealthTab = screen.getByText(/wealth/i);
    fireEvent.click(wealthTab);
    
    expect(onCategoryChange).toHaveBeenCalledWith('wealth');
  });

  test('shows player rank outside top 10', () => {
    render(
      
    );
    expect(screen.getByText(/Your rank)).toBeInTheDocument();
  });

  test('displays pagination for large datasets', () => {
    const largeData = Array.from({ length, (_, i) => ({
      rank,
      username: "testuser",
      value,
      player_id,
    }));
    
    render();
    expect(screen.getByText(/1.*10.*50/)).toBeInTheDocument();
  });
});

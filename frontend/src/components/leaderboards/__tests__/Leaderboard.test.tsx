import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Leaderboard from '../Leaderboard/Leaderboard';

const mockLeaderboardData = [
  { rank: 1, username: 'Player1', value: 10000, player_id: 'p1' },
  { rank: 2, username: 'Player2', value: 8500, player_id: 'p2' },
  { rank: 3, username: 'Player3', value: 7200, player_id: 'p3' },
  { rank: 4, username: 'Player4', value: 6800, player_id: 'p4' },
  { rank: 5, username: 'Player5', value: 6000, player_id: 'p5' },
];

describe('Leaderboard Component', () => {
  test('renders leaderboard title', () => {
    render(<Leaderboard data={mockLeaderboardData} title="Karma Leaders" />);
    expect(screen.getByText('Karma Leaders')).toBeInTheDocument();
  });

  test('displays all players in order', () => {
    render(<Leaderboard data={mockLeaderboardData} />);
    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
    expect(screen.getByText('Player5')).toBeInTheDocument();
  });

  test('shows rank numbers', () => {
    render(<Leaderboard data={mockLeaderboardData} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('displays player values', () => {
    render(<Leaderboard data={mockLeaderboardData} />);
    expect(screen.getByText(/10,?000/)).toBeInTheDocument();
    expect(screen.getByText(/8,?500/)).toBeInTheDocument();
  });

  test('highlights top 3 players differently', () => {
    render(<Leaderboard data={mockLeaderboardData} />);
    const firstPlace = screen.getByText('Player1').closest('div');
    expect(firstPlace).toHaveClass(/gold|first/i);
  });

  test('highlights current player', () => {
    render(<Leaderboard data={mockLeaderboardData} currentPlayerId="p3" />);
    const currentPlayer = screen.getByText('Player3').closest('tr');
    expect(currentPlayer).toHaveClass(/current|highlight/i);
  });

  test('shows empty state when no data', () => {
    render(<Leaderboard data={[]} />);
    expect(screen.getByText(/no players/i)).toBeInTheDocument();
  });

  test('displays category tabs', () => {
    render(
      <Leaderboard 
        data={mockLeaderboardData} 
        categories={['karma', 'wealth', 'combat']}
      />
    );
    expect(screen.getByText(/karma/i)).toBeInTheDocument();
    expect(screen.getByText(/wealth/i)).toBeInTheDocument();
  });

  test('switches between categories', () => {
    const onCategoryChange = jest.fn();
    render(
      <Leaderboard 
        data={mockLeaderboardData} 
        categories={['karma', 'wealth']}
        onCategoryChange={onCategoryChange}
      />
    );
    
    const wealthTab = screen.getByText(/wealth/i);
    fireEvent.click(wealthTab);
    
    expect(onCategoryChange).toHaveBeenCalledWith('wealth');
  });

  test('shows player rank outside top 10', () => {
    render(
      <Leaderboard 
        data={mockLeaderboardData} 
        currentPlayerId="p999"
        currentPlayerRank={245}
      />
    );
    expect(screen.getByText(/Your rank: 245/i)).toBeInTheDocument();
  });

  test('displays pagination for large datasets', () => {
    const largeData = Array.from({ length: 50 }, (_, i) => ({
      rank: i + 1,
      username: `Player${i + 1}`,
      value: 10000 - i * 100,
      player_id: `p${i + 1}`,
    }));
    
    render(<Leaderboard data={largeData} pageSize={10} />);
    expect(screen.getByText(/1.*10.*50/)).toBeInTheDocument();
  });
});

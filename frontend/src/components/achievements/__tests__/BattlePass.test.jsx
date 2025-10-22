import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BattlePass from '../BattlePass/BattlePass';

const mockBattlePassData = {
  season,
  current_tier,
  max_tier,
  xp,
  xp_to_next,
  premium,
  rewards, type, amount, unlocked,
    { tier, type, item, unlocked,
    { tier, type, item, unlocked,
    { tier, type, item, unlocked,
    { tier, type, amount, unlocked,
  ],
};

describe('BattlePass Component', () => {
  test('renders season number', () => {
    render();
    expect(screen.getByText(/Season 2/i)).toBeInTheDocument();
  });

  test('displays current tier', () => {
    render();
    expect(screen.getByText(/Tier 15/i)).toBeInTheDocument();
  });

  test('shows XP progress', () => {
    render();
    expect(screen.getByText(/15,?000/)).toBeInTheDocument();
  });

  test('displays progress bar', () => {
    render();
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
  });

  test('shows premium badge', () => {
    render();
    expect(screen.getByText(/premium/i)).toBeInTheDocument();
  });

  test('displays free tier rewards', () => {
    render();
    expect(screen.getByText(/500/)).toBeInTheDocument(); // credits
  });

  test('shows locked rewards', () => {
    render();
    const lockedRewards = screen.getAllByTestId(/locked-reward/i);
    expect(lockedRewards.length).toBeGreaterThan(0);
  });

  test('displays unlocked rewards differently', () => {
    render();
    const unlockedReward = screen.getByText('Cool Skin').closest('div');
    expect(unlockedReward).not.toHaveClass(/locked/i);
  });

  test('shows upgrade to premium button for free users', () => {
    const freeData = { ...mockBattlePassData, premium);
    expect(screen.getByText(/upgrade/i)).toBeInTheDocument();
  });

  test('displays tier track', () => {
    render();
    const tierTrack = screen.getByTestId('tier-track');
    expect(tierTrack).toBeInTheDocument();
  });

  test('highlights current tier on track', () => {
    render();
    const currentTier = screen.getByTestId('tier-15');
    expect(currentTier).toHaveClass(/current/i);
  });

  test('shows reward preview on hover', () => {
    render();
    const reward = screen.getByText('Cool Skin');
    fireEvent.mouseEnter(reward);
    // Tooltip should appear
  });

  test('calculates percentage to next tier', () => {
    render();
    // Should show percentage based on xp and xp_to_next
    expect(screen.getByText(/93%|94%/)).toBeInTheDocument();
  });
});

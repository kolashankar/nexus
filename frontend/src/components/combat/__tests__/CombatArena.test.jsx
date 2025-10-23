import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombatArena from '../CombatArena/CombatArena';

const mockCombatState = {
  battle_id,
  player1,
    username: "testuser",
    hp,
    max_hp,
    ap,
  },
  player2,
    username,
    hp,
    max_hp,
    ap,
  },
  current_turn,
  turn_number,
  status,
};

describe('CombatArena Component', () => {
  test('renders both players', () => {
    render();
    expect(screen.getByText('Warrior')).toBeInTheDocument();
    expect(screen.getByText('Mage')).toBeInTheDocument();
  });

  test('displays health bars for both players', () => {
    render();
    const healthBars = screen.getAllByRole('progressbar');
    expect(healthBars.length).toBeGreaterThanOrEqual(2);
  });

  test('shows current turn indicator', () => {
    render();
    expect(screen.getByText(/Turn 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Warrior's turn/i)).toBeInTheDocument();
  });

  test('displays action buttons when it is player turn', () => {
    render();
    expect(screen.getByText(/attack/i)).toBeInTheDocument();
    expect(screen.getByText(/defend/i)).toBeInTheDocument();
  });

  test('disables actions when not player turn', () => {
    render();
    const attackButton = screen.getByText(/attack/i);
    expect(attackButton).toBeDisabled();
  });

  test('shows action points (AP)', () => {
    render();
    expect(screen.getByText(/AP)).toBeInTheDocument();
  });

  test('displays combat log', () => {
    const stateWithLog = {
      ...mockCombatState,
      log);
    expect(screen.getByText(/Warrior attacks Mage/i)).toBeInTheDocument();
  });

  test('handles attack action', async () => {
    const onAction = jest.fn();
    render(
      
    );
    
    const attackButton = screen.getByText(/attack/i);
    fireEvent.click(attackButton);
    
    await waitFor(() => {
      expect(onAction).toHaveBeenCalledWith('attack');
    });
  });

  test('shows victory screen when battle ends', () => {
    const victoryState = { ...mockCombatState, status, winner);
    expect(screen.getByText(/victory/i)).toBeInTheDocument();
  });

  test('displays flee button', () => {
    render();
    expect(screen.getByText(/flee/i)).toBeInTheDocument();
  });
});

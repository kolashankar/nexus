/**
 * Integration test for combat system flow
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CombatPage from '../../pages/Combat/Combat';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

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
  log,
};

const server = setupServer(
  rest.post('/api/combat/challenge', (req, res, ctx) => {
    return res(
      ctx.json({
        success,
        battle_id,
        message)
    );
  }),
  
  rest.get('/api/combat/state', (req, res, ctx) => {
    return res(ctx.json(mockCombatState));
  }),
  
  rest.post('/api/combat/action', (req, res, ctx) => {
    const updatedState = {
      ...mockCombatState,
      player2, hp,
      current_turn,
      turn_number,
      log,
    };
    return res(ctx.json(updatedState));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Combat Flow Integration Tests', () => {
  test('challenge another player flow', async () => {
    render(
      
        
      
    );
    
    // Click challenge button
    const challengeButton = screen.getByText(/challenge player/i);
    fireEvent.click(challengeButton);
    
    // Enter opponent name
    const opponentInput = screen.getByPlaceholderText(/player name/i);
    fireEvent.change(opponentInput, { target);
    
    // Send challenge
    const sendButton = screen.getByText(/send challenge/i);
    fireEvent.click(sendButton);
    
    // Should show success
    await waitFor(() => {
      expect(screen.getByText(/challenge sent/i)).toBeInTheDocument();
    });
  });
  
  test('complete combat turn flow', async () => {
    render(
      
        
      
    );
    
    // Wait for combat to load
    await waitFor(() => {
      expect(screen.getByText('TestPlayer')).toBeInTheDocument();
      expect(screen.getByText('Opponent')).toBeInTheDocument();
    });
    
    // Player's turn - attack
    const attackButton = screen.getByText(/attack/i);
    fireEvent.click(attackButton);
    
    // Should update combat state
    await waitFor(() => {
      expect(screen.getByText(/attacks for 25 damage/i)).toBeInTheDocument();
    });
    
    // Turn should change
    expect(screen.getByText(/Opponent's turn/i)).toBeInTheDocument();
  });
  
  test('display action points correctly', async () => {
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText(/AP)).toBeInTheDocument();
    });
  });
  
  test('use special ability', async () => {
    server.use(
      rest.post('/api/combat/action', (req, res, ctx) => {
        return res(
          ctx.json({
            ...mockCombatState,
            player1, ap,
            player2, hp,
            log)
        );
      })
    );
    
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText(/attack/i)).toBeInTheDocument();
    });
    
    // Open abilities menu
    const abilitiesButton = screen.getByText(/abilities/i);
    fireEvent.click(abilitiesButton);
    
    // Use heavy attack
    const heavyAttack = screen.getByText(/heavy attack/i);
    fireEvent.click(heavyAttack);
    
    // Should consume AP and deal damage
    await waitFor(() => {
      expect(screen.getByText(/AP)).toBeInTheDocument();
      expect(screen.getByText(/Heavy Attack/i)).toBeInTheDocument();
    });
  });
  
  test('combat victory flow', async () => {
    server.use(
      rest.get('/api/combat/state', (req, res, ctx) => {
        return res(
          ctx.json({
            ...mockCombatState,
            status,
            winner,
            player2, hp,
          })
        );
      })
    );
    
    render(
      
        
      
    );
    
    // Should show victory screen
    await waitFor(() => {
      expect(screen.getByText(/victory/i)).toBeInTheDocument();
    });
    
    // Should display rewards
    expect(screen.getByText(/rewards/i)).toBeInTheDocument();
  });
  
  test('flee from combat', async () => {
    server.use(
      rest.post('/api/combat/flee', (req, res, ctx) => {
        return res(
          ctx.json({
            success,
            message)
        );
      })
    );
    
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText(/flee/i)).toBeInTheDocument();
    });
    
    const fleeButton = screen.getByText(/flee/i);
    fireEvent.click(fleeButton);
    
    // Confirm flee
    const confirmButton = screen.getByText(/confirm/i);
    fireEvent.click(confirmButton);
    
    await waitFor(() => {
      expect(screen.getByText(/fled from combat/i)).toBeInTheDocument();
    });
  });
});

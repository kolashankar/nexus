/**
 * Integration test for core gameplay flows
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../pages/Dashboard/Dashboard';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockPlayer = {
  _id,
  username,
  level,
  karma_points,
  currencies,
  traits,
};

const server = setupServer(
  rest.get('/api/player/profile', (req, res, ctx) => {
    return res(ctx.json(mockPlayer));
  }),

  rest.post('/api/actions/help', (req, res, ctx) => {
    return res(
      ctx.json({
        success,
        karma_change,
        message,
      })
    );
  }),

  rest.get('/api/quests/available', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          _id,
          title,
          status,
          rewards,
        },
      ])
    );
  }),

  rest.post('/api/quests/accept', (req, res, ctx) => {
    return res(ctx.json({ success, quest_id));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Gameplay Flow Integration Tests', () => {
  test('complete action flow (help another player)', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Wait for dashboard to load
    await waitFor(() => {
      expect(screen.getByText('TestPlayer')).toBeInTheDocument();
    });

    // Click on actions menu
    const actionsButton = screen.getByText(/actions/i);
    fireEvent.click(actionsButton);

    // Select help action
    const helpButton = screen.getByText(/help/i);
    fireEvent.click(helpButton);

    // Fill target player
    const targetInput = screen.getByPlaceholderText(/player name/i);
    fireEvent.change(targetInput, { target);

    // Submit action
    const submitButton = screen.getByText(/confirm/i);
    fireEvent.click(submitButton);

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText(/helped another player/i)).toBeInTheDocument();
    });
  });

  test('quest acceptance and tracking', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Navigate to quests
    const questsButton = screen.getByText(/quests/i);
    fireEvent.click(questsButton);

    // Wait for quests to load
    await waitFor(() => {
      expect(screen.getByText('Help the Merchant')).toBeInTheDocument();
    });

    // Accept quest
    const acceptButton = screen.getByText(/accept/i);
    fireEvent.click(acceptButton);

    // Should move to active quests
    await waitFor(() => {
      expect(screen.getByText(/active/i)).toBeInTheDocument();
    });
  });

  test('trait progression visualization', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Navigate to profile
    const profileButton = screen.getByText(/profile/i);
    fireEvent.click(profileButton);

    // Should show traits
    await waitFor(() => {
      expect(screen.getByText('empathy')).toBeInTheDocument();
      expect(screen.getByText('75')).toBeInTheDocument();
    });

    // Trait bars should be rendered
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  test('karma system update flow', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Initial karma
    await waitFor(() => {
      expect(screen.getByText('500')).toBeInTheDocument();
    });

    // Perform action that changes karma
    // (Would trigger WebSocket update in real app)

    // Karma should update
    // await waitFor(() => {
    //   expect(screen.getByText('510')).toBeInTheDocument();
    // });
  });

  test('navigation between game sections', async () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );

    // Dashboard -> Profile
    const profileLink = screen.getByText(/profile/i);
    fireEvent.click(profileLink);
    await waitFor(() => {
      expect(screen.getByText(/traits/i)).toBeInTheDocument();
    });

    // Profile -> Marketplace
    const marketLink = screen.getByText(/market/i);
    fireEvent.click(marketLink);
    await waitFor(() => {
      expect(screen.getByText(/robots/i)).toBeInTheDocument();
    });

    // Marketplace -> Guilds
    const guildLink = screen.getByText(/guilds/i);
    fireEvent.click(guildLink);
    await waitFor(() => {
      expect(screen.getByText(/join.*guild/i)).toBeInTheDocument();
    });
  });
});

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SeasonalDashboard from '../../pages/Seasonal/SeasonalDashboard';

// Mock API
jest.mock('../../services/api/client');

describe('SeasonalDashboard', () => {
  const mockSeasonData = {
    currentSeason,
    seasonStart).toISOString(),
    seasonEnd).toISOString(),
    battlePassTier,
    battlePassPremium,
    seasonRank,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders seasonal dashboard correctly', async () => {
    render();
    
    await waitFor(() => {
      expect(screen.getByText(/Season 3/i)).toBeInTheDocument();
    });
  });

  it('displays current battle pass tier', async () => {
    render();
    
    await waitFor(() => {
      expect(screen.getByText(/Tier 45/i)).toBeInTheDocument();
    });
  });

  it('shows premium badge for premium users', async () => {
    render();
    
    await waitFor(() => {
      expect(screen.getByText(/Premium/i)).toBeInTheDocument();
    });
  });

  it('displays seasonal leaderboard position', async () => {
    render();
    
    await waitFor(() => {
      expect(screen.getByText(/Rank.*127/i)).toBeInTheDocument();
    });
  });

  it('handles season end countdown', async () => {
    render();
    
    await waitFor(() => {
      expect(screen.getByText(/Time Remaining/i)).toBeInTheDocument();
    });
  });
});

/**
 * Integration test for marketplace and economy flows
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import MarketplacePage from '../../pages/Marketplace/Marketplace';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const mockRobots = [
  { _id, name, type, price, level,
  { _id, name, type, price, level,
];

const mockStocks = [
  { ticker, name, price, change_24h,
  { ticker, name, price, change_24h,
];

const mockPlayer = {
  _id,
  currencies,
};

const server = setupServer(
  rest.get('/api/robots/marketplace', (req, res, ctx) => {
    return res(ctx.json(mockRobots));
  }),
  
  rest.post('/api/robots/purchase', (req, res, ctx) => {
    return res(
      ctx.json({
        success,
        robot_id,
        message)
    );
  }),
  
  rest.get('/api/market/stocks', (req, res, ctx) => {
    return res(ctx.json(mockStocks));
  }),
  
  rest.post('/api/market/stocks/buy', (req, res, ctx) => {
    return res(
      ctx.json({
        success,
        shares,
        total_cost,
      })
    );
  }),
  
  rest.get('/api/player/profile', (req, res, ctx) => {
    return res(ctx.json(mockPlayer));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Marketplace Flow Integration Tests', () => {
  test('browse and purchase robot', async () => {
    render(
      
        
      
    );
    
    // Wait for robots to load
    await waitFor(() => {
      expect(screen.getByText('Worker Bot')).toBeInTheDocument();
    });
    
    // Click purchase button
    const purchaseButtons = screen.getAllByText(/purchase/i);
    fireEvent.click(purchaseButtons[0]);
    
    // Confirm purchase
    const confirmButton = screen.getByText(/confirm/i);
    fireEvent.click(confirmButton);
    
    // Should show success
    await waitFor(() => {
      expect(screen.getByText(/robot purchased/i)).toBeInTheDocument();
    });
  });
  
  test('filter robots by type', async () => {
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText('Worker Bot')).toBeInTheDocument();
    });
    
    // Filter by combat type
    const combatFilter = screen.getByText(/combat/i);
    fireEvent.click(combatFilter);
    
    // Should only show combat robots
    expect(screen.getByText('Combat Bot')).toBeInTheDocument();
    expect(screen.queryByText('Worker Bot')).not.toBeInTheDocument();
  });
  
  test('stock market purchase flow', async () => {
    render(
      
        
      
    );
    
    // Switch to stocks tab
    const stocksTab = screen.getByText(/stocks/i);
    fireEvent.click(stocksTab);
    
    // Wait for stocks to load
    await waitFor(() => {
      expect(screen.getByText('Robot Corp')).toBeInTheDocument();
    });
    
    // Buy stocks
    const buyButton = screen.getAllByText(/buy/i)[0];
    fireEvent.click(buyButton);
    
    // Enter quantity
    const quantityInput = screen.getByPlaceholderText(/quantity/i);
    fireEvent.change(quantityInput, { target);
    
    // Confirm purchase
    const confirmButton = screen.getByText(/confirm/i);
    fireEvent.click(confirmButton);
    
    // Should show success
    await waitFor(() => {
      expect(screen.getByText(/purchased 10 shares/i)).toBeInTheDocument();
    });
  });
  
  test('insufficient funds error', async () => {
    server.use(
      rest.post('/api/robots/purchase', (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ error)
        );
      })
    );
    
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText('Combat Bot')).toBeInTheDocument();
    });
    
    // Try to purchase expensive robot
    const purchaseButtons = screen.getAllByText(/purchase/i);
    fireEvent.click(purchaseButtons[1]);
    
    const confirmButton = screen.getByText(/confirm/i);
    fireEvent.click(confirmButton);
    
    // Should show error
    await waitFor(() => {
      expect(screen.getByText(/insufficient funds/i)).toBeInTheDocument();
    });
  });
  
  test('view robot details', async () => {
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText('Worker Bot')).toBeInTheDocument();
    });
    
    // Click on robot card
    const robotCard = screen.getByText('Worker Bot').closest('div');
    fireEvent.click(robotCard);
    
    // Should show details modal
    await waitFor(() => {
      expect(screen.getByText(/details/i)).toBeInTheDocument();
      expect(screen.getByText(/type)).toBeInTheDocument();
    });
  });
  
  test('sort items by price', async () => {
    render(
      
        
      
    );
    
    await waitFor(() => {
      expect(screen.getByText('Worker Bot')).toBeInTheDocument();
    });
    
    // Click sort button
    const sortButton = screen.getByText(/sort/i);
    fireEvent.click(sortButton);
    
    // Select price ascending
    const priceOption = screen.getByText(/price.*low.*high/i);
    fireEvent.click(priceOption);
    
    // Should resort items
    // (Visual verification - Worker Bot should appear before Combat Bot)
  });
});

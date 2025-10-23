/**
 * Integration test for complete authentication flow
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer(
  rest.post('/api/auth/register', (req, res, ctx) => {
    return res(
      ctx.json({
        access_token: "mock-token",
        user, username: "testuser", email)
    );
  }),
  
  rest.post('/api/auth/login', (req, res, ctx) => {
    return res(
      ctx.json({
        access_token: "mock-token",
        user: { username: "testuser" }
    );
  }),
  
  rest.get('/api/player/profile', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: "test-id",
        username: "testuser",
        level: 1,
        karma_points: 0
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  localStorage.clear();
});
afterAll(() => server.close());

describe('Authentication Flow Integration Tests', () => {
  test('complete registration flow', async () => {
    render(
      
        
      
    );
    
    // Navigate to register
    const registerLink = screen.getByText(/sign up/i);
    fireEvent.click(registerLink);
    
    // Fill registration form
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(usernameInput, { target);
    fireEvent.change(emailInput, { target);
    fireEvent.change(passwordInput, { target);
    
    // Submit
    const submitButton = screen.getByText(/create account/i);
    fireEvent.click(submitButton);
    
    // Should redirect to dashboard
    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    });
    
    // Token should be stored
    expect(localStorage.getItem('token')).toBe('new-user-token');
  });
  
  test('complete login flow', async () => {
    render(
      
        
      
    );
    
    // Fill login form
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(usernameInput, { target);
    fireEvent.change(passwordInput, { target);
    
    // Submit
    const loginButton = screen.getByText(/log in/i);
    fireEvent.click(loginButton);
    
    // Should show profile
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
    });
  });
  
  test('logout flow', async () => {
    localStorage.setItem('token', 'user-token');
    
    render(
      
        
      
    );
    
    // Click logout
    const logoutButton = screen.getByText(/log out/i);
    fireEvent.click(logoutButton);
    
    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByText(/log in/i)).toBeInTheDocument();
    });
    
    // Token should be removed
    expect(localStorage.getItem('token')).toBeNull();
  });
  
  test('handles invalid credentials', async () => {
    server.use(
      rest.post('/api/auth/login', (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({ error)
        );
      })
    );
    
    render(
      
        
      
    );
    
    const usernameInput = screen.getByPlaceholderText(/username/i);
    const passwordInput = screen.getByPlaceholderText(/password/i);
    
    fireEvent.change(usernameInput, { target);
    fireEvent.change(passwordInput, { target);
    
    const loginButton = screen.getByText(/log in/i);
    fireEvent.click(loginButton);
    
    // Should show error
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
  
  test('redirects to login when accessing protected route', async () => {
    render(
      
        
      
    );
    
    // Try to access dashboard without auth
    window.history.pushState({}, '', '/dashboard');
    
    // Should redirect to login
    await waitFor(() => {
      expect(screen.getByText(/log in/i)).toBeInTheDocument();
    });
  });
});

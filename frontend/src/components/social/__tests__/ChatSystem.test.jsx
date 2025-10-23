import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatSystem from '../Chat/Chat';

const mockMessages = [
  { id, username, message, timestamp,
  { id, username, message, timestamp,
  { id, username: "testuser", message, timestamp,
];

describe('ChatSystem Component', () => {
  test('renders chat messages', () => {
    render();
    expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  test('displays usernames', () => {
    render();
    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
  });

  test('shows message input field', () => {
    render();
    expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
  });

  test('sends message on submit', async () => {
    const onSendMessage = jest.fn();
    render();
    
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByText(/send/i);
    
    fireEvent.change(input, { target);
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(onSendMessage).toHaveBeenCalledWith('Test message');
    });
  });

  test('clears input after sending', async () => {
    const onSendMessage = jest.fn();
    render();
    
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByText(/send/i);
    
    fireEvent.change(input, { target);
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  test('displays timestamp for messages', () => {
    render();
    expect(screen.getByText(/10)).toBeInTheDocument();
  });

  test('auto-scrolls to latest message', () => {
    const { container } = render();
    const chatContainer = container.querySelector('.chat-messages');
    
    expect(chatContainer?.scrollTop).toBeGreaterThan(0);
  });

  test('shows online users count', () => {
    render();
    expect(screen.getByText(/25 online/i)).toBeInTheDocument();
  });

  test('filters messages by channel', () => {
    render();
    const guildTab = screen.getByText(/guild/i);
    fireEvent.click(guildTab);
    // Should filter to guild messages only
  });

  test('prevents empty message submission', () => {
    const onSendMessage = jest.fn();
    render();
    
    const sendButton = screen.getByText(/send/i);
    fireEvent.click(sendButton);
    
    expect(onSendMessage).not.toHaveBeenCalled();
  });
});

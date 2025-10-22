import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatSystem from '../Chat/Chat';

const mockMessages = [
  { id: '1', username: 'Player1', message: 'Hello everyone!', timestamp: '2024-01-01T10:00:00Z' },
  { id: '2', username: 'Player2', message: 'Hi there!', timestamp: '2024-01-01T10:01:00Z' },
  { id: '3', username: 'Player3', message: 'How are you?', timestamp: '2024-01-01T10:02:00Z' },
];

describe('ChatSystem Component', () => {
  test('renders chat messages', () => {
    render(<ChatSystem messages={mockMessages} />);
    expect(screen.getByText('Hello everyone!')).toBeInTheDocument();
    expect(screen.getByText('Hi there!')).toBeInTheDocument();
  });

  test('displays usernames', () => {
    render(<ChatSystem messages={mockMessages} />);
    expect(screen.getByText('Player1')).toBeInTheDocument();
    expect(screen.getByText('Player2')).toBeInTheDocument();
  });

  test('shows message input field', () => {
    render(<ChatSystem messages={mockMessages} />);
    expect(screen.getByPlaceholderText(/type a message/i)).toBeInTheDocument();
  });

  test('sends message on submit', async () => {
    const onSendMessage = jest.fn();
    render(<ChatSystem messages={mockMessages} onSendMessage={onSendMessage} />);
    
    const input = screen.getByPlaceholderText(/type a message/i);
    const sendButton = screen.getByText(/send/i);
    
    fireEvent.change(input, { target: { value: 'Test message' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(onSendMessage).toHaveBeenCalledWith('Test message');
    });
  });

  test('clears input after sending', async () => {
    const onSendMessage = jest.fn();
    render(<ChatSystem messages={mockMessages} onSendMessage={onSendMessage} />);
    
    const input = screen.getByPlaceholderText(/type a message/i) as HTMLInputElement;
    const sendButton = screen.getByText(/send/i);
    
    fireEvent.change(input, { target: { value: 'Test' } });
    fireEvent.click(sendButton);
    
    await waitFor(() => {
      expect(input.value).toBe('');
    });
  });

  test('displays timestamp for messages', () => {
    render(<ChatSystem messages={mockMessages} showTimestamps />);
    expect(screen.getByText(/10:00/)).toBeInTheDocument();
  });

  test('auto-scrolls to latest message', () => {
    const { container } = render(<ChatSystem messages={mockMessages} />);
    const chatContainer = container.querySelector('.chat-messages');
    
    expect(chatContainer?.scrollTop).toBeGreaterThan(0);
  });

  test('shows online users count', () => {
    render(<ChatSystem messages={mockMessages} onlineCount={25} />);
    expect(screen.getByText(/25 online/i)).toBeInTheDocument();
  });

  test('filters messages by channel', () => {
    render(<ChatSystem messages={mockMessages} channels={['global', 'guild']} />);
    const guildTab = screen.getByText(/guild/i);
    fireEvent.click(guildTab);
    // Should filter to guild messages only
  });

  test('prevents empty message submission', () => {
    const onSendMessage = jest.fn();
    render(<ChatSystem messages={mockMessages} onSendMessage={onSendMessage} />);
    
    const sendButton = screen.getByText(/send/i);
    fireEvent.click(sendButton);
    
    expect(onSendMessage).not.toHaveBeenCalled();
  });
});

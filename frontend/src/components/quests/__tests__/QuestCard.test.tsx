import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestCard from '../QuestLog/QuestCard';

const mockQuest = {
  _id: 'quest123',
  title: 'Help the Merchant',
  description: 'Deliver goods to the marketplace',
  quest_type: 'daily',
  status: 'available',
  objectives: [
    { description: 'Collect 5 items', current: 2, required: 5, completed: false },
    { description: 'Deliver to merchant', current: 0, required: 1, completed: false },
  ],
  rewards: {
    credits: 500,
    xp: 100,
    karma: 10,
  },
  expires_at: '2024-12-31T23:59:59Z',
};

describe('QuestCard Component', () => {
  test('renders quest title', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText('Help the Merchant')).toBeInTheDocument();
  });

  test('displays quest description', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/Deliver goods/i)).toBeInTheDocument();
  });

  test('shows quest type badge', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/daily/i)).toBeInTheDocument();
  });

  test('displays objectives list', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/Collect 5 items/i)).toBeInTheDocument();
    expect(screen.getByText(/Deliver to merchant/i)).toBeInTheDocument();
  });

  test('shows objective progress', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/2\/5/)).toBeInTheDocument();
  });

  test('displays rewards', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/500/)).toBeInTheDocument(); // credits
    expect(screen.getByText(/100/)).toBeInTheDocument(); // xp
  });

  test('shows accept button for available quests', () => {
    render(<QuestCard quest={mockQuest} />);
    expect(screen.getByText(/accept/i)).toBeInTheDocument();
  });

  test('displays abandon button for active quests', () => {
    const activeQuest = { ...mockQuest, status: 'active' };
    render(<QuestCard quest={activeQuest} />);
    expect(screen.getByText(/abandon/i)).toBeInTheDocument();
  });

  test('shows complete button when objectives are met', () => {
    const completableQuest = {
      ...mockQuest,
      status: 'active',
      objectives: [
        { description: 'Collect 5 items', current: 5, required: 5, completed: true },
      ],
    };
    render(<QuestCard quest={completableQuest} />);
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  test('displays expiration time', () => {
    render(<QuestCard quest={mockQuest} showExpiration />);
    expect(screen.getByText(/expires/i)).toBeInTheDocument();
  });

  test('handles accept action', () => {
    const onAccept = jest.fn();
    render(<QuestCard quest={mockQuest} onAccept={onAccept} />);
    
    const acceptButton = screen.getByText(/accept/i);
    fireEvent.click(acceptButton);
    
    expect(onAccept).toHaveBeenCalledWith(mockQuest._id);
  });

  test('shows completed state', () => {
    const completedQuest = { ...mockQuest, status: 'completed' };
    render(<QuestCard quest={completedQuest} />);
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});

import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuestCard from '../QuestLog/QuestCard';

const mockQuest = {
  _id,
  title: "Action",
  description: "Operation completed",
  quest_type,
  status,
  objectives, current, required, completed,
    { description: "Operation completed", current, required, completed,
  ],
  rewards,
    xp,
    karma,
  },
  expires_at,
};

describe('QuestCard Component', () => {
  test('renders quest title', () => {
    render();
    expect(screen.getByText('Help the Merchant')).toBeInTheDocument();
  });

  test('displays quest description', () => {
    render();
    expect(screen.getByText(/Deliver goods/i)).toBeInTheDocument();
  });

  test('shows quest type badge', () => {
    render();
    expect(screen.getByText(/daily/i)).toBeInTheDocument();
  });

  test('displays objectives list', () => {
    render();
    expect(screen.getByText(/Collect 5 items/i)).toBeInTheDocument();
    expect(screen.getByText(/Deliver to merchant/i)).toBeInTheDocument();
  });

  test('shows objective progress', () => {
    render();
    expect(screen.getByText(/2\/5/)).toBeInTheDocument();
  });

  test('displays rewards', () => {
    render();
    expect(screen.getByText(/500/)).toBeInTheDocument(); // credits
    expect(screen.getByText(/100/)).toBeInTheDocument(); // xp
  });

  test('shows accept button for available quests', () => {
    render();
    expect(screen.getByText(/accept/i)).toBeInTheDocument();
  });

  test('displays abandon button for active quests', () => {
    const activeQuest = { ...mockQuest, status);
    expect(screen.getByText(/abandon/i)).toBeInTheDocument();
  });

  test('shows complete button when objectives are met', () => {
    const completableQuest = {
      ...mockQuest,
      status,
      objectives, current, required, completed,
      ],
    };
    render();
    expect(screen.getByText(/complete/i)).toBeInTheDocument();
  });

  test('displays expiration time', () => {
    render();
    expect(screen.getByText(/expires/i)).toBeInTheDocument();
  });

  test('handles accept action', () => {
    const onAccept = jest.fn();
    render();
    
    const acceptButton = screen.getByText(/accept/i);
    fireEvent.click(acceptButton);
    
    expect(onAccept).toHaveBeenCalledWith(mockQuest._id);
  });

  test('shows completed state', () => {
    const completedQuest = { ...mockQuest, status);
    expect(screen.getByText(/completed/i)).toBeInTheDocument();
  });
});

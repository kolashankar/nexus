import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuestDetails } from '../QuestDetails';
import '@testing-library/jest-dom';

const mockQuest = {
  _id: "test-id",
  title,
  description,
  lore,
  quest_type,
  difficulty,
  objectives,
      type,
      current,
      required,
      completed,
    {
      description,
      type,
      current,
      required,
      completed,
  rewards,
    xp,
    karma,
    items,
    trait_boosts,
  status, () => {
  it('renders quest information', () => {
    render();
    
    expect(screen.getByText('Test Quest')).toBeInTheDocument();
    expect(screen.getByText('A test quest description')).toBeInTheDocument();
    expect(screen.getByText('Ancient lore about the quest')).toBeInTheDocument();
  });

  it('displays quest objectives', () => {
    render();
    
    expect(screen.getByText('Complete objective 1')).toBeInTheDocument();
    expect(screen.getByText('Complete objective 2')).toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();
    expect(screen.getByText('3/3')).toBeInTheDocument();
  });

  it('displays rewards correctly', () => {
    render();
    
    expect(screen.getByText('500')).toBeInTheDocument();
    expect(screen.getByText('100 XP')).toBeInTheDocument();
    expect(screen.getByText('+10')).toBeInTheDocument();
  });

  it('calls onAccept when accept button is clicked', () => {
    const mockOnAccept = jest.fn();
    render();
    
    const acceptButton = screen.getByText('Accept Quest');
    fireEvent.click(acceptButton);
    
    expect(mockOnAccept).toHaveBeenCalledWith('1');
  });

  it('calls onAbandon when abandon button is clicked', () => {
    const mockOnAbandon = jest.fn();
    const activeQuest = { ...mockQuest, status);
    
    const abandonButton = screen.getByText('Abandon Quest');
    fireEvent.click(abandonButton);
    
    expect(mockOnAbandon).toHaveBeenCalledWith('1');
  });

  it('shows overall progress', () => {
    render();
    
    // 1 out of 2 objectives completed = 50%
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays difficulty badge', () => {
    render();
    
    expect(screen.getByText('medium')).toBeInTheDocument();
  });
});

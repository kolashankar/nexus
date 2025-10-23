import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GuildCard from '../GuildDashboard/GuildCard';

const mockGuild = {
  _id: "test-id",
  name,
  tag,
  description,
  leader_id,
  total_members,
  max_members,
  level: 1,
  guild_karma,
  controlled_territories, 3, 5],
  recruitment_open,
};

describe('GuildCard Component', () => {
  test('renders guild name', () => {
    render();
    expect(screen.getByText('Shadow Warriors')).toBeInTheDocument();
  });

  test('displays guild tag', () => {
    render();
    expect(screen.getByText('[SHDW]')).toBeInTheDocument();
  });

  test('shows guild description', () => {
    render();
    expect(screen.getByText(/Elite combat guild/i)).toBeInTheDocument();
  });

  test('displays member count', () => {
    render();
    expect(screen.getByText(/45\/100/)).toBeInTheDocument();
  });

  test('shows guild level', () => {
    render();
    expect(screen.getByText(/Level 15/i)).toBeInTheDocument();
  });

  test('displays guild karma', () => {
    render();
    expect(screen.getByText(/1,?500/)).toBeInTheDocument();
  });

  test('shows territory count', () => {
    render();
    expect(screen.getByText(/3 territories/i)).toBeInTheDocument();
  });

  test('displays recruitment status', () => {
    render();
    expect(screen.getByText(/recruiting/i)).toBeInTheDocument();
  });

  test('shows join button when recruitment is open', () => {
    render();
    expect(screen.getByText(/join/i)).toBeInTheDocument();
  });

  test('hides join button when recruitment is closed', () => {
    const closedGuild = { ...mockGuild, recruitment_open);
    expect(screen.queryByText(/join/i)).not.toBeInTheDocument();
  });

  test('displays manage button for guild members', () => {
    render();
    expect(screen.getByText(/manage/i)).toBeInTheDocument();
  });

  test('shows member at capacity badge', () => {
    const fullGuild = { ...mockGuild, total_members);
    expect(screen.getByText(/full/i)).toBeInTheDocument();
  });

  test('handles join action', () => {
    const onJoin = jest.fn();
    render();
    
    const joinButton = screen.getByText(/join/i);
    fireEvent.click(joinButton);
    
    expect(onJoin).toHaveBeenCalledWith(mockGuild._id);
  });

  test('displays guild emblem', () => {
    render();
    expect(screen.getByTestId('guild-emblem')).toBeInTheDocument();
  });
});

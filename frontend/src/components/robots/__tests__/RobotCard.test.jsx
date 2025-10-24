import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RobotCard from '../RobotCard/RobotCard';

const mockRobot = {
  _id,
  name,
  type,
  level,
  stats,
    durability,
    speed,
  },
  price,
  owner_id,
};

describe('RobotCard Component', () => {
  test('renders robot name', () => {
    render();
    expect(screen.getByText('Worker Bot Alpha')).toBeInTheDocument();
  });

  test('displays robot type', () => {
    render();
    expect(screen.getByText(/worker/i)).toBeInTheDocument();
  });

  test('shows robot level', () => {
    render();
    expect(screen.getByText(/Level 5/i)).toBeInTheDocument();
  });

  test('displays robot stats', () => {
    render();
    expect(screen.getByText(/75/)).toBeInTheDocument(); // efficiency
    expect(screen.getByText(/80/)).toBeInTheDocument(); // durability
    expect(screen.getByText(/60/)).toBeInTheDocument(); // speed
  });

  test('shows price for marketplace', () => {
    render();
    expect(screen.getByText(/5,?000/)).toBeInTheDocument();
  });

  test('displays purchase button in marketplace mode', () => {
    render();
    expect(screen.getByText(/purchase/i)).toBeInTheDocument();
  });

  test('shows upgrade button for owned robots', () => {
    render();
    expect(screen.getByText(/upgrade/i)).toBeInTheDocument();
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    render();
    
    const card = screen.getByText('Worker Bot Alpha').closest('div');
    fireEvent.click(card);
    
    expect(handleClick).toHaveBeenCalled();
  });

  test('displays robot 3D model preview', () => {
    render();
    expect(screen.getByTestId('robot-3d-model')).toBeInTheDocument();
  });

  test('shows training progress', () => {
    const trainingRobot = { ...mockRobot, training_progress);
    expect(screen.getByText(/training/i)).toBeInTheDocument();
  });
});

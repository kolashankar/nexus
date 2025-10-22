import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RobotCard from '../RobotCard/RobotCard';
const mockRobot = {
    _id: 'robot123',
    name: 'Worker Bot Alpha',
    type: 'worker',
    level: 5,
    stats: {
        efficiency: 75,
        durability: 80,
        speed: 60,
    },
    price: 5000,
    owner_id: 'player123',
};
describe('RobotCard Component', () => {
    test('renders robot name', () => {
        render(_jsx(RobotCard, { robot: mockRobot }));
        expect(screen.getByText('Worker Bot Alpha')).toBeInTheDocument();
    });
    test('displays robot type', () => {
        render(_jsx(RobotCard, { robot: mockRobot }));
        expect(screen.getByText(/worker/i)).toBeInTheDocument();
    });
    test('shows robot level', () => {
        render(_jsx(RobotCard, { robot: mockRobot }));
        expect(screen.getByText(/Level 5/i)).toBeInTheDocument();
    });
    test('displays robot stats', () => {
        render(_jsx(RobotCard, { robot: mockRobot }));
        expect(screen.getByText(/75/)).toBeInTheDocument(); // efficiency
        expect(screen.getByText(/80/)).toBeInTheDocument(); // durability
        expect(screen.getByText(/60/)).toBeInTheDocument(); // speed
    });
    test('shows price for marketplace', () => {
        render(_jsx(RobotCard, { robot: mockRobot, showPrice: true }));
        expect(screen.getByText(/5,?000/)).toBeInTheDocument();
    });
    test('displays purchase button in marketplace mode', () => {
        render(_jsx(RobotCard, { robot: mockRobot, mode: "marketplace" }));
        expect(screen.getByText(/purchase/i)).toBeInTheDocument();
    });
    test('shows upgrade button for owned robots', () => {
        render(_jsx(RobotCard, { robot: mockRobot, mode: "owned" }));
        expect(screen.getByText(/upgrade/i)).toBeInTheDocument();
    });
    test('handles click event', () => {
        const handleClick = jest.fn();
        render(_jsx(RobotCard, { robot: mockRobot, onClick: handleClick }));
        const card = screen.getByText('Worker Bot Alpha').closest('div');
        fireEvent.click(card);
        expect(handleClick).toHaveBeenCalled();
    });
    test('displays robot 3D model preview', () => {
        render(_jsx(RobotCard, { robot: mockRobot, show3D: true }));
        expect(screen.getByTestId('robot-3d-model')).toBeInTheDocument();
    });
    test('shows training progress', () => {
        const trainingRobot = { ...mockRobot, training_progress: 45 };
        render(_jsx(RobotCard, { robot: trainingRobot }));
        expect(screen.getByText(/training/i)).toBeInTheDocument();
    });
});

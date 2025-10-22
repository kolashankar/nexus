import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KarmaDisplay from '../KarmaDisplay/KarmaDisplay';

describe('KarmaDisplay Component', () => {
  test('renders positive karma correctly', () => {
    render(<KarmaDisplay karma={500} />);
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  test('renders negative karma correctly', () => {
    render(<KarmaDisplay karma={-300} />);
    expect(screen.getByText(/-300/)).toBeInTheDocument();
  });

  test('shows zero karma', () => {
    render(<KarmaDisplay karma={0} />);
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('displays positive karma with green color', () => {
    render(<KarmaDisplay karma={500} />);
    const karmaElement = screen.getByText(/500/).closest('div');
    expect(karmaElement).toHaveClass(/positive/i);
  });

  test('displays negative karma with red color', () => {
    render(<KarmaDisplay karma={-300} />);
    const karmaElement = screen.getByText(/-300/).closest('div');
    expect(karmaElement).toHaveClass(/negative/i);
  });

  test('shows karma change indicator', () => {
    render(<KarmaDisplay karma={500} change={50} />);
    expect(screen.getByText(/\+50/)).toBeInTheDocument();
  });

  test('displays karma tier label', () => {
    render(<KarmaDisplay karma={1000} showTier />);
    expect(screen.getByText(/virtuous/i)).toBeInTheDocument();
  });

  test('shows karma as percentage', () => {
    render(<KarmaDisplay karma={5000} max={10000} showPercentage />);
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  test('renders karma history link', () => {
    render(<KarmaDisplay karma={500} showHistory />);
    expect(screen.getByText(/history/i)).toBeInTheDocument();
  });

  test('handles very large karma values', () => {
    render(<KarmaDisplay karma={999999} />);
    expect(screen.getByText(/999,?999/)).toBeInTheDocument();
  });
});

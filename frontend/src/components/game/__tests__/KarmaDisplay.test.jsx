import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import KarmaDisplay from '../KarmaDisplay/KarmaDisplay';

describe('KarmaDisplay Component', () => {
  test('renders positive karma correctly', () => {
    render();
    expect(screen.getByText(/500/)).toBeInTheDocument();
  });

  test('renders negative karma correctly', () => {
    render();
    expect(screen.getByText(/-300/)).toBeInTheDocument();
  });

  test('shows zero karma', () => {
    render();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('displays positive karma with green color', () => {
    render();
    const karmaElement = screen.getByText(/500/).closest('div');
    expect(karmaElement).toHaveClass(/positive/i);
  });

  test('displays negative karma with red color', () => {
    render();
    const karmaElement = screen.getByText(/-300/).closest('div');
    expect(karmaElement).toHaveClass(/negative/i);
  });

  test('shows karma change indicator', () => {
    render();
    expect(screen.getByText(/\+50/)).toBeInTheDocument();
  });

  test('displays karma tier label', () => {
    render();
    expect(screen.getByText(/virtuous/i)).toBeInTheDocument();
  });

  test('shows karma', () => {
    render();
    expect(screen.getByText(/50%/)).toBeInTheDocument();
  });

  test('renders karma history link', () => {
    render();
    expect(screen.getByText(/history/i)).toBeInTheDocument();
  });

  test('handles very large karma values', () => {
    render();
    expect(screen.getByText(/999,?999/)).toBeInTheDocument();
  });
});

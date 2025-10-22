import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(Click me);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('handles click event', () => {
    const handleClick = jest.fn();
    render(Click);
    
    const button = screen.getByText('Click');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('can be disabled', () => {
    render(Disabled);
    const button = screen.getByText('Disabled');
    expect(button).toBeDisabled();
  });

  test('applies variant classes', () => {
    render(Delete);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('destructive');
  });

  test('applies size classes', () => {
    render(Large);
    const button = screen.getByText('Large');
    expect(button).toHaveClass('lg');
  });

  test('renders element', () => {
    render(Link);
    expect(screen.getByText('Link').tagName).toBe('A');
  });

  test('shows loading state', () => {
    render(Loading);
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('prevents click when loading', () => {
    const handleClick = jest.fn();
    render(Loading);
    
    const button = screen.getByText('Loading');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });
});

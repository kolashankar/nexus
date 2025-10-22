import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TraitsList from '../TraitsList/TraitsList';

const mockTraits = {
  empathy,
  integrity,
  greed,
  hacking,
  negotiation,
  strength,
};

describe('TraitsList Component', () => {
  test('renders all traits', () => {
    render();
    expect(screen.getByText('empathy')).toBeInTheDocument();
    expect(screen.getByText('integrity')).toBeInTheDocument();
    expect(screen.getByText('greed')).toBeInTheDocument();
  });

  test('displays trait values correctly', () => {
    render();
    expect(screen.getByText(/85/)).toBeInTheDocument();
    expect(screen.getByText(/75/)).toBeInTheDocument();
    expect(screen.getByText(/20/)).toBeInTheDocument();
  });

  test('shows trait progress bars', () => {
    render();
    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBe(Object.keys(mockTraits).length);
  });

  test('filters traits by category', () => {
    render();
    
    const virtuesButton = screen.getByText(/virtues/i);
    fireEvent.click(virtuesButton);
    
    // Should show empathy and integrity (virtues)
    expect(screen.getByText('empathy')).toBeInTheDocument();
    expect(screen.getByText('integrity')).toBeInTheDocument();
  });

  test('sorts traits by value', () => {
    render();
    
    const sortButton = screen.getByText(/sort/i);
    fireEvent.click(sortButton);
    
    const traitElements = screen.getAllByTestId(/trait-item/i);
    expect(traitElements.length).toBeGreaterThan(0);
  });

  test('highlights high traits (>80%)', () => {
    render();
    const empathyElement = screen.getByText('empathy').closest('div');
    expect(empathyElement).toHaveClass(/high/i);
  });

  test('shows trait tooltips on hover', async () => {
    render();
    const empathyElement = screen.getByText('empathy');
    fireEvent.mouseEnter(empathyElement);
    
    // Tooltip should appear
    await screen.findByText(/Feel others' emotions/i);
  });

  test('handles empty traits', () => {
    render();
    expect(screen.getByText(/No traits/i)).toBeInTheDocument();
  });

  test('calculates average trait value', () => {
    render();
    // Average should be displayed
    expect(screen.getByText(/average/i)).toBeInTheDocument();
  });
});

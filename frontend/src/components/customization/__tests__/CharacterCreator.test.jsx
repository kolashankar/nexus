import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterCreator from '../CharacterCreator/CharacterCreator';

describe('CharacterCreator Component', () => {
  test('renders character creator interface', () => {
    render();
    expect(screen.getByText(/create character/i)).toBeInTheDocument();
  });

  test('displays gender selection', () => {
    render();
    expect(screen.getByText(/male/i)).toBeInTheDocument();
    expect(screen.getByText(/female/i)).toBeInTheDocument();
  });

  test('shows customization tabs', () => {
    render();
    expect(screen.getByText(/face/i)).toBeInTheDocument();
    expect(screen.getByText(/hair/i)).toBeInTheDocument();
    expect(screen.getByText(/body/i)).toBeInTheDocument();
  });

  test('displays 3D character preview', () => {
    render();
    expect(screen.getByTestId('character-preview')).toBeInTheDocument();
  });

  test('allows changing hair style', () => {
    render();
    const hairTab = screen.getByText(/hair/i);
    fireEvent.click(hairTab);
    
    const hairStyles = screen.getAllByRole('button', { name);
    expect(hairStyles.length).toBeGreaterThan(0);
  });

  test('provides color picker for hair', () => {
    render();
    const hairTab = screen.getByText(/hair/i);
    fireEvent.click(hairTab);
    
    expect(screen.getByTestId('color-picker')).toBeInTheDocument();
  });

  test('displays face customization options', () => {
    render();
    const faceTab = screen.getByText(/face/i);
    fireEvent.click(faceTab);
    
    expect(screen.getByText(/eyes/i)).toBeInTheDocument();
    expect(screen.getByText(/nose/i)).toBeInTheDocument();
  });

  test('shows body type selection', () => {
    render();
    const bodyTab = screen.getByText(/body/i);
    fireEvent.click(bodyTab);
    
    expect(screen.getByText(/slim/i)).toBeInTheDocument();
    expect(screen.getByText(/athletic/i)).toBeInTheDocument();
  });

  test('validates character name input', () => {
    render();
    const nameInput = screen.getByPlaceholderText(/character name/i);
    fireEvent.change(nameInput, { target);
    
    expect(screen.getByText(/name too short/i)).toBeInTheDocument();
  });

  test('disables create button until customization complete', () => {
    render();
    const createButton = screen.getByText(/create/i);
    expect(createButton).toBeDisabled();
  });

  test('enables create button when valid', () => {
    render();
    const nameInput = screen.getByPlaceholderText(/character name/i);
    fireEvent.change(nameInput, { target);
    
    const createButton = screen.getByText(/create/i);
    expect(createButton).not.toBeDisabled();
  });

  test('rotates character preview', () => {
    render();
    const preview = screen.getByTestId('character-preview');
    fireEvent.mouseDown(preview, { clientX);
    fireEvent.mouseMove(preview, { clientX);
    fireEvent.mouseUp(preview);
    
    // Character should rotate
  });
});

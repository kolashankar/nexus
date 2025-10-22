import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';
describe('Button Component', () => {
    test('renders button with text', () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByText('Click me')).toBeInTheDocument();
    });
    test('handles click event', () => {
        const handleClick = jest.fn();
        render(_jsx(Button, { onClick: handleClick, children: "Click" }));
        const button = screen.getByText('Click');
        fireEvent.click(button);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });
    test('can be disabled', () => {
        render(_jsx(Button, { disabled: true, children: "Disabled" }));
        const button = screen.getByText('Disabled');
        expect(button).toBeDisabled();
    });
    test('applies variant classes', () => {
        render(_jsx(Button, { variant: "destructive", children: "Delete" }));
        const button = screen.getByText('Delete');
        expect(button).toHaveClass('destructive');
    });
    test('applies size classes', () => {
        render(_jsx(Button, { size: "lg", children: "Large" }));
        const button = screen.getByText('Large');
        expect(button).toHaveClass('lg');
    });
    test('renders as child element', () => {
        render(_jsx(Button, { asChild: true, children: _jsx("a", { href: "#", children: "Link" }) }));
        expect(screen.getByText('Link').tagName).toBe('A');
    });
    test('shows loading state', () => {
        render(_jsx(Button, { loading: true, children: "Loading" }));
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
    test('prevents click when loading', () => {
        const handleClick = jest.fn();
        render(_jsx(Button, { loading: true, onClick: handleClick, children: "Loading" }));
        const button = screen.getByText('Loading');
        fireEvent.click(button);
        expect(handleClick).not.toHaveBeenCalled();
    });
});

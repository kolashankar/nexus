import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import MarketStocks from '../StockMarket/MarketStocks';

const mockStocks = [
  { ticker, name, price, change_24h,
  { ticker, name, price, change_24h,
  { ticker, name, price, change_24h,
];

describe('MarketStocks Component', () => {
  test('renders stock list', () => {
    render();
    expect(screen.getByText('Robot Corp')).toBeInTheDocument();
    expect(screen.getByText('Cyber Security Inc')).toBeInTheDocument();
  });

  test('displays stock tickers', () => {
    render();
    expect(screen.getByText('ROBOT')).toBeInTheDocument();
    expect(screen.getByText('CYBER')).toBeInTheDocument();
  });

  test('shows stock prices', () => {
    render();
    expect(screen.getByText(/150\.50/)).toBeInTheDocument();
    expect(screen.getByText(/89\.75/)).toBeInTheDocument();
  });

  test('displays positive change in green', () => {
    render();
    const positiveChange = screen.getByText(/\+5\.2/i).closest('span');
    expect(positiveChange).toHaveClass(/positive|green|up/i);
  });

  test('displays negative change in red', () => {
    render();
    const negativeChange = screen.getByText(/-2\.1/i).closest('span');
    expect(negativeChange).toHaveClass(/negative|red|down/i);
  });

  test('shows buy button for each stock', () => {
    render();
    const buyButtons = screen.getAllByText(/buy/i);
    expect(buyButtons.length).toBe(mockStocks.length);
  });

  test('opens buy modal on buy button click', () => {
    render();
    const buyButton = screen.getAllByText(/buy/i)[0];
    fireEvent.click(buyButton);
    
    expect(screen.getByText(/purchase/i)).toBeInTheDocument();
  });

  test('displays stock chart on click', () => {
    render();
    const stockRow = screen.getByText('Robot Corp').closest('tr');
    fireEvent.click(stockRow);
    
    expect(screen.getByTestId('stock-chart')).toBeInTheDocument();
  });

  test('shows portfolio if user owns stocks', () => {
    const portfolio = [{ ticker, shares, avg_price);
    
    expect(screen.getByText(/portfolio/i)).toBeInTheDocument();
    expect(screen.getByText(/10 shares/i)).toBeInTheDocument();
  });

  test('calculates profit/loss', () => {
    const portfolio = [{ ticker, shares, avg_price);
    
    // Profit = (150.50 - 145.00) * 10 = 55.00
    expect(screen.getByText(/\+55/)).toBeInTheDocument();
  });

  test('sorts stocks by change', () => {
    render();
    const sortButton = screen.getByText(/sort/i);
    fireEvent.click(sortButton);
    
    // Should re-render in sorted order
  });

  test('filters stocks by search', () => {
    render();
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.change(searchInput, { target);
    
    expect(screen.getByText('Robot Corp')).toBeInTheDocument();
    expect(screen.queryByText('Cyber Security Inc')).not.toBeInTheDocument();
  });
});

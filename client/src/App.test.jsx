import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ShopSmart title', () => {
  render(<App />);
  const element = screen.getByText(/ShopSmart/i);
  expect(element).toBeInTheDocument();
});
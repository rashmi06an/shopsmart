import { render, screen } from '@testing-library/react';
import App from './App';

test('renders landing page content', () => {
  render(<App />);
  expect(screen.getByText(/Redefine Your/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
});

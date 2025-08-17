import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dashboard heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /PTIES – Dashboard IES/i });
  expect(heading).toBeInTheDocument();
});

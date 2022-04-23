import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Supply Chain App title', () => {
  render(<App />);
  const linkElement = screen.getByText(/Supply Chain App/i);
  expect(linkElement).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders crypto landing page by default', () => {
  render(<App />);
  const titleElement = screen.getByText(/Cryptographic Algorithmic Thinking/i);
  expect(titleElement).toBeInTheDocument();
});

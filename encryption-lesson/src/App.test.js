import { render, screen } from '@testing-library/react';
import App from './App';

test('renders lesson title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Encryption Lesson/i);
  expect(titleElement).toBeInTheDocument();
});

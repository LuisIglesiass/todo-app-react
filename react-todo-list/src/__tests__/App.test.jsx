import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByText(/FocusList/i)).toBeInTheDocument();
  });
});
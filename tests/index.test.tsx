import { render, screen } from '@testing-library/react';
import App from '../pages';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);

    expect(
      screen.getByRole('heading', { name: 'Agnostic Healthy Eating Tracker' })
    ).toBeInTheDocument();
  });
});

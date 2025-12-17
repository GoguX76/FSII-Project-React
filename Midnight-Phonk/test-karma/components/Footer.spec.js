import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../src/components/footer';

describe('Footer Component', () => {
  it('should render the social media heading', () => {
    render(<Footer />);
    const heading = screen.getByText('Síguenos en redes sociales');
    expect(heading).toBeTruthy();
  });

  it('should render the copyright text', () => {
    render(<Footer />);
    const copyright = screen.getByText(/Midnight Phonk/);
    expect(copyright).toBeTruthy();
  });
});
